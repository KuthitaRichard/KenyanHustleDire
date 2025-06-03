// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeCarousels();
    initializeAnimations();
    initializeCounters();
    initializeScrollEffects();
    initializeFormHandlers();
    initializeLazyLoading();
    
    // Hide loading screen
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1000);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize Swiper carousels
function initializeCarousels() {
    // Hero carousel
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        new Swiper('.hero-carousel', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
        });
    }

    // Services carousel
    const servicesCarousel = document.querySelector('.services-carousel');
    if (servicesCarousel) {
        new Swiper('.services-carousel', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            },
            speed: 800,
        });
    }

    // Gallery carousel (for gallery page)
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        new Swiper('.gallery-carousel', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            },
            speed: 1000,
        });
    }

    // Testimonials carousel
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialsCarousel) {
        new Swiper('.testimonials-carousel', {
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            effect: 'slide',
        });
    }
}

// Initialize AOS animations
function initializeAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 120,
            delay: 100,
        });
    }
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const countUp = (counter) => {
        const target = parseInt(counter.dataset.target);
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    countUp(counter);
                }
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form handling with Excel export
function initializeFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Add timestamp
            formObject.timestamp = new Date().toLocaleString();
            
            // Validate form
            if (validateForm(this)) {
                // Save to local storage and export to Excel
                saveFormSubmission(formObject);
                exportToExcel(formObject);
                
                // Show success message
                showNotification('Form submitted successfully! Excel file downloaded.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    });
}

// Save form submission to localStorage
function saveFormSubmission(formData) {
    let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
}

// Export single submission to Excel
function exportToExcel(formData) {
    // Get all submissions from localStorage
    let allSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet format
    const wsData = [
        // Header row
        ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Business', 'Service', 'Budget', 'Message', 'Newsletter'],
        // Data rows
        ...allSubmissions.map(submission => [
            submission.timestamp || '',
            submission.firstName || '',
            submission.lastName || '',
            submission.email || '',
            submission.phone || '',
            submission.business || '',
            submission.service || '',
            submission.budget || '',
            submission.message || '',
            submission.newsletter ? 'Yes' : 'No'
        ])
    ];
    
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Set column widths
    ws['!cols'] = [
        { width: 20 }, // Timestamp
        { width: 15 }, // First Name
        { width: 15 }, // Last Name
        { width: 25 }, // Email
        { width: 15 }, // Phone
        { width: 20 }, // Business
        { width: 20 }, // Service
        { width: 15 }, // Budget
        { width: 40 }, // Message
        { width: 10 }  // Newsletter
    ];
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Contact Submissions');
    
    // Generate filename with current date
    const fileName = `kenyan-hustle-dire-contacts-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Download file
    XLSX.writeFile(wb, fileName);
}

// Function to export all submissions (can be called manually)
function exportAllSubmissions() {
    const allSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    
    if (allSubmissions.length === 0) {
        showNotification('No form submissions found to export.', 'error');
        return;
    }
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet format
    const wsData = [
        // Header row
        ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Business', 'Service', 'Budget', 'Message', 'Newsletter'],
        // Data rows
        ...allSubmissions.map(submission => [
            submission.timestamp || '',
            submission.firstName || '',
            submission.lastName || '',
            submission.email || '',
            submission.phone || '',
            submission.business || '',
            submission.service || '',
            submission.budget || '',
            submission.message || '',
            submission.newsletter ? 'Yes' : 'No'
        ])
    ];
    
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Set column widths
    ws['!cols'] = [
        { width: 20 }, // Timestamp
        { width: 15 }, // First Name
        { width: 15 }, // Last Name
        { width: 25 }, // Email
        { width: 15 }, // Phone
        { width: 20 }, // Business
        { width: 20 }, // Service
        { width: 15 }, // Budget
        { width: 40 }, // Message
        { width: 10 }  // Newsletter
    ];
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'All Contact Submissions');
    
    // Generate filename with current date
    const fileName = `kenyan-hustle-dire-all-contacts-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Download file
    XLSX.writeFile(wb, fileName);
    
    showNotification(`Exported ${allSubmissions.length} submissions to Excel!`, 'success');
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
            
            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (field.type === 'tel') {
                const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
                if (!phoneRegex.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
        }
    });
    
    return isValid;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
        });
    }
}

function performSearch(query) {
    // This would typically make an API call
    // For now, we'll simulate search results
    const mockResults = [
        { title: 'Business Consulting', url: 'services.html', type: 'Service' },
        { title: 'Success Stories', url: 'testimonials.html', type: 'Page' },
        { title: 'Contact Us', url: 'contact.html', type: 'Page' },
        { title: 'About Our Mission', url: 'about.html', type: 'Page' }
    ];
    
    const filteredResults = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(filteredResults);
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item">
                <a href="${result.url}">
                    <h4>${result.title}</h4>
                    <span class="result-type">${result.type}</span>
                </a>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        searchResults.style.display = 'block';
    }
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Initialize modals
function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
});

// Initialize search and other components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFAQ();
    initializeModals();
});
