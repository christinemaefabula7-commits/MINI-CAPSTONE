// ==========================================
// GEMINI BAKERY EXPRESS — MAIN APPLICATION SCRIPT
// ==========================================

const PRODUCTS = [
    // BREAD & BUNDLES (11 Items)
    { id: 1, name: "Pandesal (Bundle of 10)", category: "BUNDLES", price: 50.00, desc: "Classic warm, fluffy Lucena pandesal rolled in breadcrumbs.", img: "Images/1.jpg" },
    { id: 2, name: "Monay (Bundle of 5)", category: "BUNDLES", price: 25.00, desc: "Dense, slightly sweet traditional Filipino bread rolls.", img: "Images/2.jpg" },
    { id: 3, name: "Tasty/Sliced Bread (Loaf)", category: "BREADS", price: 65.00, desc: "Soft sliced white loaf bread baked fresh daily.", img: "Images/3.jpg" },
    { id: 4, name: "Spanish Bread", category: "BREADS", price: 7.00, desc: "Rolled sweet bread filled with buttery sugary filling.", img: "Images/4.jpg" },
    { id: 5, name: "Ensaymada", category: "BREADS", price: 8.00, desc: "Soft brioche topped with grated cheese and butter cream.", img: "Images/5.jpg" },
    { id: 6, name: "Pan de Coco", category: "BREADS", price: 7.00, desc: "Sweet bread bun filled with grated sweetened coconut.", img: "Images/6.jpg" },
    { id: 7, name: "Cheese Bread", category: "BREADS", price: 8.00, desc: "Bite-sized sweet rolls coated in creamy cheese bits.", img: "Images/7.jpg" },
    { id: 8, name: "Star Bread", category: "BREADS", price: 7.00, desc: "Star-shaped dense sweet bread with a light glaze crust.", img: "Images/8.jpg" },
    { id: 9, name: "Pinagong", category: "BREADS", price: 7.00, desc: "Famous turtle-shaped firm sweet bread standard.", img: "Images/9.jpg" },
    { id: 10, name: "Kababayan", category: "BREADS", price: 5.00, desc: "Gong-shaped moist Filipino muffin cake.", img: "Images/10.jpg" },
    { id: 11, name: "Kalihim (Pan de Regla)", category: "BREADS", price: 7.00, desc: "Soft bread filled with signature sweet red pudding.", img: "Images/11.jpg" },

    // PALAMAN SECTION (5 Items)
    { id: 12, name: "Yema Spread (Jar)", category: "PALAMAN SECTION", price: 120.00, desc: "Rich and creamy sweet custard egg-yolk spread.", img: "Images/12.jpg" },
    { id: 13, name: "Coco Jam (Jar)", category: "PALAMAN SECTION", price: 95.00, desc: "Authentic coconut milk and latik caramelized jam.", img: "Images/13.jpg" },
    { id: 14, name: "Peanut Butter (Jar)", category: "PALAMAN SECTION", price: 60.00, desc: "Homemade smooth and creamy roasted peanut spread.", img: "Images/14.jpg" },
    { id: 15, name: "Margarine Blend", category: "PALAMAN SECTION", price: 45.00, desc: "Rich butter-flavored margarine spread for warm breads.", img: "Images/15.jpg" },
    { id: 16, name: "Condensed Milk Dip", category: "PALAMAN SECTION", price: 45.00, desc: "Sweetened condensed dip for breadsticks and rolls.", img: "Images/16.jpg" },

    // KAKANIN SECTION (6 Items)
    { id: 17, name: "Special Bibingka", category: "KAKANIN SECTION", price: 25.00, desc: "Baked rice cake topped with salted egg and cheese.", img: "Images/16.jpg" },
    { id: 18, name: "Puto Lucena (Box)", category: "KAKANIN SECTION", price: 10.00, desc: "Fluffy steamed rice cakes topped with melting cheese.", img: "Images/17.jpg" },
    { id: 19, name: "Kutsinta w/ Coconut", category: "KAKANIN SECTION", price: 10.00, desc: "Chewy steamed rice cakes served with freshly grated coconut.", img: "Images/18.jpg" },
    { id: 20, name: "Sapin-Sapin Slice", category: "KAKANIN SECTION", price: 15.00, desc: "Layered sticky glutinous rice cake with jackfruit and ube.", img: "Images/19.jpg" },
    { id: 21, name: "Cassava Cake", category: "KAKANIN SECTION", price: 15.00, desc: "Grated cassava cake with caramelized custard topping.", img: "Images/20.jpg" },
    { id: 22, name: "Maja Blanca", category: "KAKANIN SECTION", price: 15.00, desc: "Creamy coconut milk pudding with sweet corn kernels.", img: "Images/21.jpg" },

    // CAKES & PASTRIES (15 Items)
    { id: 23, name: "Roll Cake (Chocolate)", category: "CAKES & PASTRIES", price: 20.00, desc: "Fluffy chocolate sponge cake roll filled with fudge.", img: "Images/22.jpg" },
    { id: 24, name: "Roll Cake (Mocha)", category: "CAKES & PASTRIES", price: 20.00, desc: "Mocha coffee infused sponge roll with buttercream.", img: "Images/23.jpg" },
    { id: 25, name: "Roll Cake (Ube)", category: "CAKES & PASTRIES", price: 20.00, desc: "Ube infused sponge roll with ube flavor.", img: "Images/24.jpg" },
    { id: 26, name: "Chiffon Cake Slice", category: "CAKES & PASTRIES", price: 20.00, desc: "Light, airy slice of vanilla sponge chiffon cake.", img: "Images/25.jpg" },
    { id: 27, name: "Egg Pie (Whole)", category: "CAKES & PASTRIES", price: 160.00, desc: "Rich, creamy egg custard pie in a flaky pastry crust.", img: "Images/26.jpg" },
    { id: 28, name: "Egg Pie (Slice)", category: "CAKES & PASTRIES", price: 25.00, desc: "Slice of rich egg custard pie with golden toasted top.", img: "Images/27.jpg" },
    { id: 29, name: "Brownies (Box)", category: "CAKES & PASTRIES", price: 10.00, desc: "Fudgy chocolate brownie squares topped with nuts.", img: "Images/28.jpg" },
    { id: 30, name: "Banana Bread Loaf", category: "CAKES & PASTRIES", price: 20.00, desc: "Moist banana bread made with sweet local bananas.", img: "Images/29.jpg" },
    { id: 31, name: "Chocolate Crinkles (Tub)", category: "CAKES & PASTRIES", price: 7.00, desc: "Soft chocolate fudge cookies rolled in powdered sugar.", img: "Images/30.jpg" },
    { id: 32, name: "Uraro Cookies (Pack)", category: "CAKES & PASTRIES", price: 80.00, desc: "Melt-in-your-mouth arrowroot starch cookies.", img: "Images/31.jpg" },
    { id: 33, name: "Classic Bread Pudding (Slice)", category: "CAKES & PASTRIES", price: 15.00, desc: "Traditional baked sweet bread pudding with brown sugar and vanilla.", img: "Images/32.jpg" },
    { id: 34, name: "Dark Chocolate Pudding", category: "CAKES & PASTRIES", price: 15.00, desc: "Rich and dense dark chocolate infused bread pudding slice.", img: "Images/33.jpg" },
    { id: 35, name: "Pineapple Pie Slice", category: "CAKES & PASTRIES", price: 25.00, desc: "Flaky pastry crust filled with sweet pineapple filling.", img: "Images/34.jpg" },
    { id: 36, name: "Taisan Cake Slice", category: "CAKES & PASTRIES", price: 20.00, desc: "Soft sponge cake brushed with melted butter and sprinkled with sugar.", img: "Images/35.jpg" },
    { id: 37, name: "Pianono Roll", category: "CAKES & PASTRIES", price: 15.00, desc: "Traditional mini jelly roll cake filled with butter and sugar.", img: "Images/36.jpg" }
];



