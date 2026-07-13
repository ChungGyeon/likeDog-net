document.addEventListener('DOMContentLoaded', () => {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser) {
        alert('로그인이 필요합니다.');
        location.href = '/likeDog/user/auth/login.html';
        return;
    }

    const grid = document.getElementById('post-grid');
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const userPosts = allPosts.filter(post => post.author === currentUser.username);

    if (userPosts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">작성한 게시글이 없습니다.</p>';
        return;
    }

    grid.innerHTML = userPosts.map(post => createPostCard(post)).join('');
});