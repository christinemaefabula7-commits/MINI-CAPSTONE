const STORE_KEY_PREFIX = 'smarte_user_state_';
const GUEST_STORE_KEY = 'smarte_guest_state_v2';
const SESSION_KEY = 'smarte_guest_session';
const DEVICE_TIMEOUT_MS = 30 * 1000; // Pinalawig sa 30 segundo para hindi agad mag-offline ang device kung may delay sa Wi-Fi
const SYNC_INTERVAL_MS = 1000;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Kuhanin ang tamang storage key depende kung logged in o guest
function getActiveStoreKey() {
  if (window.PHP_AUTH && window.PHP_AUTH.isLoggedIn && window.PHP_AUTH.email) {
    return STORE_KEY_PREFIX + btoa(window.PHP_AUTH.email).replace(/=/g, '');
  }
  return GUEST_STORE_KEY;
}

let state = loadState();
let toastTimer;
let syncInProgress = false;
const pendingPower = new Set(); // mga device na kasalukuyang nagpapalit ng power (para hindi ma-overwrite ng auto-sync)

function emptyState() {
  let defaultName = '';
  let defaultEmail = '';

  if (window.PHP_AUTH && window.PHP_AUTH.isLoggedIn) {
    defaultName = window.PHP_AUTH.fullName || '';
    defaultEmail = window.PHP_AUTH.email || '';
  }

  return {
    rooms: [],
    notifications: [],
    readNotifIds: [],
    clearedNotifIds: [],
    reports: [],
    profile: {
      name: defaultName,
      email: defaultEmail
    }
  };
}

function loadState() {
  try {
    const key = getActiveStoreKey();
    const saved = JSON.parse(localStorage.getItem(key));

    if (!saved || typeof saved !== 'object') {
      return emptyState();
    }

    const base = emptyState();
    return {
      ...base,
      ...saved,
      rooms: Array.isArray(saved.rooms) ? saved.rooms : [],
      notifications: Array.isArray(saved.notifications) ? saved.notifications : [],
      readNotifIds: Array.isArray(saved.readNotifIds) ? saved.readNotifIds : [],
      clearedNotifIds: Array.isArray(saved.clearedNotifIds) ? saved.clearedNotifIds : [],
      reports: Array.isArray(saved.reports) ? saved.reports : [],
      profile: {
        ...base.profile,
        ...(saved.profile || {}),
        name: (window.PHP_AUTH && window.PHP_AUTH.isLoggedIn)
          ? window.PHP_AUTH.fullName
          : (saved.profile?.name || base.profile.name)
      }
    };
  } catch (error) {
    console.error('Unable to load saved state:', error);
    return emptyState();
  }
}

function saveState() {
  try {
    const key = getActiveStoreKey();
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn('LocalStorage restricted or unavailable:', error);
  }
}

// PROFILE NAME & WELCOMING MESSAGE UPDATES
function updateUIProfileName(fullName) {
  const cleanName = String(fullName || '').trim();
  const helloUser = $('#helloUser');

  if (helloUser) {
    if (cleanName && cleanName !== 'Guest User') {
      const firstName = cleanName.split(/\s+/)[0];
      helloUser.textContent = `Welcome, ${firstName}!`;
    } else {
      helloUser.textContent = 'Welcome to SMART-E!';
    }
  }

  const profileName = $('#profileName');
  if (profileName) {
    profileName.textContent = (cleanName && cleanName !== 'Guest User') ? cleanName : 'SMART-E User';
  }
}

// RENDER PROFILE DETAILS (INFO ONLY)
function renderProfile() {
  const cleanName = String(state.profile.name || '').trim();
  const profileName = $('#profileName');
  const profileEmail = $('#profileEmail');

  if (profileName) {
    profileName.textContent = (cleanName && cleanName !== 'Guest User') ? cleanName : 'SMART-E User';
  }

  if (profileEmail && state.profile.email) {
    profileEmail.textContent = state.profile.email;
  }

  updateUIProfileName(cleanName);
}

// DEVICE ID COMPARISON
function normalizeDeviceId(value) {
  return String(value || '').trim().toUpperCase();
}

