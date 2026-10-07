const PRODUCTS = [
    {
        id: 1,
        title: "Terracotta Heritage Pot",
        artisan: "Meera Pottery Studio",
        category: "Pottery",
        price: 1290,
        stock: 12,
        location: "Coimbatore, Tamil Nadu",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
        description:
            "A handcrafted terracotta pot shaped and finished by traditional artisans. Its earthy texture and natural finish make it ideal for modern homes."
    },
    {
        id: 2,
        title: "Handwoven Natural Basket",
        artisan: "Nila Weaves",
        category: "Home Decor",
        price: 1850,
        stock: 8,
        location: "Madurai, Tamil Nadu",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1595521624992-48a59a503d1a?auto=format&fit=crop&w=900&q=85",
        description:
            "A beautifully handwoven basket made using natural fibres. Perfect for storage, gifting and adding a warm handcrafted touch to interiors."
    },
    {
        id: 3,
        title: "Artisan Soy Candle",
        artisan: "Earth & Flame",
        category: "Home Decor",
        price: 790,
        stock: 18,
        location: "Bengaluru, Karnataka",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
        description:
            "A hand-poured soy candle created in small batches using carefully selected fragrances and a minimal reusable container."
    },
    {
        id: 4,
        title: "Handcrafted Silver Earrings",
        artisan: "Aaranya Jewellery",
        category: "Jewelry",
        price: 2450,
        stock: 6,
        location: "Jaipur, Rajasthan",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85",
        description:
            "Elegant handcrafted earrings inspired by traditional Indian jewellery patterns and finished with a contemporary aesthetic."
    },
    {
        id: 5,
        title: "Handloom Cotton Textile",
        artisan: "Kaveri Looms",
        category: "Textiles",
        price: 2190,
        stock: 10,
        location: "Erode, Tamil Nadu",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=85",
        description:
            "A soft handloom textile crafted using traditional weaving techniques. Designed for people who appreciate authentic handmade fabrics."
    },
    {
        id: 6,
        title: "Minimal Clay Vase",
        artisan: "Clay Stories",
        category: "Pottery",
        price: 1490,
        stock: 14,
        location: "Pondicherry, Tamil Nadu",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85",
        description:
            "A minimalist clay vase with a naturally textured surface, individually shaped and finished by hand."
    },
    {
        id: 7,
        title: "Handmade Macrame Wall Art",
        artisan: "Knot & Craft",
        category: "Home Decor",
        price: 1690,
        stock: 9,
        location: "Chennai, Tamil Nadu",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=900&q=85",
        description:
            "Decorative macrame wall art created by hand using cotton cords. A simple statement piece for bedrooms and living spaces."
    },
    {
        id: 8,
        title: "Traditional Beaded Necklace",
        artisan: "Mitti & Beads",
        category: "Jewelry",
        price: 1790,
        stock: 7,
        location: "Kutch, Gujarat",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
        description:
            "A colourful handcrafted necklace combining traditional beadwork with a contemporary design for everyday styling."
    }
];

function getUserProducts() {
    try {
        return JSON.parse(localStorage.getItem("craftedListings")) || [];
    } catch (error) {
        return [];
    }
}

function getAllProducts() {
    return [...PRODUCTS, ...getUserProducts()];
}

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("craftedCart")) || [];
    } catch (error) {
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem("craftedCart", JSON.stringify(cart));
    updateCartCount();
}

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem("craftedWishlist")) || [];
    } catch (error) {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem("craftedWishlist", JSON.stringify(wishlist));
}

function showToast(message, type = "success") {
    let toast = document.querySelector(".crafted-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "crafted-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "crafted-toast show " + type;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });
}

function addToCart(productId, quantity = 1) {
    const product = getAllProducts().find(
        item => String(item.id) === String(productId)
    );

    if (!product) {
        showToast("Product could not be found.", "error");
        return;
    }

    const cart = getCart();

    const existingItem = cart.find(
        item => String(item.id) === String(productId)
    );

    if (existingItem) {
        existingItem.quantity += Number(quantity);
    } else {
        cart.push({
            id: product.id,
            quantity: Number(quantity)
        });
    }

    saveCart(cart);

    showToast(`${product.title} added to your cart.`);
}

