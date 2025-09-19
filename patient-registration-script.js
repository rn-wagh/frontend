// Global variables
let otpSent = false;
let otpVerified = false;
let countdownTimer = null;
let generatedOTP = null;

// Go back to login page
function goBack() {
  window.history.back() || (window.location.href = 'login.html?type=patient');
}

// Auto-format phone number
document.getElementById('phoneNumber').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  // Remove +91 prefix if user is typing over it
  if (value.startsWith('91') && value.length > 2) {
    value = value.substring(2);
  }
  
  // Limit to 10 digits
  if (value.length > 10) {
    value = value.substring(0, 10);
  }
  
  // Add +91 prefix
  if (value.length > 0) {
    e.target.value = '+91' + value;
  } else {
    e.target.value = '+91';
  }
  
  // Enable/disable Send OTP button
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  if (value.length === 10) {
    sendOtpBtn.disabled = false;
  } else {
    sendOtpBtn.disabled = true;
    resetOTPState();
  }
});

// Format OTP input
document.getElementById('otpInput').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 6) {
    value = value.substring(0, 6);
  }
  e.target.value = value;
  
  // Enable verify button if OTP is 6 digits and OTP was sent
  const verifyBtn = document.getElementById('verifyOtpBtn');
  if (value.length === 6 && otpSent) {
    verifyBtn.disabled = false;
  } else {
    verifyBtn.disabled = true;
  }
});

// Send OTP function
function sendOTP() {
  const phoneInput = document.getElementById('phoneNumber');
  const phone = phoneInput.value.replace(/\D/g, '');
  
  if (phone.length !== 12 || !phone.startsWith('91')) {
    showOTPStatus('Please enter a valid phone number', 'error');
    return;
  }
  
  // Generate a random 6-digit OTP for demo purposes
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  
  // In a real application, you would send this to your backend
  console.log('Generated OTP:', generatedOTP); // For demo purposes
  
  // Simulate API call
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  sendOtpBtn.disabled = true;
  sendOtpBtn.textContent = 'Sending...';
  
  setTimeout(() => {
    otpSent = true;
    document.getElementById('otpInput').disabled = false;
    showOTPStatus('OTP sent successfully to ' + phoneInput.value, 'success');
    
    // Start countdown timer
    startCountdown();
    
    sendOtpBtn.textContent = 'Resend OTP';
  }, 2000);
}

// Verify OTP function
function verifyOTP() {
  const otpInput = document.getElementById('otpInput');
  const enteredOTP = otpInput.value;
  
  if (enteredOTP.length !== 6) {
    showOTPStatus('Please enter a 6-digit OTP', 'error');
    return;
  }
  
  const verifyBtn = document.getElementById('verifyOtpBtn');
  verifyBtn.disabled = true;
  verifyBtn.textContent = 'Verifying...';
  
  // Simulate API call
  setTimeout(() => {
    // In a real application, you would verify with your backend
    if (enteredOTP === generatedOTP) {
      otpVerified = true;
      verifyBtn.textContent = 'Verified ✓';
      verifyBtn.classList.add('success');
      showOTPStatus('Phone number verified successfully!', 'success');
      
      // Disable OTP input and resend button
      otpInput.disabled = true;
      document.getElementById('sendOtpBtn').disabled = true;
      
      // Enable submit button
      document.getElementById('submitBtn').disabled = false;
      
      // Clear countdown
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    } else {
      showOTPStatus('Invalid OTP. Please try again.', 'error');
      verifyBtn.disabled = false;
      verifyBtn.textContent = 'Verify';
    }
  }, 1500);
}

// Start countdown timer for resend OTP
function startCountdown() {
  let timeLeft = 60;
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  
  countdownTimer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      sendOtpBtn.disabled = false;
      sendOtpBtn.innerHTML = 'Resend OTP';
    } else {
      sendOtpBtn.innerHTML = `Resend OTP <span class="countdown">(${timeLeft}s)</span>`;
      timeLeft--;
    }
  }, 1000);
}

