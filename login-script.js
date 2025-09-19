// Get login type from URL or sessionStorage
function getLoginType() {
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get('type');
  const typeFromStorage = sessionStorage.getItem('loginType');
  return typeFromUrl || typeFromStorage || 'doctor';
}

// Set the login title based on type
function setLoginTitle() {
  const loginType = getLoginType();
  const title = document.getElementById('loginTitle');
  if (loginType === 'patient') {
    title.textContent = 'Patient Login';
  } else {
    title.textContent = 'Doctor Login';
  }
}

// Go back to main page
function goBack() {
  window.history.back() || (window.location.href = 'index.html');
}

// Handle create account
function createAccount() {
  const loginType = getLoginType();
  if (loginType === 'patient') {
    // Redirect to patient registration page
    window.location.href = 'patient-registration.html';
  } else {
    // For doctors, show alert (you can create a doctor registration page later)
    alert('Doctor registration functionality will be implemented soon!');
  }
}

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const mobile = document.getElementById('mobile').value;
  const otp = document.getElementById('otp').value;
  const loginType = getLoginType();
  
  if (mobile && otp) {
    // Show success message
    alert(`${loginType.charAt(0).toUpperCase() + loginType.slice(1)} login successful!`);
    
    // Add a small delay to ensure user sees the success message
    setTimeout(() => {
      // Redirect to appropriate dashboard
      if (loginType === 'doctor') {
        // Check if doctor dashboard exists, otherwise show alert
        checkPageAndRedirect('doctor-dashboard.html', 'Doctor dashboard page not found. Please create doctor-dashboard.html');
      } else {
        // Check if patient dashboard exists, otherwise show alert
        checkPageAndRedirect('patient-dashboard.html', 'Patient dashboard page not found. Please create patient-dashboard.html');
      }
    }, 1000); // 1 second delay
  }
});

// Function to check if page exists and redirect
function checkPageAndRedirect(url, errorMessage) {
  // Try to redirect directly
  try {
    window.location.href = url;
  } catch (error) {
    // If redirect fails, show error message
    alert(errorMessage);
    console.error('Redirect failed:', error);
  }
}

// Auto-format mobile number
document.getElementById('mobile').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value && !value.startsWith('91')) {
    if (value.length === 10) {
      value = '91' + value;
    }
  }
  e.target.value = '+' + value;
});

// Auto-format OTP
document.getElementById('otp').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  setLoginTitle();
});