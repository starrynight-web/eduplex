    // Typing Animation
const typingText = document.getElementById('typing-text');
const messages = [
    "Access comprehensive course materials...",
    "Prepare with previous year questions...",
    "Track your exam countdown...",
    "Calculate your target CGPA...",
    "All in one place for Software Engineering students!"
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typingText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentMessage.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// Start typing animation
setTimeout(type, 1000);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Archive Toggle
const subjectHeaders = document.querySelectorAll('.subject-header');
subjectHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
        // Don't toggle if click was on the "View More" button
        if (e.target.closest('.btn-outline')) return;
        
        const content = header.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Close all other archives
        document.querySelectorAll('.archive-content').forEach(el => {
            if (el !== content) el.classList.remove('active');
        });
        
        // Toggle current archive
        content.classList.toggle('active', !isActive);
    });
});

// Countdown Timer
function updateCountdown() {
    const examDate = new Date('August  22, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = examDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-subtitle').textContent = 'The exam has already passed!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// CGPA Calculator
document.getElementById('calculate-btn').addEventListener('click', function() {
    // Reset error messages and styles
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.previousElementSibling.style.borderColor = '#ddd';
    });
    
    // Get and validate inputs
    const targetCG = parseFloat(document.getElementById('target-cg').value);
    const midMarks = parseFloat(document.getElementById('mid-marks').value) || 0;
    const presentation = parseFloat(document.getElementById('presentation').value) || 0;
    const assignment = parseFloat(document.getElementById('assignment').value) || 0;
    const ctMarks = parseFloat(document.getElementById('ct-marks').value) || 0;
    const attendance = parseFloat(document.getElementById('attendance').value) || 0;
    const finalMarks = parseFloat(document.getElementById('final-marks').value) || 0;
    
    // Validate inputs
    let isValid = true;
    
    if (isNaN(targetCG) || targetCG < 1 || targetCG > 4) {
        showError('cg-error', 'target-cg');
        isValid = false;
    }
    
    if (midMarks < 0 || midMarks > 25) {
        showError('mid-error', 'mid-marks');
        isValid = false;
    }
    
    if (presentation < 0 || presentation > 8) {
        showError('presentation-error', 'presentation');
        isValid = false;
    }
    
    if (assignment < 0 || assignment > 5) {
        showError('assignment-error', 'assignment');
        isValid = false;
    }
    
    if (ctMarks < 0 || ctMarks > 15) {
        showError('ct-error', 'ct-marks');
        isValid = false;
    }
    
    if (attendance < 0 || attendance > 7) {
        showError('attendance-error', 'attendance');
        isValid = false;
    }
    
    if (finalMarks < 0 || finalMarks > 40) {
        showError('final-error', 'final-marks');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Calculate CGPA to marks conversion (4.0 scale to percentage)
    const targetPercentage = cgpaToPercentage(targetCG);
    const currentTotal = midMarks + attendance + ctMarks + presentation + assignment + finalMarks;
    
    let requiredFinal = 0;
    if (finalMarks === 0) {
        const marksWithoutFinal = midMarks + attendance + ctMarks + presentation + assignment;
        requiredFinal = Math.max(0, targetPercentage - marksWithoutFinal);
        requiredFinal = Math.min(40, requiredFinal);
    }
    
    // Display results
    document.getElementById('current-total').textContent = currentTotal.toFixed(2);
    document.getElementById('target-total').textContent = targetPercentage.toFixed(2);
    
    if (finalMarks === 0) {
        document.getElementById('required-final').textContent = `${requiredFinal.toFixed(2)} / 40`;
    } else {
        document.getElementById('required-final').textContent = `${finalMarks.toFixed(2)} / 40 (entered)`;
    }
    
    // Generate analysis
    generateAnalysis(currentTotal, targetPercentage, requiredFinal, targetCG, finalMarks);
});

// Helper function to show error messages
function showError(errorId, inputId) {
    const errorElement = document.getElementById(errorId);
    const inputElement = document.getElementById(inputId);
    errorElement.style.display = 'block';
    inputElement.style.borderColor = 'var(--danger-color)';
}

// Convert CGPA to percentage marks
function cgpaToPercentage(cgpa) {
    // Linear mapping: 4.0 = 80%, 3.0 = 60%, etc.
    return 20 * cgpa;
}

// Generate analysis text
function generateAnalysis(currentTotal, targetPercentage, requiredFinal, targetCG, finalMarks) {
    let analysis = "";
    const roundedCG = Math.round(targetCG * 4) / 4; // Round to nearest 0.25
    
    if (currentTotal >= targetPercentage) {
        analysis = `🎉 You've already achieved your target! Current: ${currentTotal.toFixed(2)}% vs Target: ${targetPercentage.toFixed(2)}% (CGPA ~${roundedCG.toFixed(2)})`;
    } else if (finalMarks > 0) {
        const needed = targetPercentage - currentTotal;
        analysis = `You need ${Math.max(0, needed).toFixed(2)}% more to reach your target CGPA of ${targetCG.toFixed(2)} (~${targetPercentage}%).`;
        
        if (needed > 0) {
            analysis += " Consider improving in other areas or aiming for a higher final exam score.";
        }
    } else {
        analysis = `To achieve CGPA ${targetCG.toFixed(2)} (~${targetPercentage}%), you need ${requiredFinal.toFixed(2)}/40 in the final exam.`;
        
        if (requiredFinal > 35) {
            analysis += "<br><br><span class='highlight'>This will be challenging! Focus on your preparation.</span>";
        } else if (requiredFinal > 30) {
            analysis += "<br><br><span class='highlight'>You'll need strong performance in finals.</span>";
        } else if (requiredFinal > 25) {
            analysis += "<br><br><span class='highlight'>With good preparation, this is achievable.</span>";
        } else if (requiredFinal > 20) {
            analysis += "<br><br><span class='highlight'>This target is comfortably within reach.</span>";
        } else {
            analysis += "<br><br><span class='highlight'>You're on track to exceed your target!</span>";
        }
    }
    
    document.getElementById('analysis').innerHTML = analysis;
}