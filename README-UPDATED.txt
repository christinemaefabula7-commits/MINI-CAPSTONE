GEMINI BAKERY EXPRESS — UPDATED CONNECTED DEMO
================================================

PROJECT FILES
-------------
- index.html      Public customer website
- admin.html      Staff/Admin Portal
- script.js       Public ordering, tracking, cancellation, shared catalogue
- style.css       Public website styling
- logo.svg        Shared logo used by both pages
- Images/         37 local product images

RUN WITH XAMPP
--------------
1. Extract the complete "gemini-bakery" folder into:
   D:\XAMPP\htdocs\
2. Start Apache in XAMPP.
3. Open the Public Website:
   http://localhost/gemini-bakery/index.html
4. Open the Admin Portal:
   http://localhost/gemini-bakery/admin.html
5. Use the same browser profile and exact localhost origin for both pages.

Do not open one page through Live Server and the other through XAMPP.
Different origins have separate browser storage.

WHAT WAS UPDATED
----------------
- Kept the existing Public Website layout and branding.
- Both pages reference the same root logo.svg.
- Admin Inventory now groups products by category:
  BREADS, BUNDLES, PALAMAN SECTION, KAKANIN SECTION,
  CAKES & PASTRIES, and any other existing categories.
- Each category has its own Add New Product button.
- Add Product opens a modal and automatically assigns the category
  from the category button that was clicked.
- Product image selection, preview, description, price, and stock.
- Product and profile images are resized/compressed before browser storage.
- Profile page now supports profile image selection and preview.
- Admin content is wider and more balanced on large screens.
- Admin typography, controls, cards, and receipt readability are increased.
- Order Management search can find active, completed, and cancelled records.
- Customer cancellation now works only while an order is Pending.
- Cancelled orders are retained in shared order history and recorded in activity.
- Customer order status refreshes when Admin changes a shared order.
- Queue numbering is based on existing order records, not the old hardcoded #043 seed.
- New orders in a clean order list begin at #001 and continue sequentially.
- Inventory stock is deducted once when an order is completed/paid.
- Admin activity logs include product, stock, profile, status, and payment actions.
- Status colors are more distinct and consistent.

QUEUE NUMBER NOTE
-----------------
The numbering now starts at #001 when there are no existing orders.
If this browser already contains an older order such as #046, the next new
order will be #047 to preserve history and avoid duplicate queue numbers.
Do not delete existing order history just to change the display number.

DEMO STORAGE LIMITATIONS
------------------------
This ZIP is the HTML/CSS/JavaScript browser-storage version supplied by the user.
It does not contain PHP files, a MySQL schema, or a database connection.
Orders, staff, products, profile images, and activity are stored in browser
localStorage and shared only between pages using the same browser profile
and exact origin on the same device.

Product and profile images are stored as compressed image data in browser
storage for this demo. Browser security does not allow a static HTML page to
write the selected file directly into the Images/ folder.

For a multi-device final system, the project still needs a PHP/MySQL backend:
- PHP sessions and server-side password hashing
- Database-backed products, orders, payments, staff, and activity logs
- Server-generated unique queue numbers
- PHP image upload into Images/ with paths saved in MySQL

CSV NOTE
--------
The uploaded ZIP did not include "gemini products.csv".
The existing built-in catalogue and Images/1.jpg through Images/37.jpg are
included and used as the fallback catalogue.

VALIDATION PERFORMED
--------------------
- JavaScript syntax checked for script.js and the Admin inline script.
- Confirmed all 37 default product image paths exist.
- Confirmed default product categories include BREADS and BUNDLES.
- Ran isolated cancellation logic checks for Pending and Preparing orders.

A full end-to-end test in the user's local XAMPP/browser environment is still
recommended before presentation, especially for storage synchronization and
the selected images on the user's actual browser.
