// Navigation functions
function goBack() {
  window.history.back() || (window.location.href = 'login.html');
}

function navigateToService(service) {
  switch(service) {
    case 'appointments':
      // Navigate to appointments page
      window.location.href = 'appointments.html';
      break;
    case 'treatment':
      // Replace with actual treatment page when ready
      alert('Treatment page - Coming Soon!');
      // window.location.href = 'treatment.html';
      break;
    case 'diet':
      // Replace with actual diet page when ready
      alert('Diet page - Coming Soon!');
      // window.location.href = 'diet.html';
      break;
    case 'chat':
      // Navigate to chat page
      window.location.href = 'chat.html';
      break;
  }
}

// Header scroll effects
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(26, 61, 26, 0.98)';
  } else {
    header.style.background = 'rgba(26, 61, 26, 0.95)';
  }
}

// Intersection Observer for animations
function initializeAnimations() {
  const cards = document.querySelectorAll('.service-card, .treatment-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    // Observe the element
    observer.observe(card);
  });
}

// Book Treatment button functionality
function handleBookTreatment() {
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      // Replace with actual booking functionality
      alert('Booking functionality will be implemented soon!');
      // window.location.href = 'booking.html';
    });
  }
}

// Smooth scrolling for internal links (if any)
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Handle treatment card clicks for more details
function initializeTreatmentCards() {
  const treatmentItems = document.querySelectorAll('.treatment-item');
  
  treatmentItems.forEach(item => {
    item.addEventListener('click', () => {
      const treatmentName = item.querySelector('.treatment-name').textContent.toLowerCase();
      // Replace with actual treatment detail pages
      alert(`${treatmentName} details - Coming Soon!`);
      // window.location.href = `treatment-${treatmentName.replace(' ', '-')}.html`;
    });
  });
}

// Menu icon functionality (placeholder)
function initializeMenu() {
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      // Replace with actual menu functionality
      alert('Menu functionality - Coming Soon!');
    });
  }
}

// Responsive image loading optimization
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', () => {
      console.warn(`Failed to load image: ${img.src}`);
      // You can set a placeholder image here if needed
      // img.src = 'placeholder.jpg';
    });
    
    // Add loading animation
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
}

// Check if images exist and load them
function loadImages() {
  const images = [
    { id: 'vamanaImg', src: 'vamana.jpg', element: document.getElementById('vamanaImg') },
    { id: 'virechanaImg', src: 'Virechana.jpg', element: document.getElementById('virechanaImg') },
    { id: 'bastiImg', src: 'Basti.jpg', element: document.getElementById('bastiImg') },
    { id: 'nasyaImg', src: 'Nasya.jpg', element: document.getElementById('nasyaImg') },
    { id: 'raktamokshanaImg', src: 'Virechana.jpg', element: document.getElementById('raktamokshanaImg') }
  ];

  images.forEach(imgData => {
    const img = new Image();
    img.onload = function() {
      // Image exists, replace div with actual image
      const actualImg = document.createElement('img');
      actualImg.src = imgData.src;
      actualImg.alt = imgData.id;
      actualImg.className = 'treatment-image';
      imgData.element.parentNode.replaceChild(actualImg, imgData.element);
    };
    img.onerror = function() {
      // Image doesn't exist, keep placeholder
      imgData.element.textContent = imgData.id.replace('Img', ' Image');
    };
    img.src = imgData.src;
  });

  // Check hero background
  const heroImg = new Image();
  heroImg.onload = function() {
    document.getElementById('heroSection').classList.add('with-image');
  };
  heroImg.src = 'Book.jpg';

  // Check bottom hero background
  const bottomImg = new Image();
  bottomImg.onload = function() {
    const bottomHero = document.getElementById('bottomHero');
    bottomHero.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('create-account1.jpg')";
    bottomHero.style.backgroundSize = "cover";
    bottomHero.style.backgroundPosition = "center";
  };
  bottomImg.onerror = function() {
    // If image doesn't load, use fallback styling with herb elements
    document.getElementById('bottomHero').classList.add('fallback');
  };
  bottomImg.src = 'create-account1.jpg';
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadImages();
  initializeAnimations();
  handleBookTreatment();
  initializeSmoothScrolling();
  initializeTreatmentCards();
  initializeMenu();
  optimizeImages();
});

// Add scroll event listener
window.addEventListener('scroll', handleHeaderScroll);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Refresh any time-sensitive content when page becomes visible
    console.log('Page is now visible');
  }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
  // Add any responsive adjustments if needed
  const windowWidth = window.innerWidth;
  
  if (windowWidth < 768) {
    // Mobile specific adjustments
    console.log('Mobile view active');
  } else if (windowWidth < 1024) {
    // Tablet specific adjustments
    console.log('Tablet view active');
  } else {
    // Desktop specific adjustments
    console.log('Desktop view active');
  }
});