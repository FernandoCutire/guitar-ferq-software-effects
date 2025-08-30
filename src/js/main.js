/**
 * FERQ - Guitar Effects & Equipment
 * Main JavaScript file
 */

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    // Update current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height to offset scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (header && nav && !document.querySelector('.mobile-toggle')) {
            // Create mobile toggle button
            const mobileToggle = document.createElement('button');
            mobileToggle.classList.add('mobile-toggle');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            header.insertBefore(mobileToggle, nav);
            
            // Add CSS for mobile navigation
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    nav {
                        display: none;
                        width: 100%;
                    }
                    nav.active {
                        display: block;
                    }
                    .mobile-toggle {
                        display: block;
                        background: transparent;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                    header .container {
                        flex-wrap: wrap;
                    }
                }
                @media (min-width: 769px) {
                    .mobile-toggle {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Toggle navigation
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
    };
    
    // Initialize mobile navigation
    createMobileNav();

    // Simple image lazy loading
    const lazyLoadImages = () => {
        // If browser supports IntersectionObserver
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            // Target all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            document.querySelectorAll('img[data-src]').forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        }
    };
    
    // Initialize lazy loading
    lazyLoadImages();
});
