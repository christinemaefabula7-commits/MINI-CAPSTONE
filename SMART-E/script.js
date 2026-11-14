const STORE_KEY = 'smarte_demo_v2';
const SESSION_KEY = 'smarte_guest_session';
const DEVICE_TIMEOUT_MS = 15 * 1000;
const SYNC_INTERVAL_MS = 3000;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let state = loadState();
let toastTimer;
let syncInProgress = false;

function emptyState() {
  return {
    rooms: [],
    notifications: [],
    reports: [],
    profile: {
      name: 'Guest User',
      email: '',
      photo: ''
    }
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));

    if (!saved || typeof saved !== 'object') {
      return emptyState();
    }

    return {
      ...emptyState(),
      ...saved,
      rooms: Array.isArray(saved.rooms) ? saved.rooms : [],
      notifications: Array.isArray(saved.notifications)
        ? saved.notifications
        : [],
      reports: Array.isArray(saved.reports)
        ? saved.reports
        : [],
      profile: {
        ...emptyState().profile,
        ...(saved.profile || {})
      }
    };
  } catch (error) {
    console.error('Unable to load saved state:', error);
    return emptyState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Unable to save state:', error);
    showToast('Unable to save changes in this browser.');
  }
}

// PROFILE NAME
function updateUIProfileName(fullName) {
  if (!fullName) return;

  const firstName = fullName.trim().split(/\s+/)[0];

  const helloUser = $('#helloUser');
  if (helloUser) {
    helloUser.textContent = `Hello, ${firstName}!`;
  }

  const profileName = $('#profileName');
  if (profileName) {
    profileName.textContent = fullName;
  }

  const profileInitial = $('#profileInitial');
  if (profileInitial && !state.profile.photo) {
    profileInitial.textContent = firstName.charAt(0).toUpperCase();
  }
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
    const localRooms = Array.isArray(state.rooms)
      ? [...state.rooms]
      : [];

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
      const databaseRooms = Array.isArray(roomData.rooms)
        ? roomData.rooms
        : [];

      const syncedRooms = databaseRooms.map(dbRoom => {
        const deviceId = normalizeDeviceId(dbRoom.deviceId);

        const existing = localRooms.find(room =>
          normalizeDeviceId(room.deviceId) === deviceId
        );

        return {
          ...existing,
          deviceId: dbRoom.deviceId,
          name: dbRoom.name,
          location: dbRoom.location,
          status: dbRoom.status || 'OFFLINE',
          updatedAt: dbRoom.updatedAt || null,
          isOnline:
            dbRoom.status !== 'OFFLINE' &&
            dbRoom.updatedAt !== null &&
            dbRoom.updatedAt !== '',
          localOnly: false,
          createdAt:
            existing?.createdAt || new Date().toISOString()
        };
      });

      const pendingLocalRooms = localRooms.filter(localRoom => {
        const alreadyInDatabase = databaseRooms.some(dbRoom =>
          normalizeDeviceId(dbRoom.deviceId) ===
          normalizeDeviceId(localRoom.deviceId)
        );

        return !alreadyInDatabase && localRoom.localOnly === true;
      });

      state.rooms = [...syncedRooms, ...pendingLocalRooms];
    }

    // 2. SYNC NOTIFICATIONS
    const notifRes = await fetch('get_notifications.php', {
      cache: 'no-store'
    });

    if (notifRes.ok) {
      const notifData = await readJSONResponse(notifRes);

      if (notifData.status === 'success') {
        state.notifications = (
          Array.isArray(notifData.notifications)
            ? notifData.notifications
            : []
        ).map(n => ({
          id: n.id,
          title: n.title,
          message: n.message,
          type: n.status === 'ALERT' || n.type === 'ALERT'
            ? 'attention'
            : 'info',
          read: Number(n.is_read) === 1,
          createdAt: n.createdAt,
          deviceId: n.deviceId,
          room: n.room
        }));
      }
    }

    // 3. SYNC REPORTS
    const reportRes = await fetch('get_reports_json.php', {
      cache: 'no-store'
    });

    if (reportRes.ok) {
      const reportData = await readJSONResponse(reportRes);

      if (reportData.status === 'success') {
        state.reports = (
          Array.isArray(reportData.reports)
            ? reportData.reports
            : []
        ).map(r => ({
          createdAt: r.createdAt,
          deviceId: r.deviceId,
          room: r.room,
          event: r.event,
          status: r.status
        }));
      }
    }

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
    const saved =
      localStorage.getItem(SESSION_KEY) ||
      sessionStorage.getItem(SESSION_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  const storage = session.remember
    ? localStorage
    : sessionStorage;

  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

function startGuest() {
  const remembered = getSession();

  if (remembered && remembered.remember) {
    state.profile.name = remembered.name || 'Guest User';

    saveState();
    updateUIProfileName(state.profile.name);
    openApp(remembered.view || 'home');

    return;
  }

  openModal('guestModal');
}

// DEVICE STATUS
function resolveDeviceStatus(room) {
  if (
    !room.updatedAt ||
    room.isOnline === false ||
    room.status === 'OFFLINE'
  ) {
    return 'OFFLINE';
  }

  const lastUpdate = new Date(room.updatedAt).getTime();

  if (
    Number.isNaN(lastUpdate) ||
    Date.now() - lastUpdate > DEVICE_TIMEOUT_MS
  ) {
    return 'OFFLINE';
  }

  return room.status || 'VACANT';
}

function statusInfo(status) {
  const map = {
    OCCUPIED: {
      label: 'ONLINE · OCCUPIED',
      icon: '♙',
      className: 'occupied',
      detail: 'Device online. Room is occupied.'
    },
    VACANT: {
      label: 'ONLINE · VACANT',
      icon: '▯',
      className: 'vacant',
      detail: 'Device online. Room is vacant and light is off.'
    },
    ALERT: {
      label: 'ONLINE · ALERT',
      icon: '⚠',
      className: 'attention',
      detail: 'Device online. Light detected while room is vacant!'
    },
    OFFLINE: {
      label: 'OFFLINE',
      icon: '⌁',
      className: 'offline',
      detail: 'Waiting for ESP32 device connection.'
    }
  };

  return map[status] || map.OFFLINE;
}

function timeText(value) {
  if (!value) return 'Not yet connected';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// RENDER ALL
function renderAll() {
  renderDashboard();
  renderRooms();
  renderNotifications();
  renderReports();
}

// DASHBOARD
function renderDashboard() {
  const counts = {
    OCCUPIED: 0,
    VACANT: 0,
    ALERT: 0,
    OFFLINE: 0
  };

  state.rooms.forEach(room => {
    const effectiveStatus = resolveDeviceStatus(room);
    counts[effectiveStatus] =
      (counts[effectiveStatus] || 0) + 1;
  });

  const totalUnits = $('#totalUnits');
  const countOccupied = $('#countOccupied');
  const countVacant = $('#countVacant');
  const countAttention = $('#countAttention');
  const countOffline = $('#countOffline');

  if (totalUnits) totalUnits.textContent = state.rooms.length;
  if (countOccupied) countOccupied.textContent = counts.OCCUPIED;
  if (countVacant) countVacant.textContent = counts.VACANT;
  if (countAttention) countAttention.textContent = counts.ALERT;
  if (countOffline) countOffline.textContent = counts.OFFLINE;

  const host = $('#roomCards');

  if (host) {
    if (!state.rooms.length) {
      host.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">⌂</span>
          <h3>No SMART-E units registered</h3>
          <p>Add a room and assign its SMART-E device ID to begin monitoring.</p>
          <button class="btn btn-primary" data-modal="roomModal">
            ＋ Add Your First Room
          </button>
        </div>`;
    } else {
      host.innerHTML = state.rooms.map(room => {
        const effectiveStatus = resolveDeviceStatus(room);
        const s = statusInfo(effectiveStatus);

        return `
          <article class="unit-card">
            <div class="unit-icon ${s.className}">${s.icon}</div>
            <div class="unit-info">
              <div class="unit-head">
                <b>${escapeHTML(room.deviceId)}</b>
                <span class="status-pill ${s.className}">
                  <i></i>${s.label}
                </span>
              </div>
              <h3>${escapeHTML(room.name)}</h3>
              <p>${escapeHTML(room.location)}</p>
              <small>Last update: ${timeText(room.updatedAt)}</small>
            </div>
            <button class="more-btn"
              data-room-action="${escapeAttr(room.deviceId)}"
              aria-label="Room options">•••</button>
          </article>`;
      }).join('');
    }
  }

  const sideCount = $('#sideNotifCount');

  if (sideCount) {
    sideCount.textContent =
      state.notifications.filter(n => !n.read).length;
  }
}

// ROOMS TABLE
function renderRooms() {
  const body = $('#roomTable');
  if (!body) return;

  if (!state.rooms.length) {
    body.innerHTML = `
      <tr>
        <td colspan="6" class="empty-cell">
          No rooms registered yet. Use “Add New Room” to register your first unit.
        </td>
      </tr>`;
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
        <td>
          <span class="status-pill ${s.className}">
            <i></i>${s.label}
          </span>
        </td>
        <td>${timeText(room.updatedAt)}</td>
        <td>
          <button class="table-action"
            data-room-action="${escapeAttr(room.deviceId)}">
            Manage
          </button>
        </td>
      </tr>`;
  }).join('');
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
      <span class="notice-icon ${n.type}">
        ${n.type === 'attention' ? '⚠' : '●'}
      </span>
      <div>
        <b>${escapeHTML(n.title)}</b>
        <p>${escapeHTML(n.message)}</p>
        <small>${timeText(n.createdAt)}</small>
      </div>
      <span class="notice-dot ${n.type}"></span>
    </article>`).join('');
}

// REPORTS
function renderReports() {
  const body = $('#reportTable');
  if (!body) return;

  if (!state.reports.length) {
    body.innerHTML = `
      <tr>
        <td colspan="5" class="empty-cell">
          No monitoring events recorded yet.
        </td>
      </tr>`;
    return;
  }

  body.innerHTML = [...state.reports].reverse().map(r => `
    <tr>
      <td>${timeText(r.createdAt)}</td>
      <td>${escapeHTML(r.deviceId)}</td>
      <td>${escapeHTML(r.room)}</td>
      <td>${escapeHTML(r.event)}</td>
      <td>${escapeHTML(r.status)}</td>
    </tr>`).join('');
}

// HTML ESCAPING
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function escapeAttr(value) {
  return escapeHTML(value);
}

// ADD ROOM - DATABASE REGISTRATION
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
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        room_name: cleanName,
        location: cleanLocation,
        device_code: cleanDeviceId
      })
    });

    const data = await readJSONResponse(response);

    if (!response.ok || data.status !== 'success') {
      console.error('Add room server error:', data);
      showToast(data.message || 'Unable to register room.');
      return false;
    }

    await syncDatabaseRooms();
    renderAll();
    showToast('SMART-E room registered successfully!');
    return true;

  } catch (error) {
    console.error('Add room connection error:', error);
    showToast(error.message || 'Server connection failed.');
    return false;
  }
}

// MANAGE ROOM
async function manageRoom(deviceId) {
  const cleanId = normalizeDeviceId(deviceId);

  const room = state.rooms.find(r =>
    normalizeDeviceId(r.deviceId) === cleanId
  );

  if (!room) return;

  const choice = prompt(
    `Manage ${room.deviceId}\n` +
    `Enter: 1 = Edit room name, 2 = Remove unit\n\n` +
    `Note: Device ONLINE/OFFLINE status updates automatically based on ESP32 connection.`
  );

  if (choice === '1') {
    const name = prompt('Enter updated room name:', room.name);

    if (name && name.trim()) {
      room.name = name.trim();
      saveState();
      renderAll();
      showToast('Room name updated locally.');
    }
  }

  if (
    choice === '2' &&
    confirm(`Remove ${room.deviceId} from registered rooms?`)
  ) {
    try {
      showToast('Removing unit...');

      const response = await fetch('delete_device.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          device_code: room.deviceId
        })
      });

      const data = await readJSONResponse(response);

      if (!response.ok || data.status !== 'success') {
        showToast(data.message || 'Unable to remove unit.');
        return;
      }

      state.rooms = state.rooms.filter(r =>
        normalizeDeviceId(r.deviceId) !== cleanId
      );

      saveState();
      renderAll();
      await syncDatabaseRooms();
      showToast('Unit removed successfully.');

    } catch (error) {
      console.error('Remove unit error:', error);
      showToast('Server connection failed.');
    }
  }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {

  const guestStart = $('#guestStart');
  if (guestStart) {
    guestStart.addEventListener('click', startGuest);
  }

  const guestForm = $('#guestForm');

  if (guestForm) {
    guestForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = $('#guestName')?.value.trim() || 'Guest User';
      const remember = $('#rememberGuest')?.checked || false;

      state.profile.name = name;
      saveState();
      updateUIProfileName(name);

      const session = {
        name,
        remember,
        view: 'home'
      };

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

  const topAvatar = $('#topAvatar');
  if (topAvatar) {
    topAvatar.addEventListener('click', () => showView('profile'));
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
      if (newName) {
        state.profile.name = newName;
        saveState();
        updateUIProfileName(newName);
        closeModal('editProfileModal');
        showToast('Profile name updated successfully.');
      }
    });
  }

  const markRead = $('#markRead');
  if (markRead) {
    markRead.addEventListener('click', () => {
      state.notifications.forEach(n => { n.read = true; });
      saveState();
      renderNotifications();
      renderDashboard();
      showToast('Notifications marked as read.');
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
        ...state.reports.map(r => [
          new Date(r.createdAt).toLocaleString(),
          r.deviceId,
          r.room,
          r.event,
          r.status
        ])
      ];

      const csv = rows.map(row =>
        row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')
      ).join('\r\n');

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

  const choosePhoto = $('#choosePhoto');
  if (choosePhoto) {
    choosePhoto.addEventListener('click', () => $('#profileFile')?.click());
  }

  const changePhoto = $('#changePhoto');
  if (changePhoto) {
    changePhoto.addEventListener('click', () => $('#profileFile')?.click());
  }

  const profileFile = $('#profileFile');
  if (profileFile) {
    profileFile.addEventListener('change', event => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Please choose an image file.');
        event.target.value = '';
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showToast('Choose an image smaller than 2 MB.');
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        state.profile.photo = reader.result;
        saveState();
        renderAll();
        showToast('Profile photo updated.');
      };
      reader.readAsDataURL(file);
    });
  }

  const editProfile = $('#editProfile');
  if (editProfile) {
    editProfile.addEventListener('click', () => openModal('editProfileModal'));
  }

  const clearGuest = $('#clearGuest');
  if (clearGuest) {
    clearGuest.addEventListener('click', () => {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
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
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', () => openModal('changePasswordModal'));
  }

  // PORTAL INFO PANELS (About, Features, Contact, Advocacy)
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

  const session = getSession();
  if (session && session.remember) {
    if (session.name) {
      state.profile.name = session.name;
      updateUIProfileName(session.name);
    }
    openApp(session.view || 'home');
  } else if (state.profile.name) {
    updateUIProfileName(state.profile.name);
  }

  renderAll();
  syncDatabaseRooms();

  setInterval(() => {
    syncDatabaseRooms();
  }, SYNC_INTERVAL_MS);
});