document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
			});
		});
	});

	// Form handling
	const contactForm = document.getElementById('contactForm');
	const formMsg = document.getElementById('formMsg');

	contactForm.addEventListener('submit', function (e) {
		e.preventDefault();
		const button = this.querySelector('button');
		button.disabled = true;
		button.textContent = 'Enviando...';

		// Simulate form submission
		setTimeout(() => {
			formMsg.textContent = 'Mensagem enviada! Obrigado pelo contato.';
			formMsg.style.color = '#4CAF50';
			this.reset();
			button.disabled = false;
			button.textContent = 'Enviar mensagem';
		}, 1000);
	});

	// Add animation on scroll
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			}
		});
	});

	const hiddenElements = document.querySelectorAll('.card, .about-content');
	hiddenElements.forEach(el => observer.observe(el));
});
