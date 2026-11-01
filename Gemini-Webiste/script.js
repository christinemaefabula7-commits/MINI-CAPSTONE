// ==========================================
// GEMINI BAKERY EXPRESS — MAIN APPLICATION SCRIPT
// ==========================================

const PRODUCTS = [
    // BREAD & BUNDLES (11 Items)
    { id: 1, name: "Pandesal (Bundle of 10)", category: "BREAD & BUNDLES", price: 50.00, desc: "Classic warm, fluffy Lucena pandesal rolled in breadcrumbs.", img: "https://i.pinimg.com/736x/b4/5d/c2/b45dc2cb0979047ec161c728a526b038.jpg" },
    { id: 2, name: "Monay (Bundle of 5)", category: "BREAD & BUNDLES", price: 25.00, desc: "Dense, slightly sweet traditional Filipino bread rolls.", img: "https://i.pinimg.com/1200x/46/28/a4/4628a4a9f90dd521b7f3cff1538e487a.jpg" },
    { id: 3, name: "Tasty/Sliced Bread (Loaf)", category: "BREAD & BUNDLES", price: 65.00, desc: "Soft sliced white loaf bread baked fresh daily.", img: "https://i.pinimg.com/736x/61/a3/41/61a341ddfcbdd8846d1d3271528b69fd.jpg" },
    { id: 4, name: "Spanish Bread", category: "BREAD & BUNDLES", price: 7.00, desc: "Rolled sweet bread filled with buttery sugary filling.", img: "https://i.pinimg.com/1200x/88/32/2d/88322df735d2aeddfb60334ceb4b28c0.jpg" },
    { id: 5, name: "Ensaymada", category: "BREAD & BUNDLES", price: 8.00, desc: "Soft brioche topped with grated cheese and butter cream.", img: "https://i.pinimg.com/1200x/80/0a/7b/800a7bba7612fff3f2c8938f3d4b6d15.jpg" },
    { id: 6, name: "Pan de Coco", category: "BREAD & BUNDLES", price: 7.00, desc: "Sweet bread bun filled with grated sweetened coconut.", img: "https://i.pinimg.com/1200x/4b/ff/32/4bff3237b0cfa3321a55eabbf619bccb.jpg" },
    { id: 7, name: "Cheese Bread", category: "BREAD & BUNDLES", price: 8.00, desc: "Bite-sized sweet rolls coated in creamy cheese bits.", img: "https://i.pinimg.com/736x/e8/c6/63/e8c663a2469d7d4f743d52be35ecc81d.jpg" },
    { id: 8, name: "Star Bread", category: "BREAD & BUNDLES", price: 7.00, desc: "Star-shaped dense sweet bread with a light glaze crust.", img: "https://i.pinimg.com/1200x/fe/61/a4/fe61a48b718ea6b13e9b004f09229823.jpg" },
    { id: 9, name: "Pinagong", category: "BREAD & BUNDLES", price: 7.00, desc: "Famous turtle-shaped firm sweet bread standard.", img: "https://i.pinimg.com/736x/6d/b2/f9/6db2f9cc811fbf231fe55c4f8571683e.jpg" },
    { id: 10, name: "Kababayan", category: "BREAD & BUNDLES", price: 5.00, desc: "Gong-shaped moist Filipino muffin cake.", img: "https://i.pinimg.com/1200x/e3/bf/26/e3bf261c5ebd82b815f92297cc20ee4a.jpg" },
    { id: 11, name: "Kalihim (Pan de Regla)", category: "BREAD & BUNDLES", price: 7.00, desc: "Soft bread filled with signature sweet red pudding.", img: "https://i.pinimg.com/736x/ad/25/e2/ad25e218bbb8156689fc99fd7d8737c5.jpg" },

    // PALAMAN SECTION (5 Items)
    { id: 12, name: "Yema Spread (Jar)", category: "PALAMAN SECTION", price: 120.00, desc: "Rich and creamy sweet custard egg-yolk spread.", img: "https://i.pinimg.com/736x/48/ed/81/48ed81dbd1d8c85a6d0aec4a65feaf79.jpg" },
    { id: 13, name: "Coco Jam (Jar)", category: "PALAMAN SECTION", price: 95.00, desc: "Authentic coconut milk and latik caramelized jam.", img: "https://i.pinimg.com/1200x/07/ae/f0/07aef021a89e3ba7d4df404781c472a4.jpg" },
    { id: 14, name: "Peanut Butter (Jar)", category: "PALAMAN SECTION", price: 60.00, desc: "Homemade smooth and creamy roasted peanut spread.", img: "https://i.pinimg.com/1200x/43/2e/23/432e23b8890a5c46f3d2a5d40870c64d.jpg" },
    { id: 15, name: "Margarine Blend", category: "PALAMAN SECTION", price: 45.00, desc: "Rich butter-flavored margarine spread for warm breads.", img: "https://i.pinimg.com/1200x/8c/f2/7e/8cf27e3d59b72bd3e783c14209de0bdf.jpg" },
    { id: 16, name: "Condensed Milk Dip", category: "PALAMAN SECTION", price: 45.00, desc: "Sweetened condensed dip for breadsticks and rolls.", img: "https://i.pinimg.com/1200x/49/76/30/4976309f19b4cf2dde3f8aca4ea116b1.jpg" },

    // KAKANIN SECTION (6 Items)
    { id: 16, name: "Special Bibingka", category: "KAKANIN SECTION", price: 25.00, desc: "Baked rice cake topped with salted egg and cheese.", img: "https://i.pinimg.com/1200x/51/57/ab/5157abe0608454ce42e817c75176faef.jpg" },
    { id: 17, name: "Puto Lucena (Box)", category: "KAKANIN SECTION", price: 10.00, desc: "Fluffy steamed rice cakes topped with melting cheese.", img: "https://i.pinimg.com/1200x/5b/e0/a7/5be0a7459c79507fb3d82e5d5743834a.jpg" },
    { id: 18, name: "Kutsinta w/ Coconut", category: "KAKANIN SECTION", price: 10.00, desc: "Chewy steamed rice cakes served with freshly grated coconut.", img: "https://i.pinimg.com/1200x/6f/54/25/6f5425e4faeeadf176806660ee12d838.jpg" },
    { id: 19, name: "Sapin-Sapin Slice", category: "KAKANIN SECTION", price: 15.00, desc: "Layered sticky glutinous rice cake with jackfruit and ube.", img: "https://i.pinimg.com/736x/17/48/f7/1748f7c57f46753aad467937c4fb9276.jpg" },
    { id: 20, name: "Cassava Cake", category: "KAKANIN SECTION", price: 15.00, desc: "Grated cassava cake with caramelized custard topping.", img: "https://i.pinimg.com/736x/ad/7e/e2/ad7ee24ee8e006a1a7678c7b1a6821e6.jpg" },
    { id: 21, name: "Maja Blanca", category: "KAKANIN SECTION", price: 15.00, desc: "Creamy coconut milk pudding with sweet corn kernels.", img: "https://i.pinimg.com/1200x/4f/3f/c5/4f3fc5bda7add465f82ab3d2fa98a02f.jpg" },

    // CAKES & PASTRIES (15 Items)
    { id: 22, name: "Roll Cake (Chocolate)", category: "CAKES & PASTRIES", price: 20.00, desc: "Fluffy chocolate sponge cake roll filled with fudge.", img: "https://i.pinimg.com/736x/b0/4c/d1/b04cd16f0b8ed4dd3829441136257918.jpg" },
    { id: 23, name: "Roll Cake (Mocha)", category: "CAKES & PASTRIES", price: 20.00, desc: "Mocha coffee infused sponge roll with buttercream.", img: "https://i.pinimg.com/1200x/2c/ef/36/2cef36843f7fc164ad3ea5d5cd710847.jpg" },
    { id: 24, name: "Roll Cake (Ube)", category: "CAKES & PASTRIES", price: 20.00, desc: "Ube infused sponge roll with ube flavor.", img: "https://i.pinimg.com/736x/06/5b/c1/065bc1f0513591154022c9200afcfd9d.jpg" },
    { id: 25, name: "Chiffon Cake Slice", category: "CAKES & PASTRIES", price: 20.00, desc: "Light, airy slice of vanilla sponge chiffon cake.", img: "https://i.pinimg.com/736x/3b/5c/af/3b5cafd677242f029ac2242edc6b4fd0.jpg" },
    { id: 26, name: "Egg Pie (Whole)", category: "CAKES & PASTRIES", price: 160.00, desc: "Rich, creamy egg custard pie in a flaky pastry crust.", img: "https://i.pinimg.com/1200x/38/fb/34/38fb340666d2d1803f80b8ba8d61c31f.jpg" },
    { id: 27, name: "Egg Pie (Slice)", category: "CAKES & PASTRIES", price: 25.00, desc: "Slice of rich egg custard pie with golden toasted top.", img: "https://i.pinimg.com/1200x/3d/7b/a1/3d7ba161d0553b76af188cbd82df51d4.jpg" },
    { id: 28, name: "Brownies (Box)", category: "CAKES & PASTRIES", price: 10.00, desc: "Fudgy chocolate brownie squares topped with nuts.", img: "https://i.pinimg.com/736x/27/83/69/278369350d38276479a291db7f62525a.jpg" },
    { id: 29, name: "Banana Bread Loaf", category: "CAKES & PASTRIES", price: 20.00, desc: "Moist banana bread made with sweet local bananas.", img: "https://i.pinimg.com/1200x/80/e4/43/80e4433103ee934029466974fb4ff9d8.jpg" },
    { id: 30, name: "Chocolate Crinkles (Tub)", category: "CAKES & PASTRIES", price: 7.00, desc: "Soft chocolate fudge cookies rolled in powdered sugar.", img: "https://i.pinimg.com/1200x/6f/8a/05/6f8a05c6be94f746d8929ba158d3c094.jpg" },
    { id: 31, name: "Uraro Cookies (Pack)", category: "CAKES & PASTRIES", price: 80.00, desc: "Melt-in-your-mouth arrowroot starch cookies.", img: "https://i.pinimg.com/736x/e4/35/2c/e4352ce0d63371c4cef7014cbf82c7ab.jpg" },
    { id: 32, name: "Classic Bread Pudding (Slice)", category: "CAKES & PASTRIES", price: 15.00, desc: "Traditional baked sweet bread pudding with brown sugar and vanilla.", img: "https://i.pinimg.com/1200x/23/07/5a/23075aeb84180ade5546f24550ce2f45.jpg" },
    { id: 33, name: "Dark Chocolate Pudding", category: "CAKES & PASTRIES", price: 15.00, desc: "Rich and dense dark chocolate infused bread pudding slice.", img: "https://images.squarespace-cdn.com/content/v1/65c3e29954a54703b46fe0ae/8294ee8c-f3f4-4d23-aae0-f6d425e79420/IMG_6297+2.jpg" },
    { id: 34, name: "Pineapple Pie Slice", category: "CAKES & PASTRIES", price: 25.00, desc: "Flaky pastry crust filled with sweet pineapple filling.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1GdPAosdZV7HQ9RA-FmURtZ0JwnrbwY6CL0-UY0tGLQ&s=10" },
    { id: 35, name: "Taisan Cake Slice", category: "CAKES & PASTRIES", price: 20.00, desc: "Soft sponge cake brushed with melted butter and sprinkled with sugar.", img: "https://i.pinimg.com/736x/69/6b/16/696b1691e992c817e933c75118501118.jpg" },
    { id: 36, name: "Pianono Roll", category: "CAKES & PASTRIES", price: 15.00, desc: "Traditional mini jelly roll cake filled with butter and sugar.", img: "https://i.pinimg.com/1200x/82/98/dd/8298dd758992826ebce04a8bd8b915ec.jpg" }
];

