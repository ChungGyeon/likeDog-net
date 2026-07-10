document.addEventListener('DOMContentLoaded', () => {
    const isAdmin = true; 
    if (!isAdmin) {
        alert('관리자 권한이 없습니다.');
        location.href = '../../user/home/index.html';
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userListBody = document.getElementById('user-list-body');
    const searchInput = document.getElementById('user-search');

    const renderUsers = (users) => {
        userListBody.innerHTML = '';
        if (users.length === 0) {
            userListBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px;">사용자가 없습니다.</td></tr>';
            return;
        }
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.style.cursor = 'pointer';
            if (user.id) {
                row.onclick = () => window.location.href = `usersInfo.html?userId=${user.id}`;
            }
            
            // Fixed template literals and adjusted properties to match the user object
            row.innerHTML = `
                <td>${user.id || 'N/A'}</td>
                <td>${user.username || 'N/A'}</td>
                <td>${user.name || 'N/A'}</td>
                <td>${user.signupDate || 'N/A'}</td>
            `;
            userListBody.appendChild(row);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(user => 
            (user.username && user.username.toLowerCase().includes(searchTerm)) || 
            (user.name && user.name.toLowerCase().includes(searchTerm))
        );
        renderUsers(filteredUsers);
    });

    renderUsers(allUsers);
});