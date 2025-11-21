// ============================================
// Portfolio JavaScript - Week 02 Features
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSkillProgressBars();
    initContactForm();
    initProjectCards();
    initCanvas();
    initImageSlider();
    initThemeToggle();
    initBackToTop();
    updateCurrentYear();
});

// ============================================
// 1. Animated Skill Progress Bars
// ============================================
function initSkillProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Create IntersectionObserver to detect when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 100);
                
                // Stop observing once animated
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of element is visible
    });
    
    // Observe each progress bar
    progressBars.forEach(bar => {
        bar.style.width = '0%'; // Start at 0%
        observer.observe(bar);
    });
}

// ============================================
// 2. Contact Form Validation + localStorage
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        let isValid = true;
        
        // Validate Name
        if (nameInput.value.trim() === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        }
        
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Message (min 10 characters)
        if (messageInput.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Save to localStorage
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            localStorage.setItem('formData', JSON.stringify(formData));
            
            // Redirect to form-details.html
            window.location.href = 'form-details.html';
        } else {
            formMessage.textContent = 'Please fix the errors above';
            formMessage.className = 'form-message error';
        }
    });
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
}

// ============================================
// 3. Project Cards - Clickable via JavaScript
// ============================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Make entire card clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on project links
            if (e.target.classList.contains('project-link')) {
                e.stopPropagation();
                
                // Handle GitHub link clicks
                const githubUrl = e.target.getAttribute('data-github-url');
                if (githubUrl) {
                    window.open(githubUrl, '_blank');
                } else {
                    // Handle Live Demo clicks
                    const projectUrl = card.getAttribute('data-project-url');
                    if (projectUrl) {
                        window.open(projectUrl, '_blank');
                    }
                }
                return;
            }
            
            // Navigate to project URL
            const projectUrl = card.getAttribute('data-project-url');
            if (projectUrl) {
                window.location.href = projectUrl;
            }
        });
    });
}

// ============================================
// 4. Canvas Drawing
// ============================================
function initCanvas() {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Draw a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Portfolio Canvas', canvas.width / 2, canvas.height / 2 - 30);
    
    // Draw a circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 + 20, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    
    // Draw a rectangle
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(canvas.width / 2 - 40, canvas.height / 2 + 50, 80, 20);
}

// ============================================
// 5. Image Slider
// ============================================
function initImageSlider() {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play slider (optional)
    setInterval(nextSlide, 5000);
}

// ============================================
// 6. Dark/Light Mode Toggle
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon-o');
        themeIcon.classList.add('fa-lightbulb-o');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');

        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

        if (isLightMode) {
            themeIcon.classList.remove('fa-moon-o');
            themeIcon.classList.add('fa-lightbulb-o');
        } else {
            themeIcon.classList.remove('fa-lightbulb-o');
            themeIcon.classList.add('fa-moon-o');
        }
    });
}

// ============================================
// 7. Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Update Current Year
// ============================================
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

