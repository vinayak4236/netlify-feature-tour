// Event Details JavaScript for Campus Connect Portal

document.addEventListener('DOMContentLoaded', function() {
    // Get event ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    
    if (!eventId) {
        showError("Event ID not found in URL");
        return;
    }
    
    // Find event in data
    const event = eventsData.find(e => e.id === eventId);
    
    if (!event) {
        showError("Event not found");
        return;
    }
    
    // Load event details
    loadEventDetails(event);
    
    // Load related events
    if (event.relatedEvents && event.relatedEvents.length > 0) {
        loadRelatedEvents(event.relatedEvents);
    }
    
    // Hide loading spinner
    document.getElementById('loading').style.display = 'none';
    
    // Initialize register button
    initRegisterButton();
});

// Load event details
function loadEventDetails(event) {
    // Clone the template
    const template = document.getElementById('eventDetailTemplate');
    const clone = document.importNode(template.content, true);
    
    // Set event details
    clone.getElementById('eventTitle').textContent = event.title;
    clone.getElementById('eventHeading').textContent = event.title;
    clone.getElementById('eventImage').src = event.image;
    clone.getElementById('eventImage').alt = event.title;
    clone.getElementById('eventCategory').textContent = event.category;
    clone.getElementById('eventCategory').className = `badge bg-${event.categoryClass} me-2`;
    clone.getElementById('eventStatus').textContent = event.status;
    clone.getElementById('eventStatus').className = `badge bg-${event.statusClass}`;
    clone.getElementById('eventDescription').textContent = event.description;
    clone.getElementById('eventDate').textContent = event.date;
    clone.getElementById('eventTime').textContent = event.time;
    clone.getElementById('eventLocation').textContent = event.location;
    clone.getElementById('eventOrganizer').textContent = event.organizer;
    clone.getElementById('registrationDeadline').textContent = event.registrationDeadline;
    clone.getElementById('availableSeats').textContent = event.availableSeats;
    clone.getElementById('contactEmail').textContent = event.contactEmail;
    clone.getElementById('contactPhone').textContent = event.contactPhone;
    
    // Add event schedule
    const scheduleTable = clone.getElementById('eventSchedule');
    if (event.schedule && event.schedule.length > 0) {
        event.schedule.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.time}</td>
                <td>${item.activity}</td>
                <td>${item.location}</td>
            `;
            scheduleTable.appendChild(row);
        });
    } else {
        // Hide schedule section if no schedule
        clone.getElementById('eventScheduleSection').style.display = 'none';
    }
    
    // Append to container
    document.getElementById('eventDetailsContainer').appendChild(clone);
}

// Load related events
function loadRelatedEvents(relatedEventIds) {
    // Get related events
    const relatedEvents = eventsData.filter(event => relatedEventIds.includes(event.id));
    
    if (relatedEvents.length === 0) return;
    
    // Show related events section
    document.getElementById('relatedEventsSection').style.display = 'block';
    
    // Get container
    const container = document.getElementById('relatedEventsContainer');
    
    // Get template
    const template = document.getElementById('relatedEventTemplate');
    
    // Add related events
    relatedEvents.forEach(event => {
        const clone = document.importNode(template.content, true);
        
        // Set event details
        clone.querySelector('.related-event-image').src = event.image;
        clone.querySelector('.related-event-image').alt = event.title;
        clone.querySelector('.related-event-category').textContent = event.category;
        clone.querySelector('.related-event-category').className = `badge bg-${event.categoryClass} mb-2`;
        clone.querySelector('.related-event-title').textContent = event.title;
        clone.querySelector('.related-event-date-location').innerHTML = `<i class="fas fa-calendar-alt"></i> ${event.date} | <i class="fas fa-map-marker-alt"></i> ${event.location}`;
        clone.querySelector('.related-event-link').href = `event-details.html?id=${event.id}`;
        
        // Append to container
        container.appendChild(clone);
    });
}

// Show error message
function showError(message) {
    const container = document.getElementById('eventDetailsContainer');
    container.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error!</h4>
            <p>${message}</p>
            <hr>
            <p class="mb-0">Please go back to <a href="events.html" class="alert-link">Events</a> page.</p>
        </div>
    `;
    
    // Hide loading spinner
    document.getElementById('loading').style.display = 'none';
}

// Initialize register button
function initRegisterButton() {
    const registerButton = document.getElementById('registerButton');
    if (!registerButton) return;
    
    registerButton.addEventListener('click', function() {
        // Disable button
        registerButton.disabled = true;
        registerButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        
        // Simulate registration process
        setTimeout(function() {
            // Show success message
            document.getElementById('registrationSuccess').style.display = 'block';
            
            // Update button
            registerButton.innerHTML = 'Registered';
            registerButton.classList.remove('btn-success');
            registerButton.classList.add('btn-secondary');
            
            // Update available seats
            const availableSeatsElement = document.getElementById('availableSeats');
            let availableSeats = parseInt(availableSeatsElement.textContent);
            availableSeatsElement.textContent = availableSeats - 1;
        }, 1500);
    });
}