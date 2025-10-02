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

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    const betaForm = document.getElementById('betaForm');
    
    if (betaForm) {
        betaForm.addEventListener('submit', function(e) {
            const button = this.querySelector('button');
            const original = button.querySelector('.original');
            
            if (original) {
                original.textContent = 'Enviando...';
            }
            button.disabled = true;

            console.log('Formulario enviándose a Netlify...');
        });
    }

    initScrollAnimations();
});