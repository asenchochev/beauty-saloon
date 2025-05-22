document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const bookingMessage = document.getElementById('booking-message');

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            status: 'pending' // Добавяме статус по подразбиране
        };

        // Вземаме съществуващите резервации
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        
        // Проверяваме за съществуваща резервация
        const isTimeSlotTaken = appointments.some(app => 
            app.date === formData.date && 
            app.time === formData.time &&
            app.status !== 'cancelled'
        );

        if (isTimeSlotTaken) {
            showMessage('Този час вече е зает. Моля, изберете друг час.', 'error');
            return;
        }

        // Добавяме новата резервация
        appointments.push(formData);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        // Показваме съобщение за успех
        showMessage('Успешно направихте резервация! Очаквайте потвърждение.', 'success');
        bookingForm.reset();
    });

    function showMessage(text, type) {
        bookingMessage.textContent = text;
        bookingMessage.className = `booking-message ${type}`;
        
        // Изчистваме съобщението след 3 секунди
        setTimeout(() => {
            bookingMessage.textContent = '';
            bookingMessage.className = 'booking-message';
        }, 3000);
    }
});