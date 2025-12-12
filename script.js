// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('nav ul');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Carousel - VÉRIFICATION SI LES ÉLÉMENTS EXISTENT
const carousel = document.querySelector('.carousel');
const carouselControls = document.getElementById('carouselControls');
const carouselItems = document.querySelectorAll('.carousel-item');

if (carousel && carouselControls && carouselItems.length > 0) {
    let currentSlide = 0;

    // Create dots
    carouselItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        carouselControls.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        goToSlide(currentSlide);
    }

    // Auto-advance carousel
    setInterval(nextSlide, 5000);
}

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    let animated = false;

    function animateStats() {
        if (animated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });

        animated = true;
    }

    // Trigger stats animation on scroll
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const sectionTop = statsSection.offsetTop;
            const sectionHeight = statsSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            if (scrollTop + windowHeight > sectionTop + sectionHeight / 3) {
                animateStats();
            }
        }
    });
}

// Form validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validate nom
        const nom = document.getElementById('nom');
        const nomError = document.getElementById('nomError');
        if (nom && nom.value.trim() === '') {
            if (nomError) nomError.style.display = 'block';
            nom.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (nom) {
            if (nomError) nomError.style.display = 'none';
            nom.style.borderColor = '#ddd';
        }

        // Validate prenom
        const prenom = document.getElementById('prenom');
        const prenomError = document.getElementById('prenomError');
        if (prenom && prenom.value.trim() === '') {
            if (prenomError) prenomError.style.display = 'block';
            prenom.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (prenom) {
            if (prenomError) prenomError.style.display = 'none';
            prenom.style.borderColor = '#ddd';
        }

        // Validate email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email.value)) {
            if (emailError) emailError.style.display = 'block';
            email.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (email) {
            if (emailError) emailError.style.display = 'none';
            email.style.borderColor = '#ddd';
        }

        // Validate sujet
        const sujet = document.getElementById('sujet');
        const sujetError = document.getElementById('sujetError');
        if (sujet && sujet.value === '') {
            if (sujetError) sujetError.style.display = 'block';
            sujet.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (sujet) {
            if (sujetError) sujetError.style.display = 'none';
            sujet.style.borderColor = '#ddd';
        }

        // Validate message
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (message && message.value.trim() === '') {
            if (messageError) messageError.style.display = 'block';
            message.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (message) {
            if (messageError) messageError.style.display = 'none';
            message.style.borderColor = '#ddd';
        }

        if (isValid) {
            alert('Merci ! Votre message a été envoyé avec succès.');
            contactForm.reset();
        }
    });
}

// Modal functions
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    let content = '';

    if (type === 'bachelor') {
        content = `<h2>Bachelor</h2><p>Contenu détaillé du Bachelor...</p>`;
    } else if (type === 'ingenieur') {
        content = `<h2>Cycle Ingénieur</h2><p>Contenu détaillé du Cycle Ingénieur...</p>`;
    } else if (type === 'mastere') {
        content = `<h2>Mastères Spécialisés</h2><p>Contenu détaillé des Mastères...</p>`;
    } else if (type === 'apropos') {
        content = `<h2>À propos</h2><p>Contenu détaillé À propos...</p>`;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
const modal = document.getElementById('modal');
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});