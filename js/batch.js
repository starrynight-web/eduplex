// Batch-45 Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get all semester cards
    const semesterCards = document.querySelectorAll('.semester-card');
    
    // Add click event listeners to semester cards
    semesterCards.forEach(card => {
        card.addEventListener('click', function() {
            const semester = this.getAttribute('data-semester');
            handleSemesterClick(semester);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Handle semester card clicks
    function handleSemesterClick(semester) {
        switch(semester) {
            case '1st':
                window.location.href = '1st-semester.html';
                break;
            case '2nd':
            case '3rd':
            case '4th':
            case '5th':
            case '6th':
            case '7th':
            case '8th':
            case '9th':
            case '10th':
            case '11th':
            case '12th':
                // Redirect to unavailable semester page
                window.location.href = 'unavailable-semester.html';
                break;
            default:
                console.log(`Clicked on ${semester} Semester`);
                window.location.href = 'unavailable-semester.html';
        }
    }
    
    // Add smooth scrolling for better UX
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for cards
    function animateCards() {
        const cards = document.querySelectorAll('.semester-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Initialize animations
    animateCards();
});
