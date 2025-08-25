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
            window.location.href = 'batch-45-1st-semester.html';
        }
    });
}

// Exam Routine Dropdown Links
document.getElementById('exam-routine-select').addEventListener('change', function () {
    if (this.value === 'mid') {
        window.open('https://drive.google.com/file/d/1ImeQAe35t1ZQnfAnQw4DS7M8uNNPJ_h2/view?usp=sharing', '_blank');
    } else if (this.value === 'final') {
        window.open('https://drive.google.com/file/d/1XVg4coZqAyQhOCAEzLWfzhdRM_yM0r-d/view?usp=drive_link', '_blank');
    }
});

// Countdown Timer
const examSchedule = [
  new Date('August 27, 2025 09:00:00').getTime(),
  new Date('August 30, 2025 12:00:00').getTime()
];

function getNextExam() {
  const now = new Date().getTime();
  // Find the first exam date greater than "now"
  return examSchedule.find(date => date > now) || null;
}

function updateCountdown() {
  const nextExam = getNextExam();

  if (!nextExam) {
    // If no more exams left
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.querySelector('.countdown-subtitle').textContent = 'All exams are finished!';
    return;
  }

  const now = new Date().getTime();
  const distance = nextExam - now;

  if (distance < 0) {
    // Safety check
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
  document.querySelector('.countdown-subtitle').textContent = 'Next exam countdown:';
}

updateCountdown();
setInterval(updateCountdown, 1000);

// 🎓 CGPA Calculator Logic
document.getElementById('calculate-btn').addEventListener('click', function () {
    resetErrors();

    // Collect input values
    const inputs = {
        final: getValidatedInput('final-marks', 0, 40, 'final-error'),
        mid: getValidatedInput('mid-marks', 0, 25, 'mid-error'),
        presentation: getValidatedInput('presentation', 0, 8, 'presentation-error'),
        assignment: getValidatedInput('assignment', 0, 5, 'assignment-error'),
        ct: getValidatedInput('ct-marks', 0, 15, 'ct-error'),
        attendance: getValidatedInput('attendance', 0, 7, 'attendance-error')
    };

    // Check for any invalid input
    if (Object.values(inputs).includes(null)) return;

    // Calculate total marks
    const totalMarks = Object.values(inputs).reduce((sum, val) => sum + val, 0);
    document.getElementById('current-total').textContent = totalMarks.toFixed(2);

    // Grade and CGPA calculation
    const { grade, cgpa } = getGradeAndCgpa(totalMarks);
    document.getElementById('grade').textContent = grade;
    document.getElementById('cgpa').textContent = cgpa;

    // Grade improvement suggestion
    const next = getNextGrade(totalMarks);
    document.getElementById('analysis').textContent = next
        ? `If you work hard, you can reach grade ${next.grade} (CGPA ${next.cgpa}). You only need ${(next.min - totalMarks).toFixed(2)} more marks to reach that goal.`
        : `You're already at the highest grade. Excellent work!`;
});

// 🧼 Reset error messages and input styles
function resetErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
        el.previousElementSibling.style.borderColor = '#ddd';
    });
}

// ✅ Validate input and show error if needed
function getValidatedInput(id, min, max, errorId) {
    const value = parseFloat(document.getElementById(id).value);
    if (isNaN(value) || value < min || value > max) {
        showError(errorId, id, `Please enter valid input (${min}–${max})`);
        return null;
    }
    return value;
}

// 🚨 Display error message
function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    document.getElementById(inputId).style.borderColor = 'red';
}

// 📊 Grade and CGPA mapping (0.5 mark drop logic)
function getCGPA(marks) {
    if (marks >= 80) return 4.00;
    if (marks < 40) return 0.00;

    let steps = Math.floor((80 - marks) / 0.5);
    let cgpa = 4.00 - (steps * 0.025);

    return parseFloat(cgpa.toFixed(2));
}

