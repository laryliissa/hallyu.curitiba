fetch('header-template.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);

        // Get the current page's URL path
        const currentPath = window.location.pathname.split('/').pop();

        // Function to set active link styles
        function setActiveLink(containerId) {
            const navLinks = document.querySelectorAll(`#${containerId} a`);
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href').split('/').pop();

                // Handle index.html specifically for root path
                if (currentPath === '' || currentPath === 'index.html') {
                    if (linkPath === 'index.html') {
                        link.classList.add('text-secundaria', 'font-bold');
                        link.classList.remove('text-gray-700', 'hover:text-secundaria', 'transition-colors', 'duration-300');
                    } else {
                        link.classList.remove('text-secundaria', 'font-bold');
                        link.classList.add('text-gray-700', 'hover:text-secundaria', 'transition-colors', 'duration-300');
                    }
                } else if (linkPath === currentPath) {
                    link.classList.add('text-secundaria', 'font-bold');
                    link.classList.remove('text-gray-700', 'hover:text-secundaria', 'transition-colors', 'duration-300');
                } else {
                    link.classList.remove('text-secundaria', 'font-bold');
                    link.classList.add('text-gray-700', 'hover:text-secundaria', 'transition-colors', 'duration-300');
                }
            });
        }

        // Apply styles to desktop and mobile navigation
        setActiveLink('desktop-nav');
        setActiveLink('mobileMenu');
    });