// SAFE JSON RESPONSE
async function readJSONResponse(response) {
  const responseText = await response.text();

  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Invalid server response:', responseText);
    throw new Error('The server returned an invalid response.');
  }
}

// DATABASE SYNC
async function syncDatabaseRooms() {
  if (syncInProgress) return;

  syncInProgress = true;

  try {
    const localRooms = Array.isArray(state.rooms) ? [...state.rooms] : [];

    // 1. SYNC ROOMS
    const roomRes = await fetch('get_rooms.php', {
      method: 'GET',
      cache: 'no-store'
    });

    if (!roomRes.ok) {
      throw new Error(`Rooms request failed: HTTP ${roomRes.status}`);
    }

    const roomData = await readJSONResponse(roomRes);

    if (roomData.status === 'success') {
      const databaseRooms = Array.isArray(roomData.rooms) ? roomData.rooms : [];

      // POWER SWITCH STATE (ON / STANDBY) ng bawat device
      const powerMap = {};
      try {
        const powerRes = await fetch('device_power.php', { method: 'GET', cache: 'no-store' });
        if (powerRes.ok) {
          const powerData = await readJSONResponse(powerRes);
          if (powerData.status === 'success' && Array.isArray(powerData.devices)) {
            powerData.devices.forEach(d => {
              powerMap[normalizeDeviceId(d.deviceId)] = Number(d.power) === 1;
            });
          }
        }
      } catch (powerError) {
        console.warn('Power state sync skipped:', powerError);
      }

      const syncedRooms = databaseRooms.map(dbRoom => {
        const deviceId = normalizeDeviceId(dbRoom.deviceId);
        const existing = localRooms.find(room => normalizeDeviceId(room.deviceId) === deviceId);

        let powerEnabled = existing && typeof existing.powerEnabled === 'boolean' ? existing.powerEnabled : true;
        if (deviceId in powerMap && !pendingPower.has(deviceId)) {
          powerEnabled = powerMap[deviceId];
        }

        return {
          ...existing,
          powerEnabled,
          deviceId: dbRoom.deviceId,
          name: dbRoom.name,
          location: dbRoom.location,
          status: dbRoom.status || 'OFFLINE',
          updatedAt: dbRoom.updatedAt || null,
          isOnline: dbRoom.status !== 'OFFLINE' && dbRoom.updatedAt !== null && dbRoom.updatedAt !== '',
          localOnly: false,
          createdAt: existing?.createdAt || new Date().toISOString()
        };
      });

      const pendingLocalRooms = localRooms.filter(localRoom => {
        const alreadyInDatabase = databaseRooms.some(dbRoom =>
          normalizeDeviceId(dbRoom.deviceId) === normalizeDeviceId(localRoom.deviceId)
        );
        return !alreadyInDatabase && localRoom.localOnly === true;
      });

      state.rooms = [...syncedRooms, ...pendingLocalRooms];
    }

    // 2. SYNC NOTIFICATIONS
    const notifRes = await fetch('get_notifications.php', { cache: 'no-store' });
    if (notifRes.ok) {
      const notifData = await readJSONResponse(notifRes);
      if (notifData.status === 'success') {
        const rawNotifs = Array.isArray(notifData.notifications) ? notifData.notifications : [];
        const clearedSet = new Set(state.clearedNotifIds.map(String));
        const readSet = new Set(state.readNotifIds.map(String));

        state.notifications = rawNotifs
          .filter(n => {
            const uid = String(n.id ?? `${n.deviceId}_${n.createdAt}`);
            return !clearedSet.has(uid);
          })
          .map(n => {
            const uid = String(n.id ?? `${n.deviceId}_${n.createdAt}`);
            const isMarkedReadLocally = readSet.has(uid);
            return {
              id: uid,
              title: n.title,
              message: n.message,
              type: n.status === 'ALERT' || n.type === 'ALERT' ? 'attention' : 'info',
              read: Number(n.is_read) === 1 || isMarkedReadLocally,
              createdAt: n.createdAt,
              deviceId: n.deviceId,
              room: n.room
            };
          });
      }
    }

    // 3. SYNC REPORTS -> inilipat sa hiwalay na syncReports() para hindi maapektuhan ng rooms/notifications sync

    saveState();
    renderAll();

  } catch (error) {
    console.error('Database sync error:', error);
  } finally {
    syncInProgress = false;
  }
}

