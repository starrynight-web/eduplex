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
                // window.location.href = '2nd-semester.html';
                console.log('2nd Semester clicked');
                break;
            case '3rd':
                // window.location.href = '3rd-semester.html';
                console.log('3rd Semester clicked');
                break;
            case '4th':
                // window.location.href = '4th-semester.html';
                console.log('4th Semester clicked');
                break;
            case '5th':
                // window.location.href = '5th-semester.html';
                console.log('5th Semester clicked');
                break;
            case '6th':
                // window.location.href = '6th-semester.html';
                console.log('6th Semester clicked');
                break;
            case '7th':
                // window.location.href = '7th-semester.html';
                console.log('7th Semester clicked');
                break;
            case '8th':
                // window.location.href = '8th-semester.html';
                console.log('8th Semester clicked');
                break;
            case '9th':
                // window.location.href = '9th-semester.html';
                console.log('9th Semester clicked');
                break;
            case '10th':
                // window.location.href = '10th-semester.html';
                console.log('10th Semester clicked');
                break;
            case '11th':
                // window.location.href = '11th-semester.html';
                console.log('11th Semester clicked');
                break;
            case '12th':
                // window.location.href = '12th-semester.html';
                console.log('12th Semester clicked');
                break;
            default:
                console.log(`Clicked on ${semester} Semester`);
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
