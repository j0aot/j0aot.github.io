document.addEventListener('DOMContentLoaded', () => {
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

	const navToggle = document.getElementById('nav-toggle');
	const navUl = document.querySelector('nav ul');

	if (navToggle) {
		navToggle.onclick = function () {
			if (navUl) {
				navUl.classList.toggle('show');
				this.classList.toggle('active');
				this.setAttribute('aria-expanded', navUl.classList.contains('show'));
			}
		};

		if (navUl) {
			navUl.addEventListener('click', function (e) {
				if (e.target.tagName === 'A') {
					this.classList.remove('show');
					navToggle.classList.remove('active');
					navToggle.setAttribute('aria-expanded', 'false');
				}
			});
		}

		document.addEventListener('click', function (e) {
			if (navUl && !navToggle.contains(e.target) && !navUl.contains(e.target)) {
				navUl.classList.remove('show');
				navToggle.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreygqkn';

	const contactForm = document.getElementById('contactForm');
	const formMsg = document.getElementById('formMsg');

	if (contactForm) {
		contactForm.addEventListener('submit', async function (e) {
			e.preventDefault();

			const name = this.querySelector('input[name="name"]').value.trim();
			const email = this.querySelector('input[name="email"]').value.trim();
			const message = this.querySelector('textarea[name="message"]').value.trim();

			if (formMsg) formMsg.textContent = '';

			if (name.length < 2) {
				showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
				return;
			}

			if (!isValidEmail(email)) {
				showFormMessage('Please enter a valid email address.', 'error');
				return;
			}

			if (message.length < 10) {
				showFormMessage('Please enter a message with at least 10 characters.', 'error');
				return;
			}

			if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
				showFormMessage('Contact form is not configured yet. Please email me directly at 10gabriel.tavares@gmail.com', 'error');
				return;
			}

			const button = this.querySelector('button[type="submit"]');
			const originalButtonText = button.textContent;

			button.disabled = true;
			button.textContent = 'Sending...';
			button.classList.add('sending');

			try {
				const response = await fetch(FORMSPREE_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({ name, email, message }),
				});

				if (response.ok) {
					showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
					this.reset();
					setTimeout(() => {
						if (formMsg) formMsg.textContent = '';
					}, 7000);
				} else {
					const data = await response.json().catch(() => ({}));
					const errMsg = data?.errors?.[0]?.message || 'Something went wrong. Please try again or email me directly.';
					showFormMessage(errMsg, 'error');
				}
			} catch {
				showFormMessage('Network error. Please check your connection and try again.', 'error');
			} finally {
				button.disabled = false;
				button.textContent = originalButtonText;
				button.classList.remove('sending');
			}
		});
	}

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function showFormMessage(message, type) {
		if (formMsg) {
			formMsg.textContent = message;
			formMsg.className = type === 'error' ? 'form-error' : 'form-success';
		}
	}

	const revealElements = document.querySelectorAll('.hero h2, .hero p, .hero-buttons, .about-content, .skill-logo-item, .card, .contact-info, #contactForm');

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
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

	revealElements.forEach(el => revealObserver.observe(el));

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

	let ticking = false;

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(() => {
				changeNavOnScroll();
				ticking = false;
			});
			ticking = true;
		}
	}

	window.addEventListener('scroll', requestTick);
	changeNavOnScroll();

	const themeToggle = document.getElementById('theme-toggle');
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

	if (currentTheme === 'light') {
		document.body.classList.add('light-theme');
	}

	if (themeToggle) {
		themeToggle.onclick = function () {
			document.body.classList.toggle('light-theme');
			const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
			localStorage.setItem('theme', theme);

			this.style.transform = 'rotate(180deg)';
			setTimeout(() => {
				this.style.transform = 'rotate(0deg)';
			}, 300);
		};
	}

	const skillItems = document.querySelectorAll('.skill-logo-item');
	skillItems.forEach(item => {
		item.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-5px) scale(1.02)';
		});
		item.addEventListener('mouseleave', function () {
			this.style.transform = 'translateY(0) scale(1)';
		});
	});

	const projectCards = document.querySelectorAll('.card');
	projectCards.forEach(card => {
		card.addEventListener('mouseenter', function () {
			this.style.transform = 'translateY(-12px)';
			const img = this.querySelector('img');
			if (img) img.style.transform = 'scale(1.05)';
		});
		card.addEventListener('mouseleave', function () {
			this.style.transform = 'translateY(0)';
			const img = this.querySelector('img');
			if (img) img.style.transform = 'scale(1)';
		});
	});

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

	const scrollIndicator = document.createElement('div');
	scrollIndicator.className = 'scroll-indicator';
	scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
	scrollIndicator.setAttribute('aria-hidden', 'true');

	const hero = document.querySelector('.hero');
	if (hero) {
		hero.appendChild(scrollIndicator);

		scrollIndicator.addEventListener('click', () => {
			const aboutSection = document.getElementById('about');
			if (aboutSection) {
				aboutSection.scrollIntoView({ behavior: 'smooth' });
			}
		});

		window.addEventListener('scroll', () => {
			scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
		});
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && navUl && navUl.classList.contains('show')) {
			navUl.classList.remove('show');
			if (navToggle) {
				navToggle.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		}

		if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
			e.preventDefault();
			if (themeToggle) themeToggle.click();
		}
	});

	['./assets/projects/expense.png', './assets/projects/cidades.png', './assets/projects/todo.png'].forEach(src => {
		const img = new Image();
		img.src = src;
	});

	window.addEventListener('load', () => {
		document.body.classList.add('loaded');
		const loader = document.querySelector('.loader');
		if (loader) {
			loader.style.opacity = '0';
			setTimeout(() => loader.remove(), 500);
		}
	});

	console.log(`
    🚀 Portfolio by João Tavares
    
    Thanks for checking out my code!
    Feel free to connect with me:
    
    📧 Email: 10gabriel.tavares@gmail.com
    🔗 LinkedIn: https://www.linkedin.com/in/joão-g-tavares/
    💻 GitHub: https://github.com/j0aot
    `);
});