function removeFromCart(productId) {
    let cart = getCart();

    cart = cart.filter(
        item => String(item.id) !== String(productId)
    );

    saveCart(cart);

    renderCart();

    showToast("Product removed from cart.");
}

function changeCartQuantity(productId, change) {
    const cart = getCart();

    const item = cart.find(
        cartItem => String(cartItem.id) === String(productId)
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);
    renderCart();
}

function calculateCartTotal() {
    const cart = getCart();
    const products = getAllProducts();

    return cart.reduce((total, cartItem) => {
        const product = products.find(
            item => String(item.id) === String(cartItem.id)
        );

        if (!product) return total;

        return total + product.price * cartItem.quantity;
    }, 0);
}

function createProductCard(product) {
    const wishlist = getWishlist();

    const isWishlisted = wishlist.some(
        id => String(id) === String(product.id)
    );

    return `
        <article class="product-card">

            <div class="product-image-wrapper">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    class="product-image"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/900x700/F1EEE7/23463B?text=Crafted+Product';"
                >

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist('${product.id}')"
                    aria-label="Add to wishlist"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

                <span class="product-category">
                    ${product.category}
                </span>

            </div>

            <div class="product-info">

                <div class="product-rating">
                    ★ ${product.rating}
                </div>

                <h3>${product.title}</h3>

                <p class="artisan-name">
                    By ${product.artisan}
                </p>

                <div class="product-bottom">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart('${product.id}')"
                    >
                        Add to Cart
                    </button>

                </div>

                <a
                    href="product.html?id=${encodeURIComponent(product.id)}"
                    class="product-link"
                >
                    View Details →
                </a>

            </div>

        </article>
    `;
}

function renderShop(products = getAllProducts()) {

    const container =
        document.querySelector("#productGrid") ||
        document.querySelector(".product-grid");

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-products">
                <h3>No products found</h3>
                <p>Try changing your search or filter.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products
        .map(product => createProductCard(product))
        .join("");
}

function applyShopFilters() {

    const searchInput =
        document.querySelector("#shopSearch") ||
        document.querySelector("#searchInput");

    const categorySelect =
        document.querySelector("#categoryFilter");

    const priceSelect =
        document.querySelector("#priceFilter");

    const sortSelect =
        document.querySelector("#sortFilter");

    const searchTerm =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    const category =
        categorySelect
            ? categorySelect.value
            : "all";

    const price =
        priceSelect
            ? priceSelect.value
            : "all";

    const sort =
        sortSelect
            ? sortSelect.value
            : "default";

    let products = [...getAllProducts()];

    /* Search */

    if (searchTerm) {
        products = products.filter(product => {

            return (
                product.title.toLowerCase().includes(searchTerm) ||
                product.artisan.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.location.toLowerCase().includes(searchTerm)
            );

        });
    }

    if (category && category !== "all") {

        products = products.filter(
            product =>
                product.category.toLowerCase() ===
                category.toLowerCase()
        );

    }

    if (price === "under1000") {

        products = products.filter(
            product => product.price < 1000
        );

    } else if (price === "1000-2500") {

        products = products.filter(
            product =>
                product.price >= 1000 &&
                product.price <= 2500
        );

    } else if (price === "above2500") {

        products = products.filter(
            product => product.price > 2500
        );

    }

    if (sort === "price-low") {

        products.sort(
            (a, b) => a.price - b.price
        );

    } else if (sort === "price-high") {

        products.sort(
            (a, b) => b.price - a.price
        );

    } else if (sort === "rating") {

        products.sort(
            (a, b) => b.rating - a.rating
        );

    } else if (sort === "name") {

        products.sort(
            (a, b) => a.title.localeCompare(b.title)
        );

    }

    renderShop(products);

    const resultCount =
        document.querySelector("#resultCount");

    if (resultCount) {
        resultCount.textContent =
            `${products.length} ${products.length === 1 ? "product" : "products"}`;
    }
}

