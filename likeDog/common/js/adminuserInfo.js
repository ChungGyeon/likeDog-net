document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = parseInt(urlParams.get('userId'), 10); // URL 파라미터는 문자열이므로 숫자로 변환

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = allUsers.find(u => u.id === userId);

    if (user) {
        // Populate form with user data
        document.getElementById('userId').value = user.id;
        document.getElementById('username').value = user.username;
        document.getElementById('name').value = user.name;
        document.getElementById('signupDate').value = user.signupDate;
        document.getElementById('level').value = user.level;
        document.getElementById('role').value = user.role;
    } else {
        alert('사용자 정보를 찾을 수 없습니다.');
        window.location.href = 'list.html';
        return; // Stop script execution if user not found
    }

    // Save button logic
    document.getElementById('save-button').addEventListener('click', () => {
        const userIndex = allUsers.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            alert('사용자를 찾을 수 없어 저장할 수 없습니다.');
            return;
        }

        // Update user object with form values
        allUsers[userIndex].name = document.getElementById('name').value;
        allUsers[userIndex].level = parseInt(document.getElementById('level').value, 10);
        allUsers[userIndex].role = document.getElementById('role').value;

        // Save the entire updated user list back to localStorage
        localStorage.setItem('users', JSON.stringify(allUsers));
        
        alert('사용자 정보가 성공적으로 수정되었습니다.');
        window.location.reload(); // Reload to see changes
    });

    // Delete button logic
    document.getElementById('delete-button').addEventListener('click', () => {
        if (confirm(`'${user.name}' 사용자를 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
            const updatedUsers = allUsers.filter(u => u.id !== userId);
            
            // Save the filtered list back to localStorage
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            alert('사용자가 삭제되었습니다.');
            window.location.href = 'list.html'; // Redirect to the user list
        }
    });
});
