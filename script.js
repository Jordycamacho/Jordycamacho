// Form handling for beta testers
document.getElementById('betaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const button = this.querySelector('button');
    const originalText = button.textContent;

    // Simulate form submission
    button.textContent = 'Enviando...';
    button.disabled = true;

    setTimeout(() => {
        alert(`¡Gracias! Hemos registrado tu email (${email}) para la beta. Te contactaremos pronto.`);
        button.textContent = originalText;
        button.disabled = false;
        document.getElementById('betaForm').reset();
    }, 1500);
});

// Smooth scroll for navigation links
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

// Add scroll effect to navbar
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(22, 22, 22, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(22, 22, 22, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(136, 88, 6, 0.2)';
    }
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar FAQ inmediatamente
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            console.log('FAQ clicked:', faqItem, 'Active:', isActive); // Para debug

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
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

    // Form handling for beta testers
    document.getElementById('betaForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const button = this.querySelector('button');
        const originalText = button.querySelector('.original').textContent;

        button.querySelector('.original').textContent = 'Enviando...';
        button.disabled = true;

        setTimeout(() => {
            alert(`¡Gracias! Hemos registrado tu email (${email}) para la beta. Te contactaremos pronto.`);
            button.querySelector('.original').textContent = originalText;
            button.disabled = false;
            document.getElementById('betaForm').reset();
        }, 1500);
    });
});


// Sistema de animaciones al scroll - VERSIÓN CORREGIDA
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');

                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    const elementsToAnimate = [
        '.hero-content',
        '.hero-image',
        '.problem-card',
        '.solution-card',
        '.feature-card',
        '.faq-item',
        '.beta-content'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

// Inicializar cuando la página esté completamente cargada
window.addEventListener('load', function () {
    initScrollAnimations();

    // Tu código JavaScript existente (sin cambios)
    // Form handling for beta testers
    document.getElementById('betaForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const button = this.querySelector('button');
        const originalText = button.querySelector('.original').textContent;

        // Simulate form submission
        button.querySelector('.original').textContent = 'Enviando...';
        button.disabled = true;

        setTimeout(() => {
            alert(`¡Gracias! Hemos registrado tu email (${email}) para la beta. Te contactaremos pronto.`);
            button.querySelector('.original').textContent = originalText;
            button.disabled = false;
            document.getElementById('betaForm').reset();
        }, 1500);
    });

    // Smooth scroll for navigation links
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

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(136, 88, 6, 0.2)';
        }
    });

    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

window.addEventListener('load', function () {
    initScrollAnimations();
});


// Sistema de animaciones al scroll - VERSIÓN CORREGIDA