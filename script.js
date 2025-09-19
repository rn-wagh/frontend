// AyurSutra Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupLoginButtons();
    setupMenuIcon();
    setupScrollEffects();
    setupGalleryEffects();
    setupProfileIcon();
}

// Login Button Functionality
function setupLoginButtons() {
    const doctorBtn = document.querySelector('.btnDoctor');
    const patientBtn = document.querySelector('.btnPatient');
    
    // Doctor login button
    if (doctorBtn) {
        doctorBtn.addEventListener('click', function() {
            sessionStorage.setItem('loginType', 'doctor');
            window.location.href = 'login.html?type=doctor';
        });
        
        // Hover effects
        doctorBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        doctorBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Patient login button
    if (patientBtn) {
        patientBtn.addEventListener('click', function() {
            sessionStorage.setItem('loginType', 'patient');
            window.location.href = 'login.html?type=patient';
        });
        
        // Hover effects
        patientBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        patientBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// Menu Icon Functionality
function setupMenuIcon() {
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            toggleMenu();
        });
    }
}

// Toggle menu (placeholder for future navigation menu)
function toggleMenu() {
    const menuOptions = [
        'Home',
        'About Panchakarma',
        'Services',
        'Book Appointment',
        'Contact Us'
    ];
    
    const menuText = menuOptions.join('\n• ');
    showNotification('Navigation Menu', `Available sections:\n• ${menuText}`);
}

// Profile Icon Functionality
function setupProfileIcon() {
    const profileIcon = document.querySelector('.profile-icon');
    
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            showNotification('Profile', 'User profile functionality coming soon!');
        });
    }
}

// Scroll Effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll (optional enhancement)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Parallax effect for hero section (subtle)
        const heroCard = document.querySelector('.hero-card');
        
        if (heroCard) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.2;
            
            if (scrolled < window.innerHeight) {
                heroCard.style.transform = `translateY(${parallax}px)`;
            }
        }
    });
}

// Gallery Effects
function setupGalleryEffects() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    // Intersection Observer for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    galleryCards.forEach((card, index) => {
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Notification system
function showNotification(title, message) {
    // Create a notification (in production, use a proper modal)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4a7c59;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        white-space: pre-line;
    `;
    notification.innerHTML = `
        <strong>${title}</strong><br>
        <small>${message}</small>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Form validation (if you add forms later)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add your form validation logic here
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
}

// Initialize any forms
validateForm('loginForm');
validateForm('contactForm');

// Utility function for future use
function showSimpleNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Function to handle contact form (for future use)
function handleContactForm(formData) {
    console.log('Contact form submitted:', formData);
    showNotification('Contact', 'Thank you for your message. We will get back to you soon!');
}