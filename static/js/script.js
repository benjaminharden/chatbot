document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Store conversation history
    const conversationHistory = [
        { role: "assistant", content: "Hello! I'm Claude. How can I help you today?" }
    ];

    // Function to add a message to the UI
    function addMessageToUI(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.classList.add('pre-wrap');
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Function to add loading indicator
    function addLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'assistant', 'loading');
        loadingDiv.id = 'loading-indicator';
        
        const loadingDots = document.createElement('div');
        loadingDots.classList.add('loading-dots');
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            loadingDots.appendChild(dot);
        }
        
        loadingDiv.appendChild(loadingDots);
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Function to remove loading indicator
    function removeLoadingIndicator() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }
    
    // Function to send a message
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;
        
        // Clear input
        userInput.value = '';
        
        // Add user message to UI
        addMessageToUI(userMessage, 'user');
        
        // Add to conversation history
        conversationHistory.push({ role: "user", content: userMessage });
        
        // Show loading indicator
        addLoadingIndicator();
        
        try {
            const response = await fetch('/api/conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: conversationHistory
                })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            // Remove loading indicator
            removeLoadingIndicator();
            
            // Add assistant response to UI
            addMessageToUI(data.response, 'assistant');
            
            // Add to conversation history
            conversationHistory.push({ role: "assistant", content: data.response });
            
        } catch (error) {
            console.error('Error:', error);
            removeLoadingIndicator();
            addMessageToUI('Sorry, there was an error processing your request.', 'assistant');
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
});
