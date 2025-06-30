// Place before </body> or in a <script> tag
const openSidebar = document.getElementById('openSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('mobileSidebar');
const backdrop = document.getElementById('sidebarBackdrop');
openSidebar.onclick = () => {
  sidebar.classList.add('open');
  backdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
};
closeSidebar.onclick = () => {
  sidebar.classList.remove('open');
  backdrop.classList.remove('show');
  document.body.style.overflow = '';
};
backdrop.onclick = () => {
  sidebar.classList.remove('open');
  backdrop.classList.remove('show');
  document.body.style.overflow = '';
}


        // Sidebar filter toggles
        document.querySelectorAll('.filter-header').forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                if (content && content.classList.contains('filter-content')) {
                    content.style.display = content.style.display === 'none' ? '' : 'none';
                }
            });
        });

        // Product Data
        const products = [
            {
                name: "Canon Camera EOS 2000, Black 10x zoom",
                price: 998.00,
                rating: 7.5,
                orders: 154,
                shipping: "Free Shipping",
                                description: "lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                image: "assets/tech/1.jpg"
            },
            {
                name: "Apple iPhone 13 128GB Camera + Black",
                price: 990,
                rating: 9.2,
                orders: 210,
                shipping: "Free Shipping",
                                description: "lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                image: "assets/tech/2.jpg"
            },
            {
                name: "Apple iPhone 14 256GB Camera + Black",
                price: 999,
                rating: 9.5,
                orders: 180,
                shipping: "Free Shipping",
                                description: "lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                image: "assets/tech/3.jpg"
            },
            {
                name: "Apple MacBook Air 13” 2022",
                price: 1200,
                rating: 8.8,
                orders: 95,
                shipping: "Free Shipping",
              description: "lorem1 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

                image: "assets/tech/4.jpg"
            }
          
        ];

        // Render Products
        function renderProducts(list) {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            list.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="products-meta">
                    <div class="product-meta">
                        <span><strong>Rating:</strong> ${product.rating} <i class="fas fa-star" style="color:#ffd700"></i></span>
                    </div>
                    <div class="product-meta">
                        <span><strong>Orders:</strong> ${product.orders}</span>
                    </div>
                    <div class="product-meta">
                        <span><strong>Shipping:</strong> ${product.shipping}</span>
                    </div>
                    <div class="product-meta">
                        <span><strong>Category:</strong> ${product.description}</span>
                    </div>
                    </div>
                    <div class="product-actions">
                        <a href="product-detail.html" style="background:#f3f4f6; color:#127fff;">View Details</a>
                    </div>
                    </div>
                `;
                productList.appendChild(card);
            });
            document.getElementById('item-count').textContent = `${list.length} items in Mobile accessory`;
        }
        renderProducts(products);

        // Filter Tag Remove & Clear All
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                this.remove();
            });
        });
        document.getElementById('clear-filters').onclick = function(e) {
            e.preventDefault();
            document.querySelectorAll('.filter-tag').forEach(tag => tag.remove());
        };

        // View Switcher
        document.getElementById('grid-view').onclick = function() {
            document.getElementById('product-list').classList.remove('list-view');
            this.classList.add('active');
            document.getElementById('list-view').classList.remove('active');
        };
        document.getElementById('list-view').onclick = function() {
            document.getElementById('product-list').classList.add('list-view');
            this.classList.add('active');
            document.getElementById('grid-view').classList.remove('active');
        };

        // Responsive: List view style
        const style = document.createElement('style');
        style.innerHTML = `
        .product-list.list-view {
            display: block;
        }
        .product-list.list-view .product-card {
            flex-direction: row;
            align-items: flex-start;
            gap: 18px;
            padding: 18px 24px;
            margin-bottom: 18px;
        }
        .product-list.list-view .product-card img {
            width: 70px;
            height: 70px;
            margin-bottom: 0;
        }
        .product-list.list-view .product-title,
        .product-list.list-view .product-price,
        .product-list.list-view .product-meta,
        .product-list.list-view .product-actions {
            text-align: left;
        }
        `;
        document.head.appendChild(style);

        // Pagination (static demo)
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Price range filter interactivity
        const priceRange = document.getElementById('price-range');
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');
        const applyBtn = document.getElementById('apply-btn');
        priceRange.addEventListener('input', function() {
            maxPrice.value = this.value;
        });
        maxPrice.addEventListener('input', function() {
            let val = parseInt(this.value) || 0;
            if (val < parseInt(minPrice.value)) val = minPrice.value;
            priceRange.value = val;
        });
        minPrice.addEventListener('input', function() {
            let minVal = parseInt(this.value) || 0;
            let maxVal = parseInt(maxPrice.value) || 0;
            if (minVal > maxVal) {
                maxPrice.value = minVal;
                priceRange.value = minVal;
            }
        });
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const min = parseInt(minPrice.value) || 0;
            const max = parseInt(maxPrice.value) || 10000;
            const filtered = products.filter(p => p.price >= min && p.price <= max);
            renderProducts(filtered);
        });


        // ................Image gallery interactivity...................

    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('#thumbs img');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Remove 'selected' from all
        thumbs.forEach(t => t.classList.remove('selected'));
        // Add 'selected' to clicked
        this.classList.add('selected');
        // Update main image
        mainImage.src = this.src;
      });
    });

    // Tabs interactivity
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = {
      desc: document.getElementById('tab-desc'),
      reviews: document.getElementById('tab-reviews'),
      shipping: document.getElementById('tab-shipping'),
      seller: document.getElementById('tab-seller')
    };
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        Object.values(tabContents).forEach(tc => tc.style.display = 'none');
        tabContents[this.dataset.tab].style.display = 'block';
      });
    });

    // Wishlist button
    document.getElementById('wishlistBtn').addEventListener('click', function() {
      this.classList.toggle('active');
    });

    

