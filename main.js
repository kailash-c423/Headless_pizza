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

  // Popup logic
  items.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-name');
      const imgSrc = item.querySelector('img').src;
      // The rating text is inside the second div inside .item__rating
      const rating = item.querySelector('.item__rating div:nth-child(2)').textContent;
      
      popupImg.src = imgSrc;
      popupName.textContent = name;
      popupRating.textContent = rating;
      
      overlay.classList.add('items__item-overlay--active');
      popup.classList.add('items__item-popup--active');
    });
  });

  // Close popup
  const closePopup = () => {
    overlay.classList.remove('items__item-overlay--active');
    popup.classList.remove('items__item-popup--active');
  };

  overlay.addEventListener('click', closePopup);
});
