document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const items = Array.from(document.querySelectorAll('.item'));
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup');
  
  const popupImg = document.getElementById('popupImg');
  const popupName = document.getElementById('popupName');
  const popupRating = document.getElementById('popupRating');

  // Search filtering
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    items.forEach(item => {
      const name = item.getAttribute('data-name').toLowerCase();
      if (name.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  const popupPrice = document.getElementById('popupPrice');
  const requestDiscountBtn = document.getElementById('requestDiscountBtn');
  const discountStatus = document.getElementById('discountStatus');

  let currentPriceValue = 0;

  // Popup logic
  items.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-name');
      const imgSrc = item.querySelector('img').src;
      // The rating text is inside the second div inside .item__rating
      const rating = item.querySelector('.item__rating div:nth-child(2)').textContent;
      const priceText = item.querySelector('.item__price').textContent;
      
      popupImg.src = imgSrc;
      popupName.textContent = name;
      popupRating.textContent = rating;
      
      // Extract numeric value from ₹XXXX
      currentPriceValue = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
      popupPrice.textContent = priceText;
      
      // Reset discount status and button
      discountStatus.textContent = '';
      discountStatus.className = 'discount-status';
      requestDiscountBtn.style.display = 'inline-block';
      requestDiscountBtn.disabled = false;
      requestDiscountBtn.textContent = 'Request 15% Discount';
      
      overlay.classList.add('items__item-overlay--active');
      popup.classList.add('items__item-popup--active');
    });
  });

  // Discount request logic
  requestDiscountBtn.addEventListener('click', () => {
    requestDiscountBtn.disabled = true;
    requestDiscountBtn.textContent = 'Requesting...';
    discountStatus.textContent = 'Sending request to owner...';
    discountStatus.style.color = '#555';
    
    // Simulate network delay
    setTimeout(() => {
      // 70% chance to accept
      const isAccepted = Math.random() < 0.7;
      if (isAccepted) {
        const newPrice = Math.round(currentPriceValue * 0.85);
        discountStatus.textContent = `Owner Accepted! New Price: ₹${newPrice}`;
        discountStatus.style.color = '#0da729';
        popupPrice.textContent = `₹${newPrice}`;
        requestDiscountBtn.style.display = 'none';
      } else {
        discountStatus.textContent = 'Owner Rejected!';
        discountStatus.style.color = 'red';
        requestDiscountBtn.textContent = 'Request 15% Discount';
        requestDiscountBtn.disabled = false;
      }
    }, 1500);
  });

  // Close popup
  const closePopup = () => {
    overlay.classList.remove('items__item-overlay--active');
    popup.classList.remove('items__item-popup--active');
  };

  overlay.addEventListener('click', closePopup);
});