// TOAST
function showToast(message) {
  const el = $('#toast');
  if (!el) {
    console.log(message);
    return;
  }

  el.textContent = message;
  el.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 3500);
}

// MODALS
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.add('open', 'show');
  el.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.remove('open', 'show');
  el.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// APP NAVIGATION
function openApp(view = 'home') {
  const portal = $('#portal');
  const app = $('#app');

  if (portal) portal.classList.remove('active');
  if (app) app.classList.add('active');

  showView(view);
  renderAll();
  syncDatabaseRooms();
}

function showPortal() {
  const app = $('#app');
  const portal = $('#portal');

  if (app) app.classList.remove('active');
  if (portal) portal.classList.add('active');
}

function showView(name) {
  $$('.app-view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${name}`);
  });

  $$('.side-link').forEach(link => {
    link.classList.toggle('active', link.dataset.view === name);
  });

  const session = getSession();
  if (session) {
    session.view = name;
    saveSession(session);
  }

  const sidebar = $('#sidebar');
  if (sidebar) sidebar.classList.remove('mobile-open');
}

// SESSION
function getSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  const storage = session.remember ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

function startGuest() {
  const remembered = getSession();
  if (remembered && remembered.remember) {
    state.profile.name = remembered.name || '';
    saveState();
    updateUIProfileName(state.profile.name);
    openApp(remembered.view || 'home');
    return;
  }
  openModal('guestModal');
}

// DEVICE STATUS
function resolveDeviceStatus(room) {
  if (room.powerEnabled === false) {
    return 'STANDBY';
  }

  if (!room.updatedAt || room.isOnline === false || room.status === 'OFFLINE') {
    return 'OFFLINE';
  }

  const lastUpdate = new Date(room.updatedAt).getTime();
  if (Number.isNaN(lastUpdate) || Date.now() - lastUpdate > DEVICE_TIMEOUT_MS) {
    return 'OFFLINE';
  }

  return room.status || 'VACANT';
}

function statusInfo(status) {
  const map = {
    OCCUPIED: { label: 'ONLINE · OCCUPIED', icon: '♙', className: 'occupied', detail: 'Device online. Room is occupied.' },
    VACANT: { label: 'ONLINE · VACANT', icon: '▯', className: 'vacant', detail: 'Device online. Room is vacant and light is off.' },
    ALERT: { label: 'ONLINE · ALERT', icon: '⚠', className: 'attention', detail: 'Device online. Light detected while room is vacant!' },
    STANDBY: { label: 'POWER OFF · STANDBY', icon: '⏻', className: 'standby', detail: 'Device is switched off from the dashboard (standby).' },
    OFFLINE: { label: 'OFFLINE', icon: '⌁', className: 'offline', detail: 'Waiting for ESP32 device connection.' }
  };
  return map[status] || map.OFFLINE;
}

function timeText(value) {
  if (!value) return 'Not yet connected';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
}

// RENDER ALL
function renderAll() {
  renderDashboard();
  renderRooms();
  renderNotifications();
  renderReports();
  renderProfile();
}

