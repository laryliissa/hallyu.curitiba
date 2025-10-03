
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');
    const currentMonthDisplay = document.getElementById('current-month-display');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const prevMonthDesktopBtn = document.getElementById('prev-month-desktop');
    const nextMonthDesktopBtn = document.getElementById('next-month-desktop');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    function renderCalendar(month, year) {
        calendarContainer.innerHTML = ''; // Limpa o calendário existente
        const monthName = monthNames[month];
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        if (currentMonthDisplay) {
            currentMonthDisplay.textContent = `${monthName} ${year}`;
        }

        const calendarCard = document.createElement('div');
        calendarCard.className = 'calendar-card flex-shrink-0 w-full snap-start bg-white p-6 rounded-2xl shadow-xl';

        let calendarHTML = `
            <h3 class="text-2xl font-bold text-preto-carvao text-center mb-6">${monthName} ${year}</h3>
            <div class="grid grid-cols-7 gap-2 text-center font-bold text-gray-500 mb-4">
                <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
            </div>
            <div class="grid grid-cols-7 gap-1 sm:gap-2 text-center text-lg">
        `;

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarHTML += `<div class="text-gray-300 p-2"></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let dayClass = "p-2 hover:bg-gray-50 rounded cursor-pointer";
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayClass += " bg-vermelho-paixao text-white";
            }
            calendarHTML += `<div class="${dayClass}">${i}</div>`;
        }

        calendarHTML += `</div>`;
        calendarCard.innerHTML = calendarHTML;
        calendarContainer.appendChild(calendarCard);
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    }

    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    }

    if (prevMonthBtn) prevMonthBtn.addEventListener('click', prevMonth);
    if (nextMonthBtn) nextMonthBtn.addEventListener('click', nextMonth);
    if (prevMonthDesktopBtn) prevMonthDesktopBtn.addEventListener('click', prevMonth);
    if (nextMonthDesktopBtn) nextMonthDesktopBtn.addEventListener('click', nextMonth);

    renderCalendar(currentMonth, currentYear);
});
