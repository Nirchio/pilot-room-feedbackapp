// Handle page transitions for thumbs down
document.getElementById('thumbs-down').addEventListener('click', function() {
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('second-page').style.display = 'flex';
});

// Handle page transitions for thumbs up
document.getElementById('thumbs-up').addEventListener('click', function() {
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'flex';
});

// Handle Double Thumbs Up (👍👍)
document.getElementById('double-thumbs-up').addEventListener('click', function() {
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'flex';
});

// Handle feedback selection (all buttons inside .feedback-option)
document.querySelectorAll('.feedback-option').forEach(button => {
    button.addEventListener('click', function() {
        showThankYouPage();
    });
});

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
