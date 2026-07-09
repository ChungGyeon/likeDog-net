// likeDog-Net User Post Logic (Create & Edit)

const UserPostLogic = {
    // Get post ID from URL
    getPostId: () => {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id'));
    },

    // Initialize Form (Create or Edit mode)
    initForm: () => {
        const postId = UserPostLogic.getPostId();
        const formTitle = document.getElementById('form-main-title');
        const submitBtn = document.getElementById('submit-btn');

        if (postId) {
            // Edit Mode
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const post = posts.find(p => p.id === postId);

            if (!post) {
                alert('게시글을 찾을 수 없습니다.');
                location.href = '../boards/list.html';
                return;
            }

            // Check Permission
            const currentUser = Auth.getCurrentUser();
            if (!Auth.isAdmin() && (!currentUser || currentUser.username !== post.author)) {
                alert('수정 권한이 없습니다.');
                location.href = '../boards/list.html';
                return;
            }

            formTitle.textContent = '게시글 수정';
            submitBtn.textContent = '수정 완료';

            document.getElementById('edit-title').value = post.title;
            document.getElementById('edit-category').value = post.category;
            document.getElementById('edit-content').value = post.content;
            if (post.image) document.getElementById('edit-image-url').value = post.image;
        } else {
            // Create Mode
            formTitle.textContent = '새 게시글 작성';
            submitBtn.textContent = '등록하기';
        }
    },

    // Handle Form Submit
    handleSubmit: (e) => {
        e.preventDefault();

        if (!Auth.isLoggedIn()) {
            alert('로그인이 필요합니다.');
            return;
        }

        const postId = UserPostLogic.getPostId();
        const title = document.getElementById('edit-title').value;
        const category = document.getElementById('edit-category').value;
        const content = document.getElementById('edit-content').value;
        const imageUrl = document.getElementById('edit-image-url').value || `https://picsum.photos/seed/${Date.now()}/400/300`;

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentUser = Auth.getCurrentUser();

        if (postId) {
            // Update existing post
            const index = posts.findIndex(p => p.id === postId);
            posts[index] = {
                ...posts[index],
                title,
                category,
                content,
                image: imageUrl
            };
            alert('수정되었습니다.');
        } else {
            // Create new post
            const newPost = {
                id: Date.now(),
                title,
                category,
                content,
                author: currentUser.username,
                authorLevel: currentUser.level,
                views: 0,
                likes: 0,
                date: new Date().toISOString().split('T')[0],
                image: imageUrl
            };
            posts.unshift(newPost);
            alert('등록되었습니다.');
        }

        localStorage.setItem('posts', JSON.stringify(posts));
        location.href = postId ? `post.html?id=${postId}` : '../boards/list.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UserPostLogic.initForm();
    document.getElementById('edit-form').addEventListener('submit', UserPostLogic.handleSubmit);
});