// DASHBOARD
function renderDashboard() {
  const counts = { OCCUPIED: 0, VACANT: 0, ALERT: 0, OFFLINE: 0, STANDBY: 0 };
  state.rooms.forEach(room => {
    const effectiveStatus = resolveDeviceStatus(room);
    counts[effectiveStatus] = (counts[effectiveStatus] || 0) + 1;
  });

  const totalUnits = $('#totalUnits');
  const countOccupied = $('#countOccupied');
  const countVacant = $('#countVacant');
  const countAttention = $('#countAttention');
  const countOffline = $('#countOffline');
  const countStandby = $('#countStandby');

  if (totalUnits) totalUnits.textContent = state.rooms.length;
  if (countOccupied) countOccupied.textContent = counts.OCCUPIED;
  if (countVacant) countVacant.textContent = counts.VACANT;
  if (countAttention) countAttention.textContent = counts.ALERT;
  if (countOffline) countOffline.textContent = counts.OFFLINE;
  if (countStandby) countStandby.textContent = counts.STANDBY;

  const host = $('#roomCards');
  if (host) {
    if (!state.rooms.length) {
      host.dataset.sig = '';
      host.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">⌂</span>
          <h3>No SMART-E units registered</h3>
          <p>Add a room and assign its SMART-E device ID to begin monitoring.</p>
          <button class="btn btn-primary" data-modal="roomModal">＋ Add Your First Room</button>
        </div>`;
    } else {
      const cardsHTML = state.rooms.map(room => {
        const effectiveStatus = resolveDeviceStatus(room);
        const s = statusInfo(effectiveStatus);
        const isOn = room.powerEnabled !== false;
        const isPending = pendingPower.has(normalizeDeviceId(room.deviceId));
        return `
          <article class="unit-card ${isOn ? '' : 'is-standby'}">
            <div class="unit-icon ${s.className}">${s.icon}</div>
            <div class="unit-info">
              <div class="unit-head">
                <b>${escapeHTML(room.deviceId)}</b>
                <span class="status-pill ${s.className}"><i></i>${s.label}</span>
              </div>
              <h3>${escapeHTML(room.name)}</h3>
              <p>${escapeHTML(room.location)}</p>
              <small>Last update: ${timeText(room.updatedAt)}</small>
              <div class="power-row">
                <span class="power-label">${isOn ? 'POWER ON' : 'POWER OFF (STANDBY)'}</span>
                <label class="power-switch" title="${isOn ? 'Switch OFF (standby)' : 'Switch ON'}">
                  <input type="checkbox" class="power-input" data-power-device="${escapeAttr(room.deviceId)}" ${isOn ? 'checked' : ''} ${isPending ? 'disabled' : ''} aria-label="Power switch for ${escapeAttr(room.name)}">
                  <span class="power-slider"></span>
                </label>
              </div>
            </div>
            <button class="more-btn" data-room-action="${escapeAttr(room.deviceId)}" aria-label="Room options">•••</button>
          </article>`;
      }).join('');

      // I-update lang ang DOM kapag may nagbago (para hindi maputol ang pag-click sa switch tuwing 1-second sync)
      if (host.dataset.sig !== cardsHTML) {
        host.innerHTML = cardsHTML;
        host.dataset.sig = cardsHTML;
      }
    }
  }

  // SIDEBAR NOTIFICATION BADGE COUNT
  const sideCount = $('#sideNotifCount');
  if (sideCount) {
    const unreadCount = state.notifications.filter(n => !n.read).length;
    sideCount.textContent = unreadCount;
    sideCount.style.display = unreadCount > 0 ? '' : 'none';
  }
}

// NOTIFICATIONS
function renderNotifications() {
  const host = $('#notificationList');
  if (!host) return;

  if (!state.notifications.length) {
    host.innerHTML = `
      <div class="empty-state compact">
        <span class="empty-icon">♧</span>
        <h3>You’re all caught up</h3>
        <p>Notifications will appear here when your connected SMART-E units send events.</p>
      </div>`;
    return;
  }

  host.innerHTML = [...state.notifications].reverse().map(n => `
    <article class="notice ${n.read ? 'read' : ''}">
      <span class="notice-icon ${n.type}">${n.type === 'attention' ? '⚠' : '●'}</span>
      <div>
        <b>${escapeHTML(n.title)}</b>
        <p>${escapeHTML(n.message)}</p>
        <small>${timeText(n.createdAt)}</small>
      </div>
      ${!n.read ? `<span class="notice-dot ${n.type}"></span>` : ''}
    </article>`).join('');
}

// ROOMS TABLE
function renderRooms() {
  const body = $('#roomTable');
  if (!body) return;

  if (!state.rooms.length) {
    body.innerHTML = `<tr><td colspan="6" class="empty-cell">No rooms registered yet. Use “Add New Room” to register your first unit.</td></tr>`;
    return;
  }

  body.innerHTML = state.rooms.map(room => {
    const effectiveStatus = resolveDeviceStatus(room);
    const s = statusInfo(effectiveStatus);
    return `
      <tr>
        <td><b>${escapeHTML(room.deviceId)}</b></td>
        <td>${escapeHTML(room.name)}</td>
        <td>${escapeHTML(room.location)}</td>
        <td><span class="status-pill ${s.className}"><i></i>${s.label}</span></td>
        <td>${timeText(room.updatedAt)}</td>
        <td><button class="table-action" data-room-action="${escapeAttr(room.deviceId)}">Manage</button></td>
      </tr>`;
  }).join('');
}

// REPORTS (Daily / Weekly status-change log)
let reportPeriod = 'daily';

function parseReportDate(value) {
  if (!value) return null;
  const d = new Date(String(value).replace(' ', 'T'));
  return Number.isNaN(d.getTime()) ? null : d;
}

function reportDayKey(d) {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function reportWeekStart(d) {
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = (start.getDay() + 6) % 7; // Monday = start of week
  start.setDate(start.getDate() - diff);
  return start;
}

function reportDateTimeText(d) {
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
}

function ensureReportTabs() {
  const body = $('#reportTable');
  if (!body || $('#reportPeriodTabs')) return;

  const table = body.closest('table');
  if (!table || !table.parentNode) return;

  const tabs = document.createElement('div');
  tabs.id = 'reportPeriodTabs';
  tabs.style.cssText = 'display:flex;gap:8px;margin:12px 0;flex-wrap:wrap;';
  tabs.innerHTML = `
    <button type="button" data-report-period="daily">Daily Report</button>
    <button type="button" data-report-period="weekly">Weekly Report</button>`;
  table.parentNode.insertBefore(tabs, table);

  tabs.addEventListener('click', event => {
    const btn = event.target.closest('[data-report-period]');
    if (!btn) return;
    reportPeriod = btn.dataset.reportPeriod;
    renderReports();
  });
}

function renderReports() {
  const body = $('#reportTable');
  if (!body) return;

  ensureReportTabs();

  $$('#reportPeriodTabs button').forEach(btn => {
    const active = btn.dataset.reportPeriod === reportPeriod;
    btn.style.cssText = `padding:8px 16px;border-radius:999px;border:1px solid #2f6fed;cursor:pointer;font-weight:600;` +
      (active ? 'background:#2f6fed;color:#fff;' : 'background:transparent;color:#2f6fed;');
  });

  // Ihanda ang listahan + hanapin ang previous status ng bawat device
  const items = (state.reports || [])
    .map(r => ({ ...r, date: parseReportDate(r.createdAt) }))
    .filter(r => r.date)
    .sort((a, b) => a.date - b.date);

  const lastByDevice = {};
  items.forEach(r => {
    r.previous = lastByDevice[r.deviceId] || null;
    lastByDevice[r.deviceId] = r.status;
  });
  items.reverse(); // pinakabago muna

  if (!items.length) {
    body.innerHTML = `<tr><td colspan="5" class="empty-cell">No monitoring events recorded yet.</td></tr>`;
    return;
  }

  // Group by day or week
  const groups = new Map();
  items.forEach(r => {
    let key, label;
    if (reportPeriod === 'weekly') {
      const start = reportWeekStart(r.date);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      const fmt = { month: 'short', day: 'numeric' };
      key = reportDayKey(start);
      label = `Week of ${start.toLocaleDateString('en-US', fmt)} – ${end.toLocaleDateString('en-US', { ...fmt, year: 'numeric' })}`;
    } else {
      key = reportDayKey(r.date);
      label = r.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (!groups.has(key)) groups.set(key, { label, rows: [] });
    groups.get(key).rows.push(r);
  });

  let html = '';
  groups.forEach(group => {
    const count = status => group.rows.filter(r => r.status === status).length;
    html += `
      <tr class="report-group">
        <td colspan="5" style="font-weight:700;background:rgba(47,111,237,.08);">
          ${escapeHTML(group.label)} — ${group.rows.length} status change${group.rows.length === 1 ? '' : 's'}
          (Occupied: ${count('OCCUPIED')} · Vacant: ${count('VACANT')} · Alert: ${count('ALERT')})
        </td>
      </tr>`;

    html += group.rows.map(r => {
      const cls = statusInfo(r.status).className;
      const change = r.previous && r.previous !== r.status
        ? `${escapeHTML(r.previous)} → ${escapeHTML(r.status)}`
        : `Status set to ${escapeHTML(r.status)}`;
      return `
      <tr>
        <td>${escapeHTML(reportDateTimeText(r.date))}</td>
        <td>${escapeHTML(r.deviceId)}</td>
        <td>${escapeHTML(r.room)}</td>
        <td>${change}<br><small>${escapeHTML(r.event)}</small></td>
        <td><span class="status-pill ${cls}"><i></i>${escapeHTML(r.status)}</span></td>
      </tr>`;
    }).join('');
  });

  body.innerHTML = html;
}

// Hiwalay na sync para sa reports (hindi na nakadepende sa rooms/notifications)
async function syncReports() {
  try {
    const res = await fetch('get_reports_json.php', { cache: 'no-store' });
    if (!res.ok) return;

    const data = await readJSONResponse(res);
    if (data.status !== 'success') return;

    const fresh = (Array.isArray(data.reports) ? data.reports : []).map(r => ({
      createdAt: r.createdAt,
      deviceId: r.deviceId,
      room: r.room,
      event: r.event,
      status: r.status
    }));

    if (JSON.stringify(fresh) !== JSON.stringify(state.reports)) {
      state.reports = fresh;
      saveState();
      renderReports();
    }
  } catch (error) {
    console.error('Report sync error:', error);
  }
}

// HTML ESCAPING
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function escapeAttr(value) {
  return escapeHTML(value);
}

// ADD ROOM
async function addRoom(name, location, deviceId) {
  const cleanName = String(name || '').trim();
  const cleanLocation = String(location || '').trim();
  const cleanDeviceId = normalizeDeviceId(deviceId);

  if (!cleanName || !cleanLocation || !cleanDeviceId) {
    showToast('Please complete all room details.');
    return false;
  }

  try {
    showToast('Registering SMART-E room...');
    const response = await fetch('add_room.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ room_name: cleanName, location: cleanLocation, device_code: cleanDeviceId })
    });

    const data = await readJSONResponse(response);
    if (!response.ok || data.status !== 'success') {
      showToast(data.message || 'Unable to register room.');
      return false;
    }

    await syncDatabaseRooms();
    renderAll();
    showToast('SMART-E room registered successfully!');
    return true;
  } catch (error) {
    showToast(error.message || 'Server connection failed.');
    return false;
  }
}

