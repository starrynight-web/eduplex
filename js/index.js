    // Typing Animation
const typingText = document.getElementById('typing-text');
const messages = [
    "Access comprehensive course materials...",
    "Prepare with previous year questions...",
    "Track your exam countdown...",
    "Calculate your target CGPA...",
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

// Batch Selection Dropdown
const batchSelect = document.getElementById('batch-select');

if (batchSelect) {
    batchSelect.addEventListener('change', function() {
        const selectedBatch = this.value;
        if (selectedBatch === '45') {
            window.location.href = 'batch-45.html';
        }
    });
}   

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

//CGPA Calculator
document.getElementById('calculate-btn').addEventListener('click', function () {
    // Reset error messages and styles
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
        el.previousElementSibling.style.borderColor = '#ddd';
    });

    // Get and validate inputs
    const finalMarks = parseFloat(document.getElementById('final-marks').value);
    const midMarks = parseFloat(document.getElementById('mid-marks').value);
    const presentation = parseFloat(document.getElementById('presentation').value);
    const assignment = parseFloat(document.getElementById('assignment').value);
    const ctMarks = parseFloat(document.getElementById('ct-marks').value);
    const attendance = parseFloat(document.getElementById('attendance').value);

    let isValid = true;

    if (isNaN(finalMarks) || finalMarks < 0 || finalMarks > 40) {
        showError('final-error', 'final-marks', 'Please enter valid input for finals 0–40');
        isValid = false;
    }
    if (isNaN(midMarks) || midMarks < 0 || midMarks > 25) {
        showError('mid-error', 'mid-marks', 'Please enter valid input for mid 0–25');
        isValid = false;
    }
    if (isNaN(presentation) || presentation < 0 || presentation > 8) {
        showError('presentation-error', 'presentation', 'Please enter valid input for presentation 0–8');
        isValid = false;
    }
    if (isNaN(assignment) || assignment < 0 || assignment > 5) {
        showError('assignment-error', 'assignment', 'Please enter valid input for assignment 0–5');
        isValid = false;
    }
    if (isNaN(ctMarks) || ctMarks < 0 || ctMarks > 15) {
        showError('ct-error', 'ct-marks', 'Please enter valid input for CT 0–15');
        isValid = false;
    }
    if (isNaN(attendance) || attendance < 0 || attendance > 7) {
        showError('attendance-error', 'attendance', 'Please enter valid input for attendance 0–7');
        isValid = false;
    }

    if (!isValid) return;

    // ✅ Calculate total marks
    const totalMarks = finalMarks + midMarks + presentation + assignment + ctMarks + attendance;
    document.getElementById('current-total').textContent = totalMarks.toFixed(2);

    // ✅ Determine grade and CGPA
    const { grade, cgpa } = getGradeAndCgpa(totalMarks);
    document.getElementById('grade').textContent = grade;
    document.getElementById('grade').textContent = grade;
    document.getElementById('cgpa').textContent = cgpa;

    // ✅ Suggest next grade milestone
    const next = getNextGrade(totalMarks);
const message = next
    ? `If you work hard, you can reach grade ${next.grade} (CGPA ${next.cgpa}). You only need ${(next.min - totalMarks).toFixed(2)} more marks to reach that goal.`
    : `You're already at the highest grade. Excellent work!`;
    document.getElementById('analysis').textContent = message;
});

// 🔧 Error display helper
function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    document.getElementById(inputId).style.borderColor = 'red';
}

// 🎓 Grade and CGPA mapping
function getGradeAndCgpa(marks) {
    if (marks >= 80) return { grade: 'A+', cgpa: '4.00' };
    if (marks >= 75) return { grade: 'A', cgpa: '3.75' };
    if (marks >= 70) return { grade: 'A-', cgpa: '3.50' };
    if (marks >= 65) return { grade: 'B+', cgpa: '3.25' };
    if (marks >= 60) return { grade: 'B', cgpa: '3.00' };
    if (marks >= 55) return { grade: 'B-', cgpa: '2.75' };
    if (marks >= 50) return { grade: 'C+', cgpa: '2.50' };
    if (marks >= 45) return { grade: 'C', cgpa: '2.25' };
    if (marks >= 40) return { grade: 'D', cgpa: '2.00' };
    return { grade: 'F', cgpa: '0.00' };
}

// 🚀 Next grade suggestion
function getNextGrade(marks) {
    const thresholds = [
        { min: 40, grade: 'D', cgpa: '2.00' },
        { min: 45, grade: 'C', cgpa: '2.25' },
        { min: 50, grade: 'C+', cgpa: '2.50' },
        { min: 55, grade: 'B-', cgpa: '2.75' },
        { min: 60, grade: 'B', cgpa: '3.00' },
        { min: 65, grade: 'B+', cgpa: '3.25' },
        { min: 70, grade: 'A-', cgpa: '3.50' },
        { min: 75, grade: 'A', cgpa: '3.75' },
        { min: 80, grade: 'A+', cgpa: '4.00' }
    ];

    for (let i = 0; i < thresholds.length; i++) {
        if (marks < thresholds[i].min) {
            return thresholds[i];
        }
    }
    return null;
}



// Updated showError function to accept custom message
function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    document.getElementById(inputId).style.borderColor = 'red';
}


// Helper function to show error
function showError(errorId, inputId) {
    document.getElementById(errorId).style.display = 'block';
    document.getElementById(inputId).style.borderColor = 'red';
}

// Optional: You can add a new analysis function based on total marks if needed
document.getElementById('analysis').textContent = `Your total score is ${currentTotal.toFixed(2)} out of 100.`;


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

// Exam Routine Dropdown Links
document.getElementById('exam-routine-select').addEventListener('change', function() {
    const selectedValue = this.value;
    
    if (selectedValue === 'mid') {
        // Open mid exam routine in new tab
        window.open('https://drive.google.com/file/d/1ImeQAe35t1ZQnfAnQw4DS7M8uNNPJ_h2/view?usp=sharing', '_blank');
    } else if (selectedValue === 'final') {
        // Open final exam routine in new tab
        window.open('https://drive.google.com/file/d/1XVg4coZqAyQhOCAEzLWfzhdRM_yM0r-d/view?usp=drive_link', '_blank');
    }
    // If empty value is selected, do nothing
});