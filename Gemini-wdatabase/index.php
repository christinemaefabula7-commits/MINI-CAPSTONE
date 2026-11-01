<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini Bakery Express Pre-Ordering System - Palengke Branch</title>

    <!-- FontAwesome & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fredoka:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- 1. LANDING PORTAL SCREEN -->
    <div id="landing-portal" class="overlay-screen">
        <div class="landing-content">
            <div class="stripe-bar"></div>

            <div class="landing-card">
                <img src="logo.svg" alt="Gemini Bakery Since 1975 logo" class="landing-logo">
                <div class="badge-tag">
                    Lucena City • PALENGKE BRANCH
                </div>
            </div>

            <div class="landing-text">
                <h3>Bili na, Suki! 🍞</h3>
                <p>Mainit at Bagong Hurno Araw-Araw! Skip the long line at the Palengke Branch by pre-ordering your favorite breads, palaman, and kakanin online.</p>
            </div>

            <div class="hours-box">
                <i class="fa-solid fa-clock"></i>
                <span>Open Daily: <strong>5:00 AM - 8:00 PM</strong> | Juarez St. cor. Merchan St.</span>
            </div>

            <button id="enter-store-btn" class="primary-btn lg-btn">
                <i class="fa-solid fa-basket-shopping"></i>
                <span>ORDER NOW / BILI NA!</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
        <p class="copyright-text">© 2026 Gemini Bakery Express • Lucena City Local Market Branch</p>
    </div>

    <!-- WELCOME MODAL -->
    <div id="welcome-modal" class="modal-overlay hidden-modal" role="dialog" aria-modal="true">
        <div class="modal-card">
            <img src="logo.svg" alt="Gemini Bakery logo" class="welcome-logo">
            <div class="modal-header-text">
                <h2>Welcome, Suki!</h2>
                <p>Welcome to Gemini Bakery Express. Continue as a guest and start ordering.</p>
            </div>
            <label class="remember-option">
                <input id="remember-me-checkbox" type="checkbox">
                <span>Remember Me</span>
            </label>
            <p class="small-subtext">Tandaan ang impormasyon ko para sa mas mabilis na pag-order at pagsusubaybay sa aking mga transaksyon sa susunod.</p>
            <button id="continue-as-guest-btn" type="button" class="primary-btn full-btn">Continue as Guest <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    </div>

    <!-- MAIN APP SCREEN -->
    <div id="main-app" class="app-container">
        <!-- HEADER / NAVBAR -->
        <header class="app-header">
            <div class="header-inner">
                <div class="brand-container" id="nav-brand-home">
                    <img src="logo.svg" alt="Gemini Bakery logo" class="header-logo">
                    <div class="brand-text">
                        <div class="brand-title-row">
                            <h1 class="gemini-logo-text">GEMINI <span>BAKERY</span></h1>
                            <span class="branch-pill">Palengke</span>
                        </div>
                        <p class="header-address"><i class="fa-solid fa-location-dot"></i> Juarez St. cor. Merchan St., Lucena Local Market</p>
                    </div>
                </div>

                <div class="header-actions">
                    <nav class="nav-tabs">
                        <button id="nav-menu-btn" class="nav-tab active">
                            <i class="fa-solid fa-store"></i> <span class="tab-label">Bakery</span>
                        </button>
                        <button id="nav-orders-btn" class="nav-tab">
                            <i class="fa-solid fa-box-archive"></i> <span class="tab-label">My Orders</span>
                        </button>
                        <button id="nav-review-btn" class="nav-tab">
                            <i class="fa-solid fa-star"></i> <span class="tab-label">To Review</span>
                        </button>
                    </nav>

                    <button id="open-cart-btn" class="cart-trigger-btn">
                        <i class="fa-solid fa-basket-shopping"></i>
                        <span class="cart-label">Basket</span>
                        <span id="cart-badge" class="cart-badge">0</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- VIEW 1: ORDERING MENU -->
        <div id="view-menu" class="view-section">
            <div class="banner-box">
                <div class="banner-info">
                    <div class="badge-row">
                        <span id="store-status-badge" class="status-badge"></span>
                        <span class="sub-badge">• Express Pre-Order & Delivery</span>
                    </div>
                    <h2>Freshly Baked Goods Ready for Express Pickup & Delivery!</h2>
                    <p>Operating Daily: 5:00 AM - 8:00 PM • Palengke Branch, Lucena City</p>
                </div>
                <div class="live-clock-box">
                    <span id="live-date">--</span>
                    <span id="live-time">--:--:-- --</span>
                </div>
            </div>

            <div class="menu-layout">
                <section class="menu-main">
                    <div class="filter-card">
                        <div class="search-wrapper">
                            <i class="fa-solid fa-magnifying-glass search-icon"></i>
                            <input type="text" id="search-input" placeholder="Search Pandesal, Pan de Coco, Spanish Bread...">
                        </div>

                        <div class="categories-scroll custom-scrollbar" id="category-filters">
                            <button class="cat-btn active" data-category="ALL"><i class="fa-solid fa-border-all"></i>All Products (37)</button>
                            <button class="cat-btn" data-category="BREAD & BUNDLES"><i class="fa-solid fa-bread-slice"></i>Bread & Bundles</button>
                            <button class="cat-btn" data-category="PALAMAN SECTION"><i class="fa-solid fa-jar"></i>Palaman Section</button>
                            <button class="cat-btn" data-category="KAKANIN SECTION"><i class="fa-solid fa-bowl-rice"></i>Kakanin Section</button>
                            <button class="cat-btn" data-category="CAKES & PASTRIES"><i class="fa-solid fa-cake-candles"></i>Cakes & Pastries</button>
                        </div>
                    </div>

                    <div id="product-grid" class="products-grid"></div>

                    <div id="no-results" class="no-results-card hidden">
                        <i class="fa-solid fa-cookie-bite"></i>
                        <h3>Walang nahanap! 🍞</h3>
                    </div>
                </section>

               <aside class="menu-sidebar">
                    <div class="sidebar-card">
                        <div class="card-title-bar">
                            <span class="card-title"><i class="fa-solid fa-store"></i> Store Details</span>
                            <span class="branch-tag">Palengke Branch</span>
                        </div>
                        <div class="info-callout">
                            <strong style="color: var(--gemini-red); display: block; margin-bottom: 0.2rem;"> " Pabatid sa aming mga mahal na suki:</strong>
                            Ang Gemini Bakery Palengke branch ay bukas mula <strong>5:00 AM hanggang 8:00 PM</strong> araw-araw para maghatid ng sariwang tinapay.
                        </div>
                        <div class="sidebar-detail">
                            <i class="fa-solid fa-map-location-dot"></i>
                            <div><strong>Complete Address:</strong><span>Juarez St. corner Merchan St., Lucena Local Market</span></div>
                        </div>
                        <div class="sidebar-detail">
                            <i class="fa-solid fa-phone"></i>
                            <div><strong>Contact No:</strong><span>(042) 710-1975 / 0917-555-7575</span></div>
                        </div>
                    </div>

                    <div class="sidebar-card">
                        <div>
                            <h3 class="card-title"><i class="fa-solid fa-sitemap"></i> Other Lucena Branches</h3>
                            <p class="card-subtitle">You can also visit us on:</p>
                        </div>

                        <div class="branches-list">
                            <div class="branch-item">
                                <div class="branch-header">
                                    <span class="branch-name">Gulang-Gulang Branch</span>
                                    <span class="branch-status-tag">--</span>
                                </div>
                                <p class="branch-address">Maharlika Highway, Brgy. Gulang-Gulang</p>
                            </div>

                            <div class="branch-item">
                                <div class="branch-header">
                                    <span class="branch-name">Iyam Branch</span>
                                    <span class="branch-status-tag">--</span>
                                </div>
                                <p class="branch-address">Quezon Avenue, Brgy. Iyam</p>
                            </div>

                            <div class="branch-item">
                                <div class="branch-header">
                                    <span class="branch-name">Red-V Branch</span>
                                    <span class="branch-status-tag">--</span>
                                </div>
                                <p class="branch-address">Diversion Road corner Red-V</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

        <!-- VIEW 2: ORDER STATUS -->
        <div id="view-orders" class="view-section hidden">
            <div class="orders-header-banner">
                <div>
                    <h2>Order Tracking & My Orders 📦</h2>
                    <p>Subaybayan ang status ng inyong active orders at past transaction history.</p>
                </div>
                <div class="active-badge-box">
                    <span id="active-orders-count">0 Active Orders</span>
                </div>
            </div>

            <div class="orders-group">
                <h3 class="section-title active-title"><i class="fa-solid fa-spinner"></i> Active Fulfillment Queue</h3>
                <div id="active-orders-list" class="orders-list"></div>
                <div id="no-active-orders" class="empty-orders-card">
                    <p>Walang kasalukuyang active order.</p>
                </div>
            </div>

            <div class="orders-group history-group">
                <h3 class="section-title"><i class="fa-solid fa-sclock-rotate-left"></i> Completed Transaction History</h3>
                <div id="history-orders-list" class="orders-list"></div>
                <div id="no-history-orders" class="empty-orders-card font-light">
                    Wala pang nakaraang completed transaction.
                </div>
            </div>
        </div>

        <!-- VIEW 3: SEPARATE TO REVIEW SCREEN -->
        <div id="view-review" class="view-section hidden">
            <div class="review-header-banner">
                <h2>Service & Product Reviews ⭐</h2>
                <p>Mag-iwan ng Service Feedback sa itaas at mag-rate ng inyong biniling mga tinapay sa ibaba!</p>
            </div>

            <div class="feedback-layout">
                <main class="feedback-main">
                    <div class="review-card">
                        <h3 class="card-subtitle-bold"><i class="fa-solid fa-store"></i> A. Service Feedback Form</h3>
                        <form id="service-feedback-form" class="form-grid">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Inyong Pangalan <span class="required">*</span></label>
                                    <input type="text" id="service-author" required placeholder="e.g. Juan Cruz">
                                </div>
                                <div class="form-group">
                                    <label>Service Rating <span class="required">*</span></label>
                                    <div class="star-rating service-stars" id="service-star-container">
                                        <i class="fa-solid fa-star" data-rating="1"></i>
                                        <i class="fa-solid fa-star" data-rating="2"></i>
                                        <i class="fa-solid fa-star" data-rating="3"></i>
                                        <i class="fa-solid fa-star" data-rating="4"></i>
                                        <i class="fa-solid fa-star" data-rating="5"></i>
                                    </div>
                                    <span id="service-rating-text" class="rating-hint">Pumili ng 1-5 stars</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea id="service-comment" rows="2" placeholder="Feedback para sa aming staff o delivery..."></textarea>
                            </div>
                            <button type="submit" class="primary-btn full-btn">Submit Feedback</button>
                        </form>
                    </div>

                    <div class="review-card">
                        <h3 class="card-subtitle-bold"><i class="fa-solid fa-cookie-bite"></i> B. Individual Purchased Product Reviews</h3>
                        <div id="product-review-cards-container" class="product-reviews-list"></div>
                        <div id="no-reviewable-products" class="empty-orders-card">
                            <p>Wala pang produkto na available para i-review.</p>
                        </div>
                    </div>
                </main>

                <aside class="customer-feedback-panel">
                    <div class="panel-header">
                        <i class="fa-solid fa-comments"></i>
                        <h3>Customer Feedback Wall</h3>
                    </div>
                    <div id="published-feedback-list" class="published-feedback-container"></div>
                </aside>
            </div>
        </div>
    </div>

    <!-- BASKET DRAWER -->
    <!-- BASKET DRAWER (EXACT ORIGINAL DESIGN) -->
    <div id="cart-drawer-overlay" class="drawer-overlay hidden-modal">
        <div id="cart-drawer" class="cart-drawer">
            <div class="drawer-header">
                <div class="drawer-title">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <h2>Your Bakery Basket</h2>
                </div>
                <div class="drawer-header-actions">
                    <button id="clear-cart-btn" class="clear-btn hidden"><i class="fa-solid fa-trash-can"></i> Clear</button>
                    <button id="close-cart-btn" class="close-icon-btn"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>

            <div class="drawer-body custom-scrollbar">
                <!-- ORDER ITEMS SECTION -->
                <div class="drawer-section">
                    <h3 class="drawer-section-title">ORDER ITEMS</h3>
                    <div id="cart-items-container" class="cart-items-list"></div>
                    <div id="empty-cart-msg" class="empty-cart-box">
                        <i class="fa-solid fa-basket-shopping empty-basket-icon"></i>
                        <p class="empty-cart-text">Your basket is currently empty.</p>
                    </div>
                </div>

                <hr class="drawer-divider">

                <!-- CHECKOUT & FULFILLMENT SECTION -->
                <form id="checkout-form" class="checkout-form">
                    <h3 class="drawer-section-title"><i class="fa-solid fa-truck-fast"></i> CHECKOUT & FULFILLMENT</h3>

                    <div class="form-group">
                        <label class="form-label">Order Type <span class="required">*</span></label>
                        <div class="order-type-selector">
                            <label id="lbl-pickup" class="type-option active">
                                <input type="radio" name="order-type" value="PICKUP" checked id="radio-pickup">
                                <i class="fa-solid fa-store"></i> Pick-up (Free)
                            </label>
                            <label id="lbl-delivery" class="type-option">
                                <input type="radio" name="order-type" value="DELIVERY" id="radio-delivery">
                                <i class="fa-solid fa-motorcycle"></i> Delivery (+₱49)
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Payment Method <span class="required">*</span></label>
                        <select id="payment-method-select" required>
                            <option id="payment-counter-option" value="Cash on Counter">Payment on the Counter (for Pick-up)</option>
                            <option id="payment-cod-option" value="Cash on Delivery">Cash on Delivery (for Delivery)</option>
                        </select>
                        <p id="payment-subtext" class="input-subtext">Pick-up orders are paid at the counter. Delivery orders are paid to the rider upon arrival.</p>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Full Name <span class="required">*</span></label>
                        <input type="text" id="cust-name" required placeholder="Juan Cruz">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Contact Number <span class="required">*</span></label>
                        <input type="tel" id="cust-phone" required placeholder="e.g. 09171234567">
                        <p class="input-subtext">Enter exactly 11 digits, starting with 09.</p>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Lucena Address / Barangay <span class="required">*</span></label>
                        <textarea id="cust-address" rows="2" required placeholder="e.g. Brgy. 4, Juarez St., Lucena City"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Schedule Option <span class="required">*</span></label>
                        <select id="cust-schedule" required>
                            <option value="Today (As soon as possible)">Order Today (As soon as possible)</option>
                            <option value="Tomorrow Early Morning (5:00 AM - 8:00 AM)">Tomorrow Early Morning (5:00 AM - 8:00 AM)</option>
                            <option value="Schedule Next-Day Afternoon">Schedule Next-Day Afternoon</option>
                        </select>
                    </div>

                    <div class="summary-box">
                        <div class="summary-row"><span>Subtotal:</span><span id="summary-subtotal" class="amount-bold">₱0.00</span></div>
                        <div class="summary-row"><span>Fee:</span><span id="summary-shipping" class="free-text">FREE</span></div>
                        <div class="summary-row total-row">
                            <span class="grand-total-label">Grand Total:</span>
                            <span id="summary-total" class="grand-total-amount">₱0.00</span>
                        </div>
                    </div>

                    <button type="submit" id="place-order-btn" disabled class="primary-btn place-order-submit-btn">
                        <i class="fa-solid fa-paper-plane"></i> PLACE PRE-ORDER NOW
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- SPINNER OVERLAY -->
    <div id="loading-overlay" class="modal-overlay hidden-modal">
        <div class="spinner-card">
            <div class="spinner-ring"></div>
            <p>Processing Order...</p>
        </div>
    </div>

    <!-- RECEIPT MODAL -->
    <div id="receipt-modal" class="modal-overlay hidden-modal">
        <div class="modal-card receipt-card">
            <button id="close-modal-btn" class="close-icon-btn dark"><i class="fa-solid fa-xmark"></i></button>
            <div id="printable-receipt" class="printable-receipt">
                <div class="receipt-header">
                    <img src="logo.svg" alt="Logo" class="receipt-logo">
                    <p class="branch-name">Palengke Branch (Lucena City)</p>
                    <p class="receipt-subtext">Juarez St. cor. Merchan St. | Official Pre-Order Slip</p>
                    <div class="queue-card">
                        <span class="label">System-Generated Order Number</span>
                        <span id="receipt-order-id" class="order-id">GEMINI-2026-000</span>
                        <div class="queue-inner">
                            <span class="label">Queue Number</span>
                            <span id="receipt-queue-no" class="queue-num">#001</span>
                        </div>
                    </div>
                </div>

                <div class="receipt-details">
                    <p><strong>Timestamp:</strong> <span id="receipt-timestamp">--</span></p>
                    <p><strong>Customer:</strong> <span id="receipt-cust-name">--</span></p>
                    <p><strong>Contact:</strong> <span id="receipt-cust-phone">--</span></p>
                    <p><strong>Type:</strong> <span id="receipt-cust-type">--</span></p>
                    <p><strong>Payment Method:</strong> <span id="receipt-pay-method">--</span></p>
                    <p><strong>Payment Status:</strong> <span id="receipt-pay-status">--</span></p>
                </div>

                <div class="receipt-items-wrapper">
                    <div class="items-header"><span>ITEM</span><span>TOTAL</span></div>
                    <div id="receipt-items-list" class="receipt-items-list"></div>
                </div>

                <div class="receipt-totals">
                    <div class="total-row-sm"><span>Subtotal:</span><span id="receipt-subtotal">₱0.00</span></div>
                    <div class="total-row-sm"><span>Fee:</span><span id="receipt-shipping">₱0.00</span></div>
                    <div class="total-row-lg"><span>GRAND TOTAL DUE:</span><span id="receipt-grand-total">₱0.00</span></div>
                </div>
            </div>

            <!-- SAVE AS PDF & DONE BUTTONS -->
            <div class="receipt-actions">
                <button id="download-receipt-btn" type="button" class="success-btn">
                    <i class="fa-solid fa-file-pdf"></i> Save Receipt (PDF / Photo)
                </button>
                <button id="finish-order-btn" type="button" class="red-btn">
                    <i class="fa-solid fa-circle-check"></i> Done & Track Order
                </button>
            </div>
        </div>
    </div>

    <!-- DOWNLOAD SUCCESS MODAL -->
    <div id="download-success-modal" class="modal-overlay hidden-modal z-top">
        <div class="modal-card mini-card">
            <div class="success-icon-circle">
                <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="modal-header-text">
                <h3 class="success-title">Receipt Saved!</h3>
                <p>Naka-ready na ang resibo! Pumili ng "Save as PDF" o i-screenshot para ma-save agad sa Photos/Gallery ng device mo.</p>
            </div>
            <button id="close-download-success-btn" type="button" class="success-btn full-btn">
                Awesome, Got It!
            </button>
        </div>
    </div>

    <!-- THANK YOU MODAL -->
    <div id="thankyou-modal" class="modal-overlay hidden-modal">
        <div class="modal-card mini-card">
            <i class="fa-solid fa-heart heart-icon"></i>
            <h3 class="red-title">Thank you for purchasing, Suki!</h3>
            <button id="thankyou-continue-btn" class="yellow-btn full-btn">Continue to Review</button>
        </div>
    </div>

    <footer class="app-footer">
        <p>Gemini Bakery Express • Palengke Branch, Lucena City</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>