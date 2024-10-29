
// פונקציה להוספת מוצר לעגלה עם טיפול בשגיאות ומניעת שכפול מוצרים
function addToCart(productName, productPrice) {
    try {
        const product = { name: productName, price: productPrice };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product && product.name && product.price);
        
        const existingProduct = cart.find(item => item.name === productName);
        if (!existingProduct) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showSuccessMessage();
        } else {
            console.log('המוצר כבר קיים בעגלה');
        }
    } catch (error) {
        console.error('שגיאה בהוספת מוצר:', error);
    }
}

// פונקציה לטעינת מוצרים בעגלת הקניות
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product && product.name && product.price);
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // ניקוי תצוגה קודמת

    if (cart.length === 0) {
        document.getElementById("empty-cart").style.display = "block";
    } else {
        document.getElementById("empty-cart").style.display = "none";
    }

    cart.forEach(product => {
        if (product && product.name && product.price) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            // Updated string format to avoid any issues with backslashes and quotation marks
            cartItem.innerHTML = "<p>" + product.name + " - ₪" + product.price + "</p>" +
            "<button onclick=\"removeFromCart('" + product.name + "')\">הסר מוצר</button>";
            cartItemsContainer.appendChild(cartItem);
        }
    });


    calculateTotal();
}

// פונקציה לחישוב הסכום הכולל של העגלה
function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product && product.name && product.price);
    
    let total = cart.reduce((sum, product) => {
        return sum + (product && product.price ? product.price : 0);
    }, 0);

    document.getElementById('total-price').textContent = 'סה"כ: ₪' + total;
}

// פונקציה לעדכון מספר הפריטים בעגלה
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product && product.name && product.price);
    
    const cartCountElement = document.getElementById('cart-count');

    if (cart.length > 0) {
        cartCountElement.style.display = 'inline';
        cartCountElement.textContent = cart.length;
    } else {
        cartCountElement.style.display = 'none';
    }
}

// פונקציה להסרת מוצר מהעגלה
function removeFromCart(productName) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product && product.name && product.price);
        cart = cart.filter(item => item.name !== productName);

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    } catch (error) {
        console.error('שגיאה בהסרת מוצר:', error);
    }
}

// פונקציה לניהול תפריט המבורגר במובייל
function toggleMenu() {
    const navLinks = document.getElementById('menu');
    navLinks.classList.toggle('active'); // הוספה והסרה של המחלקה 'active' כדי להציג/להסתיר את התפריט
}