let cart = [];
let activeOrders = [];
let historyOrders = [];
let reviewableItems = [];
let currentCategory = "ALL";
let searchQuery = "";
let orderCounter = 42;
let serviceRating = 0;
let rememberMeEnabled = false;
let publishedServiceFeedback = [];

const REMEMBER_KEY = "geminiBakeryRememberMe";
const APP_STATE_KEY = "geminiBakeryDemoState";
const FEEDBACK_KEY = "geminiBakeryPublishedFeedback";

function loadRememberedState() {
    try {
        rememberMeEnabled = localStorage.getItem(REMEMBER_KEY) === "true";
        if (!rememberMeEnabled) return;
        const saved = JSON.parse(localStorage.getItem(APP_STATE_KEY) || "null");
        if (saved) {
            cart = saved.cart || [];
            activeOrders = saved.activeOrders || [];
            historyOrders = saved.historyOrders || [];
            reviewableItems = saved.reviewableItems || [];
            orderCounter = saved.orderCounter || orderCounter;
        }
        publishedServiceFeedback = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
    } catch (error) {
        console.warn("Could not load remembered demo data.", error);
    }
}

function saveRememberedState() {
    if (!rememberMeEnabled) return;
    try {
        localStorage.setItem(APP_STATE_KEY, JSON.stringify({ cart, activeOrders, historyOrders, reviewableItems, orderCounter }));
        localStorage.setItem(FEEDBACK_KEY, JSON.stringify(publishedServiceFeedback));
    } catch (error) {
        console.warn("Could not save remembered demo data.", error);
    }
}

