let cart = [];

        function addToCart(productName, price) {
            const product = { name: productName, price: price };
            cart.push(product);
            alert(`${productName} has been added to your cart.`);
            console.log(cart);
        }

        function searchProducts(query) {
            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                const name = product.querySelector('h3').innerText.toLowerCase();
                product.style.display = name.includes(query.toLowerCase()) ? '' : 'none';
            });
        }

        function removeFromCart(productName) {
            cart = cart.filter(item => item.name !== productName);
            alert(`${productName} has been removed from your cart.`);
            console.log(cart);
        }

        function viewCart() {
            if (cart.length === 0) {
                alert('Your cart is empty.');
            } else {
                let cartDetails = 'Your Cart:\n';
                cart.forEach((item, index) => {
                    cartDetails += `${index + 1}. ${item.name} - $${item.price}\n`;
                });
                alert(cartDetails);
            }
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add some products to proceed.');
                return;
            }

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            const confirmation = confirm(`Your total is $${total}. Proceed to payment?`);
            if (confirmation) {
                alert('Payment successful! Thank you for shopping with ShopSphere.');
                cart = [];
            }
        }