function getGrade(cgpa) {
    if (cgpa === 4.00) return 'A+';
    if (cgpa >= 3.75) return 'A';
    if (cgpa >= 3.50) return 'A-';
    if (cgpa >= 3.25) return 'B+';
    if (cgpa >= 3.00) return 'B';
    if (cgpa >= 2.75) return 'B-';
    if (cgpa >= 2.50) return 'C+';
    if (cgpa >= 2.25) return 'C';
    if (cgpa >= 2.00) return 'D';
    return 'F';
}

function getGradeAndCgpa(marks) {
    const cgpa = getCGPA(marks);
    const grade = getGrade(cgpa);
    return { grade, cgpa: cgpa.toFixed(2) };
}



// 🔁 Next grade suggestion
function getNextGrade(marks) {
    const current = getGradeAndCgpa(marks);
    if (current.cgpa >= 4.00) return null;

    for (let nextMarks = marks + 0.5; nextMarks <= 80; nextMarks += 0.5) {
        const next = getGradeAndCgpa(nextMarks);
        if (next.grade !== current.grade) {
            return { min: nextMarks, grade: next.grade, cgpa: next.cgpa };
        }
    }
    return null;
}

// 🔄 CGPA to percentage converter
function cgpaToPercentage(cgpa) {
    return 20 * cgpa;
}
// =======================
// 📘 Semester CGPA Calculator Initialization
(function initSemesterCgpaCalculator() {
    const form = document.getElementById('semester-form');
    if (!form) return;

    const calcBtn = document.getElementById('calculate-semester-btn');
    const resultEl = document.getElementById('semester-cgpa-value');
    const gradeEl = document.getElementById('semester-grade');
    const messageEl = document.getElementById('semester-message');
    const totalCreditsEl = document.getElementById('semester-total-credits');

    const SUBJECTS = [
        { code: 'BNS', name: 'Bangladesh Studies (BNS)', credit: 3 },
        { code: 'CF',  name: 'Computer Fundamentals (CF)', credit: 3 },
        { code: 'CFL', name: 'Computer Fundamentals Lab (CFL)', credit: 1 },
        { code: 'ISE', name: 'Introduction To Software Engineering (ISE)', credit: 3 },
        { code: 'E1',  name: 'English - 1 (E-1)', credit: 3 },
    ];

    const TOTAL_CREDIT_POINTS = SUBJECTS.reduce((sum, s) => sum + s.credit, 0);
    totalCreditsEl.textContent = TOTAL_CREDIT_POINTS.toString();

    // 🔁 Precise CGPA Functions
    function getCGPA(marks) {
        if (marks >= 80) return 4.00;
        if (marks < 40) return 0.00;
        let steps = Math.floor((80 - marks) / 0.5);
        let cgpa = 4.00 - (steps * 0.025);
        return parseFloat(cgpa.toFixed(2));
    }

    function getGrade(cgpa) {
        if (cgpa === 4.00) return 'A+';
        if (cgpa >= 3.75) return 'A';
        if (cgpa >= 3.50) return 'A-';
        if (cgpa >= 3.25) return 'B+';
        if (cgpa >= 3.00) return 'B';
        if (cgpa >= 2.75) return 'B-';
        if (cgpa >= 2.50) return 'C+';
        if (cgpa >= 2.25) return 'C';
        if (cgpa >= 2.00) return 'D';
        return 'F';
    }

    function getGradeAndCgpa(marks) {
        const cgpa = getCGPA(marks);
        const grade = getGrade(cgpa);
        return { grade, cgpa: cgpa.toFixed(2) };
    }

    // 🧮 Calculate Semester CGPA
    calcBtn.addEventListener('click', () => {
        let totalWeightedCgpa = 0;
        let totalCredits = 0;
        let validSubjectCount = 0;

        SUBJECTS.forEach(subject => {
            const inputEl = document.getElementById(`${subject.code.toLowerCase()}-marks`);
            const errorEl = document.getElementById(`${subject.code.toLowerCase()}-error`);
            const raw = parseFloat(inputEl?.value);

            // Reset error
            errorEl.textContent = '';
            errorEl.style.display = 'none';
            inputEl.style.borderColor = '#ddd';

            if (isNaN(raw) || raw < 0 || raw > 100) {
                errorEl.textContent = `Enter valid marks for ${subject.name} (0–100)`;
                errorEl.style.display = 'block';
                inputEl.style.borderColor = 'red';
                return;
            }

            const { cgpa } = getGradeAndCgpa(raw);
            totalWeightedCgpa += parseFloat(cgpa) * subject.credit;
            totalCredits += subject.credit;
            validSubjectCount++;
        });

        if (validSubjectCount === 0) {
            resultEl.textContent = '--';
            gradeEl.textContent = '--';
            messageEl.textContent = 'Please enter valid marks for at least one subject.';
            return;
        }

        const semesterCgpa = (totalWeightedCgpa / totalCredits).toFixed(2);
        resultEl.textContent = semesterCgpa;

        const semesterGrade = getGrade(parseFloat(semesterCgpa));
        gradeEl.textContent = semesterGrade;

        messageEl.textContent = `Your semester CGPA is ${semesterCgpa} (${semesterGrade}). Keep pushing forward!`;
    });
})();


