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
setTimeout(type, 1000);

// Batch Selection Dropdown
const batchSelect = document.getElementById('batch-select');
if (batchSelect) {
    batchSelect.addEventListener('change', function () {
        if (this.value === '45') {
            window.location.href = 'batch-45.html';
        }
    });
}

// Countdown Timer
function updateCountdown() {
    const examDate = new Date('August 22, 2025 09:00:00').getTime();
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
document.getElementById('calculate-btn').addEventListener('click', function () {
    // Reset error messages and styles
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
        el.previousElementSibling.style.borderColor = '#ddd';
    });

    // Get inputs
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

    // Calculate total marks
    const totalMarks = finalMarks + midMarks + presentation + assignment + ctMarks + attendance;
    document.getElementById('current-total').textContent = totalMarks.toFixed(2);

    // Determine grade and CGPA (using 0.5 mark drop logic)
    const { grade, cgpa } = getGradeAndCgpa(totalMarks);
    document.getElementById('grade').textContent = grade;
    document.getElementById('cgpa').textContent = cgpa;

    // Suggest next grade milestone
    const next = getNextGrade(totalMarks);
    const message = next
        ? `If you work hard, you can reach grade ${next.grade} (CGPA ${next.cgpa}). You only need ${(next.min - totalMarks).toFixed(2)} more marks to reach that goal.`
        : `You're already at the highest grade. Excellent work!`;
    document.getElementById('analysis').textContent = message;
});

// Error display helper
function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    document.getElementById(inputId).style.borderColor = 'red';
}

// 🎓 Grade and CGPA mapping (0.5 mark drop logic)
function getGradeAndCgpa(marks) {
    let cgpa;

    if (marks >= 80) {
        cgpa = 4.00;
    } else if (marks < 40) {
        cgpa = 0.00;
    } else {
        let steps = Math.floor((80 - marks) / 0.5);
        cgpa = 4.00 - (steps * 0.025);
    }

    cgpa = parseFloat(cgpa.toFixed(2));

    let grade;
    if (cgpa === 4.00) grade = 'A+';
    else if (cgpa >= 3.75) grade = 'A';
    else if (cgpa >= 3.50) grade = 'A-';
    else if (cgpa >= 3.25) grade = 'B+';
    else if (cgpa >= 3.00) grade = 'B';
    else if (cgpa >= 2.75) grade = 'B-';
    else if (cgpa >= 2.50) grade = 'C+';
    else if (cgpa >= 2.25) grade = 'C';
    else if (cgpa >= 2.00) grade = 'D';
    else grade = 'F';

    return { grade, cgpa: cgpa.toFixed(2) };
}

// 🚀 Next grade suggestion (based on 0.5 step logic)
function getNextGrade(marks) {
    const current = getGradeAndCgpa(marks);
    if (current.cgpa >= 4.00) return null;

    let nextMarks = marks + 0.5;
    while (nextMarks <= 80) {
        let next = getGradeAndCgpa(nextMarks);
        if (next.grade !== current.grade) {
            return { min: nextMarks, grade: next.grade, cgpa: next.cgpa };
        }
        nextMarks += 0.5;
    }
    return null;
}

// Convert CGPA to percentage marks
function cgpaToPercentage(cgpa) {
    return 20 * cgpa; // simple linear mapping
}

// Exam Routine Dropdown Links
document.getElementById('exam-routine-select').addEventListener('change', function () {
    if (this.value === 'mid') {
        window.open('https://drive.google.com/file/d/1ImeQAe35t1ZQnfAnQw4DS7M8uNNPJ_h2/view?usp=sharing', '_blank');
    } else if (this.value === 'final') {
        window.open('https://drive.google.com/file/d/1XVg4coZqAyQhOCAEzLWfzhdRM_yM0r-d/view?usp=drive_link', '_blank');
    }
});
