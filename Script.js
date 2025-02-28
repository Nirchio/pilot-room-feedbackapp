const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby_LyY10lbR8PCpzMn6SflOiqdu7Q4mSvv8xl-9cXPXmU-BjfLGlxc1vwjqsVXHShN6hQ/exec"; // Replace with your actual Web App URL

// Handle page transitions for thumbs down
document.getElementById('thumbs-down').addEventListener('click', function() {
    sendFeedback("Thumbs Down", "General Dissatisfaction");
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('second-page').style.display = 'flex';
});

// Handle page transitions for thumbs up
document.getElementById('thumbs-up').addEventListener('click', function() {
    sendFeedback("Thumbs Up", "General Satisfaction");
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'flex';
});

// Handle Double Thumbs Up (👍👍)
document.getElementById('double-thumbs-up').addEventListener('click', function() {
    sendFeedback("Double Thumbs Up", "Absolutely Loved It");
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'flex';
});

// Handle feedback selection (all buttons inside .feedback-option)
document.querySelectorAll('.feedback-option').forEach(button => {
    button.addEventListener('click', function() {
        sendFeedback(getFeedbackType(), this.textContent);
        showThankYouPage();
    });
});

// Function to send feedback data to Google Sheet
function sendFeedback(feedbackType, option) {
    fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Ensures request is sent without waiting for a response
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ feedbackType, option })
    });
}

// Function to determine which feedback type was selected
function getFeedbackType() {
    if (document.getElementById('second-page').style.display === 'flex') return "Thumbs Down";
    if (document.getElementById('third-page').style.display === 'flex') return "Thumbs Up";
    if (document.getElementById('fourth-page').style.display === 'flex') return "Double Thumbs Up";
    return "Unknown";
}

// Function to show Thank You page and reset form after 5 seconds
function showThankYouPage() {
    document.getElementById('second-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'none';
    document.getElementById('thank-you-page').style.display = 'flex';

    // Reset after 5 seconds
    setTimeout(function() {
        document.getElementById('thank-you-page').style.display = 'none';
        document.getElementById('first-page').style.display = 'flex';
    }, 5000);
}
