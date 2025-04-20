// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙 Dark Mode';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️ Light Mode';
        }
    });
}

// Function to handle file downloads
function downloadFile(url, filename) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error('There was a problem downloading the file:', error);
        });
}


// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    // No need for specific button event listeners here anymore
});