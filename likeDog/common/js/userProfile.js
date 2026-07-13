document.addEventListener('DOMContentLoaded', () => {
    if (!Auth.isLoggedIn()) {
        alert('로그인이 필요합니다.');
        location.href = '/likeDog/user/auth/login.html';
        return;
    }

    const user = Auth.getCurrentUser();
    document.getElementById('top-username').textContent = user.name;

    const profileImgBox = document.getElementById('profile-img-display');
    const profileImgInput = document.getElementById('profile-image-input');
    const avatarCircle = document.querySelector('.avatar-circle');

    // Set initial profile image
    if (user.profileImage) {
        profileImgBox.style.backgroundImage = `url('${user.profileImage}')`;
        if (avatarCircle) avatarCircle.style.backgroundImage = `url('${user.profileImage}')`;
    } else {
        profileImgBox.style.backgroundImage = "url('https://via.placeholder.com/220x280/1a1a1a/eaff00?text=PROFILE')";
    }

    // Image upload logic
    profileImgBox.addEventListener('click', () => profileImgInput.click());
    profileImgInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;

            // Update UI first
            profileImgBox.style.backgroundImage = `url('${imageUrl}')`;
            if (avatarCircle) avatarCircle.style.backgroundImage = `url('${imageUrl}')`;

            try {
                // Update localStorage
                const currentUser = Auth.getCurrentUser();
                currentUser.profileImage = imageUrl;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                const allUsers = JSON.parse(localStorage.getItem('users'));
                const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    allUsers[userIndex].profileImage = imageUrl;
                    localStorage.setItem('users', JSON.stringify(allUsers));
                }

                user.profileImage = imageUrl;

                renderHeader();
                alert('프로필 사진이 성공적으로 저장되었습니다.');

            } catch (error) {
                console.error("Error saving profile image to localStorage:", error);
                alert('프로필 사진을 저장하는 데 실패했습니다. 이미지 파일 크기가 너무 크거나 브라우저 저장 공간이 부족할 수 있습니다.');
                // Revert the UI change if saving fails
                if (user.profileImage) {
                    profileImgBox.style.backgroundImage = `url('${user.profileImage}')`;
                    if (avatarCircle) avatarCircle.style.backgroundImage = `url('${user.profileImage}')`;
                } else {
                    profileImgBox.style.backgroundImage = "url('https://via.placeholder.com/220x280/1a1a1a/eaff00?text=PROFILE')";
                }
            }
        };
        reader.readAsDataURL(file);
    });


    // Load My Posts
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const myPosts = posts.filter(p => p.author === user.username).slice(0, 5);
    const postsList = document.getElementById('my-posts-list');

    postsList.innerHTML = myPosts.map(p => `
                <div class="mypage-list-item" onclick="location.href='/likeDog/user/posts/post.html?id=${p.id}'" style="cursor: pointer;">
                    <span class="title">${p.title}</span>
                    <div class="meta">${p.date} | 조회 ${p.views}</div>
                </div>
            `).join('') || '<p style="color: #444; padding: 20px;">작성한 게시글이 없습니다.</p>';

    // Load My Comments
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const myComments = comments.filter(c => c.author === user.username).slice(0, 5);
    const commentsList = document.getElementById('my-comments-list');

    commentsList.innerHTML = myComments.map(c => {
        const targetPost = posts.find(p => p.id === c.postId);
        return `
                    <div class="mypage-list-item" onclick="location.href='/likeDog/user/posts/post.html?id=${c.postId}'" style="cursor: pointer;">
                        <span class="meta" style="color: #888;">[${targetPost ? targetPost.title : '삭제된 게시글'}]</span>
                        <span class="title" style="font-size: 0.9rem; margin-top: 5px;">${c.content}</span>
                        <div class="meta">${c.date}</div>
                    </div>
                `;
    }).join('') || '<p style="color: #444; padding: 20px;">작성한 댓글이 없습니다.</p>';

    window.handleEditProfile = () => {
        const newName = prompt('변경할 닉네임을 입력하세요:', user.name);
        if (newName && newName.trim() && newName !== user.name) {
            // 1. Update the 'users' array (for all other parts of the app)
            const users = JSON.parse(localStorage.getItem('users'));
            const userIdx = users.findIndex(u => u.username === user.username);
            if (userIdx !== -1) {
                users[userIdx].name = newName;
                localStorage.setItem('users', JSON.stringify(users));
            }

            // 2. Update the 'currentUser' object directly to preserve all its properties
            const currentUser = Auth.getCurrentUser();
            currentUser.name = newName;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // 3. Update the 'user' object in the script's scope
            user.name = newName;

            alert('닉네임이 변경되었습니다.');
            location.reload();
        }
    };

    window.handleChangePassword = () => {
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userRecord = allUsers.find(u => u.id === user.id);
        if (!userRecord) {
            alert('오류: 사용자 정보를 찾을 수 없습니다.');
            return;
        }

        const hasPassword = userRecord.hasOwnProperty('password');

        if (hasPassword) {
            const currentPassword = prompt('현재 비밀번호를 입력하세요:');
            if (currentPassword === null) return; // User cancelled
            if (currentPassword !== userRecord.password) {
                alert('현재 비밀번호가 일치하지 않습니다.');
                return;
            }
        }

        const newPassword = prompt(hasPassword ? '새로운 비밀번호를 입력하세요:' : '사용할 첫 비밀번호를 입력하세요:');
        if (newPassword === null) return;
        if (!newPassword || newPassword.length < 4) {
            alert('비밀번호는 4자 이상이어야 합니다.');
            return;
        }

        const confirmNewPassword = prompt('새로운 비밀번호를 다시 한번 입력하세요:');
        if (confirmNewPassword === null) return;
        if (newPassword !== confirmNewPassword) {
            alert('새로운 비밀번호가 일치하지 않습니다.');
            return;
        }

        // Update password in allUsers array
        userRecord.password = newPassword;
        localStorage.setItem('users', JSON.stringify(allUsers));

        // Also update the currentUser object in localStorage
        const currentUser = Auth.getCurrentUser();
        currentUser.password = newPassword;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        alert('비밀번호가 성공적으로 변경되었습니다.');
    };

    window.handleDeleteAccount = () => {
        if (user.username === 'admin') {
            alert('관리자 계정은 삭제할 수 없습니다.');
            return;
        }

        if (!confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            return;
        }

        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userRecord = allUsers.find(u => u.id === user.id);

        if (!userRecord) {
            alert('오류: 사용자 정보를 찾을 수 없습니다.');
            return;
        }

        // Password check
        if (!userRecord.hasOwnProperty('password')) {
            alert('보안을 위해 먼저 비밀번호를 설정해주세요.');
            return;
        }

        const password = prompt('계정을 삭제하려면 현재 비밀번호를 입력하세요:');
        if (password === null) return;

        if (password !== userRecord.password) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // Final confirmation
        if (!confirm('모든 게시물과 댓글이 영구적으로 삭제됩니다. 정말로 계정 삭제를 진행하시겠습니까?')) {
            return;
        }

        // --- Deletion Process ---
        const usernameToDelete = user.username;

        // 1. Delete posts
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(p => p.author !== usernameToDelete);
        localStorage.setItem('posts', JSON.stringify(posts));

        // 2. Delete comments
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments = comments.filter(c => c.author !== usernameToDelete);
        localStorage.setItem('comments', JSON.stringify(comments));

        // 3. Delete user
        const newUsers = allUsers.filter(u => u.id !== user.id);
        localStorage.setItem('users', JSON.stringify(newUsers));

        // 4. Logout and redirect
        alert('계정이 성공적으로 삭제되었습니다.');
        Auth.logout(); // This will clear currentUser and redirect
    };
});