// Show OTP status message
function showOTPStatus(message, type) {
  const statusDiv = document.getElementById('otpStatus');
  statusDiv.textContent = message;
  statusDiv.className = `otp-status ${type}`;
}

// Reset OTP state
function resetOTPState() {
  otpSent = false;
  otpVerified = false;
  generatedOTP = null;
  
  const otpInput = document.getElementById('otpInput');
  const verifyBtn = document.getElementById('verifyOtpBtn');
  const submitBtn = document.getElementById('submitBtn');
  const statusDiv = document.getElementById('otpStatus');
  
  otpInput.disabled = true;
  otpInput.value = '';
  verifyBtn.disabled = true;
  verifyBtn.textContent = 'Verify';
  verifyBtn.classList.remove('success');
  submitBtn.disabled = true;
  statusDiv.textContent = '';
  statusDiv.className = 'otp-status';
  
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

// Auto-format time inputs
document.querySelectorAll('input[type="time"]').forEach(input => {
  input.addEventListener('change', function() {
    if (this.value) {
      const time = this.value.split(':');
      if (time.length === 2) {
        this.value = time[0].padStart(2, '0') + ':' + time[1].padStart(2, '0');
      }
    }
  });
});

// Auto-calculate age from birthdate
document.querySelector('input[name="birthdate"]').addEventListener('change', function() {
  if (this.value) {
    const birthdate = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    
    document.querySelector('input[name="age"]').value = age;
  }
});

// Form validation and submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Check if phone number is verified
  if (!otpVerified) {
    alert('Please verify your phone number before submitting the form.');
    return;
  }
  
  // Collect form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  
  // Basic validation
  if (!data.name || !data.age || !data.gender || !data.birthdate || !data.phone) {
    alert('Please fill in all required fields (Name, Phone, Age, Gender, Birthdate).');
    return;
  }
  
  // Validate phone number format
  const phone = data.phone.replace(/\D/g, '');
  if (phone.length !== 12 || !phone.startsWith('91')) {
    alert('Please enter a valid phone number.');
    return;
  }
  
  // Validate age
  if (data.age < 1 || data.age > 120) {
    alert('Please enter a valid age between 1 and 120.');
    return;
  }
  
  // Show loading state
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating Account...';
  
  // Simulate API call
  setTimeout(() => {
    // Here you would typically send the data to your server
    console.log('Registration data:', data);
    
    // Show success message
    alert('Patient registration successful! Your account has been created.');
    
    // Redirect to login page
    window.location.href = 'login.html?type=patient';
  }, 2000);
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Set initial phone number format
  const phoneInput = document.getElementById('phoneNumber');
  phoneInput.value = '+91';
  
  // Set focus to phone input
  phoneInput.focus();
  phoneInput.setSelectionRange(3, 3); // Position cursor after +91
  
  // Disable submit button initially
  document.getElementById('submitBtn').disabled = true;
});

// Handle page unload
window.addEventListener('beforeunload', function() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});

// Utility function to validate Indian phone numbers
function isValidIndianPhone(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Should be 12 digits starting with 91
  if (cleanPhone.length !== 12 || !cleanPhone.startsWith('91')) {
    return false;
  }
  
  // Extract the 10-digit mobile number
  const mobileNumber = cleanPhone.substring(2);
  
  // First digit should be 6, 7, 8, or 9
  const firstDigit = mobileNumber.charAt(0);
  return ['6', '7', '8', '9'].includes(firstDigit);
}

// Enhanced phone validation
document.getElementById('phoneNumber').addEventListener('blur', function(e) {
  const phone = e.target.value;
  if (phone && phone !== '+91') {
    if (!isValidIndianPhone(phone)) {
      showOTPStatus('Please enter a valid Indian mobile number', 'error');
      document.getElementById('sendOtpBtn').disabled = true;
    } else {
      showOTPStatus('', '');
    }
  }
});