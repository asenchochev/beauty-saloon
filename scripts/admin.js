document.addEventListener('DOMContentLoaded', function() {
    const appointmentsList = document.getElementById('appointments-list');
    const searchInput = document.querySelector('.search-input input');
    const serviceFilter = document.querySelector('.filter-select');
    const dateFilter = document.querySelector('input[type="date"]');

    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointmentsList.innerHTML = '';
        
        let filteredAppointments = appointments;

        // Прилагаме филтрите
        if (searchInput.value) {
            const searchTerm = searchInput.value.toLowerCase();
            filteredAppointments = filteredAppointments.filter(app => 
                app.name.toLowerCase().includes(searchTerm) ||
                app.phone.includes(searchTerm)
            );
        }

        if (serviceFilter.value) {
            filteredAppointments = filteredAppointments.filter(app => 
                app.service === serviceFilter.value
            );
        }

        if (dateFilter.value) {
            filteredAppointments = filteredAppointments.filter(app => 
                app.date === dateFilter.value
            );
        }

        filteredAppointments.forEach((appointment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(appointment.date)}</td>
                <td>${appointment.time}</td>
                <td>${getServiceName(appointment.service)}</td>
                <td>${appointment.name}</td>
                <td>${appointment.phone}</td>
                <td><span class="status-badge status-${appointment.status}">${getStatusText(appointment.status)}</span></td>
                <td>
                    <button onclick="updateStatus(${index}, 'confirmed')" class="btn btn-confirm">
                        <i class="fas fa-check"></i>
                    </button>
                    <button onclick="updateStatus(${index}, 'cancelled')" class="btn btn-cancel">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            `;
            appointmentsList.appendChild(row);
        });
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('bg-BG');
    }

    function getServiceName(service) {
        const services = {
            'haircut': 'Прическа',
            'nails': 'Маникюр',
            'makeup': 'Грим'
        };
        return services[service] || service;
    }

    function getStatusText(status) {
        const statuses = {
            'pending': 'Очаква потвърждение',
            'confirmed': 'Потвърден',
            'cancelled': 'Отказан'
        };
        return statuses[status] || status;
    }

    // Функция за обновяване на статуса
    window.updateStatus = function(index, status) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments[index].status = status;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    }

    // Добавяме слушатели за филтрите
    searchInput.addEventListener('input', loadAppointments);
    serviceFilter.addEventListener('change', loadAppointments);
    dateFilter.addEventListener('change', loadAppointments);

    // Първоначално зареждане на резервациите
    loadAppointments();
});


// Функция за изход
window.logout = function() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}