// MANAGE ROOM
async function manageRoom(deviceId) {
  const cleanId = normalizeDeviceId(deviceId);
  const room = state.rooms.find(r => normalizeDeviceId(r.deviceId) === cleanId);
  if (!room) return;

  const choice = prompt(`Manage ${room.deviceId}\nEnter: 1 = Edit room name, 2 = Remove unit`);

  if (choice === '1') {
    const name = prompt('Enter updated room name:', room.name);
    if (name && name.trim()) {
      room.name = name.trim();
      saveState();
      renderAll();
      showToast('Room name updated locally.');
    }
  }

  if (choice === '2' && confirm(`Remove ${room.deviceId} from registered rooms?`)) {
    try {
      showToast('Removing unit...');
      const response = await fetch('delete_device.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ device_code: room.deviceId })
      });

      const data = await readJSONResponse(response);
      if (!response.ok || data.status !== 'success') {
        showToast(data.message || 'Unable to remove unit.');
        return;
      }

      state.rooms = state.rooms.filter(r => normalizeDeviceId(r.deviceId) !== cleanId);
      saveState();
      renderAll();
      await syncDatabaseRooms();
      showToast('Unit removed successfully.');
    } catch (error) {
      showToast('Server connection failed.');
    }
  }
}

// POWER SWITCH (ON / STANDBY)
async function setDevicePower(deviceId, turnOn) {
  const cleanId = normalizeDeviceId(deviceId);
  const room = state.rooms.find(r => normalizeDeviceId(r.deviceId) === cleanId);
  if (!room || pendingPower.has(cleanId)) return;

  const previous = room.powerEnabled !== false;

  // Guest/local-only room: wala pa sa database kaya sa browser lang ma-save
  if (room.localOnly === true) {
    room.powerEnabled = turnOn;
    saveState();
    renderAll();
    showToast(turnOn ? `${room.deviceId} is now ON.` : `${room.deviceId} is now on standby.`);
    return;
  }

  // Optimistic update para instant ang dating ng switch
  pendingPower.add(cleanId);
  room.powerEnabled = turnOn;
  renderAll();

  try {
    const response = await fetch('device_power.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ device_code: room.deviceId, power: turnOn ? '1' : '0' })
    });

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseError) {
      console.error('device_power.php raw response:', raw);
      if (response.status === 404) {
        throw new Error('device_power.php was not found. Put it inside the SMART-E folder, next to db.php.');
      }
      const preview = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100);
      throw new Error(`Power switch error (HTTP ${response.status}): ${preview || 'empty response'}`);
    }

    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'Unable to change device power.');
    }

    room.powerEnabled = Number(data.power) === 1;
    saveState();
    showToast(room.powerEnabled
      ? `${room.deviceId} switched ON. It will resume monitoring on its next check-in.`
      : `${room.deviceId} switched OFF (standby). Monitoring and alerts are paused.`);
  } catch (error) {
    room.powerEnabled = previous; // ibalik kung pumalya
    showToast(error.message || 'Server connection failed.');
  } finally {
    pendingPower.delete(cleanId);
    renderAll();
  }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {

  const guestStart = $('#guestStart');
  if (guestStart) guestStart.addEventListener('click', startGuest);

  const guestForm = $('#guestForm');
  if (guestForm) {
    guestForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = $('#guestName')?.value.trim() || '';
      const remember = $('#rememberGuest')?.checked || false;

      state.profile.name = name;
      saveState();
      updateUIProfileName(name);

      const session = { name, remember, view: 'home' };
      if (remember) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        sessionStorage.removeItem(SESSION_KEY);
      } else {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        localStorage.removeItem(SESSION_KEY);
      }

      closeModal('guestModal');
      openApp('home');
    });
  }

  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const modalBtn = target.closest('[data-modal]');
    if (modalBtn) {
      $$('.modal.show, .modal.open').forEach(modal => closeModal(modal.id));
      openModal(modalBtn.dataset.modal);
    }

    const closeBtn = target.closest('[data-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      if (modal) closeModal(modal.id);
    }

    const roomActionBtn = target.closest('[data-room-action]');
    if (roomActionBtn) {
      manageRoom(roomActionBtn.dataset.roomAction);
    }
  });

  document.addEventListener('change', event => {
    const input = event.target;
    if (!(input instanceof Element) || !input.matches('.power-input')) return;
    setDevicePower(input.dataset.powerDevice, input.checked);
  });

  $$('.modal').forEach(modal => {
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal(modal.id);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      $$('.modal.open, .modal.show').forEach(modal => closeModal(modal.id));
      $$('.info-overlay.open').forEach(panel => {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      });
    }
  });

  $$('.side-link').forEach(link => {
    link.addEventListener('click', () => showView(link.dataset.view));
  });

  const mobileMenu = $('#mobileMenu');
  if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
      const sidebar = $('#sidebar');
      if (sidebar) sidebar.classList.toggle('mobile-open');
    });
  }

  const portalMenu = $('#portalMenu');
  if (portalMenu) {
    portalMenu.addEventListener('click', () => {
      const nav = $('.site-nav');
      if (nav) nav.classList.toggle('nav-open');
    });
  }

  const roomForm = $('#roomForm');
  if (roomForm) {
    roomForm.addEventListener('submit', async event => {
      event.preventDefault();
      const name = $('#roomName')?.value || '';
      const location = $('#roomLocation')?.value || '';
      const deviceId = $('#deviceId')?.value || '';

      const submitButton = roomForm.querySelector('button[type="submit"], input[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const added = await addRoom(name, location, deviceId);
        if (!added) return;
        roomForm.reset();
        closeModal('roomModal');
        showView('rooms');
        renderAll();
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  const profileForm = $('#profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', event => {
      event.preventDefault();
      const newName = $('#editName')?.value.trim();
      const newEmail = $('#editEmail')?.value.trim();
      if (newName) {
        state.profile.name = newName;
        if (newEmail) state.profile.email = newEmail;
        saveState();
        renderProfile();
        closeModal('editProfileModal');
        showToast('Profile information updated successfully.');
      }
    });
  }

  // MARK ALL AS READ WITH DELETE CONFIRMATION
  const markRead = $('#markRead');
  if (markRead) {
    markRead.addEventListener('click', () => {
      if (!state.notifications.length) {
        showToast('No notifications to clear or mark as read.');
        return;
      }

      const wantDelete = confirm(
        'Do you want to delete all notifications?\n\n' +
        '• OK (Yes) = Delete all notifications from this list (all events remain recorded in Reports).\n' +
        '• Cancel (No) = Keep notifications visible here, but clear the unread count badge.'
      );

      const allCurrentIds = state.notifications.map(n => String(n.id));

      if (wantDelete) {
        state.clearedNotifIds = Array.from(new Set([...state.clearedNotifIds, ...allCurrentIds]));
        state.readNotifIds = Array.from(new Set([...state.readNotifIds, ...allCurrentIds]));
        state.notifications = [];
        saveState();
        renderNotifications();
        renderDashboard();
        showToast('All notifications deleted. Event logs remain safe in Reports.');
      } else {
        state.readNotifIds = Array.from(new Set([...state.readNotifIds, ...allCurrentIds]));
        state.notifications.forEach(n => { n.read = true; });
        saveState();
        renderNotifications();
        renderDashboard();
        showToast('All notifications marked as read.');
      }
    });
  }

  const exportReport = $('#exportReport');
  if (exportReport) {
    exportReport.addEventListener('click', () => {
      if (!state.reports.length) {
        showToast('There are no report records to export yet.');
        return;
      }

      const rows = [
        ['Date and Time', 'Device ID', 'Room', 'Event', 'Status'],
        ...state.reports.map(r => [new Date(r.createdAt).toLocaleString(), r.deviceId, r.room, r.event, r.status])
      ];

      const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'SMART-E-monitoring-report.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }

  const editProfile = $('#editProfile');
  if (editProfile) {
    editProfile.addEventListener('click', () => {
      if ($('#editName')) $('#editName').value = state.profile.name || '';
      if ($('#editEmail')) $('#editEmail').value = state.profile.email || '';
      openModal('editProfileModal');
    });
  }

  const clearGuest = $('#clearGuest');
  if (clearGuest) {
    clearGuest.addEventListener('click', () => {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(GUEST_STORE_KEY);
      state = loadState();
      renderAll();
      showToast('Remembered guest access cleared.');
    });
  }

  const togglePasswordBtn = $('#togglePassword');
  const loginPasswordInput = $('#loginPassword');
  if (togglePasswordBtn && loginPasswordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      loginPasswordInput.setAttribute('type', type);
      togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });
  }

  const changePasswordBtn = $('#changePasswordBtn');
  if (changePasswordBtn) changePasswordBtn.addEventListener('click', () => openModal('changePasswordModal'));

  $$('[data-info]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const panelId = button.dataset.info;
      const panel = document.getElementById(panelId);
      if (!panel) return;

      $$('.info-overlay.open').forEach(openPanel => {
        if (openPanel !== panel) {
          openPanel.classList.remove('open');
          openPanel.setAttribute('aria-hidden', 'true');
        }
      });

      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    });
  });

  $$('[data-info-close]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const panel = button.closest('.info-overlay');
      if (panel) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  });

  $$('.info-overlay').forEach(panel => {
    panel.addEventListener('click', event => {
      if (event.target === panel) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // INITIAL LOAD STATE CHECK
  if (window.PHP_AUTH && window.PHP_AUTH.isLoggedIn) {
    state.profile.name = window.PHP_AUTH.fullName;
    state.profile.email = window.PHP_AUTH.email;
    saveState();
    updateUIProfileName(window.PHP_AUTH.fullName);
  } else {
    const session = getSession();
    if (session && session.remember) {
      if (session.name) {
        state.profile.name = session.name;
      }
      openApp(session.view || 'home');
    }
    updateUIProfileName(state.profile.name);
  }

  renderAll();
  syncDatabaseRooms();

  setInterval(() => {
    syncDatabaseRooms();
  }, SYNC_INTERVAL_MS);

  syncReports();
  setInterval(syncReports, 3000);
});