document.getElementById('password-input').addEventListener('input', () => {
    const password = document.getElementById('password-input').value;
    evaluatePasswordStrength(password);
});

async function evaluatePasswordStrength(password) {
    const feedback = document.getElementById('strength-feedback');

    if (!password) {
        feedback.textContent = '';
        feedback.style.color = 'black';
        return;
    }

    let strength = 0;
    let suggestions = [];

    if (password.length >= 8) strength++;
    else suggestions.push('Use at least 8 characters.');

    if (/[A-Z]/.test(password)) strength++;
    else suggestions.push('Add at least one uppercase letter.');

    if (/[a-z]/.test(password)) strength++;
    else suggestions.push('Include at least one lowercase letter.');

    if (/\d/.test(password)) strength++;
    else suggestions.push('Use at least one number.');

    if (/[!@#$%^&*()]/.test(password)) strength++;
    else suggestions.push('Include at least one special character (!@#$%^&*()).');

    // Determine strength level
    let strengthMessage = '';
    let color = 'red';
    
    if (strength <= 2) {
        strengthMessage = 'Weak password!';
        color = 'red';
    } else if (strength === 3 || strength === 4) {
        strengthMessage = 'Medium strength password.';
        color = 'orange';
    } else {
        strengthMessage = 'Strong password!';
        color = 'green';
    }

    feedback.innerHTML = `<strong>${strengthMessage}</strong><br>${suggestions.join(' ')}`;
    feedback.style.color = color;

    // Check if password is compromised
    checkPasswordCompromise(password);
}

async function checkPasswordCompromise(password) {
    try {
        const response = await fetch('https://password-analyzer-7eud.onrender.com/check-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const data = await response.json();
        const feedback = document.getElementById('strength-feedback');

        if (data.isCompromised) {
            feedback.innerHTML = '<strong style="color: red;">Password is compromised! Choose a different one.</strong>';
        }
    } catch (error) {
        console.error('Error checking password compromise:', error);
    }
}

// Password Generator Function
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

    if (charset.length === 0) {
        document.getElementById('generated-password').textContent = 'Select at least one character type.';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    document.getElementById('generated-password').textContent = `Generated Password: ${password}`;
});
