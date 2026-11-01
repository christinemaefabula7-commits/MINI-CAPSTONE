GEMINI BAKERY EXPRESS — LOCAL PREVIEW
====================================

FILES
-----
index.php   Existing public website page (original HTML saved with .php extension)
style.css   Existing styles
script.js   Existing front-end JavaScript
logo.svg    Existing bakery logo

INSTALL IN XAMPP
----------------
1. Open XAMPP Control Panel.
2. Start Apache. MySQL is NOT required for this preview stage.
3. Copy this entire "gemini-bakery" folder into:
      D:\xampp\htdocs\
4. Confirm the final path is:
      D:\xampp\htdocs\gemini-bakery\index.php
5. Open Google Chrome and visit:
      http://localhost/gemini-bakery/
   Direct page URL:
      http://localhost/gemini-bakery/index.php

NOTES
-----
- This is a front-end/local preview package only. No MySQL database or db.php is included.
- The current JavaScript uses browser localStorage for demo order data. These records are
  local to the browser and are not shared between devices or staff accounts.
- Staff login, cashier portal, and admin portal are not included in this preview package yet.
- Font Awesome, Google Fonts, and product images are loaded from external URLs and may require
  an internet connection.
- If Apache uses a port other than 80, include it in the URL. Example:
      http://localhost:8080/gemini-bakery/
- Do not use this demo preview for real customer orders or actual payment processing.

CURRENT DEMO WORKFLOW LIMITATIONS
---------------------------------
The original front-end order flow has not yet been converted to the planned database-backed
workflow. Its existing order statuses and customer-side "Order Received" interaction remain
unchanged for this preview and must be revised in the later order workflow implementation phase.
