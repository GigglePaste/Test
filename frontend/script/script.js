// Navbar hide/show functionality with improved implementation
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

// Scroll event for navbar appearance
window.addEventListener('scroll', () => {
    if (!navbar) return; // Safety check

    // Only hide when scrolling down and not at the top
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.top = "-100px"; // Hide on scroll down
    } else {
        navbar.style.top = "0"; // Show on scroll up
    }
    
    // Add shadow only when scrolled down
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.15)";
    } else {
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
    
    lastScrollY = window.scrollY;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.car-card, .about-image, .about-text, .sponsor-logo');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Add CSS class for elements to start hidden
revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

// Reveal function to show elements when they enter viewport
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Function to toggle visible class
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for visible class
    document.addEventListener('scroll', () => {
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    });
    
    // Initial check on page load
    revealElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
}