function renderPublishedFeedback() {
    const container = document.getElementById("published-feedback-list");
    if (!container) return;
    if (!publishedServiceFeedback.length) {
        container.innerHTML = `<p class="info-callout">No published customer feedback is available yet.</p>`;
        return;
    }
    container.innerHTML = publishedServiceFeedback.slice().reverse().map(item => `
        <article class="published-feedback-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <p style="font-weight:900; font-size:0.85rem;">${escapeFeedbackText(item.name)}</p>
                <span class="published-feedback-stars">${"★".repeat(item.rating)}${"☆".repeat(5-item.rating)}</span>
            </div>
            <p style="font-size:0.8rem; color:#4b5563; margin-top:0.25rem;">${escapeFeedbackText(item.comment || "Rated the service.")}</p>
            <p style="font-size:0.7rem; color:#9ca3af; margin-top:0.35rem;">${escapeFeedbackText(item.date || "Recently submitted")}</p>
        </article>`).join("");
}

function escapeFeedbackText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[char]));
}

window.addEventListener("DOMContentLoaded", () => {
    loadRememberedState();
    initClockAndStatus();
    renderProducts();
    updateCartUI();

    const welcomeModal = document.getElementById("welcome-modal");
    const rememberCheckbox = document.getElementById("remember-me-checkbox");
    if (rememberCheckbox) {
        rememberCheckbox.checked = rememberMeEnabled;
    }

    const enterStoreBtn = document.getElementById("enter-store-btn");
    if (enterStoreBtn) {
        enterStoreBtn.addEventListener("click", () => {
            if (welcomeModal) welcomeModal.classList.remove("hidden-modal");
        });
    }

    const continueGuestBtn = document.getElementById("continue-as-guest-btn");
    const landingPortal = document.getElementById("landing-portal");
    if (continueGuestBtn) {
        continueGuestBtn.addEventListener("click", () => {
            rememberMeEnabled = rememberCheckbox ? rememberCheckbox.checked : false;
            localStorage.setItem(REMEMBER_KEY, rememberMeEnabled ? "true" : "false");
            if (!rememberMeEnabled) {
                localStorage.removeItem(APP_STATE_KEY);
                localStorage.removeItem(FEEDBACK_KEY);
                publishedServiceFeedback = [];
            } else {
                saveRememberedState();
            }
            if (welcomeModal) welcomeModal.classList.add("hidden-modal");
            if (landingPortal) landingPortal.classList.add("hidden-modal");
            updateCartUI();
            renderProducts();
            renderOrdersUI();
            renderReviewableProductsUI();
            renderPublishedFeedback();
        });
    }

    const navMenuBtn = document.getElementById("nav-menu-btn");
    const navOrdersBtn = document.getElementById("nav-orders-btn");
    const navReviewBtn = document.getElementById("nav-review-btn");

    if (navMenuBtn) navMenuBtn.addEventListener("click", () => switchView("MENU"));
    if (navOrdersBtn) navOrdersBtn.addEventListener("click", () => switchView("ORDERS"));
    if (navReviewBtn) navReviewBtn.addEventListener("click", () => switchView("REVIEW"));
    
    const brandHome = document.getElementById("nav-brand-home");
    if (brandHome) brandHome.addEventListener("click", () => switchView("MENU"));

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }

    const categoryFilters = document.getElementById("category-filters");
    if (categoryFilters) {
        categoryFilters.addEventListener("click", (e) => {
            const btn = e.target.closest(".cat-btn");
            if (!btn) return;
            document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    }

    const openCartBtn = document.getElementById("open-cart-btn");
    if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);

    const closeCartBtn = document.getElementById("close-cart-btn");
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);

    const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
    if (cartDrawerOverlay) {
        cartDrawerOverlay.addEventListener("click", (e) => {
            if (e.target === e.currentTarget) closeCartDrawer();
        });
    }

    const clearCartBtn = document.getElementById("clear-cart-btn");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            cart = [];
            updateCartUI();
            saveRememberedState();
        });
    }

    const radioPickup = document.getElementById("radio-pickup");
    if (radioPickup) radioPickup.addEventListener("change", handleOrderTypeChange);

    const radioDelivery = document.getElementById("radio-delivery");
    if (radioDelivery) radioDelivery.addEventListener("change", handleOrderTypeChange);

    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) checkoutForm.addEventListener("submit", handleCheckoutProcess);
    
    const closeModalBtn = document.getElementById("close-modal-btn");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            const receiptModal = document.getElementById("receipt-modal");
            if (receiptModal) receiptModal.classList.add("hidden-modal");
        });
    }

    const finishOrderBtn = document.getElementById("finish-order-btn");
    if (finishOrderBtn) {
        finishOrderBtn.addEventListener("click", () => {
            const receiptModal = document.getElementById("receipt-modal");
            if (receiptModal) receiptModal.classList.add("hidden-modal");
            switchView("ORDERS");
        });
    }

    const downloadBtn = document.getElementById("download-receipt-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            window.print();
            const successModal = document.getElementById("download-success-modal");
            if (successModal) successModal.classList.remove("hidden-modal");
        });
    }

    const closeSuccessBtn = document.getElementById("close-download-success-btn");
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", () => {
            const successModal = document.getElementById("download-success-modal");
            if (successModal) successModal.classList.add("hidden-modal");
        });
    }

    const phoneField = document.getElementById("cust-phone");
    if (phoneField) {
        phoneField.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 11);
        });
    }

    setupServiceRating();
    renderOrdersUI();
    renderPublishedFeedback();
});