// =======================
// 📘 Semester CGPA Calculator Initialization
(function initSemesterCgpaCalculator() {
    const form = document.getElementById('semester-form');
    if (!form) return;

    const calcBtn = document.getElementById('calculate-semester-btn');
    const resultEl = document.getElementById('semester-cgpa-value');
    const messageEl = document.getElementById('semester-message');
    const totalCreditsEl = document.getElementById('semester-total-credits');

    const SUBJECTS = [
        { code: 'BNS', name: 'Bangladesh Studies (BNS)', credit: 3 },
        { code: 'CF',  name: 'Computer Fundamentals (CF)', credit: 3 },
        { code: 'CFL', name: 'Computer Fundamentals Lab (CFL)', credit: 1 },
        { code: 'ISE', name: 'Introduction To Software Engineering (ISE)', credit: 3 },
        { code: 'E1',  name: 'English - 1 (E-1)', credit: 3 },
    ];

    const TOTAL_CREDIT_POINTS = SUBJECTS.reduce((sum, s) => sum + s.credit, 0);
    totalCreditsEl.textContent = TOTAL_CREDIT_POINTS.toString();

    // 🧮 Calculate Semester CGPA
    calcBtn.addEventListener('click', () => {
        let totalWeightedCgpa = 0;
        let validSubjects = 0;

        SUBJECTS.forEach(subject => {
            const inputEl = document.getElementById(`${subject.code.toLowerCase()}-marks`);
            const errorEl = document.getElementById(`${subject.code.toLowerCase()}-error`);
            const raw = parseFloat(inputEl?.value);

            // Reset error
            errorEl.textContent = '';
            errorEl.style.display = 'none';
            inputEl.style.borderColor = '#ddd';

            if (isNaN(raw) || raw < 0 || raw > 100) {
                errorEl.textContent = `Enter valid marks for ${subject.name} (0–100)`;
                errorEl.style.display = 'block';
                inputEl.style.borderColor = 'red';
                return;
            }

            const { cgpa } = getGradeAndCgpa(raw);
            totalWeightedCgpa += parseFloat(cgpa) * subject.credit;
            validSubjects += subject.credit;
        });

        if (validSubjects === 0) {
            resultEl.textContent = '--';
            messageEl.textContent = 'Please enter valid marks for at least one subject.';
            return;
        }

        const semesterCgpa = (totalWeightedCgpa / validSubjects).toFixed(2);
        resultEl.textContent = semesterCgpa;

        const grade = getGradeAndCgpa(semesterCgpa * 20).grade;
        document.getElementById('semester-grade').textContent = grade;

        messageEl.textContent = `Your semester CGPA is ${semesterCgpa}. Keep pushing forward!`;
    });
})();


    // 🛠️ Utility: Create marks input field
function createCgInput(rowId) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';

    const label = document.createElement('label');
    label.setAttribute('for', `subject-marks-${rowId}`);
    label.textContent = 'Total marks for selected subject (0–100)';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '100';
    input.step = '0.1';
    input.placeholder = 'e.g., 85.5';
    input.id = `subject-marks-${rowId}`;
    input.className = 'subject-marks';

    const error = document.createElement('div');
    error.className = 'error-message';
    error.id = `marks-error-${rowId}`;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(error);
    return wrapper;
}

