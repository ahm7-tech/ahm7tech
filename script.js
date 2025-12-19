// Enhanced JavaScript for AHM7 TECH Website with Modern Effects

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.title = 'Switch to light mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.title = 'Switch to dark mode';
        }
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Enhanced animation for theme toggle
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
    
    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('topBtn');
    
    function toggleScrollTopBtn() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleScrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show more/less channels functionality
    const channelCards = document.querySelectorAll('.channel-card');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showLessBtn = document.querySelector('.show-less-btn');
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            channelCards.forEach((card, index) => {
                if (index >= 3) {
                    card.style.display = 'block';
                    // Enhanced fade-in animation with stagger
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.9)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, (index - 3) * 100 + 100);
                }
            });
            showMoreBtn.style.display = 'none';
            if (showLessBtn) {
                showLessBtn.style.display = 'block';
            }
        });
    }
    
    if (showLessBtn) {
        showLessBtn.addEventListener('click', function() {
            channelCards.forEach((card, index) => {
                if (index >= 3) {
                    // Fade out animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 200);
                }
            });
            showLessBtn.style.display = 'none';
            if (showMoreBtn) {
                showMoreBtn.style.display = 'block';
            }
            
            // Scroll to channels section
            document.getElementById('channels').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
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
    
    // Enhanced loading animation for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            const button = this;
            
            // Add loading state
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            
            // Create loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shimmer 1s ease-in-out infinite;
            `;
            
            button.appendChild(loadingOverlay);
            button.textContent = 'Opening...';
            
            setTimeout(() => {
                button.textContent = originalText;
                if (loadingOverlay.parentNode) {
                    loadingOverlay.remove();
                }
            }, 1500);
        });
    });
    
    // Add shimmer animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe channel cards for animation
    channelCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Mouse tracking for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            
            heroSection.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        heroSection.addEventListener('mouseleave', function() {
            heroSection.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Enhanced card hover effects
    channelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect to nearby cards
            channelCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const distance = Math.abs(Array.from(channelCards).indexOf(card) - Array.from(channelCards).indexOf(otherCard));
                    if (distance <= 2) {
                        otherCard.style.transform = 'translateY(-2px) scale(1.02)';
                        otherCard.style.opacity = '0.8';
                    }
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset nearby cards
            channelCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.transform = '';
                    otherCard.style.opacity = '';
                }
            });
        });
    });
    
    // Performance optimization: Debounce scroll events
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
    
    const debouncedScrollHandler = debounce(toggleScrollTopBtn, 10);
    window.removeEventListener('scroll', toggleScrollTopBtn);
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Keyboard accessibility for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // Add parallax effect to background
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('h1');
    if (heroTitle && heroTitle.textContent.includes('AHM7 TECH')) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add floating animation to logo
    const logo = document.querySelector('.logo-container img');
    if (logo) {
        setInterval(() => {
            logo.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                logo.style.transform = 'translateY(0px)';
            }, 1000);
        }, 3000);
    }
});

