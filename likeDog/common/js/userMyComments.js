document.addEventListener('DOMContentLoaded', () => {
    if (!Auth.isLoggedIn()) return;
    const user = Auth.getCurrentUser();
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const myComments = comments.filter(c => c.author === user.username);
    const tbody = document.getElementById('my-comments-full');

    tbody.innerHTML = myComments.map(c => {
        const targetPost = posts.find(p => p.id === c.postId);
        return `
                    <tr>
                        <td style="color: #666; font-size: 0.8rem;">\${targetPost ? targetPost.title : '삭제된 게시글'}</td>
                        <td onclick="location.href='/likeDog/user/posts/post.html?id=\${c.postId}'" style="cursor:pointer;">\${c.content}</td>
                        <td>\${c.date}</td>
                        <td>
                            <button class="btn-sm btn-del" onclick="deleteComment(\${c.id})">삭제</button>
                        </td>
                    </tr>
                `;
    }).join('') || '<tr><td colspan="4" style="text-align:center; padding: 50px;">작성한 댓글이 없습니다.</td></tr>';

    window.deleteComment = (id) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            const newComments = comments.filter(c => c.id !== id);
            localStorage.setItem('comments', JSON.stringify(newComments));
            location.reload();
        }
    };
});