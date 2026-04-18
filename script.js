// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-glass');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('nav-glass');
            navbar.classList.add('py-4');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle hamburger icon animation
            mobileMenuBtn.classList.toggle('hamburger-active');
            
            // Toggle menu visibility
            if (mobileMenu.classList.contains('mobile-menu-hidden')) {
                mobileMenu.classList.remove('mobile-menu-hidden');
                mobileMenu.classList.add('mobile-menu-visible');
            } else {
                mobileMenu.classList.remove('mobile-menu-visible');
                mobileMenu.classList.add('mobile-menu-hidden');
            }
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('hamburger-active');
                mobileMenu.classList.remove('mobile-menu-visible');
                mobileMenu.classList.add('mobile-menu-hidden');
            });
        });
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Newsletter Form Validation ---
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const formSuccess = document.getElementById('form-success');

    if (form && emailInput && emailError && formSuccess) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValue) {
                showError('Email is required.');
            } else if (!emailPattern.test(emailValue)) {
                showError('Please enter a valid email address.');
            } else {
                // Success
                hideError();
                
                // Simulate API call
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="ph ph-spinner animate-spin"></i>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    formSuccess.classList.remove('hidden');
                    emailInput.value = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });

        // Clear error on input
        emailInput.addEventListener('input', () => {
            if (!emailError.classList.contains('opacity-0')) {
                hideError();
            }
        });

        function showError(message) {
            emailError.textContent = message;
            emailError.classList.remove('opacity-0');
            emailInput.classList.add('border-red-400');
            emailInput.classList.remove('border-white/10', 'focus:border-aura-500');
        }

        function hideError() {
            emailError.classList.add('opacity-0');
            emailInput.classList.remove('border-red-400');
            emailInput.classList.add('border-white/10');
        }
    }
});