// 📋 Utility: Get all subject dropdowns
function getAllSubjectSelects() {
    return Array.from(document.querySelectorAll('select.subject-select'));
}

// 🚫 Prevent duplicate subject selection across dropdowns
function syncDisabledOptions() {
    const selects = getAllSubjectSelects();
    const selectedCodes = new Set(selects.map(sel => sel.value).filter(v => v));

    selects.forEach(current => {
        Array.from(current.options).forEach(opt => {
            if (!opt.value) return;
            opt.disabled = selectedCodes.has(opt.value) && current.value !== opt.value;
        });
    });
}

// ➕ Add new subject row dynamically
function addRow() {
    if (rowCount >= MAX_ROWS) return;

    rowCount += 1;
    const insertBeforeEl = addBtn.parentElement;

    const selectGroup = createSubjectSelect(rowCount);
    const cgGroup = createCgInput(rowCount);

    form.insertBefore(selectGroup, insertBeforeEl);
    form.insertBefore(cgGroup, insertBeforeEl);

    const newSelect = selectGroup.querySelector('select.subject-select');
    newSelect.addEventListener('change', syncDisabledOptions);

    syncDisabledOptions();
    updateAddButtonState();
}

// 🔄 Update "Add Subject" button state
function updateAddButtonState() {
    addBtn.disabled = rowCount >= MAX_ROWS;
    addBtn.textContent = rowCount >= MAX_ROWS
        ? `Limit reached (${MAX_ROWS})`
        : 'Add another subject';
}

// 🎓 Get credit value by subject code
function getSubjectCreditByCode(code) {
    const subject = SUBJECTS.find(s => s.code === code);
    return subject ? subject.credit : 0;
}

// 📊 Convert marks to CGPA (standard scale)
function getGradeAndCgpa(marks) {
    let cgpa = 0;
    if (marks >= 80) cgpa = 4.00;
    else if (marks >= 75) cgpa = 3.75;
    else if (marks >= 70) cgpa = 3.50;
    else if (marks >= 65) cgpa = 3.25;
    else if (marks >= 60) cgpa = 3.00;
    else if (marks >= 55) cgpa = 2.75;
    else if (marks >= 50) cgpa = 2.50;
    else if (marks >= 45) cgpa = 2.25;
    else if (marks >= 40) cgpa = 2.00;
    else cgpa = 0.00;

    return { cgpa: cgpa.toFixed(2), grade: mapGrade(cgpa) };
}

// 🏷️ Map CGPA to grade
function mapGrade(cgpa) {
    cgpa = parseFloat(cgpa);
    if (cgpa === 4.00) return 'A+';
    if (cgpa >= 3.75) return 'A';
    if (cgpa >= 3.50) return 'A-';
    if (cgpa >= 3.25) return 'B+';
    if (cgpa >= 3.00) return 'B';
    if (cgpa >= 2.75) return 'B-';
    if (cgpa >= 2.50) return 'C+';
    if (cgpa >= 2.25) return 'C';
    if (cgpa >= 2.00) return 'D';
    return 'F';
}

// 🚨 Show error message for dynamic inputs
function showError(errorId, inputId, message) {
    const errorEl = document.getElementById(errorId);
    const inputEl = document.getElementById(inputId);
    if (errorEl && inputEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        inputEl.style.borderColor = 'red';
    }
}

 // 🎓 Main CGPA calculation logic
