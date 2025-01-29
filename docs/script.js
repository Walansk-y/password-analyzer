// Elements
const passwordInput = document.getElementById('password-input');
const strengthFeedback = document.getElementById('strength-feedback');
const strengthBar = document.getElementById('strength-bar');
const checkPasswordBtn = document.getElementById('check-password');

// Function to check password strength locally
function analyzePasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++; // Minimum length
    if (/[A-Z]/.test(password)) score++; // Uppercase
    if (/[a-z]/.test(password)) score++; // Lowercase
    if (/\d/.test(password)) score++; // Numbers
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; // Special characters

    return score;
}

// Update strength meter in real-time
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password === '') {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = '#ddd';
        strengthFeedback.textContent = '';
        return;
    }

    const strengthScore = analyzePasswordStrength(password);
    let strengthText = '';
    let strengthColor = '';

    switch (strengthScore) {
        case 0:
        case 1:
            strengthText = 'Very Weak';
            strengthColor = 'red';
            strengthBar.style.width = '20%';
            break;
        case 2:
            strengthText = 'Weak';
            strengthColor = 'orange';
            strengthBar.style.width = '40%';
            break;
        case 3:
            strengthText = 'Medium';
            strengthColor = 'yellow';
            strengthBar.style.width = '60%';
            break;
        case 4:
            strengthText = 'Strong';
            strengthColor = 'lightgreen';
            strengthBar.style.width = '80%';
            break;
        case 5:
            strengthText = 'Very Strong';
            strengthColor = 'green';
            strengthBar.style.width = '100%';
            break;
    }

    strengthBar.style.backgroundColor = strengthColor;
    strengthFeedback.textContent = `Strength: ${strengthText}`;
});

// API Check (Only when button is clicked)
checkPasswordBtn.addEventListener('click', async () => {
    const password = passwordInput.value;

    if (!password) {
        strengthFeedback.textContent = 'Please enter a password.';
        strengthFeedback.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('https://password-analyzer-7eud.onrender.com/check-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        if (data.isCompromised) {
            strengthFeedback.textContent = 'Password is compromised! Choose a different one.';
            strengthFeedback.style.color = 'red';
            strengthBar.style.backgroundColor = 'red';
            strengthBar.style.width = '100%';
        } else {
            strengthFeedback.textContent = 'Password is safe.';
            strengthFeedback.style.color = 'green';
        }
    } catch (error) {
        strengthFeedback.textContent = 'Error checking password.';
        strengthFeedback.style.color = 'red';
    }
});

// Password Generator
document.getElementById('generate-password').addEventListener('click', () => {
    const length = parseInt(document.getElementById('length').value);
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    const charset = [
        uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
        lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '',
        numbers ? '0123456789' : '',
        symbols ? '!@#$%^&*()' : ''
    ].join('');

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    document.getElementById('generated-password').textContent = `Generated Password: ${password}`;
});
