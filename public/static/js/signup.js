/* eslint-env browser */

const confirmPasswordInput = document.getElementById('confirm_pass');

confirmPasswordInput.addEventListener('keyup', () => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_pass').value;

    const button = document.getElementById('form_button');
    button.disabled = !(password === confirmPassword);
});
