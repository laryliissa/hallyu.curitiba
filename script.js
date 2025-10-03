// script.js

// Função para alternar o menu móvel
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
    menuOpenIcon.classList.toggle('hidden');
    menuCloseIcon.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    document.body.classList.toggle('mobile-menu-active');
}

document.addEventListener('DOMContentLoaded', () => {
    // Configuração de Carrossel Genérica
    function setupCarousel(containerId, prevBtnId, nextBtnId, cardSelector, isMonthCarousel = false) {
        const container = document.getElementById(containerId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!container || !prevBtn || !nextBtn) return;

        const cards = Array.from(container.children).filter(child => child.matches(cardSelector));
        let currentIndex = 0;

        function initializeToCurrentMonth() {
            if (!isMonthCarousel) return;

            const now = new Date();
            const currentMonth = now.getMonth(); // 0-indexed
            const currentYear = now.getFullYear();

            const currentMonthIndex = cards.findIndex(card => 
                parseInt(card.dataset.month) === currentMonth && parseInt(card.dataset.year) === currentYear
            );
            currentIndex = currentMonthIndex !== -1 ? currentMonthIndex : 0;
        }

        function updateView() {
            const cardWidth = cards[0].offsetWidth;
            const scrollAmount = cardWidth * currentIndex;
            container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateNavButtons();

            if (isMonthCarousel) {
                updateMonthInfo(currentIndex);
            }
        }

        function updateNavButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= cards.length - 1;
        }

        function updateMonthInfo(index) {
            const currentMonthDisplay = document.getElementById('current-month-display');
            const monthCards = Array.from(document.querySelectorAll('.calendar-card'));
            const eventLists = {
                'setembro': document.getElementById('events-setembro'),
                'outubro': document.getElementById('events-outubro'),
                'novembro': document.getElementById('events-novembro'),
                'dezembro': document.getElementById('events-dezembro')
            };

            if (monthCards[index]) {
                const monthName = monthCards[index].querySelector('h3').textContent.split(' ')[0];
                if (currentMonthDisplay) {
                    currentMonthDisplay.textContent = monthName;
                }

                Object.values(eventLists).forEach(list => {
                    if (list) list.classList.add('hidden');
                });

                const monthKey = monthName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (eventLists[monthKey]) {
                    eventLists[monthKey].classList.remove('hidden');
                }
            }
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateView();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateView();
            }
        });

        // Suporte para botões de desktop adicionais
        const prevBtnDesktop = document.getElementById(prevBtnId + '-desktop');
        const nextBtnDesktop = document.getElementById(nextBtnId + '-desktop');
        if (prevBtnDesktop && nextBtnDesktop) {
            prevBtnDesktop.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateView();
                }
            });
            nextBtnDesktop.addEventListener('click', () => {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    updateView();
                }
            });
        }

        // Destaque de evento e scroll
        document.querySelectorAll('.calendar-card div[data-event-id]').forEach(day => {
            day.addEventListener('click', () => {
                const eventId = day.dataset.eventId;
                const eventCard = document.querySelector(`.event-list .card-hover[data-event-id="${eventId}"]`);
                
                if (eventCard) {
                    // Remove o destaque de outros cards
                    document.querySelectorAll('.event-list .card-hover').forEach(card => {
                        card.classList.remove('border-blue-500', 'border-2');
                    });
                    
                    // Adiciona destaque e rola para o card
                    eventCard.classList.add('border-blue-500', 'border-2');
                    eventCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });

        // Inicialização
        if (isMonthCarousel) {
            initializeToCurrentMonth();
        }
        updateView(); // Chamar após definir o índice inicial
    }

    // Inicializa o carrossel do calendário
    setupCarousel('calendar-container', 'prev-month', 'next-month', '.calendar-card', true);

    // Inicializa o carrossel de restaurantes
    setupCarousel('restaurantes-container', 'prev-restaurant', 'next-restaurant', '.restaurant-card');

    // Atualização do status do restaurante
    function updateRestaurantStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const restaurantSchedules = {
            'status-kdog': { alwaysOpen: true },
            'status-saiso': {
                week: { start: 11.5, end: 14.5, eveningStart: 18, eveningEnd: 21.5 },
                weekend: { start: 11.5, end: 15, eveningStart: 18, eveningEnd: 22 }
            },
            'status-shinys': { week: { start: 11, end: 15 } },
            'status-yu': { week: { start: 11.5, end: 15 }, weekend: { start: 12, end: 15 } },
            'status-yami': { week: { start: 11.5, end: 16 } },
            'status-yoribogo': {
                week: { start: 11.5, end: 14.5, eveningStart: 18, eveningEnd: 21 },
                saturday: { start: 11.5, end: 14.25, eveningStart: 18, eveningEnd: 21 }
            },
            'status-yutogo': { week: { start: 8, end: 17.5 }, saturday: { start: 8, end: 14.5 } },
            'status-felicidadesdamo': { week: { start: 11, end: 13.75 } }
        };

        for (const id in restaurantSchedules) {
            const statusEl = document.getElementById(id);
            if (statusEl) {
                const schedule = restaurantSchedules[id];
                let isOpen = false;

                if (schedule.alwaysOpen) {
                    isOpen = true;
                } else {
                    const todaySchedule = (dayOfWeek >= 1 && dayOfWeek <= 5) ? schedule.week : (dayOfWeek === 6 ? (schedule.saturday || schedule.weekend) : (schedule.weekend));
                    if (todaySchedule) {
                        const { start, end, eveningStart, eveningEnd } = todaySchedule;
                        if ((currentTime >= start * 60 && currentTime <= end * 60) || (eveningStart && eveningEnd && currentTime >= eveningStart * 60 && currentTime <= eveningEnd * 60)) {
                            isOpen = true;
                        }
                    }
                }

                statusEl.textContent = isOpen ? 'Aberto' : 'Fechado';
                statusEl.classList.toggle('text-green-600', isOpen);
                statusEl.classList.toggle('text-red-600', !isOpen);
            }
        }
    }

    updateRestaurantStatus();
    setInterval(updateRestaurantStatus, 60000);

    // Accordion
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        const content = button.nextElementSibling;
        // A lógica para abrir o acordeão por padrão foi movida para agenda.html
        // para evitar conflitos. Este script agora lida apenas com o clique.
        
        button.addEventListener('click', () => {
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                button.querySelector('svg').style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                button.querySelector('svg').style.transform = 'rotate(180deg)';
            }
        });
    });
});