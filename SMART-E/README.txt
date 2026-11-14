SMART-E WEBSITE - REVISED FRONT-END DRAFT
========================================

Files
-----
index.html       Portal and dashboard layout
style.css        Responsive styling
script.js        Front-end interactions and browser demo storage
logo.svg         Simplified SMART-E logo
Image/           Existing SMART-E prototype background image
 db.php          Existing MySQL connection scaffold (not yet used by index.html)

HOW TO OPEN
-----------
1. Extract the SMART-E folder.
2. Open index.html in a browser for the front-end demonstration.
3. Add rooms through the dashboard. Newly registered units start as OFFLINE.
4. Guest access with Remember Me stores the guest name and last opened dashboard section in this browser.

IMPORTANT CURRENT LIMITATIONS
-----------------------------
This is a front-end demonstration draft. Room records, guest profile, profile photo,
and browser-side demo data are stored in the browser's localStorage. They are not
stored in MySQL and are not shared across computers or browsers.

The ESP32 devices are NOT connected yet. A unit will remain OFFLINE until the
future PHP API receives authenticated device data. The website must not be treated
as showing live sensor readings at this stage.

The current prototype scope is electric-light monitoring only. It does not measure
all appliances and does not automatically switch electrical loads off.

NEXT DEVELOPMENT PHASE
----------------------
1. Create the MySQL database and tables for users, rooms/devices, notifications,
   and monitoring events.
2. Build PHP endpoints to register devices and receive ESP32 status updates.
3. Give each ESP32 a unique device ID and secret/API key; do not expose credentials
   in public front-end JavaScript.
4. Have the ESP32 send occupancy and light-condition data to the PHP API over Wi-Fi.
5. Load room status, notifications, and reports from PHP/MySQL instead of localStorage.
6. Add real login/session handling and server-side authorization.

For local XAMPP development, place the extracted SMART-E folder inside htdocs.
The current index.html can be opened directly, but PHP endpoints will only run
through the XAMPP Apache server (for example http://localhost/SMART-E/).
