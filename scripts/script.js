document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				e.preventDefault();
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
		});
	});

	// Mobile nav toggle with improved UX
	const navToggle = document.getElementById('nav-toggle');
	const navUl = document.querySelector('nav ul');

	if (navToggle) {
		navToggle.onclick = function () {
			if (navUl) {
				navUl.classList.toggle('show');
				this.classList.toggle('active');
			}
		};

		// Close mobile menu when clicking on a link
		if (navUl) {
			navUl.addEventListener('click', function (e) {
				if (e.target.tagName === 'A') {
					this.classList.remove('show');
					navToggle.classList.remove('active');
				}
			});
		}

		// Close mobile menu when clicking outside
		document.addEventListener('click', function (e) {
			if (!navToggle.contains(e.target) && !navUl.contains(e.target)) {
				navUl.classList.remove('show');
				navToggle.classList.remove('active');
			}
		});
	}

	// Enhanced form handling with better validation
	const contactForm = document.getElementById('contactForm');
	const formMsg = document.getElementById('formMsg');

	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();

			const name = this.querySelector('input[name="name"]').value.trim();
			const email = this.querySelector('input[name="email"]').value.trim();
			const message = this.querySelector('textarea[name="message"]').value.trim();

			// Clear previous messages
			if (formMsg) formMsg.textContent = '';

			// Enhanced validation
			if (name.length < 2) {
				showFormMessage('Please enter a valid name (at least 2 characters)', 'error');
				return;
			}

			if (!isValidEmail(email)) {
				showFormMessage('Please enter a valid email address', 'error');
				return;
			}

			if (message.length < 10) {
				showFormMessage('Please enter a message with at least 10 characters', 'error');
				return;
			}

			const button = this.querySelector('button[type="submit"]');
			const originalButtonText = button.textContent;

			button.disabled = true;
			button.textContent = 'Sending...';
			button.classList.add('sending');

			// Simulate form submission with better feedback
			setTimeout(() => {
				showFormMessage('Message sent successfully! Thank you for your contact.', 'success');
				this.reset();
				button.disabled = false;
				button.textContent = originalButtonText;
				button.classList.remove('sending');

				setTimeout(() => {
					if (formMsg) formMsg.textContent = '';
				}, 7000);
			}, 2000);
		});
	}

	// Email validation helper function
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Form message helper function
	function showFormMessage(message, type) {
		if (formMsg) {
			formMsg.textContent = message;
			formMsg.className = type === 'error' ? 'form-error' : 'form-success';
		}
	}

	// Enhanced Intersection Observer for scroll animations
	const revealElements = document.querySelectorAll('.hero h2, .hero p, .hero-buttons, .about-content, .skill-logo-item, .card, .contact-info, #contactForm');

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					// Add  animation delay for multiple elements
					setTimeout(() => {
						entry.target.classList.add('show');
					}, index * 100);
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
		},
	);

	revealElements.forEach(el => {
		revealObserver.observe(el);
	});

	// Enhanced active navigation link highlighting on scroll
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

	// Throttle scroll events for better performance
	let ticking = false;
	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(changeNavOnScroll);
			ticking = true;
		}
	}

	window.addEventListener('scroll', () => {
		requestTick();
		ticking = false;
	});
	changeNavOnScroll();

	// Enhanced theme toggle with localStorage persistence
	const themeToggle = document.getElementById('theme-toggle');
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

	// Load saved theme or use system preference
	const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

	if (currentTheme === 'light') {
		document.body.classList.add('light-theme');
	}

	if (themeToggle) {
		themeToggle.onclick = function () {
			document.body.classList.toggle('light-theme');

			// Save theme preference
			const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
			localStorage.setItem('theme', theme);

			// Add visual feedback
			this.style.transform = 'rotate(180deg)';
			setTimeout(() => {
				this.style.transform = 'rotate(0deg)';
			}, 300);
		};
	}

	// Skills logo items hover effect enhancement
	const skillItems = document.querySelectorAll('.skill-logo-item');
	skillItems.forEach(item => {
		item.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-5px) scale(1.02)';
		});

		item.addEventListener('mouseleave', function () {
			this.style.transform = 'translateY(0) scale(1)';
		});
	});

	// Project cards enhanced hover effects
	const projectCards = document.querySelectorAll('.card');
	projectCards.forEach(card => {
		card.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-12px)';
			const img = this.querySelector('img');
			if (img) {
				img.style.transform = 'scale(1.05)';
			}
		});

		card.addEventListener('mouseleave', function () {
			this.style.transform = 'translateY(0)';
			const img = this.querySelector('img');
			if (img) {
				img.style.transform = 'scale(1)';
			}
		});
	});

	// Add typing effect to hero section
	const heroTitle = document.querySelector('.hero h2 span');
	if (heroTitle) {
		const text = heroTitle.textContent;
		heroTitle.textContent = '';
		let i = 0;

		setTimeout(() => {
			const typeInterval = setInterval(() => {
				heroTitle.textContent += text.charAt(i);
				i++;
				if (i > text.length - 1) {
					clearInterval(typeInterval);
				}
			}, 100);
		}, 1000);
	}

	// Add smooth scrolling indicator
	const scrollIndicator = document.createElement('div');
	scrollIndicator.className = 'scroll-indicator';
	scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';

	const hero = document.querySelector('.hero');
	if (hero) {
		hero.appendChild(scrollIndicator);

		scrollIndicator.addEventListener('click', () => {
			const aboutSection = document.getElementById('about');
			if (aboutSection) {
				aboutSection.scrollIntoView({ behavior: 'smooth' });
			}
		});

		// Hide scroll indicator when scrolling
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				scrollIndicator.style.opacity = '0';
			} else {
				scrollIndicator.style.opacity = '1';
			}
		});
	}

	// Keyboard navigation support
	document.addEventListener('keydown', function (e) {
		// Close mobile menu with Escape key
		if (e.key === 'Escape' && navUl && navUl.classList.contains('show')) {
			navUl.classList.remove('show');
			navToggle.classList.remove('active');
		}

		// Theme toggle with keyboard shortcut (Ctrl/Cmd + Shift + T)
		if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
			e.preventDefault();
			if (themeToggle) {
				themeToggle.click();
			}
		}
	});

	// Preload images for better performance
	const images = ['./assets/projects/expense.png', './assets/projects/cidades.png', './assets/projects/todo.png'];

	images.forEach(src => {
		const img = new Image();
		img.src = src;
	});

	// Add loading state management
	window.addEventListener('load', () => {
		document.body.classList.add('loaded');

		// Remove any loading indicators
		const loader = document.querySelector('.loader');
		if (loader) {
			loader.style.opacity = '0';
			setTimeout(() => loader.remove(), 500);
		}
	});

	//message for developers
	console.log(`
    🚀 Portfolio by João Tavares
    
    Thanks for checking out my code!
    Feel free to connect with me:
    
    📧 Email: 10gabriel.tavares@gmail.com
    🔗 LinkedIn: https://www.linkedin.com/in/joão-g-tavares/
    💻 GitHub: https://github.com/j0aot
    `);
});
