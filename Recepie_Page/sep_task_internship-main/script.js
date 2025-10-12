let currentStep = -1;
let timerInterval;
let timeLeft = 45 * 60; // 45 minutes in seconds

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('show');
}

function startCooking() {
    currentStep = 0;
    highlightStep();
    document.getElementById('nextButton').disabled = false;
    startTimer();
}

function highlightStep() {
    const steps = document.querySelectorAll('.steps li');
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
    updateProgressBar();
}

function nextStep() {
    const steps = document.querySelectorAll('.steps li');
    if (currentStep < steps.length - 1) {
        currentStep++;
        highlightStep();
    }
    if (currentStep === steps.length - 1) {
        document.getElementById('nextButton').disabled = true;
    }
}

function updateProgressBar() {
    const steps = document.querySelectorAll('.steps li');
    const progress = ((currentStep + 1) / steps.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = 'Timer: Complete!';
            return;
        }
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
    }, 1000);
}

function printRecipe() {
    window.print();
}