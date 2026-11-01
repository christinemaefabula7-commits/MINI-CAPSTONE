GEMINI BAKERY EXPRESS — LOCAL PREVIEW PACKAGE
============================================

PORTAL LINKS (LOCALHOST)
------------------------
Customer / Public Website:
    http://localhost/gemini-bakery/

Cashier + Sales Assistant Portal:
    http://localhost/gemini-bakery/cashier/

Admin / Management Portal:
    http://localhost/gemini-bakery/admin/

DIRECT PAGE FILES
-----------------
Public page:      index.php
Cashier portal:   cashier/index.php
Admin portal:     admin/index.php

INSTALL IN XAMPP
----------------
1. Extract this ZIP file.
2. Copy the complete "gemini-bakery" folder into:
       D:\xampp\htdocs\
3. Confirm these files exist:
       D:\xampp\htdocs\gemini-bakery\index.php
       D:\xampp\htdocs\gemini-bakery\cashier\index.php
       D:\xampp\htdocs\gemini-bakery\admin\index.php
4. Open XAMPP Control Panel and start Apache.
5. Open the three localhost links above in Chrome.
6. MySQL is NOT required for this UI preview stage.

WHAT IS INCLUDED
----------------
- Existing public bakery website and design files.
- Cashier / Sales Assistant operational portal preview.
- Admin / Management portal preview.
- Shared responsive portal styling based on the public site's brand palette,
  Inter/Fredoka typography, logo, warm cream background, red and yellow accents.
- Demo interactions for searching records, cashier payment/change preview,
  walk-in POS cart and demo receipt, assistant pickup preview, order-status
  transition preview, stock adjustment preview, and portal navigation.

IMPORTANT PREVIEW LIMITATIONS
-----------------------------
- These portal pages are UI previews, NOT secure staff portals yet.
- There is no real login, PHP session authentication, role enforcement,
  MySQL connection, or database persistence at this stage.
- Demo data is hardcoded in the browser and resets when the page is reloaded.
- Cashier and Sales Assistant permissions can be previewed using the
  "Preview as" selector on the cashier overview page. This selector is only
  a design/testing aid and is NOT authentication or real access control.
- Demo payments do not process real money. Demo receipts are not official
  BIR receipts. Demo inventory changes do not update the public website.
- The admin portal displays sample consolidated records, but it is not yet
  synced to the cashier portal or public customer website.
- The customer cancellation and order workflows in the existing public
  preview still need to be revised as part of the later integration phase.
- Font Awesome and Google Fonts use external URLs and may need internet access.

NEXT DEVELOPMENT PHASES
-----------------------
1. Finalize the order and payment workflow.
2. Design and create gemini_bakery_db tables.
3. Add secure staff login, PHP sessions, password hashing, and server-side
   role permissions.
4. Connect all three portals to one shared product, inventory, order,
   payment, cancellation, and reporting database.
5. Add notifications and further end-to-end testing.

If Apache uses a port other than 80, include that port in the address,
for example: http://localhost:8080/gemini-bakery/cashier/
