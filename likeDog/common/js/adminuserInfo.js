document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // In a real application, you would fetch user data from a server or localStorage
    const allUsers = [
        { id: 'user001', name: '김철수', email: 'chulsoo.kim@example.com', signupDate: '2023-10-28', status: 'active' },
        { id: 'user002', name: '이영희', email: 'younghee.lee@example.com', signupDate: '2023-10-27', status: 'active' },
        { id: 'user003', name: '박지성', email: 'jisung.park@example.com', signupDate: '2023-10-25', status: 'suspended' },
        { id: 'user004', name: '최유리', email: 'yuri.choi@example.com', signupDate: '2023-09-15', status: 'active' },
        { id: 'user005', name: '정대만', email: 'daeman.jung@example.com', signupDate: '2023-08-01', status: 'deleted' },
    ];

    const user = allUsers.find(u => u.id === userId);

    if (user) {
        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('signupDate').value = user.signupDate;
        document.getElementById('userStatus').value = user.status;
    } else {
        alert('사용자 정보를 찾을 수 없습니다.');
        window.location.href = 'list.html';
    }

    document.getElementById('save-button').addEventListener('click', () => {
        // Here you would implement the logic to save the updated user data
        const updatedUser = {
            id: document.getElementById('userId').value,
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            status: document.getElementById('userStatus').value,
        };
        console.log('Saving user:', updatedUser);
        alert('사용자 정보가 수정되었습니다.');
        // In a real app, you'd update the data in localStorage or send it to a server
    });

    document.getElementById('delete-button').addEventListener('click', () => {
        if (confirm('정말로 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            // Here you would implement the logic to delete the user
            console.log('Deleting user:', userId);
            alert('사용자가 삭제되었습니다.');
            window.location.href = 'list.html';
            // In a real app, you'd remove the user from localStorage or send a delete request to a server
        }
    });
});