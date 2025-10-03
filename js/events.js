
document.addEventListener('DOMContentLoaded', function () {
    const calendarUrl = 'https://calendar.google.com/calendar/ical/376d7ff5f2aea3c7491961fdfecc6aaee70fd2137653d183fc826b86b4fc7098%40group.calendar.google.com/public/basic.ics';

    // Define month names to map month numbers to Portuguese names
    const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    fetch(calendarUrl)
        .then(response => response.text())
        .then(data => {
            const jcalData = ICAL.parse(data);
            const comp = new ICAL.Component(jcalData);
            const events = comp.getAllSubcomponents('vevent');

            events.forEach(event => {
                const vevent = new ICAL.Event(event);
                const eventDetails = {
                    summary: vevent.summary,
                    startDate: vevent.startDate.toJSDate(),
                    endDate: vevent.endDate.toJSDate(),
                    description: vevent.description,
                    location: vevent.location
                };

                const monthIndex = eventDetails.startDate.getMonth();
                const monthName = monthNames[monthIndex];
                const eventListContainer = document.getElementById(`events-${monthName}`);

                if (eventListContainer) {
                    const eventHtml = `
                        <div class="bg-white p-4 rounded-xl shadow-md flex items-start space-x-3 card-hover cursor-pointer relative group" data-event-id="${vevent.uid}">
                            <div class="text-center bg-vermelho-paixao text-white rounded-lg px-4 py-2 flex-shrink-0">
                                <p class="font-black text-2xl">${eventDetails.startDate.getDate()}</p>
                                <p class="text-xs font-bold">${eventDetails.startDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase()}</p>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg text-preto-carvao">${eventDetails.summary}</h4>
                                <p class="text-sm text-gray-700">${eventDetails.location || ''}</p>
                                <p class="text-xs text-gray-500 mt-1">${eventDetails.description || ''}</p>
                            </div>
                        </div>
                    `;
                    eventListContainer.querySelector('.space-y-4').innerHTML += eventHtml;
                }
            });
        })
        .catch(error => console.error('Error fetching or parsing iCal data:', error));
});
