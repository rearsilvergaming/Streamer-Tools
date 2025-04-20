function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        console.error('Theme toggle button not found.');
        return;
    }

    // Remove any existing event listeners
    const newThemeToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        newThemeToggle.textContent = '☀️ Light Mode';
    }

    // Toggle theme when button is clicked
    newThemeToggle.addEventListener('click', function () {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            newThemeToggle.textContent = '🌙 Dark Mode';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            newThemeToggle.textContent = '☀️ Light Mode';
        }
    });
}

// Function to handle file downloads
function downloadFile(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // Now this will be the .zip filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    // No need for specific button event listeners here anymore
});