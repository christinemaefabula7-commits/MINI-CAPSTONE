
<?php
session_start();
require_once "db.php";

$feedback_status = "";
$is_logged_in = isset($_SESSION["user_id"]);
$full_name = $_SESSION["full_name"] ?? "Guest User";

$name_parts = explode(" ", trim($full_name));
$first_name = $name_parts[0];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["submit_feedback"])) {
    $sender_name = trim($_POST["sender_name"] ?? "Anonymous User");
    $category = trim($_POST["category"] ?? "General");
    $rating = (int)($_POST["rating"] ?? 5);
    $message = trim($_POST["message"] ?? "");

    if (!empty($message)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO feedback (sender_name, category, rating, message) VALUES (?, ?, ?, ?)");
            $stmt->execute([$sender_name, $category, $rating, $message]);
            $feedback_status = "success";
        } catch (PDOException $e) {
            error_log($e->getMessage());
            $feedback_status = "error";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#174b25">
  <title>SMART-E v2.0 | Smart Energy Room Monitoring and Alert System</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>

<!-- ================= PORTAL ================= -->
<section id="portal" class="screen <?php echo $is_logged_in ? '' : 'active'; ?>">
  <header class="site-header wrap">
    <a class="brand" href="#top"><img src="logo.svg" alt="SMART-E logo"></a>
    <nav class="site-nav">
      <button class="portal-link" data-info="aboutInfo">About</button>
      <button class="portal-link" data-info="featuresInfo">Features</button>
      <button class="portal-link" data-info="contactInfo">Contact</button>
      <button class="portal-link" data-info="advocacyInfo">Advocacy</button>
      <button class="btn btn-primary" data-modal="signupModal">Sign Up</button>
    </nav>
    <button class="menu-toggle" id="portalMenu" aria-label="Open navigation">☰</button>
  </header>

  <main id="top" class="portal-main">
    <section class="hero wrap">
      <div class="hero-copy">
        <span class="eyebrow">SMARTER ROOMS. RESPONSIBLE ENERGY.</span>
        <h1>SMART-E</h1>
        <h2>Smart Energy Room Monitoring and Alert System</h2>
        <p>Monitor room occupancy and electric-light conditions to help identify unnecessary use of electricity.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" id="guestStart">Continue as Guest</button>
          <button class="btn btn-outline" data-modal="loginModal">Log In</button>
        </div>
        <small class="hero-note">A simple IoT monitoring and alert solution.</small>
      </div>
      <div class="hero-art" role="img" aria-label="SMART-E physical prototype"></div>
    </section>

    <section id="features" class="feature-strip">
      <article><span class="feature-icon">◉</span><div><b>Room Monitoring</b><p>View registered room status.</p></div></article>
      <article><span class="feature-icon">♧</span><div><b>Smart Alerts</b><p>Get notified when a light is detected in a vacant room.</p></div></article>
      <article><span class="feature-icon">☼</span><div><b>Energy Awareness</b><p>Encourage responsible electricity use.</p></div></article>
      <article><span class="feature-icon">✓</span><div><b>Easy Access</b><p>Access monitoring information in one place.</p></div></article>
    </section>
  </main>
</section>

<!-- ================= SIGN UP MODAL ================= -->
<div class="modal" id="signupModal" aria-hidden="true">
  <div class="modal-content">
    <button class="modal-close" data-close aria-label="Close modal">&times;</button>
    <h2>Create Account</h2>
    <p class="modal-subtitle">Register your SMART-E account.</p>

    <form id="signupForm" action="signup.php" method="POST">
      <label for="signupName">Full Name</label>
      <input type="text" id="signupName" name="full_name" placeholder="e.g. Juan Dela Cruz" required>

      <label for="signupEmail">Email Address</label>
      <input type="email" id="signupEmail" name="email" placeholder="e.g. juan@example.com" required>

      <label for="signupPassword">Password</label>
      <input type="password" id="signupPassword" name="password" placeholder="e.g. SmartE@2026" required>
      <small class="password-guide">Use a strong password: Include lowercase, uppercase, symbols, and numbers.</small>

      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirm_password" placeholder="e.g. SmartE@2026" required>

      <button type="submit" class="btn btn-primary">Create Account</button>
    </form>

    <p class="modal-switch">Already have an account?
      <button type="button" data-modal="loginModal">Log In</button>
    </p>
  </div>
</div>

<!-- ================= LOGIN MODAL ================= -->
<div class="modal" id="loginModal" aria-hidden="true">
  <div class="modal-content">
    <button class="modal-close" data-close aria-label="Close modal">&times;</button>
    <h2>Welcome Back</h2>
    <p class="modal-subtitle">Log in to your SMART-E account.</p>

    <form id="loginForm" action="login.php" method="POST">
      <label for="loginEmail">Email Address</label>
      <input type="email" id="loginEmail" name="email" placeholder="Enter your email" required>

      <label for="loginPassword">Password</label>
      <div style="position: relative;">
        <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required style="padding-right: 75px;">
        <button type="button" id="togglePassword" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:13px;font-weight:700;color:#23652d;" aria-label="Toggle password visibility">Show</button>
      </div>

      <div style="text-align:right;margin-top:-6px;margin-bottom:12px;">
        <button type="button" data-modal="forgotModal" style="background:none;border:none;color:var(--green);font-weight:700;font-size:13px;cursor:pointer;padding:0;">Forgot password?</button>
      </div>

      <button type="submit" class="btn btn-primary">Log In</button>
    </form>

    <p class="modal-switch">Don't have an account yet?
      <button type="button" data-modal="signupModal">Create Account</button>
    </p>
  </div>
</div>

<!-- ================= DASHBOARD APPLICATION ================= -->
<section id="app" class="app-shell screen <?php echo $is_logged_in ? 'active' : ''; ?>">
  <aside class="sidebar" id="sidebar">
    <a class="side-brand" href="#"><img src="logo.svg" alt="SMART-E"></a>
    <nav class="side-nav">
      <button class="side-link active" data-view="home"><span>⌂</span>Dashboard</button>
      <button class="side-link" data-view="rooms"><span>▦</span>Room Management</button>
      <button class="side-link" data-view="notifications"><span>♧</span>Notifications <i id="sideNotifCount" class="nav-count">0</i></button>
      <button class="side-link" data-view="reports"><span>▤</span>Reports</button>
      <button class="side-link" data-view="profile"><span>♙</span>Profile</button>
      <button class="side-link" data-view="feedback"><span>✉</span>Feedback</button>
      <button class="side-link" data-view="help"><span>?</span>Help & Guide</button>
      <button class="side-link" data-view="aboutApp"><span>ⓘ</span>About SMART-E</button>
    </nav>
    <a href="logout.php" class="logout-btn" style="text-decoration:none;text-align:center;display:block;">↪ Log out</a>
  </aside>

  <main class="workspace">
    <header class="app-top">
      <button class="mobile-menu" id="mobileMenu" aria-label="Toggle menu">☰</button>
      <div class="top-brand"><img src="logo.svg" alt="SMART-E"></div>
      <div class="top-user">
        <span id="helloUser">Hello, <?php echo htmlspecialchars($first_name); ?>!</span>
        <button class="avatar avatar-small" id="topAvatar" aria-label="Open profile">♙</button>
      </div>
    </header>

    <div class="page-content">

      <!-- DASHBOARD VIEW -->
      <section class="app-view active" id="view-home">
        <div class="page-heading">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your registered SMART-E units.</p>
          </div>
          <div class="total-box"><span>Total Units</span><strong id="totalUnits">0</strong></div>
        </div>

        <div class="summary-grid">
          <article class="summary-card"><span class="summary-symbol green">●</span><div><small>Occupied (Online)</small><strong id="countOccupied">0</strong></div></article>
          <article class="summary-card"><span class="summary-symbol blue">●</span><div><small>VACANT (Online)</small><strong id="countVacant">0</strong></div></article>
          <article class="summary-card"><span class="summary-symbol red">●</span><div><small>ALERT (Online)</small><strong id="countAttention">0</strong></div></article>
          <article class="summary-card"><span class="summary-symbol gray">●</span><div><small>Offline</small><strong id="countOffline">0</strong></div></article>
        </div>

        <div class="section-heading">
          <div>
            <h2>Registered SMART-E Units</h2>
            <p>Devices automatically switch from OFFLINE to ONLINE once connected and transmitting.</p>
          </div>
          <button class="btn btn-primary" data-modal="roomModal">＋ Add New Room</button>
        </div>
        <div id="roomCards" class="room-grid"></div>
      </section>

      <!-- ROOM MANAGEMENT -->
      <section class="app-view" id="view-rooms">
        <div class="page-heading">
          <div><h1>Room Management</h1><p>Register and manage your SMART-E hardware units.</p></div>
          <button class="btn btn-primary" data-modal="roomModal">＋ Add New Room</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>SMART-E Unit</th><th>Room</th><th>Location</th><th>Connection & Status</th><th>Last Update</th><th>Action</th></tr></thead>
            <tbody id="roomTable"><tr><td colspan="6" class="empty-cell">No rooms registered yet.</td></tr></tbody>
          </table>
        </div>
      </section>

      <!-- NOTIFICATIONS -->
      <section class="app-view" id="view-notifications">
        <div class="page-heading">
          <div><h1>Notifications</h1><p>Alerts and updates from your registered SMART-E units.</p></div>
          <button class="btn btn-outline" id="markRead">Mark all as read</button>
        </div>
        <div id="notificationList" class="notification-list"></div>
      </section>

      <!-- REPORTS -->
      <section class="app-view" id="view-reports">
        <div class="page-heading">
          <div><h1>Reports</h1><p>Review recorded SMART-E events and export a report.</p></div>
          <button class="btn btn-primary" id="exportReport">↓ Export CSV</button>
        </div>
        <div class="report-note">
          <b>Monitoring report</b>
          <p>Reports are based on events recorded by this website. Live device reports update automatically once the ESP32-to-server connection is active.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Date & Time</th><th>SMART-E Unit</th><th>Room</th><th>Event</th><th>Status</th></tr></thead>
            <tbody id="reportTable"><tr><td colspan="5" class="empty-cell">No monitoring events recorded yet.</td></tr></tbody>
          </table>
        </div>
      </section>

      <!-- PROFILE -->
      <section class="app-view" id="view-profile">
        <div class="centered-wrapper">
          <div class="page-heading centered-heading">
            <div><h1>Profile</h1><p>Manage your account information and session preferences.</p></div>
          </div>

          <div class="profile-card centered-card">
            <div class="profile-main">
              <button class="profile-photo" id="choosePhoto" aria-label="Choose profile image">
                <img id="profileImage" alt="Profile photo" hidden>
                <span id="profileInitial"><?php echo strtoupper(substr($first_name, 0, 1)); ?></span>
                <small>📷</small>
              </button>
              <input type="file" id="profileFile" accept="image/*" hidden>
              <div>
                <h2 id="profileName"><?php echo htmlspecialchars($full_name); ?></h2>
                <p id="profileRole" class="role-badge">System Facilitator</p>
                <p id="profileEmail" class="muted">Active Database Session</p>
              </div>
            </div>

            <div class="profile-actions">
              <button class="text-action" id="editProfile"><span>✎ Edit Profile Information</span><span>›</span></button>
              <button class="text-action" id="changePhoto"><span>📷 Change Profile Photo</span><span>›</span></button>
              <button class="text-action" id="clearGuest"><span>↺ Clear Remembered Session</span><span>›</span></button>
              <?php if ($is_logged_in): ?>
              <button class="text-action" id="changePasswordBtn"><span>🔑 Change Account Password</span><span>›</span></button>
              <?php endif; ?>
            </div>
          </div>
        </div>
      </section>

      <!-- FEEDBACK -->
      <section class="app-view" id="view-feedback">
        <div class="centered-wrapper">
          <div class="page-heading centered-heading">
            <div><h1>System & Device Feedback</h1><p>Help improve SMART-E by sharing your experience with the website or hardware prototype.</p></div>
          </div>

          <div class="doc-card centered-card">
            <?php if ($feedback_status === "success"): ?>
              <div class="alert-banner success">Thank you! Your feedback has been recorded in the database.</div>
            <?php elseif ($feedback_status === "error"): ?>
              <div class="alert-banner error">Unable to save feedback right now. Please make sure the database table is ready.</div>
            <?php endif; ?>

            <form id="feedbackForm" action="" method="POST" class="styled-form">
              <input type="hidden" name="submit_feedback" value="1">
              <div class="form-row">
                <div class="form-group">
                  <label for="fbName">Your Name / Role</label>
                  <input type="text" id="fbName" name="sender_name" value="<?php echo htmlspecialchars($full_name); ?>" required>
                </div>
                <div class="form-group">
                  <label for="fbCategory">Feedback Topic</label>
                  <select id="fbCategory" name="category" required>
                    <option value="Website Experience">Website Interface & Usability</option>
                    <option value="IoT Hardware Device">SMART-E IoT Hardware / Sensor Accuracy</option>
                    <option value="Alert Notification">Alert Timing & Notifications</option>
                    <option value="Feature Suggestion">New Feature Suggestion</option>
                    <option value="Bug Report">Report a Technical Issue</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="fbRating">Overall System Rating</label>
                <select id="fbRating" name="rating">
                  <option value="5">★★★★★ — Excellent (Very Helpful & Reliable)</option>
                  <option value="4">★★★★☆ — Good (Works Smoothly)</option>
                  <option value="3">★★★☆☆ — Average (Needs Minor Improvements)</option>
                  <option value="2">★★☆☆☆ — Fair (Experienced Some Delays)</option>
                  <option value="1">★☆☆☆☆ — Poor (Needs Fixing)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="fbMessage">Your Comments, Observations, or Suggestions</label>
                <textarea id="fbMessage" name="message" rows="5" placeholder="Describe how the SMART-E website or room sensor performed during monitoring..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary full">Submit Feedback to Database</button>
            </form>
          </div>
        </div>
      </section>

      <!-- HELP & GUIDE (PRESERVED) -->
      <section class="app-view" id="view-help">
        <div class="centered-wrapper wide-doc">
          <div class="page-heading centered-heading">
            <div><h1>Help & IoT Integration Guide</h1><p>Complete step-by-step manual on using the SMART-E device and how the embedded system works with this website.</p></div>
          </div>

          <div class="doc-stack">
            <article class="doc-card">
              <span class="doc-tag">PART 1 · DEVICE SETUP</span>
              <h2>How to Set Up & Use the SMART-E IoT Device</h2>
              <ol class="step-list">
                <li><b>Register the Unit on the Website:</b> Go to <em>Room Management</em> or click <em>+ Add New Room</em> on the Dashboard. Enter the room name, building location, and the exact unique Device ID printed on your SMART-E hardware (e.g., <code>SMARTE-001</code>). Newly added units initially display as <b>OFFLINE</b>.</li>
                <li><b>Mount & Power the Prototype:</b> Position the SMART-E unit inside the classroom or office where the motion sensor has a clear line of sight to human movement and the light sensor can detect indoor electric lighting. Connect the ESP32 unit to a stable 5V power supply.</li>
                <li><b>Connect to Wi-Fi:</b> Once powered on, the ESP32 microcontroller automatically connects to the configured local Wi-Fi network and pings the SMART-E PHP server.</li>
                <li><b>Automatic Online Transition:</b> As soon as the server receives the first data packet from the ESP32, the unit status on your dashboard automatically changes from <b>OFFLINE</b> to <b>ONLINE</b> (displaying either <em>OCCUPIED</em>, <em>VACANT</em>, or <em>ALERT</em>).</li>
              </ol>
            </article>

            <article class="doc-card">
              <span class="doc-tag">PART 2 · SYSTEM ARCHITECTURE</span>
              <h2>How the Embedded System Works with the Website</h2>
              <p>SMART-E bridges physical hardware sensors with a real-time web monitoring dashboard through a four-stage IoT pipeline:</p>
              <div class="guide-grid">
                <div class="guide-box"><b>1. Dual-Sensor Detection (ESP32)</b><p>The embedded system continuously reads two inputs: a <strong>Motion Sensor (PIR)</strong> to check if people are present, and a <strong>Light Sensor (LDR)</strong> to verify whether electric lights are turned on.</p></div>
                <div class="guide-box"><b>2. Wi-Fi Data Transmission (HTTP POST)</b><p>Whenever sensor states change or during periodic heartbeats, the ESP32 sends its unique <code>device_id</code>, occupancy flag, and light status over Wi-Fi to the PHP backend API.</p></div>
                <div class="guide-box"><b>3. Server Processing & MySQL Storage</b><p>The PHP server validates the device ID, updates the unit's <code>last_seen</code> timestamp (keeping it <strong>ONLINE</strong>), and logs state transitions into the MySQL database.</p></div>
                <div class="guide-box"><b>4. Smart Alert Generation</b><p>If the room is <strong>VACANT</strong> (no motion detected) while the <strong>ELECTRIC LIGHT IS ON</strong>, the system flags an <strong>ALERT</strong> on the dashboard so a facilitator or utility personnel can inspect the room.</p></div>
              </div>
            </article>

            <article class="doc-card">
              <span class="doc-tag">PART 3 · STATUS LEGEND</span>
              <h2>Understanding Dashboard Indicators</h2>
              <div class="legend-list">
                <div class="legend-item"><span class="badge-dot green"></span><div><b>OCCUPIED (Online):</b> Device is connected; motion is detected inside the room. Normal electricity use.</div></div>
                <div class="legend-item"><span class="badge-dot blue"></span><div><b>VACANT (Online):</b> Device is connected; no motion is detected and electric lights are properly turned off.</div></div>
                <div class="legend-item"><span class="badge-dot red"></span><div><b>ALERT (Online):</b> Device is connected; room is vacant but electric lights remain ON. Immediate check recommended.</div></div>
                <div class="legend-item"><span class="badge-dot gray"></span><div><b>OFFLINE:</b> Device has not yet connected or has stopped transmitting data to the server. Check Wi-Fi or power supply.</div></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ABOUT SMART-E APP -->
      <section class="app-view" id="view-aboutApp">
        <div class="centered-wrapper wide-doc">
          <div class="page-heading centered-heading">
            <div><h1>About SMART-E</h1><p>Smart Energy Room Monitoring and Alert System — Project Documentation & Story</p></div>
          </div>

          <div class="doc-stack">
            <!-- SYSTEM OVERVIEW -->
            <article class="doc-card">
              <div class="about-brand-row">
                <img src="logo.svg" alt="SMART-E logo">
                <span class="doc-tag">SYSTEM OVERVIEW</span>
              </div>
              <h2>Monitoring for better energy awareness.</h2>
              <p class="doc-tag">SMART-E v2.0 · DEVELOPED IN 2026</p>
              <p><strong>SMART-E (Smart Energy Room Monitoring and Alert System)</strong> is an IoT-based monitoring solution designed to track room occupancy and electric-light conditions in real time. When the system detects that electric lights are left switched on inside an unoccupied room, it triggers an alert for a facilitator or utility staff member to inspect the area.</p>
              <p>Built as a non-intrusive awareness and monitoring tool, SMART-E focuses on electric-light condition monitoring and alert logging rather than forcefully cutting power—ensuring safety while promoting mindful energy habits across shared campus spaces.</p>
            </article>

            <!-- ADVOCACY -->
            <article class="doc-card">
              <span class="doc-tag">OUR ADVOCACY</span>
              <h2>What is Our Advocacy?</h2>
              <p>Energy conservation does not always require complex industrial overhauls—often, it begins with everyday mindfulness in the classrooms, laboratories, and offices we share. Our advocacy is rooted in <strong>responsible electricity consumption through timely awareness</strong>.</p>
              <p>In busy school environments, lights are frequently left running after classes end or between schedules. SMART-E bridges the gap between human oversight and automated sensing by reminding students, faculty, and building facilitators to turn off unnecessary lights, reduce avoidable power waste, and build a culture of sustainability.</p>
            </article>

            <!-- PROJECT ORIGIN -->
            <article class="doc-card">
              <span class="doc-tag">PROJECT ORIGIN</span>
              <h2>From a Simple Observation to SMART-E</h2>
              <p>SMART-E began with a simple observation in everyday classrooms: sometimes, electric lights remain switched on even when rooms are already vacant. This inspired <strong>Ms. Christine Mae F. Fabula</strong>, a Bachelor of Industrial Technology student majoring in Computer Technology at <strong>Southern Luzon State University – Lucena Campus</strong>, to develop a practical monitoring solution.</p>
              <p>The project was inspired by academic coursework, particularly <strong>Advanced Microcontroller</strong>, <strong>Web Development</strong>, and <strong>Specialized Technology</strong>. These subjects helped bring together embedded systems, sensor integration, database management, and full-stack web development into one IoT monitoring platform.</p>
              <p>Developed individually, SMART-E became a hands-on project that combined hardware and software development—from sensor wiring and ESP32 programming to PHP backend development, MySQL database architecture, and web interface design.</p>
              <p>What started as a classroom observation evolved into an IoT monitoring and alert system intended to benefit classrooms, ordinary households, and office environments.</p>
            </article>

            <!-- DEVELOPER SPOTLIGHT -->
            <article class="doc-card developer-card">
              <span class="doc-tag">BEHIND THE SYSTEM</span>
              <h2>Who's Behind SMART-E?</h2>
              <div class="dev-profile">
                <div class="dev-avatar">CF</div>
                <div class="dev-details">
                  <h3>Ms. CHRISTINE MAE F. FABULA</h3>
                  <p class="dev-role">Full-Stack Developer | Sole Project Developer</p>
                  <p class="dev-school">Bachelor of Industrial Technology – Major in Computer Technology<br>Southern Luzon State University (SLSU) – Lucena Campus</p>
                  <p class="dev-bio">Proudly designed and developed the SMART-E hardware prototype, ESP32 sensor integration, PHP backend, MySQL database, and responsive web monitoring dashboard.</p>
                  <p class="dev-bio">SMART-E was developed in 2026 as an individual IoT project inspired by academic coursework in Advanced Microcontroller, Web Development, and Specialized Technology.</p>
                </div>
              </div>
              <p class="info-footnote"><strong>SMART-E v2.0 · Developed in 2026</strong><br>From a simple classroom observation to a smarter energy-awareness solution.</p>
            </article>
          </div>
        </div>
      </section>

    </div><!-- page-content -->
  </main>
</section>

<!-- ================= PORTAL INFORMATION OVERLAYS ================= -->

<!-- ABOUT PORTAL -->
<div class="info-overlay" id="aboutInfo" aria-hidden="true">
  <div class="info-panel">
    <button class="info-close" data-info-close>×</button>
    <span class="eyebrow">ABOUT SMART-E · VERSION 2.0</span>
    <h2>What is SMART-E?</h2>
    <p><strong>SMART-E (Smart Energy Room Monitoring and Alert System)</strong> is an IoT-based monitoring and alert solution designed to monitor room occupancy and electric-light conditions. It helps identify situations where electric lights remain switched on in vacant rooms, encouraging responsible electricity use and energy awareness.</p>
    <p>What began with a simple observation in everyday classrooms has developed into an integrated IoT project that can benefit not only educational institutions but also ordinary households and office environments.</p>
    <p>SMART-E was developed in 2026 as an individual project inspired by academic coursework in <strong>Advanced Microcontroller</strong>, <strong>Web Development</strong>, and <strong>Specialized Technology</strong>. The project combines embedded systems, sensor integration, database management, and full-stack web development into one monitoring platform.</p>

    <div class="about-developer">
      <span class="eyebrow">MEET THE DEVELOPER</span>
      <h3>Ms. CHRISTINE MAE F. FABULA</h3>
      <p><strong>Full-Stack Developer | Sole Project Developer</strong></p>
      <p>Bachelor of Industrial Technology<br>Major in Computer Technology</p>
      <p>Proudly designed and developed the SMART-E hardware prototype, ESP32 sensor integration, PHP backend, MySQL database, and web monitoring dashboard.</p>
    </div>

    <p class="info-footnote"><strong>SMART-E v2.0 · Developed in 2026</strong><br>From a simple observation to a smarter energy-awareness solution.</p>
  </div>
</div>

<!-- FEATURES PORTAL -->
<div class="info-overlay" id="featuresInfo" aria-hidden="true">
  <div class="info-panel">
    <button class="info-close" data-info-close>×</button>
    <span class="eyebrow">SYSTEM FEATURES</span>
    <h2>Simple monitoring. Clear alerts.</h2>
    <div class="info-feature-grid">
      <article><b>Room Monitoring</b><p>Displays the live online/offline status of registered SMART-E units.</p></article>
      <article><b>Occupancy Detection</b><p>Uses motion sensing to identify whether a room is occupied.</p></article>
      <article><b>Light Monitoring</b><p>Checks the electric-light condition in the monitored room.</p></article>
      <article><b>Notifications & Reports</b><p>Records alerts and monitoring events for review and CSV export.</p></article>
    </div>
    <p class="info-footnote">Available status indicators: OCCUPIED, VACANT, ALERT, and OFFLINE.</p>
  </div>
</div>

<!-- CONTACT PORTAL -->
<div class="info-overlay" id="contactInfo" aria-hidden="true">
  <div class="info-panel">
    <button class="info-close" data-info-close>×</button>
    <span class="eyebrow">CONTACT THE DEVELOPER</span>
    <h2>Let's connect!</h2>
    <p>For project inquiries, demonstrations, collaborations, or feedback regarding SMART-E, you may contact its developer through the following official contact information.</p>

    <div class="contact-details">
      <p><strong>Developer</strong><br>Ms. Christine Mae F. Fabula</p>
      <p><strong>Official Facebook Page</strong><br>Tinternet</p>
      <p><strong>Contact Number</strong><br><a href="tel:09387614645">09387614645</a></p>
      <p><strong>Email Address</strong><br><a href="mailto:tinternetgotyu@gmail.com">tinternetgotyu@gmail.com</a></p>
    </div>

    <p class="info-footnote">You may also use the Feedback section inside the SMART-E dashboard to submit your comments, suggestions, or technical observations.</p>
  </div>
</div>

<!-- ADVOCACY PORTAL -->
<div class="info-overlay" id="advocacyInfo" aria-hidden="true">
  <div class="info-panel">
    <button class="info-close" data-info-close>×</button>
    <span class="eyebrow">OUR ADVOCACY</span>
    <h2>Small actions make energy matter.</h2>
    <p>SMART-E promotes responsible electricity use through awareness. By monitoring room occupancy and electric-light conditions, it helps remind people to check lights in vacant spaces.</p>
    <p>Saving energy begins with simple habits: turn off unnecessary lights, be mindful of shared spaces, and encourage others to use electricity responsibly.</p>
  </div>
</div>

<!-- ================= GUEST ACCESS MODAL ================= -->
<div class="modal" id="guestModal" aria-hidden="true">
  <div class="modal-card">
    <button class="modal-x" data-close="guestModal">×</button>
    <div class="modal-heading">
      <span class="modal-mark">⌂</span>
      <h2>Continue as Guest</h2>
      <p>Choose how you want to access the SMART-E dashboard.</p>
    </div>
    <form id="guestForm">
      <label>Your display name
        <input id="guestName" type="text" placeholder="e.g. Guest User" maxlength="50">
      </label>
      <label class="check-row">
        <input id="rememberGuest" type="checkbox" checked>
        <span>Remember me on this device</span>
      </label>
      <p class="hint">Your browser will remember your guest name and last opened dashboard section on this device.</p>
      <button class="btn btn-primary full" type="submit">Continue to Dashboard</button>
    </form>
  </div>
</div>

<!-- ================= ROOM REGISTRATION MODAL ================= -->
<div class="modal" id="roomModal" aria-hidden="true">
  <div class="modal-card">
    <button class="modal-x" data-close="roomModal">×</button>
    <div class="modal-heading">
      <span class="modal-mark">＋</span>
      <h2>Register SMART-E Room</h2>
      <p>Add a room and assign its unique hardware unit ID.</p>
    </div>
    <form id="roomForm">
      <label>Room name
        <input id="roomName" required maxlength="70" placeholder="e.g. Computer Laboratory 1">
      </label>
      <label>Building / Location
        <input id="roomLocation" required maxlength="100" placeholder="e.g. Main Building, 2nd Floor">
      </label>
      <label>SMART-E Device ID
        <input id="deviceId" required maxlength="40" placeholder="e.g. SMARTE-001">
      </label>
      <p class="hint">A registered unit starts as OFFLINE and automatically turns ONLINE once its ESP32 connects and sends data.</p>
      <button class="btn btn-primary full" type="submit">Register Room</button>
    </form>
  </div>
</div>

<!-- ================= EDIT PROFILE MODAL ================= -->
<div class="modal" id="editProfileModal" aria-hidden="true">
  <div class="modal-card">
    <button class="modal-x" data-close="editProfileModal">×</button>
    <div class="modal-heading"><span class="modal-mark">✎</span><h2>Edit Profile</h2></div>
    <form id="profileForm">
      <label>Display name<input id="editName" maxlength="50" required></label>
      <label>Email (optional)<input id="editEmail" type="email" placeholder="e.g. you@example.com"></label>
      <button class="btn btn-primary full" type="submit">Save Changes</button>
    </form>
  </div>
</div>

<div id="toast" class="toast" role="status"></div>

<!-- ================= FORGOT PASSWORD ================= -->
<div class="modal" id="forgotModal" aria-hidden="true">
  <div class="modal-card">
    <button class="modal-x" data-close="forgotModal">×</button>
    <div class="modal-heading">
      <span class="modal-mark">🔒</span>
      <h2>Reset Password</h2>
      <p>Enter your registered email address to reset your password.</p>
    </div>
    <form action="forgot_password.php" method="POST">
      <label>Email Address<input type="email" name="email" placeholder="e.g. you@example.com" required></label>
      <button class="btn btn-primary full" type="submit" style="margin-top:15px;">Send Reset Code</button>
    </form>
  </div>
</div>

<!-- ================= CHANGE PASSWORD ================= -->
<div class="modal" id="changePasswordModal" aria-hidden="true">
  <div class="modal-card">
    <button class="modal-x" data-close="changePasswordModal">×</button>
    <div class="modal-heading">
      <span class="modal-mark">🔑</span>
      <h2>Change Password</h2>
      <p>I-update ang password ng iyong kasalukuyang account.</p>
    </div>
    <form action="update_password.php" method="POST">
      <label>Current Password<input type="password" name="current_password" placeholder="Lumang password" required></label>
      <label style="margin-top:12px;display:block;">New Password<input type="password" name="new_password" placeholder="Bagong password" required></label>
      <label style="margin-top:12px;display:block;">Confirm New Password<input type="password" name="confirm_new_password" placeholder="Ulitin ang bagong password" required></label>
      <button class="btn btn-primary full" type="submit" style="margin-top:18px;">Save New Password</button>
    </form>
  </div>
</div>

</body>
</html>
