// Subjects & Archives Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeSubjectsPage();
});

function initializeSubjectsPage() {
    // Add click event listeners to subject containers (including padding)
    const subjectContainers = document.querySelectorAll('.subject-archive-container');

    subjectContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            // Don't toggle if click was on interactive elements (links/buttons)
            if (e.target.closest('a, .btn, .btn-outline')) return;

            const content = container.querySelector('.exam-options');
            const isActive = content.classList.contains('active');

            // Close all other options
            document.querySelectorAll('.exam-options').forEach(el => {
                if (el !== content) el.classList.remove('active');
            });

            // Toggle current options
            content.classList.toggle('active', !isActive);
        });

        // Keep your existing hover effects
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}