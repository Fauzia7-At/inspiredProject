document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('category');
    const productsContainer = document.querySelector('.products-container');

    // Fetch and display products
    function fetchProducts() {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                displayProducts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    // Display products on the page
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('data-category', product.category);

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productsContainer.appendChild(productDiv);
        });

        addCartFunctionality();
    }

    // Filter functionality
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;

        document.querySelectorAll('.product').forEach(product => {
            if (selectedCategory === 'all' || product.dataset.category === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Add to Cart functionality
    function addCartFunctionality() {
        const cartContainer = document.querySelector('.cart-container');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const product = button.parentElement;
                const productName = product.querySelector('h3').innerText;
                const productPrice = product.querySelector('p').innerText;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <p>${productName} - ${productPrice}</p>
                    <button class="remove-item">Remove</button>
                `;

                cartContainer.appendChild(cartItem);

                // Remove item functionality
                cartItem.querySelector('.remove-item').addEventListener('click', () => {
                    cartContainer.removeChild(cartItem);
                });
            });
        });
    }

    // Initial fetch of products
    fetchProducts();
});