function switchView(view) {
    const viewMenu = document.getElementById("view-menu");
    const viewOrders = document.getElementById("view-orders");
    const viewReview = document.getElementById("view-review");
    const navMenuBtn = document.getElementById("nav-menu-btn");
    const navOrdersBtn = document.getElementById("nav-orders-btn");
    const navReviewBtn = document.getElementById("nav-review-btn");

    if (viewMenu) viewMenu.classList.add("hidden");
    if (viewOrders) viewOrders.classList.add("hidden");
    if (viewReview) viewReview.classList.add("hidden");
    if (navMenuBtn) navMenuBtn.classList.remove("active");
    if (navOrdersBtn) navOrdersBtn.classList.remove("active");
    if (navReviewBtn) navReviewBtn.classList.remove("active");

    if (view === "MENU" && viewMenu && navMenuBtn) {
        viewMenu.classList.remove("hidden");
        navMenuBtn.classList.add("active");
    } else if (view === "ORDERS" && viewOrders && navOrdersBtn) {
        viewOrders.classList.remove("hidden");
        navOrdersBtn.classList.add("active");
        renderOrdersUI();
    } else if (view === "REVIEW" && viewReview && navReviewBtn) {
        viewReview.classList.remove("hidden");
        navReviewBtn.classList.add("active");
        renderReviewableProductsUI();
        renderPublishedFeedback();
    }
}

