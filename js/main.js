// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
	anchor.addEventListener('click', function (e) {
		var target = document.querySelector(this.getAttribute('href'));
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth' });
		}
	});
});

// Active nav highlighting
document.addEventListener('DOMContentLoaded', function() {
	var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
	var currentPath = window.location.pathname.split('/').pop();
	navLinks.forEach(function(link) {
		var linkPath = link.getAttribute('href');
		if (linkPath === currentPath || (linkPath === 'index.html' && (currentPath === '' || currentPath === '/'))) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
});
