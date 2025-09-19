// Navigation functions
function goBack() {
  window.history.back() || (window.location.href = 'patient-dashboard.html');
}

// Calendar generation
function generateCalendar() {
  const calendarGrid = document.getElementById('calendarGrid');
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Sample appointments (day 22 for September 2025)
  const appointmentDays = [22];
  
  // Clear previous calendar
  calendarGrid.innerHTML = '';
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day';
    calendarGrid.appendChild(emptyDay);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    dayElement.onclick = () => selectDay(dayElement, day);
    
    // Mark appointment days
    if (appointmentDays.includes(day)) {
      dayElement.classList.add('has-appointment');
    }
    
    // Highlight today
    const today = new Date();
    if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      dayElement.classList.add('today');
    }
    
    calendarGrid.appendChild(dayElement);
  }
}

// Day selection
function selectDay(element, day) {
  // Remove previous selection
  document.querySelectorAll('.calendar-day.selected').forEach(el => {
    el.classList.remove('selected');
  });
  
  // Add selection to clicked day
  element.classList.add('selected');
  
  console.log(`Selected day: ${day}`);
}

// Action functions
function rescheduleAppointment() {
  document.getElementById('rescheduleModal').style.display = 'flex';
}

function cancelAppointment() {
  document.getElementById('cancelModal').style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  // Reset forms when closing
  if (modalId === 'rescheduleModal') {
    document.getElementById('newDate').value = '';
    document.querySelectorAll('.time-slot.selected').forEach(slot => {
      slot.classList.remove('selected');
    });
    document.getElementById('rescheduleReason').value = '';
    document.getElementById('rescheduleNotes').value = '';
  }
  if (modalId === 'cancelModal') {
    document.querySelectorAll('input[name="cancelReason"]').forEach(radio => {
      radio.checked = false;
    });
    document.getElementById('cancelNotes').value = '';
  }
}

// Time slot selection
function initializeTimeSlots() {
  const timeSlots = document.querySelectorAll('.time-slot:not(.unavailable)');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', function() {
      // Remove previous selection
      timeSlots.forEach(s => s.classList.remove('selected'));
      // Add selection to clicked slot
      this.classList.add('selected');
    });
  });
}

// Date change handler
function handleDateChange() {
  const dateInput = document.getElementById('newDate');
  dateInput.addEventListener('change', function() {
    // Simulate different availability for different dates
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
      slot.classList.remove('unavailable', 'selected');
      // Randomly make some slots unavailable
      if (Math.random() < 0.2) {
        slot.classList.add('unavailable');
      }
    });
  });
}

// Confirm reschedule
function confirmReschedule() {
  const newDate = document.getElementById('newDate').value;
  const selectedTimeSlot = document.querySelector('.time-slot.selected');
  const reason = document.getElementById('rescheduleReason').value;
  const notes = document.getElementById('rescheduleNotes').value;

  if (!newDate) {
    alert('Please select a new date.');
    return;
  }

  if (!selectedTimeSlot) {
    alert('Please select a time slot.');
    return;
  }

  // Close reschedule modal
  closeModal('rescheduleModal');
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  const selectedTime = selectedTimeSlot.dataset.time;
  const formattedDate = new Date(newDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  successMessage.innerHTML = `
    Your appointment has been successfully rescheduled to:<br>
    <strong>${formattedDate} at ${selectedTime}</strong><br><br>
    You will receive a confirmation email shortly.
  `;
  
  document.getElementById('successModal').style.display = 'flex';
  
  // Update the appointment display (simulate)
  setTimeout(() => {
    updateAppointmentDisplay(formattedDate, selectedTime);
  }, 2000);
}

// Confirm cancel
function confirmCancel() {
  const selectedReason = document.querySelector('input[name="cancelReason"]:checked');
  const notes = document.getElementById('cancelNotes').value;

  if (!selectedReason) {
    alert('Please select a reason for cancellation.');
    return;
  }

  // Close cancel modal
  closeModal('cancelModal');
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  successMessage.innerHTML = `
    Your appointment has been successfully cancelled.<br><br>
    A confirmation email has been sent to you.<br>
    If you need to reschedule, please contact us or book a new appointment.
  `;
  
  document.getElementById('successModal').style.display = 'flex';
  
  // Update the appointment display (simulate)
  setTimeout(() => {
    updateAppointmentDisplayForCancel();
  }, 2000);
}

// Update appointment display after reschedule
function updateAppointmentDisplay(newDate, newTime) {
  const appointmentDetails = document.querySelector('.appointment-details');
  const dateDetail = appointmentDetails.querySelector('.detail-item:first-child .detail-text');
  dateDetail.innerHTML = `
    <strong>Date:</strong> ${newDate}<br>
    <small>${newDate.split(',')[0]}</small>
  `;
  
  const timeDetail = appointmentDetails.querySelector('.detail-item:nth-child(2) .detail-text');
  timeDetail.innerHTML = `
    <strong>Time:</strong> ${newTime}<br>
    <small>Duration: 60 minutes</small>
  `;
}

// Update appointment display after cancel
function updateAppointmentDisplayForCancel() {
  const currentAppointment = document.querySelector('.current-appointment');
  currentAppointment.innerHTML = `
    <div class="appointment-header">
      <h3 class="appointment-title">No Upcoming Appointments</h3>
      <span class="appointment-status" style="background: #6b7280;">Cancelled</span>
    </div>
    <div style="text-align: center; padding: 20px; color: #666;">
      <p>You don't have any upcoming appointments.</p>
      <button class="action-btn" style="margin-top: 15px; min-width: 200px;" onclick="alert('Book new appointment functionality - Coming Soon!')">
        Book New Appointment
      </button>
    </div>
  `;
}

// Close modals when clicking outside
function setupModalClosing() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  });
}

// Menu functionality
function initializeMenu() {
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      alert('Menu functionality - Coming Soon!');
    });
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  generateCalendar();
  initializeMenu();
  initializeTimeSlots();
  handleDateChange();
  setupModalClosing();
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('newDate').setAttribute('min', today);
});

// Handle window resize
window.addEventListener('resize', () => {
  // Regenerate calendar on resize for better mobile experience
  generateCalendar();
});