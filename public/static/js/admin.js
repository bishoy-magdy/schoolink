/* eslint-env browser */

const addUser = document.getElementById('add_user');

addUser.addEventListener('click', async () => {
    const username = document.getElementById('user_name').value;
    const csrfToken = document.getElementById('carf_token').value;

    await fetch('/admin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            csrfToken,
        }),
    });
});

const removeUser = document.getElementById('remove_user');

removeUser.addEventListener('click', async () => {
    const username = document.getElementById('user_name').value;
    const csrfToken = document.getElementById('carf_token').value;

    await fetch(`/admin?username=${username}&csrfToken=${csrfToken}`, {
        method: 'DELETE',
    });
});
