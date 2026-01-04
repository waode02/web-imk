// ===================================
// MOBILE MENU TOGGLE
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    const isExpanded = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Update ARIA attribute
    menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===================================
// SMOOTH SCROLL WITH OFFSET
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    scrollProgress.style.width = scrolled + '%';
    scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
});

// ===================================
// HEADER SHADOW ON SCROLL
// ===================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll('.service-card, .advantage-item, .menu-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// FAQ ACCORDION
// ===================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        const answerId = question.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);

        // Close all other FAQs
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                const otherId = q.getAttribute('aria-controls');
                const otherAnswer = document.getElementById(otherId);
                if (otherAnswer) {
                    otherAnswer.hidden = true;
                }
            }
        });

        // Toggle current FAQ
        question.setAttribute('aria-expanded', !isExpanded);
        answer.hidden = isExpanded;
    });
});

// ===================================
// MENU ORDER BUTTONS
// ===================================
const orderButtons = document.querySelectorAll('.btn-order');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const menuName = button.getAttribute('data-menu');
        const message = `Halo Dapur Nusantara, saya ingin memesan ${menuName}`;
        const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;

        // Show toast notification
        showToast(`Membuka WhatsApp untuk memesan ${menuName}...`);

        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }, 500);
    });
});

// ===================================
// TOAST NOTIFICATION SYSTEM
// ===================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');

    toastMessage.textContent = message;
    toast.hidden = false;

    // Auto hide after duration
    setTimeout(() => {
        toast.hidden = true;
    }, duration);
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
const buttons = document.querySelectorAll('.btn, .btn-order');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn,
    .btn-order {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// ESC key closes mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Menu toggle keyboard support
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuToggle.click();
    }
});

// FAQ keyboard support
faqQuestions.forEach(question => {
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// EXTERNAL LINK WARNING
// ===================================
const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only show warning for non-WhatsApp links
        if (!href.includes('wa.me')) {
            const confirmLeave = confirm('Anda akan membuka link eksternal. Lanjutkan?');
            if (!confirmLeave) {
                e.preventDefault();
            }
        }
    });
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });

    try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Browser doesn't support LCP
    }

    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
        });
    });

    try {
        fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
        // Browser doesn't support FID
    }
}

// ===================================
// PAGE LOAD PERFORMANCE
// ===================================
window.addEventListener('load', () => {
    // Log page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page Load Time:', loadTime + 'ms');

    // Show welcome toast
    setTimeout(() => {
        showToast('Selamat datang di Dapur Nusantara! 🍜', 4000);
    }, 1000);
});

// ===================================
// REDUCED MOTION SUPPORT
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
}

// ===================================
// SERVICE WORKER REGISTRATION (PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🍜 Dapur Nusantara', 'font-size: 24px; font-weight: bold; color: #d35400;');
console.log('%cWebsite ini dibuat dengan prinsip Human-Computer Interaction (HCI)', 'font-size: 14px; color: #666666;');
console.log('%c✅ Navigasi yang jelas dan mudah dipahami', 'color: #27ae60;');
console.log('%c✅ Tombol CTA yang menonjol dan mudah ditemukan', 'color: #27ae60;');
console.log('%c✅ Ukuran font yang nyaman untuk dibaca', 'color: #27ae60;');
console.log('%c✅ Spasi dan jarak yang konsisten', 'color: #27ae60;');
console.log('%c✅ Feedback visual pada interaksi', 'color: #27ae60;');
console.log('%c✅ WCAG AA Accessibility Compliance', 'color: #27ae60;');
console.log('%c✅ Keyboard Navigation Support', 'color: #27ae60;');
console.log('%c✅ Screen Reader Friendly', 'color: #27ae60;');
console.log('%c✅ Reduced Motion Support', 'color: #27ae60;');
console.log('%c✅ Touch-Friendly Interface (44px min)', 'color: #27ae60;');