function toggleWishlist(productId) {

    let wishlist = getWishlist();

    const index = wishlist.findIndex(
        id => String(id) === String(productId)
    );

    const product = getAllProducts().find(
        item => String(item.id) === String(productId)
    );

    if (!product) return;

    if (index >= 0) {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist.");

    } else {

        wishlist.push(productId);

        showToast("Added to wishlist.");

    }

    saveWishlist(wishlist);

    renderShop();

    if (typeof renderProduct === "function") {
        renderProduct();
    }
}

function renderProduct() {

    const productContainer =
        document.querySelector("#productDetails") ||
        document.querySelector(".product-details");

    if (!productContainer) return;

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        params.get("id") || "1";

    const product =
        getAllProducts().find(
            item => String(item.id) === String(productId)
        );

    if (!product) {

        productContainer.innerHTML = `
            <div class="empty-products">
                <h2>Product not found</h2>
                <p>The product you're looking for is unavailable.</p>
                <a href="shop.html" class="btn btn-primary">
                    Return to Shop
                </a>
            </div>
        `;

        return;
    }

    const wishlist = getWishlist();

    const isWishlisted =
        wishlist.some(
            id => String(id) === String(product.id)
        );

    productContainer.innerHTML = `

        <div class="product-detail-image">

            <img
                src="${product.image}"
                alt="${product.title}"
                onerror="this.onerror=null;this.src='https://placehold.co/1000x900/F1EEE7/23463B?text=Crafted+Product';"
            >

        </div>


        <div class="product-detail-content">

            <span class="detail-category">
                ${product.category}
            </span>

            <div class="detail-rating">
                ★ ${product.rating} · Loved by Crafted customers
            </div>

            <h1>${product.title}</h1>

            <p class="detail-artisan">
                Crafted by <strong>${product.artisan}</strong>
            </p>

            <p class="detail-location">
                ${product.location}
            </p>

            <div class="detail-price">
                ${formatPrice(product.price)}
            </div>

            <p class="detail-description">
                ${product.description}
            </p>

            <div class="detail-stock">
                ${product.stock > 0
                    ? `${product.stock} pieces available`
                    : "Currently unavailable"}
            </div>

            <div class="quantity-wrapper">

                <label for="productQuantity">
                    Quantity
                </label>

                <div class="quantity-control">

                    <button
                        type="button"
                        onclick="changeProductQuantity(-1)"
                    >
                        −
                    </button>

                    <input
                        id="productQuantity"
                        type="number"
                        min="1"
                        max="${product.stock}"
                        value="1"
                    >

                    <button
                        type="button"
                        onclick="changeProductQuantity(1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="product-actions">

                <button
                    class="btn btn-primary"
                    onclick="addProductToCart('${product.id}')"
                >
                    Add to Cart
                </button>

                <button
                    class="btn btn-outline wishlist-detail-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist('${product.id}')"
                >
                    ${isWishlisted ? "♥ Saved" : "♡ Save"}
                </button>

            </div>

            <div class="direct-artisan-note">

                <strong>Direct from the artisan</strong>

                <p>
                    Your purchase supports the maker directly.
                    Crafted is designed to connect independent
                    artisans with customers without unnecessary
                    middlemen.
                </p>

            </div>

        </div>
    `;
}

function changeProductQuantity(change) {

    const input =
        document.querySelector("#productQuantity");

    if (!input) return;

    let value =
        parseInt(input.value, 10) || 1;

    const max =
        parseInt(input.max, 10) || 99;

    value += change;

    if (value < 1) value = 1;
    if (value > max) value = max;

    input.value = value;
}

function addProductToCart(productId) {

    const input =
        document.querySelector("#productQuantity");

    const quantity =
        input
            ? parseInt(input.value, 10) || 1
            : 1;

    addToCart(productId, quantity);
}

