document.addEventListener('DOMContentLoaded', function () {
    const calendarUrl = 'https://calendar.google.com/calendar/ical/376d7ff5f2aea3c7491961fdfecc6aaee70fd2137653d183fc826b86b4fc7098%40group.calendar.google.com/private-1ee52afbcd85b2ea46bf06d2378dc3d8/basic.ics';

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
                    // Parse description to extract details
                    const descriptionLines = eventDetails.description ? eventDetails.description.split('\n') : [];
                    let time = '';
                    let price = '';
                    let link = '';
                    let linkText = '';
                    let descriptionText = '';

                    descriptionLines.forEach(line => {
                        if (line.startsWith('⏰')) {
                            time = line.replace('⏰', '').trim();
                        } else if (line.startsWith('💰')) {
                            price = line.replace('💰', '').trim();
                        } else if (line.startsWith('🔗')) {
                            link = line.replace('🔗', '').trim();
                            if (link.startsWith('@')) {
                                linkText = link;
                                link = `https://www.instagram.com/${link.substring(1)}/`;
                            } else {
                                linkText = 'Mais informações';
                            }
                        } else {
                            descriptionText += line + ' ';
                        }
                    });

                    descriptionText = descriptionText.trim();

                    const eventHtml = `
                        <div class="bg-bege-pinhao p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 card-hover">
                            <div class="text-center bg-vermelho-paixao text-white rounded-lg px-4 py-2 flex-shrink-0 w-full md:w-auto">
                                <p class="font-black text-2xl">${eventDetails.startDate.getDate()}</p>
                                <p class="font-bold">${eventDetails.startDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase()}</p>
                            </div>
                            <div class="flex-grow">
                                <h2 class="text-2xl font-bold text-preto-carvao">${eventDetails.summary}</h2>
                                <p class="text-gray-600 mt-1">${descriptionText}</p>
                                <div class="text-sm text-gray-500 mt-4 space-y-1">
                                    ${eventDetails.location ? `<p>📍 ${eventDetails.location}</p>` : ''}
                                    ${time ? `<p>⏰ ${time}</p>` : ''}
                                    ${price ? `<p>💰 ${price}</p>` : ''}
                                    ${link ? `<p><a href="${link}" target="_blank" class="text-azul-guia hover:underline flex items-center"><svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></svg>${linkText}</a></p>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                    eventListContainer.querySelector('.space-y-4').innerHTML += eventHtml;
                }
            });
        })
        .catch(error => console.error('Error fetching or parsing iCal data:', error));
});