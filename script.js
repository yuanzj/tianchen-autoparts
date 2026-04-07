/* ============================================
   丹阳市天辰汽车配件有限公司 Landing Page
   JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // === Active Navigation Link ===
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.nav-link');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // === Counter Animation ===
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const startTime = performance.now();
            
            counter.dataset.animated = 'true';
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(easeOut * target);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    // === Fade In on Scroll (Intersection Observer) ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to sections
    document.querySelectorAll('.section-header, .about-content, .about-visual, .product-card, .advantage-card, .exhibition-item, .contact-card, .contact-form-wrap, .products-brands').forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // Counter observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // === Contact Form ===
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('submitBtn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>发送中...</span>';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerHTML = '<span>✓ 已发送</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === Stagger Animation for Grid Items ===
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.fade-in');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('visible');
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.products-grid, .advantages-grid, .exhibition-grid, .contact-info-cards').forEach(grid => {
        staggerObserver.observe(grid);
    });

});