// Shared demo catalogue: public and admin pages must use the SAME origin (e.g. localhost).
const SHARED_PRODUCTS_KEY = "geminiBakeryProductsV1";
function readSharedProducts() {
    try { return JSON.parse(localStorage.getItem(SHARED_PRODUCTS_KEY) || "null"); }
    catch (_) { return null; }
}
function applySharedProducts() {
    const shared = readSharedProducts();
    if (Array.isArray(shared) && shared.length) {
        const normalized = shared.map(product => {
            if (product.category === "BREAD & BUNDLES") {
                return { ...product, category: /\(Bundle of/i.test(product.name || "") ? "BUNDLES" : "BREADS" };
            }
            return product;
        });
        PRODUCTS.splice(0, PRODUCTS.length, ...normalized);
    }
}
window.addEventListener("storage", event => {
    if (event.key === SHARED_PRODUCTS_KEY) {
        applySharedProducts();
        renderProducts();
        renderCategoryFilters();
    } else if (event.key === SHARED_ORDERS_KEY) {
        syncCustomerOrders();
        if (typeof renderOrdersUI === "function") renderOrdersUI();
    }
});
// OPTIONAL CSV CATALOGUE: place "gemini products.csv" beside this file.
// The website still works with the built-in catalogue if the CSV is absent.
function parseCSVRows(text) {
    const rows = []; let row = []; let cell = ""; let quoted = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i], next = text[i + 1];
        if (ch === '"' && quoted && next === '"') { cell += '"'; i++; }
        else if (ch === '"') quoted = !quoted;
        else if (ch === ',' && !quoted) { row.push(cell.trim()); cell = ""; }
        else if ((ch === '\n' || ch === '\r') && !quoted) {
            if (ch === '\r' && next === '\n') i++;
            row.push(cell.trim()); if (row.some(v => v !== "")) rows.push(row);
            row = []; cell = "";
        } else cell += ch;
    }
    row.push(cell.trim()); if (row.some(v => v !== "")) rows.push(row);
    return rows;
}
function normalizeHeader(value) { return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
async function loadProductsFromCSV() {
    try {
        const response = await fetch("gemini%20products.csv", { cache: "no-store" });
        if (!response.ok) return;
        const rows = parseCSVRows(await response.text());
        if (rows.length < 2) return;
        const headers = rows[0].map(normalizeHeader);
        const findCol = (...names) => headers.findIndex(h => names.includes(h));
        const idCol = findCol("id", "productid", "cartoonid", "itemid");
        const nameCol = findCol("name", "productname", "itemname", "product");
        const categoryCol = findCol("category", "productcategory", "type");
        const priceCol = findCol("price", "unitprice", "sellingprice", "amount");
        const descCol = findCol("description", "desc", "details");
        const imageCol = findCol("image", "imagepath", "imagefile", "filename", "photo", "img", "picture");
        if (nameCol < 0 || priceCol < 0) {
            console.warn("CSV not loaded: expected product name and price columns. Using built-in catalogue.");
            return;
        }
        const imported = rows.slice(1).map((r, index) => {
            const id = idCol >= 0 && r[idCol] ? Number(r[idCol]) : index + 1;
            const rawImage = imageCol >= 0 ? (r[imageCol] || "") : "";
            const image = rawImage ? (rawImage.includes("/") ? rawImage : `Images/${rawImage}`) : `Images/${id}.jpg`;
            return {
                id: Number.isFinite(id) && id > 0 ? id : index + 1,
                name: r[nameCol] || `Product ${index + 1}`,
                category: categoryCol >= 0 ? (r[categoryCol] || "OTHERS").toUpperCase() : "OTHERS",
                price: Number(String(r[priceCol] || "0").replace(/[₱, ]/g, "")) || 0,
                desc: descCol >= 0 ? (r[descCol] || "Freshly prepared by Gemini Bakery.") : "Freshly prepared by Gemini Bakery.",
                img: image
            };
        }).filter(p => p.name && p.price >= 0);
        if (imported.length) {
            PRODUCTS.splice(0, PRODUCTS.length, ...imported);
            console.info(`Loaded ${imported.length} products from gemini products.csv`);
        }
    } catch (error) {
        console.info("CSV not loaded (or opened without a local server). Using built-in product catalogue.", error);
    }
}
function setLocalImageFallback(img) {
    const candidates = [];
    const src = img.getAttribute("src") || "";
    const stem = src.replace(/\.(jpg|jpeg|png|webp)$/i, "");
    ["jpg", "jpeg", "png", "webp"].forEach(ext => candidates.push(`${stem}.${ext}`));
    let index = 0;
    img.onerror = () => {
        index++;
        if (index < candidates.length) img.src = candidates[index];
        else { img.onerror = null; img.style.objectFit = "contain"; img.alt = "Product image unavailable"; }
    };
}

let cart = [];
let activeOrders = [];
let historyOrders = [];
let reviewableItems = [];
let currentCategory = "ALL";
let searchQuery = "";
let orderCounter = 0;
let serviceRating = 0;
let rememberMeEnabled = false;
let publishedServiceFeedback = [];

const REMEMBER_KEY = "geminiBakeryRememberMe";
const APP_STATE_KEY = "geminiBakeryDemoState";
const FEEDBACK_KEY = "geminiBakeryPublishedFeedback";
const SHARED_ORDERS_KEY = "geminiBakeryOrdersV1";
const SHARED_PAYMENTS_KEY = "geminiBakeryPaymentsV1";

function readSharedOrders() {
    try { return JSON.parse(localStorage.getItem(SHARED_ORDERS_KEY) || "[]"); }
    catch (_) { return []; }
}
function writeSharedOrders(rows) {
    localStorage.setItem(SHARED_ORDERS_KEY, JSON.stringify(rows));
}
function syncCustomerOrders() {
    const shared = readSharedOrders();
    activeOrders = shared.filter(o => o.customerKey === getCustomerKey() && !o.cancelledAt && !o.paidAt && !["Order Received","Received / Completed"].includes(o.status));
    historyOrders = shared.filter(o => o.customerKey === getCustomerKey() && (!!o.paidAt || o.status === "Cancelled" || ["Order Received","Received / Completed"].includes(o.status)));
}
function getCustomerKey() {
    let key = localStorage.getItem("geminiBakeryCustomerKey");
    if (!key) {
        key = "GUEST-" + Math.random().toString(36).slice(2, 10).toUpperCase();
        localStorage.setItem("geminiBakeryCustomerKey", key);
    }
    return key;
}
window.addEventListener("storage", event => {
    if (event.key === SHARED_ORDERS_KEY) {
        syncCustomerOrders();
        renderOrdersUI();
    }
});

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

window.addEventListener("DOMContentLoaded", async () => {
    loadRememberedState();
    await loadProductsFromCSV();
    applySharedProducts();
    syncCustomerOrders();
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
                    <img src="${product.img}" alt="${product.name}" loading="lazy" onerror="setLocalImageFallback(this)">
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

        const existingOrders = readSharedOrders();
        const maxQueue = existingOrders.reduce((max, o) => Math.max(max, parseInt(String(o.queueNo || "").replace("#", ""), 10) || 0), 0);
        // Generate from existing order records only. A stale demo counter must not force #043.
        orderCounter = maxQueue + 1;
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
            status: "Pending",
            customerKey: getCustomerKey(),
            createdAt: new Date().toISOString(),
            paidAt: null,
            cancelledAt: null
        };

        activeOrders.unshift(newOrder);
        const allOrders = readSharedOrders();
        allOrders.unshift(newOrder);
        writeSharedOrders(allOrders);
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
                        <span class="status-pill status-${String(o.status||"pending").toLowerCase().replace(/[^a-z]+/g,"-")}">Status: ${o.status}</span>
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
                        ${o.status === "Pending" ? `<button onclick="cancelCustomerOrder('${o.orderId}')" class="red-btn"><i class="fa-solid fa-ban"></i> Cancel Order</button>` : `<span class="input-subtext">Cancellation is unavailable after preparation starts.</span>`}
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
                        <span class="status-pill" style="background:${o.status === "Cancelled" ? "#fee2e2" : "#d1fae5"}; color:${o.status === "Cancelled" ? "#991b1b" : "#065f46"};">${o.status === "Cancelled" ? "Cancelled" : (o.status === "Order Received" ? "Order Received" : "Paid / Completed")}</span>
                    </div>
                    <div class="order-info-box" style="background:#f9fafb;">
                        <p><strong>Customer:</strong> ${o.name} | <strong>Date:</strong> ${o.timestamp}</p>
                        <p><strong>Total:</strong> ₱${Number(o.grandTotal || 0).toFixed(2)} (${o.paymentMethod})</p>
                        <p><strong>Items:</strong> ${o.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</p>
                    </div>
                </div>
            `).join("");
        }
    }
}

function cancelCustomerOrder(orderId) {
    const rows = readSharedOrders();
    const order = rows.find(o => String(o.orderId) === String(orderId));
    if (!order) {
        alert("We couldn't find this order. Please refresh and try again.");
        return;
    }
    if (order.status !== "Pending" || order.cancelledAt || order.paidAt) {
        alert("This order can no longer be cancelled because preparation has started or the order is already completed.");
        syncCustomerOrders();
        renderOrdersUI();
        return;
    }
    if (!window.confirm(`Cancel order ${order.queueNo}? This action cannot be undone.`)) return;

    // Re-read immediately before writing so the latest shared status is checked.
    const latestRows = readSharedOrders();
    const latest = latestRows.find(o => String(o.orderId) === String(orderId));
    if (!latest || latest.status !== "Pending" || latest.cancelledAt || latest.paidAt) {
        alert("Sorry, this order is no longer eligible for cancellation.");
        syncCustomerOrders();
        renderOrdersUI();
        return;
    }
    const now = new Date().toISOString();
    latest.status = "Cancelled";
    latest.cancelledAt = now;
    latest.updatedAt = now;
    latest.cancellationReason = "Cancelled by customer";
    writeSharedOrders(latestRows);

    // Keep a record in the shared activity log for the Admin Portal.
    try {
        const key = "geminiBakeryStaffActivityV1";
        const logs = JSON.parse(localStorage.getItem(key) || "[]");
        logs.unshift({
            id: "ACT-CANCEL-" + Date.now(),
            staff: "Customer",
            event: "CUSTOMER ORDER CANCELLATION",
            orderId: latest.orderId,
            detail: `${latest.queueNo} cancelled while Pending`,
            time: now
        });
        localStorage.setItem(key, JSON.stringify(logs));
    } catch (_) {}

    syncCustomerOrders();
    saveRememberedState();
    renderOrdersUI();
    alert(`Order ${latest.queueNo} has been cancelled successfully.`);
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
                <img src="${item.img}" onerror="setLocalImageFallback(this)" style="width:55px; height:55px; object-fit:cover; border-radius:0.6rem; border:1px solid #fde68a;" alt="${item.name}">
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