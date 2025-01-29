document.getElementById('password-input').addEventListener('input', () => {
    const password = document.getElementById('password-input').value.trim();
    const feedback = document.getElementById('strength-feedback');

    if (!password) {
        feedback.textContent = ''; // Clear feedback when empty
        return;
    }

    // Check strength based on length and character variety
    let strength = 'Weak';
    let color = 'red';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = hasUpperCase + hasLowerCase + hasNumbers + hasSymbols;

    if (password.length >= 12 && score >= 3) {
        strength = 'Strong';
        color = 'green';
    } else if (password.length >= 8 && score >= 2) {
        strength = 'Medium';
        color = 'orange';
    }

    feedback.textContent = `Password Strength: ${strength}`;
    feedback.style.color = color;
});

// Check API only when button is clicked
document.getElementById('check-password').addEventListener('click', async () => {
    const password = document.getElementById('password-input').value.trim();
    const feedback = document.getElementById('strength-feedback');

    if (!password) {
        feedback.textContent = 'Please enter a password.';
        feedback.style.color = 'black';
        return;
    }

    try {
        const response = await fetch('https://password-analyzer-7eud.onrender.com/check-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        feedback.textContent = data.isCompromised
            ? 'Password is compromised! Choose a different one.'
            : 'Password is safe.';
        feedback.style.color = data.isCompromised ? 'red' : 'green';
    } catch (error) {
        feedback.textContent = 'Error checking password. Please try again later.';
        feedback.style.color = 'orange';
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
        symbols ? '!@#$%^&*()_+' : ''
    ].join('');

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    document.getElementById('generated-password').textContent = `Generated Password: ${password}`;
});
