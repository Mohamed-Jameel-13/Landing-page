// Lumina Studio - Modern Creative Agency Website
// Advanced JavaScript functionality for interactive experience

document.addEventListener('DOMContentLoaded', function() {
    
    // === Loading Screen Animation with Enhanced Lumina Studio Effect ===
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    function showLoadingScreen() {
        if (!loadingScreen || !progressBar) {
            console.log('Loading screen elements not found');
            return;
        }
        
        // Add typewriter effect to loading text
        if (loadingText) {
            loadingText.style.width = '0';
            setTimeout(() => {
                loadingText.style.animation = 'typewriter 2s steps(13) forwards, luminousGlow 3s ease-in-out infinite';
            }, 500);
        }
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 12;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'visible';
                        // Trigger initial page animations
                        triggerInitialAnimations();
                    }, 800);
                }, 800);
            }
        }, 150);
    }
    
    function triggerInitialAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInUp 0.8s var(--ease-out-cubic) forwards`;
            }, index * 100);
        });
        
        // Animate stats section when it comes into view
        setTimeout(() => {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsSection.style.transform = 'translateY(0)';
                statsSection.style.opacity = '1';
            }
        }, 1000);
    }
    
    // Show loading screen with fallback
    showLoadingScreen();
    
    // Fallback: Hide loading screen after maximum 5 seconds
    setTimeout(() => {
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }
    }, 5000);

    // === Custom Cursor ===
    const cursor = document.getElementById('cursor');
    const cursorOutline = document.getElementById('cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    // Check if cursor elements exist and we're on desktop
    const isMobile = window.innerWidth <= 768;
    
    if (cursor && cursorOutline && !isMobile) {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Show custom cursor elements
        cursor.style.opacity = '1';
        cursor.style.visibility = 'visible';
        cursorOutline.style.opacity = '1';
        cursorOutline.style.visibility = 'visible';
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth cursor outline animation
        function animateCursorOutline() {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursorOutline);
        }
        animateCursorOutline();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .filter-btn, .nav-link, [role="button"]');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorOutline.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorOutline.classList.remove('cursor-hover');
            });
        });

        // Hide cursor when it leaves the window
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        // Handle text selection
        document.addEventListener('selectstart', () => {
            cursor.classList.add('cursor-text');
            cursorOutline.classList.add('cursor-text');
        });
        
        document.addEventListener('selectend', () => {
            cursor.classList.remove('cursor-text');
            cursorOutline.classList.remove('cursor-text');
        });
        
        console.log('✨ Custom cursor initialized successfully!');
    } else {
        console.log('📱 Custom cursor disabled (mobile device or elements not found)');
        // Ensure cursor elements are hidden on mobile
        if (cursor) {
            cursor.style.display = 'none';
        }
        if (cursorOutline) {
            cursorOutline.style.display = 'none';
        }
    }

    // === Mobile Navigation ===
    const mobileMenuBtn = document.querySelector('.menu-trigger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;
    
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        } else {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            mobileMenuBtn.classList.add('active');
            body.classList.add('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu on link click
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // === Smooth Scrolling ===
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Enhanced Scroll Animations ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for statistics section
                if (entry.target.classList.contains('stats-section')) {
                    animateStatsSection(entry.target);
                }
                
                // Special handling for testimonials
                if (entry.target.classList.contains('testimonial-card-modern')) {
                    animateTestimonial(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Enhanced animation for statistics section
    function animateStatsSection(section) {
        const statNumbers = section.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                const targetText = stat.textContent;
                const targetNumber = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/\d/g, '');
                
                // Animate counter
                animateCounterEnhanced(stat, targetNumber, suffix, 2000);
                
                // Add shake effect
                stat.style.animation = `countUp 0.8s ease-out forwards, shake 0.6s ease-in-out ${index * 0.2}s`;
            }, index * 200);
        });
    }
    
    function animateTestimonial(testimonial) {
        const quoteIcon = testimonial.querySelector('.quote-icon');
        const text = testimonial.querySelector('.testimonial-text');
        const author = testimonial.querySelector('.testimonial-author');
        
        setTimeout(() => {
            if (quoteIcon) quoteIcon.style.animation = 'bounceIn 0.6s ease-out';
        }, 200);
        
        setTimeout(() => {
            if (text) text.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, 400);
        
        setTimeout(() => {
            if (author) author.style.animation = 'slideInUp 0.6s ease-out forwards';
        }, 600);
    }
    
    // Observe elements for animation with enhanced targeting
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .testimonial-card-modern, .section-title, .section-subtitle, ' +
        '.stats-section, .cta-buttons, .footer-brand, .social-links'
    );
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS animations dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3) translateY(-20px); opacity: 0; }
            50% { transform: scale(1.05) translateY(-10px); }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes slideInUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(styleSheet);

    // === Portfolio Filter ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // === Enhanced Testimonials Slider ===
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card-modern');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateTestimonialPosition();
    }
    
    function updateTestimonialPosition() {
        if (testimonialsTrack) {
            const translateX = -currentTestimonial * 100;
            testimonialsTrack.style.transform = `translateX(${translateX}%)`;
            
            // Add active class to current testimonial
            testimonialCards.forEach((card, index) => {
                if (index === currentTestimonial) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
    }
    
    // Auto-slide testimonials with enhanced control
    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }
    
    function stopTestimonialAutoplay() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
    }
    
    // Start autoplay
    startTestimonialAutoplay();
    
    // Pause on hover
    if (testimonialsTrack) {
        testimonialsTrack.addEventListener('mouseenter', stopTestimonialAutoplay);
        testimonialsTrack.addEventListener('mouseleave', startTestimonialAutoplay);
    }

    // === Enhanced Animated Counters ===
    const counters = document.querySelectorAll('.text-5xl, .stat-number');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.textContent;
                const target = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/\d/g, '');
                
                // Enhanced counter animation with easing
                animateCounterEnhanced(counter, target, suffix, 2500);
                countObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        countObserver.observe(counter);
    });
    
    function animateCounterEnhanced(element, target, suffix, duration = 2000) {
        let current = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(target * easeOutCubic);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // === Back to Top Button ===
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // === Enhanced Footer Animations ===
    const footerElements = document.querySelectorAll('.footer-brand, .footer-heading, .footer-links li, .social-link');
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    footerElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animationDelay = `${index * 0.1}s`;
        footerObserver.observe(el);
    });

    // === Enhanced Floating Shapes Animation ===
    const shapes = document.querySelectorAll('.shape, .shape-cta-1, .shape-cta-2, .shape-footer-1, .shape-footer-2');
    
    function animateShapesEnhanced() {
        shapes.forEach((shape, index) => {
            const speed = 0.3 + index * 0.15;
            const amplitude = 15 + index * 8;
            const time = Date.now() * 0.001 * speed;
            
            const x = Math.sin(time) * amplitude;
            const y = Math.cos(time * 0.7) * amplitude;
            const rotation = time * 5;
            
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });
        
        requestAnimationFrame(animateShapesEnhanced);
    }
    animateShapesEnhanced();

    // === CTA Section Enhanced Animation ===
    const ctaSection = document.querySelector('.cta-buttons');
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const buttons = entry.target.querySelectorAll('button');
                    buttons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.style.animation = 'fadeInUp 0.8s ease-out forwards, pulse 2s ease-in-out 1s infinite';
                        }, index * 200);
                    });
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        ctaObserver.observe(ctaSection);
    }

    // === Enhanced Button Interactions ===
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .btn-primary-large, .btn-outline-large');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // === Navbar Scroll Effect ===
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    // === Accessibility Enhancements ===
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }

    console.log('🎨 Lumina Studio website loaded successfully!');
});

// === Service Worker Registration ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
