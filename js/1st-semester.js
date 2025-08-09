// Subjects & Archives Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeSubjectsPage();
});

function initializeSubjectsPage() {
    // Add click event listeners to subject cards
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            handleSubjectClick(subject, this);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function handleSubjectClick(subject, cardElement) {
    // Add loading state
    cardElement.classList.add('loading');
    
    // Simulate loading delay
    setTimeout(() => {
        cardElement.classList.remove('loading');
        
        // Handle different subjects
        switch(subject) {
            case 'introduction-to-software':
                navigateToSubject('Introduction to Software', 'intro-software');
                break;
            case 'computer-fundamentals':
                navigateToSubject('Computer Fundamentals', 'computer-fundamentals');
                break;
            case 'computer-fundamental-lab':
                navigateToSubject('Computer Fundamental Lab', 'computer-fundamentals-lab');
                break;
            case 'bangladesh-studies':
                navigateToSubject('Bangladesh Studies', 'bangladesh-studies');
                break;
            case 'english':
                navigateToSubject('English', 'english');
                break;
            default:
                console.log('Unknown subject:', subject);
        }
    }, 300);
}

function navigateToSubject(subjectName, subjectId) {
    // You can customize this function to navigate to specific subject pages
    // For now, we'll show an alert and could redirect to specific pages
    
    // Option 1: Show alert (temporary)
    alert(`Navigating to ${subjectName} archives...`);
    
    // Option 2: Redirect to specific pages (uncomment and modify as needed)
    /*
    const subjectPages = {
        'intro-software': 'subjects/introduction-to-software.html',
        'computer-fundamentals': 'subjects/computer-fundamentals.html',
        'computer-fundamentals-lab': 'subjects/computer-fundamentals-lab.html',
        'bangladesh-studies': 'subjects/bangladesh-studies.html',
        'english': 'subjects/english.html'
    };
    
    const pageUrl = subjectPages[subjectId];
    if (pageUrl) {
        window.location.href = pageUrl;
    }
    */
    
    // Option 3: Open in new tab (uncomment and modify as needed)
    /*
    const subjectUrls = {
        'intro-software': 'https://example.com/intro-software',
        'computer-fundamentals': 'https://example.com/computer-fundamentals',
        'computer-fundamentals-lab': 'https://example.com/computer-fundamentals-lab',
        'bangladesh-studies': 'https://example.com/bangladesh-studies',
        'english': 'https://example.com/english'
    };
    
    const url = subjectUrls[subjectId];
    if (url) {
        window.open(url, '_blank');
    }
    */
}

// Add smooth scrolling for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    const subjectCards = document.querySelectorAll('.subject-card');
    const currentIndex = Array.from(subjectCards).findIndex(card => card.classList.contains('active'));
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            navigateCards(subjectCards, currentIndex, 1);
            break;
        case 'ArrowUp':
            event.preventDefault();
            navigateCards(subjectCards, currentIndex, -1);
            break;
        case 'Enter':
            event.preventDefault();
            const activeCard = document.querySelector('.subject-card.active');
            if (activeCard) {
                activeCard.click();
            }
            break;
    }
});

function navigateCards(cards, currentIndex, direction) {
    // Remove active class from current card
    if (currentIndex >= 0) {
        cards[currentIndex].classList.remove('active');
    }
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = cards.length - 1;
    if (newIndex >= cards.length) newIndex = 0;
    
    // Add active class to new card
    cards[newIndex].classList.add('active');
    cards[newIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        const subjectCards = document.querySelectorAll('.subject-card');
        const currentIndex = Array.from(subjectCards).findIndex(card => card.classList.contains('active'));
        
        if (diff > 0) {
            // Swipe up
            navigateCards(subjectCards, currentIndex, 1);
        } else {
            // Swipe down
            navigateCards(subjectCards, currentIndex, -1);
        }
    }
}

// Add accessibility features
function addAccessibilityFeatures() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach((card, index) => {
        // Add ARIA labels
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Navigate to ${card.querySelector('.subject-title').textContent} archives`);
        
        // Add keyboard event listeners
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
addAccessibilityFeatures();
