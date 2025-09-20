// script.js

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
    menuOpenIcon.classList.toggle('hidden');
    menuCloseIcon.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
    document.body.classList.toggle('mobile-menu-active');
}

// Calendar Functionality
document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const eventLists = {
        'events-setembro': document.getElementById('events-setembro'),
        'events-outubro': document.getElementById('events-outubro'),
        'events-novembro': document.getElementById('events-novembro'),
        'events-dezembro': document.getElementById('events-dezembro')
    };

    let currentMonthIndex = 0; // 0: Setembro, 1: Outubro, etc.
    const monthCards = Array.from(calendarContainer.children);

    function showMonth(index) {
        const scrollAmount = calendarContainer.offsetWidth * index;
        calendarContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Hide all event lists and show only the relevant one
        Object.values(eventLists).forEach(list => list.classList.add('hidden'));
        if (monthCards[index]) {
            const monthId = monthCards[index].querySelector('h3').textContent.split(' ')[0].toLowerCase();
            const targetEventList = eventLists[`events-${monthId}`];
            if (targetEventList) {
                targetEventList.classList.remove('hidden');
            }
        }
        updateCalendarNavigation();
    }

    function updateCalendarNavigation() {
        prevMonthBtn.disabled = currentMonthIndex === 0;
        nextMonthBtn.disabled = currentMonthIndex === monthCards.length - 1;
    }

    prevMonthBtn.addEventListener('click', () => {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            showMonth(currentMonthIndex);
        }
    });

    nextMonthBtn.addEventListener('click', () => {
        if (currentMonthIndex < monthCards.length - 1) {
            currentMonthIndex++;
            showMonth(currentMonthIndex);
        }
    });

    // Initial display
    showMonth(currentMonthIndex);

    // Event details hover (if needed, based on data-event-id)
    document.querySelectorAll('.calendar-card div[data-event-id]').forEach(day => {
        day.addEventListener('click', () => {
            const eventId = day.dataset.eventId;
            // In a real scenario, you'd fetch/display event details based on eventId
            // For now, we'll just log it or highlight
            console.log('Clicked event ID:', eventId);
            // Example: highlight the corresponding event in the list
            document.querySelectorAll('.event-list .card-hover').forEach(eventCard => {
                if (eventCard.dataset.eventId === eventId) {
                    eventCard.classList.add('border-blue-500', 'border-2'); // Example highlight
                } else {
                    eventCard.classList.remove('border-blue-500', 'border-2');
                }
            });
        });
    });
});