function initClockAndStatus() {
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const liveDateEl = document.getElementById("live-date");
        const liveTimeEl = document.getElementById("live-time");
        if (liveDateEl) liveDateEl.textContent = now.toLocaleDateString('en-US', options);
        if (liveTimeEl) liveTimeEl.textContent = now.toLocaleTimeString('en-US');

        const hour = now.getHours();
        const isOpen = hour >= 5 && hour < 20;

        const mainBadge = document.getElementById("store-status-badge");
        if (mainBadge) {
            if (isOpen) {
                mainBadge.className = "status-badge open";
                mainBadge.innerHTML = `<span class="status-dot"></span> OPEN NOW`;
            } else {
                mainBadge.className = "status-badge closed";
                mainBadge.innerHTML = `<span class="status-dot"></span> STORE CLOSED`;
            }
        }

        const branchTags = document.querySelectorAll(".branch-status-tag");
        branchTags.forEach(tag => {
            if (isOpen) {
                tag.className = "branch-status-tag open";
                tag.textContent = "OPEN";
            } else {
                tag.className = "branch-status-tag closed";
                tag.textContent = "CLOSED";
            }
        });
    }

    updateTime();
    setInterval(updateTime, 1000);
}

function renderProducts() {
    const grid = document.getElementById("product-grid");
    const noResults = document.getElementById("no-results");
    if (!grid) return;

    const filtered = PRODUCTS.filter(p => {
        const matchesCat = (currentCategory === "ALL" || p.category === currentCategory);
        const matchesSearch = p.name.toLowerCase().includes(searchQuery) || p.desc.toLowerCase().includes(searchQuery);
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = "";
        if (noResults) noResults.classList.remove("hidden");
        return;
    }

    if (noResults) noResults.classList.add("hidden");
    grid.innerHTML = filtered.map(product => {
        const inCart = cart.find(item => item.id === product.id);
        const cartQty = inCart ? inCart.qty : 0;
        return `
        <div class="product-card">
            <div>
                <div class="product-img-box">
                    <img src="${product.img}" alt="${product.name}" loading="lazy">
                    <span class="cat-tag">${product.category}</span>
                </div>
                <div class="product-body">
                    <div class="product-title-row">
                        <h3>${product.name}</h3>
                        <span class="price-tag">₱${product.price.toFixed(2)}</span>
                    </div>
                    <p class="product-desc">${product.desc}</p>
                </div>
            </div>
            <div class="product-footer">
                ${cartQty > 0 ? `
                    <div class="qty-control">
                        <button onclick="updateQty(${product.id}, -1)" class="qty-btn minus">-</button>
                        <span>${cartQty} in basket</span>
                        <button onclick="updateQty(${product.id}, 1)" class="qty-btn plus">+</button>
                    </div>
                ` : `
                    <button onclick="addToCart(${product.id})" class="primary-btn full-btn">
                        <i class="fa-solid fa-cart-plus"></i><span>Add to Basket</span>
                    </button>
                `}
            </div>
        </div>`;
    }).join("");
}

function addToCart(id) {
    const p = PRODUCTS.find(item => item.id === id);
    if (!p) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...p, qty: 1 });
    updateCartUI();
    renderProducts();
    saveRememberedState();
}

function updateQty(id, change) {
    const idx = cart.findIndex(item => item.id === id);
    if (idx !== -1) {
        cart[idx].qty += change;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
    }
    updateCartUI();
    renderProducts();
    saveRememberedState();
}

