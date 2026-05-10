// ==================== Initialize AOS Animation ====================
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// ==================== Loading Screen ====================
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    }
});

// ==================== Header Scroll Effect ====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== Mobile Menu Toggle ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Active Navigation Link ====================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==================== Typing Effect ====================
const typingTexts = [
    'كهربائي منازل محترف في الرياض',
    'خدمة سريعة 24 ساعة',
    'جودة عالية وضمان',
    'أسعار تنافسية'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ==================== Counter Animation ====================
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            if (element.nextElementSibling && element.nextElementSibling.classList.contains('stat-label')) {
                if (target === 98) {
                    element.textContent = target + '%';
                } else if (target === 24) {
                    element.textContent = target + '/7';
                } else {
                    element.textContent = target + '+';
                }
            }
        }
    };

    updateCounter();
}

const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ==================== Back to Top Button ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Smooth Scroll for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');

        // Create WhatsApp message
        const whatsappMessage = `
*طلب خدمة جديد من الموقع*

*الاسم:* ${name}
*رقم الجوال:* ${phone}
*الخدمة المطلوبة:* ${service}
*الرسالة:* ${message}
        `.trim();

        const whatsappUrl = `https://wa.me/966578212956?text=${encodeURIComponent(whatsappMessage)}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Reset form
        this.reset();

        // Show success message
        alert('تم إرسال طلبك بنجاح! سيتم تحويلك إلى واتساب لتأكيد الطلب.');
    });
}

// ==================== Parallax Effect for Hero ====================
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== Image Lazy Loading Enhancement ====================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ==================== Service Card Hover Effect ====================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        serviceCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        serviceCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ==================== Phone Number Click Tracking ====================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('Phone call initiated');
    });
});

// ==================== WhatsApp Click Tracking ====================
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp chat initiated');
    });
});

// ==================== Form Input Validation ====================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.parentElement.classList.add('filled');
        } else {
            this.parentElement.classList.remove('filled');
        }
    });
});

// ==================== Add Schema.org Structured Data ====================
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "كهربائي الرياض",
    "description": "خدمات كهرباء منزلية احترافية في الرياض - خدمة 24 ساعة",
    "telephone": "+966578212956",
    "areaServed": {
        "@type": "City",
        "name": "الرياض"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "image": "1.jpg"
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);

// ==================== Performance Optimization ====================
// Debounce function for scroll events
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

// Apply debounce to scroll event
const debouncedScroll = debounce(() => {
    highlightNavLink();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ==================== Console Welcome Message ====================
console.log(`
╔════════════════════════════════════════╗
║                                        ║
║     🏠 كهربائي الرياض - موقع احترافي  ║
║                                        ║
║     📞 0578212956                      ║
║     ⚡ خدمة 24 ساعة                     ║
║                                        ║
╚════════════════════════════════════════╝
`);