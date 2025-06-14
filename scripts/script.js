document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				e.preventDefault();
				targetElement.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Form handling
	const contactForm = document.getElementById('contactForm');
	const formMsg = document.getElementById('formMsg');

	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const button = this.querySelector('button[type="submit"]');
			const originalButtonText = button.textContent;
			button.disabled = true;
			button.textContent = 'Sending...';

			setTimeout(() => {
				if (formMsg) {
					formMsg.textContent = 'Message sent! Thank you for your contact.';
					formMsg.style.color = 'var(--primary-color)';
				}
				this.reset();
				button.disabled = false;
				button.textContent = originalButtonText;

				setTimeout(() => {
					if (formMsg) formMsg.textContent = '';
				}, 5000);
			}, 1500);
		});
	}

	// Intersection Observer for scroll animations
	const revealElements = document.querySelectorAll('.hero h2, .hero p, .hero-buttons, .about-content, .skill-logo-item, .card, .contact-info, #contactForm');

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 },
	);

	revealElements.forEach(el => {
		revealObserver.observe(el);
	});

	// Active navigation link highlighting on scroll
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('header nav ul li a');

	function changeNavOnScroll() {
		let currentSection = '';
		const headerHeight = 70;
		const scrollPosition = window.scrollY || window.pageYOffset;

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (scrollPosition >= sectionTop - headerHeight - sectionHeight / 3) {
				currentSection = section.getAttribute('id');
			}
		});

		navLinks.forEach(link => {
			link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
		});
	}

	window.addEventListener('scroll', changeNavOnScroll);
	changeNavOnScroll();
});