function handleOrderTypeChange() {
    const radioDelivery = document.getElementById("radio-delivery");
    const radioPickup = document.getElementById("radio-pickup");
    const lblDelivery = document.getElementById("lbl-delivery");
    const lblPickup = document.getElementById("lbl-pickup");

    const isDel = radioDelivery ? radioDelivery.checked : false;
    if (lblDelivery) lblDelivery.className = isDel ? "type-option active" : "type-option";
    if (lblPickup) lblPickup.className = !isDel ? "type-option active" : "type-option";
    
    const paymentSelect = document.getElementById("payment-method-select");
    const counterOption = document.getElementById("payment-counter-option");
    const codOption = document.getElementById("payment-cod-option");

    if (counterOption) counterOption.disabled = isDel;
    if (codOption) codOption.disabled = !isDel;
    if (paymentSelect) paymentSelect.value = isDel ? "Cash on Delivery" : "Cash on Counter";

    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartBadge = document.getElementById("cart-badge");
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.toggle("hidden", totalItems === 0);
    }

    const clearBtn = document.getElementById("clear-cart-btn");
    if (clearBtn) clearBtn.classList.toggle("hidden", totalItems === 0);

    const placeBtn = document.getElementById("place-order-btn");
    if (placeBtn) placeBtn.disabled = totalItems === 0;

    const emptyMsg = document.getElementById("empty-cart-msg");
    if (emptyMsg) emptyMsg.classList.toggle("hidden", totalItems > 0);

    const cartContainer = document.getElementById("cart-items-container");
    if (cartContainer) {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item-row" style="display:flex; align-items:center; justify-content:space-between; background:#fffbeb; padding:0.75rem; border-radius:0.85rem; border:1px solid #fde68a; margin-bottom:0.5rem;">
                <div class="cart-item-text">
                    <h4 style="font-size:0.95rem; font-weight:800; color:#3b0a0a;">${item.name}</h4>
                    <p style="font-size:0.85rem; color:#b91c1c; font-weight:700;">₱${item.price.toFixed(2)} each</p>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <button onclick="updateQty(${item.id}, -1)" class="qty-btn minus" style="width:28px; height:28px; font-size:0.85rem;">-</button>
                    <span style="font-weight:900; font-size:0.95rem; min-width:20px; text-align:center;">${item.qty}</span>
                    <button onclick="updateQty(${item.id}, 1)" class="qty-btn plus" style="width:28px; height:28px; font-size:0.85rem;">+</button>
                </div>
            </div>
        `).join("");
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const radioDel = document.getElementById("radio-delivery");
    const isDelivery = radioDel ? radioDel.checked : false;
    const shippingFee = isDelivery ? 49.00 : 0.00;
    const grandTotal = subtotal + shippingFee;

    const subEl = document.getElementById("summary-subtotal");
    const shipEl = document.getElementById("summary-shipping");
    const totEl = document.getElementById("summary-total");

    if (subEl) subEl.textContent = `₱${subtotal.toFixed(2)}`;
    if (shipEl) shipEl.textContent = isDelivery ? "₱49.00" : "FREE";
    if (totEl) totEl.textContent = `₱${grandTotal.toFixed(2)}`;
}

function openCartDrawer() {
    const overlay = document.getElementById("cart-drawer-overlay");
    const drawer = document.getElementById("cart-drawer");
    if (overlay) overlay.classList.remove("hidden-modal");
    if (drawer) drawer.style.transform = "translateX(0)";
}

function closeCartDrawer() {
    const overlay = document.getElementById("cart-drawer-overlay");
    const drawer = document.getElementById("cart-drawer");
    if (overlay) overlay.classList.add("hidden-modal");
    if (drawer) drawer.style.transform = "translateX(100%)";
}

function handleCheckoutProcess(e) {
    e.preventDefault();
    if (cart.length === 0) return;

    const nameInput = document.getElementById("cust-name");
    const phoneInput = document.getElementById("cust-phone");
    const addressInput = document.getElementById("cust-address");
    const scheduleInput = document.getElementById("cust-schedule");
    const radioDelivery = document.getElementById("radio-delivery");
    const paymentSelect = document.getElementById("payment-method-select");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";

    if (!/^09[0-9]{9}$/.test(phone)) {
        alert("Enter exactly 11 digits starting with 09.");
        if (phoneInput) phoneInput.focus();
        return;
    }

    const schedule = scheduleInput ? scheduleInput.value : "";
    const isDelivery = radioDelivery ? radioDelivery.checked : false;
    const paymentMethod = paymentSelect ? paymentSelect.value : "Cash on Counter";

    closeCartDrawer();
    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) loadingOverlay.classList.remove("hidden-modal");

    setTimeout(() => {
        if (loadingOverlay) loadingOverlay.classList.add("hidden-modal");

        orderCounter++;
        const queueNo = "#" + String(orderCounter).padStart(3, '0');
        const orderId = "GEMINI-" +
            new Date().getFullYear() + "-" +
            Date.now().toString().slice(-8) + "-" +
            Math.floor(100 + Math.random() * 900);
        const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const shippingFee = isDelivery ? 49.00 : 0.00;
        const grandTotal = subtotal + shippingFee;
        const timestamp = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

        let paymentStatus = paymentMethod === "Cash on Delivery" ? "Pay on Delivery" : "Pay at Counter";

        const newOrder = {
            orderId,
            queueNo,
            timestamp,
            name,
            phone,
            address,
            type: isDelivery ? "DELIVERY" : "PICKUP",
            schedule,
            items: [...cart],
            subtotal,
            shippingFee,
            grandTotal,
            paymentMethod,
            paymentStatus,
            status: isDelivery ? "Out for Delivery" : "Ready for Pickup"
        };

        activeOrders.unshift(newOrder);
        saveRememberedState();

        const setVal = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        setVal("receipt-queue-no", queueNo);
        setVal("receipt-order-id", orderId);
        setVal("receipt-timestamp", timestamp);
        setVal("receipt-cust-name", name);
        setVal("receipt-cust-phone", phone);
        setVal("receipt-cust-type", newOrder.type);
        setVal("receipt-pay-method", paymentMethod);
        setVal("receipt-pay-status", paymentStatus);
        setVal("receipt-subtotal", `₱${subtotal.toFixed(2)}`);
        setVal("receipt-shipping", `₱${shippingFee.toFixed(2)}`);
        setVal("receipt-grand-total", `₱${grandTotal.toFixed(2)}`);

        const receiptItemsList = document.getElementById("receipt-items-list");
        if (receiptItemsList) {
            receiptItemsList.innerHTML = cart.map(i => `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:700;">${i.name}</span>
                    <span>${i.qty} x ₱${i.price.toFixed(2)} = <strong>₱${(i.qty * i.price).toFixed(2)}</strong></span>
                </div>
            `).join("");
        }

        const receiptModal = document.getElementById("receipt-modal");
        if (receiptModal) receiptModal.classList.remove("hidden-modal");

        cart = [];
        const checkoutForm = document.getElementById("checkout-form");
        if (checkoutForm) checkoutForm.reset();
        const radioPickup = document.getElementById("radio-pickup");
        if (radioPickup) radioPickup.checked = true;
        handleOrderTypeChange();
        updateCartUI();
        renderProducts();
        renderOrdersUI();
    }, 1500);
}

function renderOrdersUI() {
    const activeList = document.getElementById("active-orders-list");
    const noActive = document.getElementById("no-active-orders");
    const historyList = document.getElementById("history-orders-list");
    const noHistory = document.getElementById("no-history-orders");

    const activeCountEl = document.getElementById("active-orders-count");
    if (activeCountEl) activeCountEl.textContent = `${activeOrders.length} Active Orders`;

    if (activeOrders.length === 0) {
        if (activeList) activeList.innerHTML = "";
        if (noActive) noActive.classList.remove("hidden");
    } else {
        if (noActive) noActive.classList.add("hidden");
        if (activeList) {
            activeList.innerHTML = activeOrders.map((o, idx) => `
                <div class="order-card">
                    <div class="order-card-header">
                        <div>
                            <span class="queue-pill">${o.queueNo}</span>
                            <span class="id-pill">${o.orderId}</span>
                            <p class="order-time">${o.timestamp} • Type: <strong>${o.type}</strong></p>
                        </div>
                        <span class="status-pill">Status: ${o.status}</span>
                    </div>

                    <div class="order-info-box">
                        <p><strong>Customer:</strong> ${o.name} (${o.phone})</p>
                        <p><strong>Address:</strong> ${o.address}</p>
                        <p><strong>Payment:</strong> ${o.paymentMethod} (<strong>${o.paymentStatus}</strong>)</p>
                    </div>

                    <div class="order-items-grid">
                        ${o.items.map(i => `
                            <div class="order-item-chip">
                                <span>${i.name} (x${i.qty})</span>
                                <strong>₱${(i.price * i.qty).toFixed(2)}</strong>
                            </div>
                        `).join("")}
                    </div>

                    <div class="order-card-footer">
                        <span class="total-amount">Total: ₱${o.grandTotal.toFixed(2)}</span>
                        <button onclick="markOrderReceived(${idx})" class="success-btn">
                            <i class="fa-solid fa-circle-check"></i> Order Received
                        </button>
                    </div>
                </div>
            `).join("");
        }
    }

    if (historyOrders.length === 0) {
        if (historyList) historyList.innerHTML = "";
        if (noHistory) noHistory.classList.remove("hidden");
    } else {
        if (noHistory) noHistory.classList.add("hidden");
        if (historyList) {
            historyList.innerHTML = historyOrders.map(o => `
                <div class="order-card" style="border-color:#e5e7eb;">
                    <div class="order-card-header" style="border:none; padding:0;">
                        <span class="queue-pill" style="font-size:0.95rem;">${o.queueNo} (${o.orderId})</span>
                        <span class="status-pill" style="background:#d1fae5; color:#065f46;">Completed</span>
                    </div>
                    <div class="order-info-box" style="background:#f9fafb;">
                        <p><strong>Customer:</strong> ${o.name} | <strong>Date:</strong> ${o.timestamp}</p>
                        <p><strong>Total Paid:</strong> ₱${o.grandTotal.toFixed(2)} (${o.paymentMethod})</p>
                        <p><strong>Items:</strong> ${o.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</p>
                    </div>
                </div>
            `).join("");
        }
    }
}

function markOrderReceived(idx) {
    const order = activeOrders[idx];
    if (!order) return;

    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) loadingOverlay.classList.remove("hidden-modal");

    setTimeout(() => {
        if (loadingOverlay) loadingOverlay.classList.add("hidden-modal");

        order.status = "Received / Completed";
        order.paymentStatus = "Paid / Settled";
        historyOrders.unshift(order);
        activeOrders.splice(idx, 1);

        order.items.forEach(item => {
            reviewableItems.push({
                ...item,
                orderId: order.orderId,
                reviewed: false,
                rating: 0,
                comment: ""
            });
        });

        renderOrdersUI();
        saveRememberedState();

        const thankyouModal = document.getElementById("thankyou-modal");
        if (thankyouModal) thankyouModal.classList.remove("hidden-modal");

        const continueBtn = document.getElementById("thankyou-continue-btn");
        if (continueBtn) {
            continueBtn.onclick = () => {
                if (thankyouModal) thankyouModal.classList.add("hidden-modal");
                switchView("REVIEW");
            };
        }
    }, 1000);
}

function setupServiceRating() {
    const stars = document.querySelectorAll("#service-star-container i");
    const ratingText = document.getElementById("service-rating-text");
    
    stars.forEach(star => {
        star.addEventListener("click", () => {
            serviceRating = parseInt(star.dataset.rating);
            stars.forEach(s => {
                s.classList.toggle("active", parseInt(s.dataset.rating) <= serviceRating);
            });
            const labels = ["", "1 Star - Poor", "2 Stars - Fair", "3 Stars - Good", "4 Stars - Very Good!", "5 Stars - Excellent! 🔥"];
            if (ratingText) ratingText.textContent = labels[serviceRating];
        });
    });

    const form = document.getElementById("service-feedback-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (serviceRating === 0) {
                alert("Mangyaring pumili muna ng Service Star Rating (1 to 5 stars).");
                return;
            }
            const authorInput = document.getElementById("service-author");
            const commentInput = document.getElementById("service-comment");
            const feedbackName = authorInput ? authorInput.value.trim() : "";
            const feedbackComment = commentInput ? commentInput.value.trim() : "";

            publishedServiceFeedback.push({
                name: feedbackName,
                rating: serviceRating,
                comment: feedbackComment,
                date: new Date().toLocaleDateString()
            });
            saveRememberedState();
            renderPublishedFeedback();
            alert("Salamat po! Na-submit na ang inyong Service Feedback sa Gemini Bakery.");
            form.reset();
            serviceRating = 0;
            stars.forEach(s => s.classList.remove("active"));
            if (ratingText) ratingText.textContent = "Pumili ng 1-5 stars";
        });
    }
}

function renderReviewableProductsUI() {
    const container = document.getElementById("product-review-cards-container");
    const noReviewMsg = document.getElementById("no-reviewable-products");
    if (!container) return;

    if (reviewableItems.length === 0) {
        container.innerHTML = "";
        if (noReviewMsg) noReviewMsg.classList.remove("hidden");
        return;
    }

    if (noReviewMsg) noReviewMsg.classList.add("hidden");
    container.innerHTML = reviewableItems.map((item, idx) => `
        <div class="review-card" style="background:#fffbeb;">
            <div style="display:flex; align-items:center; gap:0.75rem;">
                <img src="${item.img}" style="width:55px; height:55px; object-fit:cover; border-radius:0.6rem; border:1px solid #fde68a;" alt="${item.name}">
                <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4 style="font-weight:800; font-size:0.9rem;">${item.name}</h4>
                        <span style="font-size:0.7rem; background:#d1fae5; color:#065f46; font-weight:700; padding:0.15rem 0.4rem; border-radius:0.25rem;">Qty: ${item.qty}</span>
                    </div>
                    <p style="font-size:0.75rem; color:#6b7280;">Order ID: ${item.orderId}</p>
                </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.5rem; padding-top:0.5rem; border-top:1px solid #fde68a;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.8rem; font-weight:700;">Product Rating:</span>
                    <div class="star-rating product-stars-${idx}" data-index="${idx}">
                        <i class="fa-solid fa-star" data-val="1"></i>
                        <i class="fa-solid fa-star" data-val="2"></i>
                        <i class="fa-solid fa-star" data-val="3"></i>
                        <i class="fa-solid fa-star" data-val="4"></i>
                        <i class="fa-solid fa-star" data-val="5"></i>
                    </div>
                </div>

                <textarea id="prod-comment-${idx}" rows="2" placeholder="Masarap at bagong hurno ang tinapay na ito!" ${item.reviewed ? 'disabled' : ''}>${item.comment}</textarea>

                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.75rem; font-weight:700; color:${item.reviewed ? '#047857' : '#92400e'}">
                        Status: ${item.reviewed ? 'Reviewed ✓' : 'Not Reviewed'}
                    </span>
                    <button onclick="submitProductReview(${idx})" class="red-btn" ${item.reviewed ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
                        ${item.reviewed ? 'Review Submitted' : 'Submit Product Review'}
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    reviewableItems.forEach((item, idx) => {
        const starContainer = document.querySelector(`.product-stars-${idx}`);
        if (!starContainer || item.reviewed) return;
        starContainer.querySelectorAll("i").forEach(star => {
            star.addEventListener("click", () => {
                const val = parseInt(star.dataset.val);
                reviewableItems[idx].rating = val;
                starContainer.querySelectorAll("i").forEach(s => {
                    s.classList.toggle("active", parseInt(s.dataset.val) <= val);
                });
            });
        });
        if (item.rating > 0) {
            starContainer.querySelectorAll("i").forEach(s => {
                s.classList.toggle("active", parseInt(s.dataset.val) <= item.rating);
            });
        }
    });
}

function submitProductReview(idx) {
    const item = reviewableItems[idx];
    if (item.rating === 0) {
        alert("Mangyaring pumili muna ng Star Rating (1 to 5) para sa produktong ito.");
        return;
    }
    const commentInput = document.getElementById(`prod-comment-${idx}`);
    if (commentInput) item.comment = commentInput.value.trim();
    item.reviewed = true;

    alert(`Salamat! Ang review mo para sa "${item.name}" ay matagumpay nang na-submit.`);
    renderReviewableProductsUI();
}