function renderCart() {

    const container =
        document.querySelector("#cartItems") ||
        document.querySelector(".cart-items");

    if (!container) return;

    const cart = getCart();

    const products = getAllProducts();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛍
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Discover handcrafted pieces made by
                    independent artisans.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Explore Crafts
                </a>

            </div>
        `;

        updateCartSummary(0);

        return;
    }

    container.innerHTML = cart
        .map(cartItem => {

            const product =
                products.find(
                    item =>
                        String(item.id) ===
                        String(cartItem.id)
                );

            if (!product) return "";

            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${product.image}"
                            alt="${product.title}"
                            onerror="this.onerror=null;this.src='https://placehold.co/400x400/F1EEE7/23463B?text=Crafted';"
                        >

                    </div>

                    <div class="cart-item-details">

                        <span class="cart-category">
                            ${product.category}
                        </span>

                        <h3>
                            ${product.title}
                        </h3>

                        <p>
                            By ${product.artisan}
                        </p>

                        <strong>
                            ${formatPrice(product.price)}
                        </strong>

                    </div>

                    <div class="cart-quantity">

                        <button
                            onclick="changeCartQuantity('${product.id}', -1)"
                        >
                            −
                        </button>

                        <span>
                            ${cartItem.quantity}
                        </span>

                        <button
                            onclick="changeCartQuantity('${product.id}', 1)"
                        >
                            +
                        </button>

                    </div>


                    <div class="cart-item-total">

                        <strong>
                            ${formatPrice(
                                product.price *
                                cartItem.quantity
                            )}
                        </strong>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart('${product.id}')"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;

        })
        .join("");


    updateCartSummary(calculateCartTotal());
}

function updateCartSummary(subtotal) {

    const subtotalElement =
        document.querySelector("#cartSubtotal");

    const totalElement =
        document.querySelector("#cartTotal");

    const summaryElement =
        document.querySelector("#cartSummary");

    if (subtotalElement) {
        subtotalElement.textContent =
            formatPrice(subtotal);
    }

    if (totalElement) {
        totalElement.textContent =
            formatPrice(subtotal);
    }

    if (summaryElement) {
        summaryElement.style.display =
            subtotal > 0 ? "block" : "none";
    }
}

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {

        showToast(
            "Your cart is empty.",
            "error"
        );

        return;
    }

    const user =
        localStorage.getItem("craftedUser");

    if (!user) {

        showToast(
            "Please sign in before continuing.",
            "error"
        );

        setTimeout(() => {
            window.location.href =
                "login.html?redirect=cart";
        }, 900);

        return;
    }

    showToast(
        "Checkout is available in Stage 2."
    );
}

function setupSellForm() {

    const form =
        document.querySelector("#sellForm");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const title =
            document.querySelector("#productTitle")?.value.trim();

        const category =
            document.querySelector("#productCategory")?.value;

        const price =
            document.querySelector("#productPrice")?.value;

        const stock =
            document.querySelector("#productStock")?.value;

        const location =
            document.querySelector("#artisanLocation")?.value.trim();

        const artisan =
            document.querySelector("#artisanName")?.value.trim();

        const description =
            document.querySelector("#productDescription")?.value.trim();

        const image =
            document.querySelector("#productImage")?.value.trim();


        if (
            !title ||
            !category ||
            !price ||
            !stock ||
            !location ||
            !artisan ||
            !description
        ) {

            showToast(
                "Please complete all required fields.",
                "error"
            );

            return;
        }

        const newProduct = {

            id:
                "artisan-" +
                Date.now(),

            title: title,

            artisan: artisan,

            category: category,

            price: Number(price),

            stock: Number(stock),

            location: location,

            rating: 5.0,

            image:
                image ||
                "https://placehold.co/900x700/F1EEE7/23463B?text=Your+Craft",

            description: description
        };


        const listings =
            getUserProducts();

        listings.push(newProduct);

        localStorage.setItem(
            "craftedListings",
            JSON.stringify(listings)
        );


        form.reset();

        showToast(
            "Your craft has been listed successfully!"
        );

    });
}

function setupLoginForm() {

    const form =
        document.querySelector("#loginForm");

    if (!form) return;

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const nameInput =
            document.querySelector("#userName");

        const emailInput =
            document.querySelector("#userEmail");

        const passwordInput =
            document.querySelector("#userPassword");

        const name =
            nameInput
                ? nameInput.value.trim()
                : "Crafted User";

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";

        const password =
            passwordInput
                ? passwordInput.value.trim()
                : "";


        if (!email || !password) {

            showToast(
                "Please enter your email and password.",
                "error"
            );

            return;
        }


        const user = {

            name:
                name ||
                email.split("@")[0],

            email: email

        };

        localStorage.setItem(
            "craftedUser",
            JSON.stringify(user)
        );


        showToast(
            "Welcome to Crafted!"
        );


        const params =
            new URLSearchParams(
                window.location.search
            );

        const redirect =
            params.get("redirect");


        setTimeout(() => {

            if (redirect === "cart") {

                window.location.href =
                    "cart.html";

            } else {

                window.location.href =
                    "index.html";

            }

        }, 900);

    });
}


function updateLoginState() {

    let user = null;

    try {

        user =
            JSON.parse(
                localStorage.getItem("craftedUser")
            );

    } catch (error) {

        user = null;

    }


    const userElements =
        document.querySelectorAll(".user-name");


    userElements.forEach(element => {

        if (user) {

            element.textContent =
                user.name;

        }

    });


    const logoutButtons =
        document.querySelectorAll(".logout-btn");


    logoutButtons.forEach(button => {

        button.style.display =
            user ? "inline-flex" : "none";

    });
}


function logout() {

    localStorage.removeItem(
        "craftedUser"
    );

    showToast(
        "You have been signed out."
    );

    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 700);
}

function setupMobileNavigation() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".nav-links");

    if (!menuButton || !navigation) return;

    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "active"
            );

            menuButton.classList.toggle(
                "active"
            );

        }
    );

    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                }
            );

        });
}

function setupNewsletter() {

    const form =
        document.querySelector("#newsletterForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const input =
                form.querySelector(
                    "input[type='email']"
                );

            if (!input || !input.value.trim()) {

                showToast(
                    "Please enter your email.",
                    "error"
                );

                return;
            }

            input.value = "";

            showToast(
                "You're now part of the Crafted community."
            );

        }
    );
}

function renderFeaturedProducts() {

    const container =
        document.querySelector(
            "#featuredProducts"
        ) ||
        document.querySelector(
            ".featured-products"
        );

    if (!container) return;


    const featured =
        getAllProducts().slice(0, 4);


    container.innerHTML =
        featured
            .map(product =>
                createProductCard(product)
            )
            .join("");
}

function setupCategoryLinks() {

    document
        .querySelectorAll("[data-category]")
        .forEach(element => {

            element.addEventListener(
                "click",
                function() {

                    const category =
                        this.dataset.category;

                    localStorage.setItem(
                        "craftedSelectedCategory",
                        category
                    );

                }
            );

        });
}

function applyStoredCategory() {

    const category =
        localStorage.getItem(
            "craftedSelectedCategory"
        );

    const categorySelect =
        document.querySelector(
            "#categoryFilter"
        );

    if (
        category &&
        categorySelect
    ) {

        categorySelect.value =
            category;

        localStorage.removeItem(
            "craftedSelectedCategory"
        );

        applyShopFilters();
    }
}

document.addEventListener(
    "error",
    function(event) {

        const element =
            event.target;

        if (
            element.tagName === "IMG" &&
            !element.dataset.fallbackApplied
        ) {

            element.dataset.fallbackApplied =
                "true";

            element.src =
                "https://placehold.co/900x700/F1EEE7/23463B?text=Crafted";

        }

    },
    true
);

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        updateLoginState();

        setupMobileNavigation();

        setupSellForm();

        setupLoginForm();

        setupNewsletter();

        setupCategoryLinks();

        renderFeaturedProducts();

        renderShop();

        renderProduct();

        renderCart();

        applyStoredCategory();

        const searchInput =
            document.querySelector(
                "#shopSearch"
            ) ||
            document.querySelector(
                "#searchInput"
            );

        const categoryFilter =
            document.querySelector(
                "#categoryFilter"
            );

        const priceFilter =
            document.querySelector(
                "#priceFilter"
            );

        const sortFilter =
            document.querySelector(
                "#sortFilter"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                applyShopFilters
            );

        }


        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                applyShopFilters
            );

        }


        if (priceFilter) {

            priceFilter.addEventListener(
                "change",
                applyShopFilters
            );

        }


        if (sortFilter) {

            sortFilter.addEventListener(
                "change",
                applyShopFilters
            );

        }

        const checkoutButton =
            document.querySelector(
                "#checkoutButton"
            ) ||
            document.querySelector(
                ".checkout-btn"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );

        }

        document
            .querySelectorAll(".logout-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    logout
                );

            });

    }
);