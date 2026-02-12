// ===================================
// JNOB FIT - Interactive Features
// ===================================

// === ANIMATED BACKGROUND CANVAS ===
class GoldenCloudBackground {
  constructor() {
    this.canvas = document.getElementById('backgroundCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.7) * 0.5, // Drift from right to left
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.05,
        color: `rgba(212, 175, 55, ${Math.random() * 0.15 + 0.05})`
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Create gradient background
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width * 0.7,
      this.canvas.height * 0.3,
      0,
      this.canvas.width * 0.7,
      this.canvas.height * 0.3,
      this.canvas.width * 0.8
    );
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        particle.x -= dx * force * 0.01;
        particle.y -= dy * force * 0.01;
      }

      // Wrap around screen (right to left flow)
      if (particle.x < -particle.size) {
        particle.x = this.canvas.width + particle.size;
      }
      if (particle.x > this.canvas.width + particle.size) {
        particle.x = -particle.size;
      }
      if (particle.y < -particle.size) {
        particle.y = this.canvas.height + particle.size;
      }
      if (particle.y > this.canvas.height + particle.size) {
        particle.y = -particle.size;
      }

      // Draw particle with glow effect
      this.ctx.save();
      
      // Outer glow
      const outerGradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      outerGradient.addColorStop(0, `rgba(212, 175, 55, ${particle.opacity * 0.8})`);
      outerGradient.addColorStop(0.5, `rgba(212, 175, 55, ${particle.opacity * 0.3})`);
      outerGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      
      this.ctx.fillStyle = outerGradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Inner glow
      const innerGradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 0.6
      );
      innerGradient.addColorStop(0, `rgba(244, 208, 63, ${particle.opacity * 1.5})`);
      innerGradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = innerGradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// === NAVBAR SCROLL EFFECT ===
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// === FAQ ACCORDION ===
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Elements to animate
  const animatedElements = document.querySelectorAll(`
    .comparison-side,
    .feature-card,
    .use-case,
    .faq-item
  `);

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(el);
  });
}

// === FORM HANDLING ===
function initForm() {
  const form = document.querySelector('.beta-form');
  
  if (!form) return;

  form.addEventListener('submit', function(e) {
    const button = this.querySelector('.btn-submit');
    const buttonText = button.querySelector('.btn-text');
    const buttonIcon = button.querySelector('.btn-icon');
    
    if (buttonText && buttonIcon) {
      buttonText.textContent = 'Enviando...';
      buttonIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
    
    button.disabled = true;
  });
}

// === FLOATING CARDS PARALLAX ===
function initFloatingCards() {
  const cards = document.querySelectorAll('.floating-card');
  
  if (cards.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
      const speed = (index + 1) * 0.05;
      const x = (mouseX - 0.5) * 50 * speed;
      const y = (mouseY - 0.5) * 50 * speed;
      
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// === CURSOR GLOW EFFECT ===
function initCursorGlow() {
  if (window.innerWidth < 1024) return; // Skip on mobile

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });

  window.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

// === PERFORMANCE OPTIMIZATION ===
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

// === INITIALIZE ALL ===
document.addEventListener('DOMContentLoaded', () => {
  // Initialize background animation
  const background = new GoldenCloudBackground();
  
  // Initialize features
  initNavbar();
  initSmoothScroll();
  initFAQ();
  initForm();
  initFloatingCards();
  initCursorGlow();
  
  // Delay scroll animations for better performance
  setTimeout(() => {
    initScrollAnimations();
  }, 100);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    background.destroy();
  });

  // Log for debugging
  console.log('JNOB FIT - Website loaded successfully! 🚀');
});

// === ANALYTICS HELPER ===
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

// Track button clicks
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button');
  if (!target) return;

  const text = target.textContent.trim();
  if (text) {
    trackEvent('button_click', {
      button_text: text,
      button_location: target.closest('section')?.className || 'unknown'
    });
  }
});
