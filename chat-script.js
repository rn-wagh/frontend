// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
  initializeChat();
});

function initializeChat() {
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  
  // Set welcome message time
  document.getElementById('welcomeTime').textContent = getCurrentTime();
  
  // Auto-resize textarea
  messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    
    // Enable/disable send button
    sendBtn.disabled = this.value.trim() === '';
  });

  // Send message on Enter (but not Shift+Enter)
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Initial state
  sendBtn.disabled = true;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const messageText = messageInput.value.trim();
  
  if (messageText === '') return;

  // Add user message
  addMessage(messageText, 'user');
  
  // Clear input
  messageInput.value = '';
  messageInput.style.height = 'auto';
  document.getElementById('sendBtn').disabled = true;
  
  // Show typing indicator and simulate bot response
  showTypingIndicator();
  
  // Simulate bot response after delay
  setTimeout(() => {
    hideTypingIndicator();
    const botResponse = generateBotResponse(messageText);
    addMessage(botResponse, 'bot');
  }, 1500 + Math.random() * 1000);
}

function sendQuickMessage(message) {
  // Add user message
  addMessage(message, 'user');
  
  // Show typing indicator and simulate bot response
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    const botResponse = generateBotResponse(message);
    addMessage(botResponse, 'bot');
  }, 1000 + Math.random() * 500);
}

function addMessage(text, sender) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender} ${sender === 'user' ? 'slide-in-right' : 'slide-in-left'}`;
  
  const avatar = document.createElement('div');
  avatar.className = `avatar ${sender}`;
  avatar.textContent = sender === 'user' ? 'You' : 'AS';
  
  const messageContent = document.createElement('div');
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'message-time';
  timeDiv.textContent = getCurrentTime();
  
  messageContent.appendChild(bubble);
  messageContent.appendChild(timeDiv);
  
  if (sender === 'user') {
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(avatar);
  } else {
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
  }
  
  chatMessages.appendChild(messageDiv);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  document.getElementById('typingIndicator').style.display = 'flex';
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  document.getElementById('typingIndicator').style.display = 'none';
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Comprehensive response system
  if (message.includes('appointment') || message.includes('book')) {
    return "I'd be happy to help you book an appointment! We offer consultations for Panchakarma treatments, diet planning, and general wellness. Would you prefer morning or evening slots? Our available times are 9 AM - 12 PM and 2 PM - 6 PM.";
  }
  
  if (message.includes('treatment') || message.includes('panchakarma')) {
    return "Our Panchakarma treatments include Vamana (detox therapy), Virechana (cleansing), Basti (rejuvenation), Nasya (nasal therapy), and Raktamokshana (blood purification). Each treatment is personalized based on your dosha and health needs. Which treatment interests you most?";
  }
  
  if (message.includes('diet') || message.includes('food') || message.includes('nutrition')) {
    return "Our Ayurvedic diet consultations focus on your unique body constitution (Prakriti) and current imbalances (Vikriti). We provide personalized meal plans, seasonal eating guidelines, and therapeutic recipes. Would you like to schedule a consultation with our nutritionist?";
  }
  
  if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
    return "Our treatment pricing varies based on the therapy: Consultation: ₹500, Single Panchakarma session: ₹1,500-3,000, Complete treatment packages: ₹15,000-25,000. We also offer family packages and seasonal discounts. Would you like detailed pricing for specific treatments?";
  }
  
  if (message.includes('location') || message.includes('address') || message.includes('where')) {
    return "AyurSutra is located in the heart of the wellness district. We have easy parking and are accessible by public transport. Would you like me to share our exact address and directions? We're open Monday-Saturday, 9 AM - 6 PM.";
  }
  
  if (message.includes('vamana')) {
    return "Vamana is a therapeutic vomiting process that cleanses excess Kapha from the stomach and respiratory system. It's excellent for asthma, skin conditions, and metabolic disorders. The treatment takes 3-5 days with proper preparation. Would you like to know about the preparation process?";
  }
  
  if (message.includes('virechana')) {
    return "Virechana is a purging therapy that cleanses the liver and balances Pitta dosha. It's highly effective for digestive issues, skin problems, and inflammatory conditions. The complete process takes 7-10 days. Shall I explain the pre-treatment preparations?";
  }
  
  if (message.includes('basti')) {
    return "Basti is considered the most important Panchakarma treatment, involving medicated enemas to balance Vata dosha. It's excellent for joint problems, nervous system disorders, and digestive issues. We offer both oil-based (Anuvasana) and decoction-based (Niruha) Basti. Which type interests you?";
  }
  
  if (message.includes('nasya')) {
    return "Nasya involves administering medicated oils through the nostrils to cleanse the head and neck region. It's perfect for headaches, sinusitis, and respiratory issues. The therapy also enhances mental clarity. Would you like to know about our different Nasya preparations?";
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! Welcome to AyurSutra. I'm here to guide you through our holistic Ayurvedic treatments and wellness services. What brings you to us today - are you looking for healing, prevention, or simply curious about Ayurveda?";
  }
  
  if (message.includes('thank')) {
    return "You're most welcome! It's our pleasure to help you on your wellness journey. Feel free to ask anything else about our treatments, or shall I help you book an appointment?";
  }
  
  if (message.includes('dosha')) {
    return "Understanding your dosha is fundamental to Ayurvedic treatment! We have Vata (air), Pitta (fire), and Kapha (earth) doshas. Each person has a unique combination. Our practitioners conduct thorough dosha assessments including pulse diagnosis, physical examination, and lifestyle analysis. Would you like to book a dosha consultation?";
  }

  if (message.includes('help') || message.includes('support')) {
    return "I'm here to help! You can ask me about: Treatment details and benefits, Appointment booking, Diet consultations, Pricing information, Location and timings, Wellness programs. What would you like to know more about?";
  }
  
  // Default responses for unmatched queries
  const defaultResponses = [
    "That's an interesting question! Let me connect you with our Ayurvedic specialist who can provide detailed guidance. In the meantime, would you like to know about our consultation process?",
    "I appreciate your question about Ayurveda. Our experienced practitioners can provide personalized advice based on your specific needs. Would you like to schedule a consultation?",
    "Thank you for reaching out! For specific health concerns, I recommend speaking with our qualified Ayurvedic doctors. They can provide proper assessment and treatment plans. Shall I help you book an appointment?",
    "Our team of experienced Ayurvedic practitioners would be the best to address this. They offer detailed consultations to understand your unique constitution and needs. Would you like to schedule one?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function goBack() {
  // Navigate back to patient dashboard
  window.history.back() || (window.location.href = 'patient-dashboard.html');
}

// Handle window resize for responsive design
window.addEventListener('resize', function() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Prevent form submission on Enter in textarea
document.getElementById('messageInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
  }
});