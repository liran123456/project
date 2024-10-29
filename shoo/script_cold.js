
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// פונקציה להוספת מוצר לסל
function addToCart(productName, productPrice, productElement) {
    animateProductToCart(productElement);

    const product = {
        name: productName,
        price: productPrice
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showSuccessMessage();
}

function animateProductToCart(productElement) {
    const cartIcon = document.querySelector('#cart-count');
    const productImage = productElement.querySelector('img');

    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clonedImage = productImage.cloneNode(true);
    clonedImage.style.position = 'fixed';
    clonedImage.style.top = productRect.top + 'px';
    clonedImage.style.left = productRect.left + 'px';
    clonedImage.style.width = productImage.width + 'px';
    clonedImage.style.transition = 'all 1s ease-in-out';
    document.body.appendChild(clonedImage);

    setTimeout(() => {
    clonedImage.style.transition = 'all 1.5s ease-in-out';
        clonedImage.style.top = cartRect.top + 'px';
        clonedImage.style.left = cartRect.left + 'px';
        clonedImage.style.width = '50px';
    }, 100);

    setTimeout(() => {
    clonedImage.style.transition = 'all 1.5s ease-in-out';
        clonedImage.remove();
    }, 1000);
}

// פונקציה להצגת הודעת הצלחה
function showSuccessMessage() {
    var message = document.getElementById('success-message');
    message.style.display = 'block';
    setTimeout(function() {
        message.style.display = 'none';
    }, 3000); // ההודעה תיעלם אחרי 3 שניות
}

// פונקציה לעדכון כמות המוצרים בעגלה בסרגל הניווט
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElement.innerText = cart.length;
    cartCountElement.style.color = cart.length > 0 ? 'red' : 'black'; // צבע אדום אם יש מוצרים
}

// קריאה לעדכון כמות המוצרים כשעמוד נטען
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

// פונקציה לניהול תפריט המבורגר במובייל
function toggleMenu() {
    const navLinks = document.getElementById('menu');
    navLinks.classList.toggle('active'); // הוספה והסרה של המחלקה 'active' כדי להציג/להסתיר את התפריט
}
