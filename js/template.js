document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar um template HTML em um placeholder
    const loadTemplate = (templatePath, placeholderTag) => {
        const placeholder = document.querySelector(placeholderTag);
        if (!placeholder) return;

        fetch(templatePath)
            .then(response => response.text())
            .then(data => {
                placeholder.outerHTML = data;

                // Se for o header, inicializa suas funcionalidades
                if (placeholderTag === 'header-placeholder') {
                    initializeHeader();
                }
            })
            .catch(error => console.error(`Erro ao carregar o template: ${templatePath}`, error));
    };

    // Função para inicializar o header (menu mobile, links ativos)
    const initializeHeader = () => {
        // Adiciona a função do menu mobile no escopo global para o onclick funcionar
        window.toggleMobileMenu = () => {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuOpenIcon = document.getElementById('menu-open-icon');
            const menuCloseIcon = document.getElementById('menu-close-icon');

            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        };

        // Lógica para destacar o link ativo
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#desktop-nav a, #mobileMenu a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
            const linkHash = link.getAttribute('href').split('#')[1];

            // Remove estilos padrão para garantir a limpeza
            link.classList.remove('text-secundaria', 'font-bold');
            
            // Adiciona estilos de hover
            if (!link.matches('.text-3xl')) { // Não adiciona em links grandes do menu mobile
                 link.classList.add('text-gray-700', 'hover:text-secundaria', 'transition-colors', 'duration-300');
            }

            if (linkPath === currentPath && !linkHash) {
                link.classList.add('text-secundaria', 'font-bold');
                link.classList.remove('text-gray-700');
            }
        });
    };

    // Carrega o cabeçalho e o rodapé
    loadTemplate('header-template.html', 'header-placeholder');
    loadTemplate('footer-template.html', 'footer-placeholder');
});
