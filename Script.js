const GOOGLE_SHEET_WEBHOOK_URL = "PASTE_YOUR_DEPLOYMENT_URL_HERE";

// Handle page transitions for thumbs down
document.getElementById('thumbs-down').addEventListener('click', function() {
    sendFeedback("Thumbs Down", "General Dissatisfaction");
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('second-page').style.display = 'flex';
});

// Handle Thumbs Up (👍)
document.getElementById('thumbs-up').addEventListener('click', function() {
    sendFeedback("Thumbs Up", "Absolutely Loved It");  // Kept backend behavior same as "Double Thumbs Up"
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'flex';
});

// Send feedback when an option is selected
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
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ feedbackType, option })
    });
}

// Function to determine which feedback type was selected
function getFeedbackType() {
    if (document.getElementById('second-page').style.display === 'flex') return "Thumbs Down";
    if (document.getElementById('third-page').style.display === 'flex') return "Thumbs Up";  // Updated name here
    return "Unknown";
}

// Function to show Thank You page and reset form after 5 seconds
function showThankYouPage() {
    document.getElementById('second-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'none';
    document.getElementById('thank-you-page').style.display = 'flex';

    // Reset after 5 seconds
    setTimeout(function() {
        document.getElementById('thank-you-page').style.display = 'none';
        document.getElementById('first-page').style.display = 'flex';
    }, 5000);
}