// Restaurant Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const restaurantesContainer = document.getElementById('restaurantes-container');
    const prevRestaurantBtn = document.getElementById('prev-restaurant');
    const nextRestaurantBtn = document.getElementById('next-restaurant');
    const restaurantCards = Array.from(restaurantesContainer.children);

    let currentRestaurantIndex = 0;

    function showRestaurant(index) {
        const cardWidth = restaurantCards[0].offsetWidth + (parseInt(getComputedStyle(restaurantCards[0]).marginLeft) * 2); // Assuming consistent margin
        restaurantesContainer.scrollLeft = cardWidth * index;
        updateRestaurantNavigation();
    }

    function updateRestaurantNavigation() {
        prevRestaurantBtn.disabled = currentRestaurantIndex === 0;
        nextRestaurantBtn.disabled = currentRestaurantIndex === restaurantCards.length - 1;
    }

    prevRestaurantBtn.addEventListener('click', () => {
        if (currentRestaurantIndex > 0) {
            currentRestaurantIndex--;
            showRestaurant(currentRestaurantIndex);
        }
    });

    nextRestaurantBtn.addEventListener('click', () => {
        if (currentRestaurantIndex < restaurantCards.length - 1) {
            currentRestaurantIndex++;
            showRestaurant(currentRestaurantIndex);
        }
    });

    // Initial display
    showRestaurant(currentRestaurantIndex);

    // Optional: Update status (Open/Closed) for restaurants based on time
    function updateRestaurantStatus() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        // K-dog (Pedidos online via ifood/WhatsApp - always open for simplicity or needs specific logic)
        const kdogStatus = document.getElementById('status-kdog');
        if (kdogStatus) {
            kdogStatus.textContent = 'Online'; // Simplified
            kdogStatus.classList.add('text-green-600');
        }

        // Saiso K-Food Market
        const saisoStatus = document.getElementById('status-saiso');
        if (saisoStatus) {
            let isOpen = false;
            // Seg-Qui: 11:30-14:30, 18:00-21:30
            if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Mon-Thu
                if ((currentTime >= (11 * 60 + 30) && currentTime <= (14 * 60 + 30)) ||
                    (currentTime >= (18 * 60) && currentTime <= (21 * 60 + 30))) {
                    isOpen = true;
                }
            }
            // Sex-Sáb: 11:30-15:00, 18:00-22:00
            else if (dayOfWeek === 5 || dayOfWeek === 6) { // Fri-Sat
                if ((currentTime >= (11 * 60 + 30) && currentTime <= (15 * 60)) ||
                    (currentTime >= (18 * 60) && currentTime <= (22 * 60))) {
                    isOpen = true;
                }
            }
            saisoStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            saisoStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }

        // Shiny's Kitchen
        const shinysStatus = document.getElementById('status-shinys');
        if (shinysStatus) {
            let isOpen = false;
            // Terça a Sábado, das 11h às 15h
            if (dayOfWeek >= 2 && dayOfWeek <= 6) { // Tue-Sat
                if (currentTime >= (11 * 60) && currentTime <= (15 * 60)) {
                    isOpen = true;
                }
            }
            shinysStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            shinysStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }

        // Yü Cozinha Oriental
        const yuStatus = document.getElementById('status-yu');
        if (yuStatus) {
            let isOpen = false;
            // Seg-Sex: 11:30-15:00, Sáb-Dom: 12:00-15:00
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Mon-Fri
                if (currentTime >= (11 * 60 + 30) && currentTime <= (15 * 60)) {
                    isOpen = true;
                }
            } else if (dayOfWeek === 0 || dayOfWeek === 6) { // Sun-Sat
                if (currentTime >= (12 * 60) && currentTime <= (15 * 60)) {
                    isOpen = true;
                }
            }
            yuStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            yuStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }

        // Yami Asian Food
        const yamiStatus = document.getElementById('status-yami');
        if (yamiStatus) {
            let isOpen = false;
            // Seg-Sáb: 11:30-16:00
            if (dayOfWeek >= 1 && dayOfWeek <= 6) { // Mon-Sat
                if (currentTime >= (11 * 60 + 30) && currentTime <= (16 * 60)) {
                    isOpen = true;
                }
            }
            yamiStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            yamiStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }

        // Yoribogo
        const yoribogoStatus = document.getElementById('status-yoribogo');
        if (yoribogoStatus) {
            let isOpen = false;
            // Seg-Sex: 11:30-14:30, Sáb: 11:30-14:15, Jantar: 18:00-21:00
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Mon-Fri
                if ((currentTime >= (11 * 60 + 30) && currentTime <= (14 * 60 + 30)) ||
                    (currentTime >= (18 * 60) && currentTime <= (21 * 60))) {
                    isOpen = true;
                }
            }
            else if (dayOfWeek === 6) { // Sat
                if ((currentTime >= (11 * 60 + 30) && currentTime <= (14 * 60 + 15)) ||
                    (currentTime >= (18 * 60) && currentTime <= (21 * 60))) {
                    isOpen = true;
                }
            }
            yoribogoStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            yoribogoStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }

        // Yü Korean Taste
        const yutogoStatus = document.getElementById('status-yutogo');
        if (yutogoStatus) {
            let isOpen = false;
            // Seg-Sex: 08:00-17:30, Sáb: 08:00-14:30
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Mon-Fri
                if (currentTime >= (8 * 60) && currentTime <= (17 * 60 + 30)) {
                    isOpen = true;
                }
            }
            else if (dayOfWeek === 6) { // Sat
                if (currentTime >= (8 * 60) && currentTime <= (14 * 60 + 30)) {
                    isOpen = true;
                }
            }
            yutogoStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            yutogoStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }

        // Felicidades da MÔ
        const felicidadesdamoStatus = document.getElementById('status-felicidadesdamo');
        if (felicidadesdamoStatus) {
            let isOpen = false;
            // Retirada de Seg a Sáb 11h às 13:45h
            if (dayOfWeek >= 1 && dayOfWeek <= 6) { // Mon-Sat
                if (currentTime >= (11 * 60) && currentTime <= (13 * 60 + 45)) {
                    isOpen = true;
                }
            }
            felicidadesdamoStatus.textContent = isOpen ? 'Aberto' : 'Fechado';
            felicidadesdamoStatus.classList.add(isOpen ? 'text-green-600' : 'text-red-600');
        }
    }

    updateRestaurantStatus();
    setInterval(updateRestaurantStatus, 60 * 1000); // Update every minute
});