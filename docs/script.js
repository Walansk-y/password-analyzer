document.getElementById('check-password').addEventListener('click', async () => {
    const password = document.getElementById('password-input').value;
    const response = await fetch('https://password-analyzer-7eud.onrender.com/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });
    const data = await response.json();
    const feedback = document.getElementById('strength-feedback');
    feedback.textContent = data.isCompromised ? 'Password is compromised!' : 'Password is safe.';
    feedback.style.color = data.isCompromised ? 'red' : 'green';
});

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
