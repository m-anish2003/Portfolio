// Manish Tiwari Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initThemeToggle();
    initTypingAnimation();
    initScrollAnimations();
    initSkillsAnimation();
    initStatsCounter();
    initContactForm();
    initSmoothScrolling();
    initFloatingElements();
});

// Floating Particles Background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect with glassmorphism
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(26, 27, 62, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 107, 107, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
        
        // Update particles color based on theme
        updateParticlesTheme(theme);
    }
    
    function updateParticlesTheme(theme) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            if (theme === 'dark') {
                particle.style.background = '#FF6B6B';
            } else {
                particle.style.background = '#1A1B3E';
            }
        });
    }
    
    applyTheme(currentTheme);
    
    // Theme toggle click handler with animation
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add rotation animation
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        
        setTimeout(() => {
            applyTheme(newTheme);
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Advanced typing animation for hero section
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Frontend Developer & AI Enthusiast',
        'Machine Learning Explorer',
        'Full-Stack Developer',
        'Problem Solver',
        'Tech Innovation Seeker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeAnimation() {
        const currentText = texts[textIndex];
        
        if (isPaused) {
            setTimeout(typeAnimation, 1500);
            isPaused = false;
            return;
        }
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        // Add natural typing variations
        if (!isDeleting) {
            typeSpeed += Math.random() * 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isPaused = true;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeAnimation, typeSpeed);
    }
    
    // Start animation with delay
    setTimeout(typeAnimation, 1000);
}

// Advanced scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animatedElements = [
        { selector: '.about-content', class: 'fade-in' },
        { selector: '.skill-category', class: 'fade-in' },
        { selector: '.project-card', class: 'fade-in' },
        { selector: '.timeline-item:nth-child(odd)', class: 'slide-in-left' },
        { selector: '.timeline-item:nth-child(even)', class: 'slide-in-right' },
        { selector: '.education-card', class: 'fade-in' },
        { selector: '.achievement-item', class: 'fade-in' },
        { selector: '.contact-content', class: 'fade-in' }
    ];
    
    animatedElements.forEach(({ selector, class: animationClass }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(animationClass);
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// Enhanced skills progress bar animation
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            
            setTimeout(() => {
                bar.style.width = level + '%';
                
                // Add pulse effect when animation completes
                setTimeout(() => {
                    bar.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
                    setTimeout(() => {
                        bar.style.boxShadow = 'none';
                    }, 500);
                }, 2000);
                
            }, index * 150);
        });
    }
}

// Animated counter for statistics
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateCounters();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (target > 10) {
                        stat.textContent = Math.floor(current);
                    } else {
                        stat.textContent = current.toFixed(2);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target > 10) {
                        stat.textContent = Math.floor(target);
                    } else {
                        stat.textContent = target.toFixed(2);
                    }
                }
            };
            
            updateCounter();
        });
    }
}

// Enhanced contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Add floating label effect
    const formControls = contactForm.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        control.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Enhanced validation
        const errors = [];
        
        if (!name || name.length < 2) {
            errors.push('Please enter a valid name (minimum 2 characters).');
        }
        
        if (!email || !isValidEmail(email)) {
            errors.push('Please enter a valid email address.');
        }
        
        if (!subject || subject.length < 5) {
            errors.push('Please enter a subject (minimum 5 characters).');
        }
        
        if (!message || message.length < 10) {
            errors.push('Please enter a message (minimum 10 characters).');
        }
        
        if (errors.length > 0) {
            showNotification(errors.join(' '), 'error');
            return;
        }
        
        // Simulate form submission with enhanced UX
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        submitButton.disabled = true;
        submitButton.style.background = 'linear-gradient(135deg, #ccc 0%, #999 100%)';
        
        // Add loading animation to form
        contactForm.style.opacity = '0.7';
        contactForm.style.pointerEvents = 'none';
        
        // Simulate API call with realistic delay
        setTimeout(() => {
            // Create mailto link as fallback
            const mailtoLink = `mailto:mt8902017@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage: ${message}`)}`;
            window.open(mailtoLink, '_blank');
            
            showNotification('Thank you for your message! Your email client should open shortly. I\'ll get back to you soon!', 'success');
            contactForm.reset();
            
            // Reset form appearance
            contactForm.style.opacity = '1';
            contactForm.style.pointerEvents = 'auto';
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            
        }, 2000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Enhanced notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            </div>
            <div class="notification-text">
                <span>${message}</span>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Enhanced notification styles
    const colorMap = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colorMap[type] || '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-icon').style.cssText = `
        font-size: 1.5rem;
        flex-shrink: 0;
    `;
    
    notification.querySelector('.notification-text').style.cssText = `
        flex: 1;
        line-height: 1.4;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.5rem;
        margin: -0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
        opacity: 0.8;
        flex-shrink: 0;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.opacity = '0.8';
        this.style.background = 'none';
    });
    
    // Auto close after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 6000);
    
    function closeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
                
                // Custom smooth scroll animation
                smoothScrollTo(offsetTop, 1000);
            }
        });
    });
    
    function smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// Floating elements and parallax effects
function initFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    // Mouse parallax effect for floating icons
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingIcons.forEach((icon, index) => {
            const speed = (index + 1) * 0.1;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Scroll parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .particles-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Scroll to top functionality with smooth animation
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: scale(0.8);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button with enhanced animation
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Enhanced hover effects
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.3)';
    });
    
    // Scroll to top functionality with custom animation
    scrollToTopBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
        }, 100);
        
        // Smooth scroll to top
        const duration = 1000;
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        
        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition * (1 - easeProgress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    });
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Performance optimization - Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Custom cursor effect for premium feel
function initCustomCursor() {
    if (window.innerWidth > 768) { // Only on desktop
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '0.7';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.7';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Enhanced cursor for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .social-link, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'linear-gradient(135deg, #1A1B3E 0%, #2D1B69 100%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)';
            });
        });
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', initCustomCursor);

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Ctrl + / for accessibility shortcuts info
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        showNotification('Keyboard shortcuts: ESC - Close menu, Arrow keys - Navigate', 'info');
    }
});

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                if (loadTime > 3000) {
                    console.warn('Page load time is high:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);