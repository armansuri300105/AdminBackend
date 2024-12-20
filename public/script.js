let detail = document.querySelectorAll(".user-detail-container");
let user_detail = document.querySelector(".user-detail");

detail.forEach(user => {
    user.addEventListener('click', () => {
        user.classList.toggle("animation");
    })
})

const logoutButton = document.querySelector(".logoutbtn");

if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'POST',
            credentials: 'include'
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            window.location.href = 'https://adminfrontend-6dt4.onrender.com';
        } else {
            alert('Logout failed');
        }
    });
}
