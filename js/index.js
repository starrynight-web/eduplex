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
    const examDate = new Date('August 23, 2025 12:00:00').getTime();
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

// =======================
// Semester CGPA Calculator
// ========================
(function initSemesterCgpaCalculator() {
    const form = document.getElementById('semester-form');
    if (!form) return;

    const addBtn = document.getElementById('add-subject-btn');
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

    const TOTAL_CREDIT_POINTS = 13;
    totalCreditsEl.textContent = TOTAL_CREDIT_POINTS.toString();

    let rowCount = 0;
    const MAX_ROWS = SUBJECTS.length;

    // Utility: Create subject dropdown
    function createSubjectSelect(rowId) {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';

        const label = document.createElement('label');
        label.setAttribute('for', `subject-select-${rowId}`);
        label.textContent = 'Subject';

        const select = document.createElement('select');
        select.id = `subject-select-${rowId}`;
        select.className = 'subject-select';

        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Select subject';
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        select.appendChild(defaultOpt);

        SUBJECTS.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.code;
            opt.textContent = s.name;
            opt.dataset.credit = String(s.credit);
            select.appendChild(opt);
        });

        const error = document.createElement('div');
        error.className = 'error-message';
        error.id = `subject-error-${rowId}`;

        wrapper.appendChild(label);
        wrapper.appendChild(select);
        wrapper.appendChild(error);
        return wrapper;
    }

    // Utility: Create marks input
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

        const error = document.createElement('div');
        error.className = 'error-message';
        error.id = `marks-error-${rowId}`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(error);
        return wrapper;
    }

    // Utility: Get selected subjects
    function getAllSubjectSelects() {
        return Array.from(form.querySelectorAll('select.subject-select'));
    }

    // Prevent duplicate subject selection
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

    // Add new subject row
    function addRow() {
        if (rowCount >= MAX_ROWS) return;
        rowCount += 1;
        const addGroup = addBtn.parentElement;
        const selectGroup = createSubjectSelect(rowCount);
        const cgGroup = createCgInput(rowCount);
        form.insertBefore(selectGroup, addGroup);
        form.insertBefore(cgGroup, addGroup);

        const newSelect = selectGroup.querySelector('select.subject-select');
        newSelect.addEventListener('change', syncDisabledOptions);
        syncDisabledOptions();
        updateAddButtonState();
    }

    function updateAddButtonState() {
        addBtn.disabled = rowCount >= MAX_ROWS;
        addBtn.textContent = rowCount >= MAX_ROWS
            ? `Limit reached (${MAX_ROWS})`
            : 'Add another subject';
    }

    function getSubjectCreditByCode(code) {
        const found = SUBJECTS.find(s => s.code === code);
        return found ? found.credit : 0;
    }

    // Convert marks to CGPA
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
        return { cgpa };
    }

    function showError(errorId, inputId, message) {
        const errorEl = document.getElementById(errorId);
        const inputEl = document.getElementById(inputId);
        if (errorEl && inputEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            inputEl.style.borderColor = 'red';
        }
    }

    // Main CGPA calculation
    function calculateSemesterCgpa() {
        form.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
            const input = el.previousElementSibling;
            if (input) input.style.borderColor = '#ddd';
        });

        let isValid = true;
        let weightedSum = 0;
        let anyIncluded = false;

        for (let i = 1; i <= rowCount; i++) {
            const subjectSelect = document.getElementById(`subject-select-${i}`);
            const marksInput = document.getElementById(`subject-marks-${i}`);
            if (!subjectSelect || !marksInput) continue;

            const subjectCode = subjectSelect.value;
            const marks = parseFloat(marksInput.value);

            const isRowEmpty = !subjectCode && (isNaN(marks) || marksInput.value === '');
            if (isRowEmpty) continue;

            if (!subjectCode) {
                showError(`subject-error-${i}`, `subject-select-${i}`, 'Please select a subject');
                isValid = false;
                continue;
            }
            if (isNaN(marks) || marks < 0 || marks > 100) {
                showError(`marks-error-${i}`, `subject-marks-${i}`, 'Enter valid marks between 0 and 100');
                isValid = false;
                continue;
            }

            const { cgpa } = getGradeAndCgpa(marks);
            const credit = getSubjectCreditByCode(subjectCode);
            weightedSum += cgpa * credit;
            anyIncluded = true;
        }

        if (!isValid || !anyIncluded) {
            messageEl.textContent = 'Please complete the subject selections and marks inputs.';
            resultEl.textContent = '--';
            return;
        }

        const totalCgpa = weightedSum / TOTAL_CREDIT_POINTS;
        resultEl.textContent = totalCgpa.toFixed(2);
        // Get the letter grade based on CGPA
        let gradeLabel = '';
        let motivationalMessage = '';

        if (totalCgpa === 4.00) {
            gradeLabel = 'A+';
            motivationalMessage = 'Outstanding achievement! Keep up the excellent work!';
        } else if (totalCgpa >= 3.75) {
            gradeLabel = 'A';
            motivationalMessage = 'Excellent performance! You\'re doing great!';
        } else if (totalCgpa >= 3.50) {
            gradeLabel = 'A-';
            motivationalMessage = 'Very good work! Keep pushing forward!';
        } else if (totalCgpa >= 3.25) {
            gradeLabel = 'B+';
            motivationalMessage = 'Good job! You\'re on the right track!';
        } else if (totalCgpa >= 3.00) {
            gradeLabel = 'B';
            motivationalMessage = 'Solid performance! Keep improving!';
        } else if (totalCgpa >= 2.75) {
            gradeLabel = 'B-';
            motivationalMessage = 'You can do better! Keep working hard!';
        } else if (totalCgpa >= 2.50) {
            gradeLabel = 'C+';
            motivationalMessage = 'There\'s room for improvement. Don\'t give up!';
        } else if (totalCgpa >= 2.25) {
            gradeLabel = 'C';
            motivationalMessage = 'Study harder and you\'ll see better results!';
        } else if (totalCgpa >= 2.00) {
            gradeLabel = 'D';
            motivationalMessage = 'More effort needed. You can do this!';
        } else {
            gradeLabel = 'F';
            motivationalMessage = 'Don\'t be discouraged. Better luck next time!';
        }

        messageEl.textContent = `Your semester grade is ${gradeLabel}. ${motivationalMessage}`;
    }
    // Refresh all subject inputs
    function refreshSubjectInputs() {
        // Remove all subject rows except the first one
        const subjectRows = Array.from(form.querySelectorAll('.form-group')).filter(el => 
            el.querySelector('select.subject-select') || 
            el.querySelector('input[type="number"]')
        );
        
        // Keep only the first row (remove all others)
        for (let i = 2; i < subjectRows.length; i++) {
            form.removeChild(subjectRows[i]);
        }
        
        // Reset the first row
        const firstSelect = document.getElementById('subject-select-1');
        const firstMarks = document.getElementById('subject-marks-1');
        if (firstSelect) firstSelect.value = '';
        if (firstMarks) firstMarks.value = '';
        
        // Reset row count
        rowCount = 1;
        
        // Update button state
        updateAddButtonState();
        
        // Clear any errors
        form.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
            const input = el.previousElementSibling;
            if (input) input.style.borderColor = '#ddd';
        });
        
        // Clear results
        resultEl.textContent = '--';
        messageEl.textContent = 'Select subjects and enter CG to calculate total.';
        
        // Re-enable all options in the first select
        if (firstSelect) {
            Array.from(firstSelect.options).forEach(opt => {
                opt.disabled = false;
            });
        }
}
    // Bind events
    addBtn.addEventListener('click', addRow);
    calcBtn.addEventListener('click', calculateSemesterCgpa);
    // Bind refresh button
    document.getElementById('refresh-subjects-btn').addEventListener('click', refreshSubjectInputs);

    // Initialize with one row
    addRow();
})();