function calculateSemesterCgpa() {
    // 🔄 Reset all error messages and input borders
    form.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
        const input = el.previousElementSibling;
        if (input) input.style.borderColor = '#ddd';
    });

    let isValid = true;
    let weightedSum = 0;
    let totalCredits = 0;
    let anyIncluded = false;

    for (let i = 1; i <= rowCount; i++) {
        const subjectSelect = document.getElementById(`subject-select-${i}`);
        const marksInput = document.getElementById(`subject-marks-${i}`);
        if (!subjectSelect || !marksInput) continue;

        const subjectCode = subjectSelect.value.trim();
        const marks = parseFloat(marksInput.value);

        const isRowEmpty = !subjectCode && (isNaN(marks) || marksInput.value.trim() === '');
        if (isRowEmpty) continue;

        // ❌ Validation: Subject not selected
        if (!subjectCode) {
            showError(`subject-error-${i}`, `subject-select-${i}`, 'Please select a subject');
            isValid = false;
            continue;
        }

        // ❌ Validation: Invalid marks
        if (isNaN(marks) || marks < 0 || marks > 100) {
            showError(`marks-error-${i}`, `subject-marks-${i}`, 'Enter valid marks between 0 and 100');
            isValid = false;
            continue;
        }

        const { cgpa } = getGradeAndCgpa(marks);
        const credit = getSubjectCreditByCode(subjectCode);

        weightedSum += cgpa * credit;
        totalCredits += credit;
        anyIncluded = true;
    }

    // 🚫 If validation fails or no subjects included
    if (!isValid || !anyIncluded || totalCredits === 0) {
        messageEl.textContent = 'Please complete all subject selections and marks inputs.';
        resultEl.textContent = '--';
        return;
    }

    // ✅ Final CGPA calculation
    const totalCgpa = weightedSum / totalCredits;
    resultEl.textContent = totalCgpa.toFixed(2);

    // 🏷️ Grade and motivational message
    const gradeLabel = mapGrade(totalCgpa);
    const motivationalMessage = getMotivationalMessage(gradeLabel);

    messageEl.textContent = `Your semester grade is ${gradeLabel}. ${motivationalMessage}`;
}

// 🧠 Motivational message generator
function getMotivationalMessage(grade) {
    const messages = {
        'A+': 'Outstanding achievement! Keep up the excellent work!',
        'A': 'Excellent performance! You\'re doing great!',
        'A-': 'Very good work! Keep pushing forward!',
        'B+': 'Good job! You\'re on the right track!',
        'B': 'Solid performance! Keep improving!',
        'B-': 'You can do better! Keep working hard!',
        'C+': 'There\'s room for improvement. Don\'t give up!',
        'C': 'Study harder and you\'ll see better results!',
        'D': 'More effort needed. You can do this!',
        'F': 'Don\'t be discouraged. Better luck next time!'
    };
    return messages[grade] || '';
}

    // 🔄 Refresh all subject inputs and reset form
function refreshSubjectInputs() {
    // 🧹 Remove all subject rows except the first one
    const subjectRows = Array.from(form.querySelectorAll('.form-group')).filter(el =>
        el.querySelector('select.subject-select') ||
        el.querySelector('input.subject-marks')
    );

    for (let i = 2; i <= rowCount; i++) {
        const selectGroup = document.getElementById(`subject-group-${i}`);
        const cgGroup = document.getElementById(`cg-group-${i}`);
        if (selectGroup) form.removeChild(selectGroup);
        if (cgGroup) form.removeChild(cgGroup);
    }

    // 🔁 Reset first row inputs
    const firstSelect = document.getElementById('subject-select-1');
    const firstMarks = document.getElementById('subject-marks-1');
    if (firstSelect) firstSelect.value = '';
    if (firstMarks) firstMarks.value = '';

    // 🔢 Reset row count
    rowCount = 1;

    // 🔘 Update "Add Subject" button state
    updateAddButtonState();

    // 🚫 Clear all error messages and input borders
    form.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
        const input = el.previousElementSibling;
        if (input) input.style.borderColor = '#ddd';
    });

    // 📉 Reset result display
    resultEl.textContent = '--';
    messageEl.textContent = 'Select subjects and enter marks to calculate CGPA.';

    // ✅ Re-enable all options in the first select
    if (firstSelect) {
        Array.from(firstSelect.options).forEach(opt => {
            opt.disabled = false;
        });
    }

    // 🔄 Sync disabled options across selects
    syncDisabledOptions();
}
// 📌 Bind core buttons
addBtn.addEventListener('click', addRow);
calcBtn.addEventListener('click', calculateSemesterCgpa);
document.getElementById('refresh-subjects-btn').addEventListener('click', refreshSubjectInputs);

// 🚀 Initialize with one subject row on page load
document.addEventListener('DOMContentLoaded', () => {
    addRow();
});
