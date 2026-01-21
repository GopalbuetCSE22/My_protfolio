document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const form = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Active Nav Link Highlighting on Scroll (Scroll Spy)
    // Only run this on the homepage (where #hero exists) to avoid clearing active state on other pages
    if (document.getElementById('hero')) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 // Trigger when 30% of section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navItems.forEach(link => {
                        link.classList.remove('active');
                        // Check if link href matches current section id
                        const id = entry.target.getAttribute('id');
                        if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `index.html#${id}`) {
                            link.classList.add('active');
                        }
                        // Special case for Home/Hero
                        if (id === 'hero' && (link.getAttribute('href') === '#hero' || link.getAttribute('href') === 'index.html')) {
                            link.classList.add('active');
                        }
                    });

                    // Animate fade-in elements (handled by separate observer now, but keeping class add for safety if mixed)
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target); // Keep observing for scroll spy
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Separate observer for fade-in elements (one-time animation)
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        fadeObserver.observe(el);
    });

    // Form Submission Handling (Prevent refresh)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#10B981'; // Success Green

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    }
    // GitHub Calendar
    if (document.querySelector('.calendar')) {
        GitHubCalendar(".calendar", "GopalbuetCSE22", {
            responsive: true,
            tooltips: true
        }).then(() => {
            // Remove the "Skip to contributions year list" link which is stubborn
            const calendar = document.querySelector('.calendar');
            const links = calendar.querySelectorAll('a');
            links.forEach(link => {
                if (link.textContent.includes('Skip to contributions') || link.textContent.includes('year list')) {
                    link.style.display = 'none';
                    link.remove(); // Force remove
                }
            });
            // Also hide the text if it's not in a link (sometimes it's just helpful text)
            const srOnly = calendar.querySelectorAll('.sr-only');
            srOnly.forEach(el => el.style.display = 'none');
        });
    }
});
