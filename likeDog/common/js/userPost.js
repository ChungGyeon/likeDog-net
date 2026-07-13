document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(p => p.id === postId);
    console.log("--- 데이터 확인 ---");
    onsole.log("URL에서 가져온 게시글 ID:", postId);
    console.log("localStorage에서 가져온 게시글 전체 데이터:", posts);
    if (posts.length > 0) {
        console.log("게시글 데이터의 첫 번째 ID 타입:", typeof posts[0].id);
        console.log("URL에서 가져온 ID 타입:", typeof postId);
        }
    console.log("--------------------");
    if (postIndex === -1) {
        alert('존재하지 않는 게시글입니다.');
        location.href = '/likeDog/user/boards/list.html';
        return;
    }

    const post = posts[postIndex];
    const currentUser = Auth.getCurrentUser();

    // --- View Count Logic ---
    if (currentUser) {
        post.viewedBy = post.viewedBy || [];
        if (!post.viewedBy.includes(currentUser.username)) {
            post.views++;
            post.viewedBy.push(currentUser.username);
            posts[postIndex] = post;
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const author = users.find(u => u.username === post.author);
    if (author && author.profileImage) {
        document.querySelector('.author-img').style.backgroundImage = `url('${author.profileImage}')`;
    }

    // --- UI Data Injection ---
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-content').textContent = post.content;
    document.getElementById('post-author-name').textContent = post.author;
    document.getElementById('post-views').textContent = post.views;
    document.getElementById('post-likes').textContent = post.likes;
    if (post.image) {
        document.getElementById('post-image-box').style.backgroundImage = `url('${post.image}')`;
    }

    const isAuthor = currentUser && currentUser.username === post.author;
    const isAdmin = Auth.isAdmin();

    if (isAuthor || isAdmin) {
        document.getElementById('post-admin-actions').innerHTML = `
                <a href="/likeDog/user/posts/edit.html?id=${post.id}" class="btn btn-edit">수정</a>
                <button onclick="handleDelete()" class="btn btn-delete">삭제</button>
            `;
    }

    // --- COMMENT RENDERING LOGIC ---
    function renderComments() {
        const allComments = JSON.parse(localStorage.getItem('comments')) || [];
        const postComments = allComments.filter(c => c.postId === postId);
        const list = document.getElementById('comment-list');
        document.getElementById('comment-count').textContent = `${postComments.length} comments`;

        const oldestCommentId = postComments.length > 0 ? postComments.reduce((oldest, current) => current.id < oldest.id ? current : oldest).id : null;

        // Build the tree
        const commentTree = [];
        const commentMap = {};
        postComments.forEach(comment => {
            comment.children = [];
            commentMap[comment.id] = comment;
            if (comment.parentId && commentMap[comment.parentId]) {
                commentMap[comment.parentId].children.push(comment);
            } else {
                commentTree.push(comment);
            }
        });

        // Sort all levels of comments by ID to ensure chronological order
        commentTree.sort((a, b) => a.id - b.id);
        for (const id in commentMap) {
            const comment = commentMap[id];
            if (comment.children.length > 1) {
                comment.children.sort((a, b) => a.id - b.id);
            }
        }

        function buildCommentHtml(comment, level, parentFloorString) {
            const commentAuthor = users.find(u => u.username === comment.author);
            const commentAuthorImgStyle = commentAuthor && commentAuthor.profileImage ? `style="background-image: url('${commentAuthor.profileImage}')"` : '';

            const isCommentAuthor = currentUser && currentUser.username === comment.author;
            const editDeleteActions = isCommentAuthor ? `
                    <div class="comment-actions">
                        <button onclick="handleEditComment(${comment.id})">수정</button>
                        <button onclick="handleDeleteComment(${comment.id})">삭제</button>
                    </div>
                ` : '';

            const replyButton = `<button class="reply-btn" onclick="showReplyForm(${comment.id})">답글</button>`;

            // Recursive call for children
            const repliesHtml = comment.children.map((reply, index) => {
                return buildCommentHtml(reply, level + 1, `${parentFloorString}-${index + 1}`);
            }).join('');

            const highlightClass = (comment.id === oldestCommentId) ? 'highlight' : '';

            // Indentation fix: Only apply margin to the container for first-level replies
            const replyContainerMargin = (level === 0) ? 'margin-left: 40px;' : '';

            return `
                    <div class="zenless-comment-item-wrapper">
                        <div class="zenless-comment-item ${highlightClass}" id="comment-${comment.id}">
                            <div class="comment-avatar" ${commentAuthorImgStyle}></div>
                            <div class="comment-content-wrapper">
                                <div class="comment-info">
                                    <div class="author">${comment.author}</div>
                                    <div class="text">${comment.content}</div>
                                </div>
                                <div class="comment-footer">
                                    ${replyButton}
                                    ${editDeleteActions}
                                </div>
                            </div>
                            <div class="comment-floor">${parentFloorString}F</div>
                        </div>
                        <div class="reply-form-container" id="reply-form-for-${comment.id}"></div>
                        <div class="replies-container" style="${replyContainerMargin}">
                            ${repliesHtml}
                        </div>
                    </div>`;
        }

        list.innerHTML = commentTree.map((topLevelComment, index) => {
            return buildCommentHtml(topLevelComment, 0, `${index + 1}`);
        }).join('') || '<p style="color: #666; padding: 20px; text-align: center;">아직 댓글이 없습니다.</p>';
    }
    renderComments();

    // --- NEW COMMENT SUBMISSION LOGIC ---
    document.getElementById('submit-comment').addEventListener('click', () => {
        if (!Auth.isLoggedIn()) { alert('로그인이 필요합니다.'); return; }
        const content = document.getElementById('comment-input').value;
        if (!content.trim()) return;
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ id: Date.now(), postId, author: currentUser.username, content, date: new Date().toLocaleString(), parentId: null });
        localStorage.setItem('comments', JSON.stringify(comments));
        document.getElementById('comment-input').value = '';
        renderComments();
    });

    window.showReplyForm = (parentId) => {
        document.querySelectorAll('.reply-form-container').forEach(c => c.innerHTML = '');
        const container = document.getElementById(`reply-form-for-${parentId}`);
        container.innerHTML = `
                <div class="comment-form reply-form">
                    <textarea placeholder="답글을 입력하세요..."></textarea>
                    <div class="reply-form-actions">
                        <button class="btn-primary" onclick="handleSubmitReply(${parentId})">등록</button>
                        <button class="btn-secondary" onclick="closeReplyForm(${parentId})">취소</button>
                    </div>
                </div>
            `;
        container.querySelector('textarea').focus();
    };

    window.closeReplyForm = (parentId) => {
        document.getElementById(`reply-form-for-${parentId}`).innerHTML = '';
    };

    window.handleSubmitReply = (parentId) => {
        if (!Auth.isLoggedIn()) { alert('로그인이 필요합니다.'); return; }
        const container = document.getElementById(`reply-form-for-${parentId}`);
        const content = container.querySelector('textarea').value;
        if (!content.trim()) return;

        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({
            id: Date.now(),
            postId,
            author: currentUser.username,
            content,
            date: new Date().toLocaleString(),
            parentId: parentId
        });
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
    };

    window.handleDelete = () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            const newPosts = posts.filter(p => p.id !== postId);
            localStorage.setItem('posts', JSON.stringify(newPosts));
            alert('삭제되었습니다.');
            location.href = '/likeDog/user/boards/list.html';
        }
    };

    window.handleDeleteComment = (commentId) => {
        if (!confirm('정말 이 댓글을 삭제하시겠습니까? 이 작업은 모든 하위 답글도 함께 삭제합니다.')) return;
        let allComments = JSON.parse(localStorage.getItem('comments')) || [];
        const commentsToDelete = new Set([commentId]);
        let changed = true;
        while(changed) {
            changed = false;
            const toDeleteCount = commentsToDelete.size;
            allComments.forEach(c => {
                if (c.parentId && commentsToDelete.has(c.parentId)) {
                    commentsToDelete.add(c.id);
                }
            });
            if (commentsToDelete.size > toDeleteCount) changed = true;
        }
        const newComments = allComments.filter(c => !commentsToDelete.has(c.id));
        localStorage.setItem('comments', JSON.stringify(newComments));
        renderComments();
    };

    window.handleEditComment = (commentId) => {
        const allComments = JSON.parse(localStorage.getItem('comments')) || [];
        const comment = allComments.find(c => c.id === commentId);
        if (!comment) return;
        const item = document.getElementById(`comment-${commentId}`);
        const wrapper = item.querySelector('.comment-content-wrapper');

        // Set the HTML with classes for the buttons
        wrapper.innerHTML = `
                <div class="comment-info">
                    <div class="author">${comment.author}</div>
                    <textarea class="edit-comment-textarea">${comment.content}</textarea>
                </div>
                <div class="comment-footer">
                     <div class="comment-actions">
                        <button class="save-comment-btn">저장</button>
                        <button class="cancel-edit-btn">취소</button>
                    </div>
                </div>
            `;

        // Add event listeners to the new buttons
        wrapper.querySelector('.save-comment-btn').addEventListener('click', () => {
            handleSaveComment(commentId);
        });
        wrapper.querySelector('.cancel-edit-btn').addEventListener('click', () => {
            renderComments();
        });

        wrapper.querySelector('textarea').focus();
    };

    window.handleSaveComment = (commentId) => {
        const item = document.getElementById(`comment-${commentId}`);
        const newContent = item.querySelector('.edit-comment-textarea').value;
        if (!newContent.trim()) {
            alert('댓글 내용이 비어있습니다.');
            return;
        }
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        const commentIndex = comments.findIndex(c => c.id === commentId);
        if (commentIndex > -1) {
            comments[commentIndex].content = newContent;
            localStorage.setItem('comments', JSON.stringify(comments));
        }
        renderComments();
    };

    const reportBtn = document.getElementById('report-post-btn');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            if (!Auth.isLoggedIn()) { alert('신고 기능은 로그인이 필요합니다.'); location.href = '/likeDog/user/auth/login.html'; return; }
            const reason = prompt('이 게시글을 신고하는 사유를 입력해주세요.');
            if (reason === null) return;
            if (!reason.trim()) { alert('신고 사유를 입력해야 합니다.'); return; }
            const reports = JSON.parse(localStorage.getItem('reports')) || [];
            reports.push({
                reportId: Date.now(),
                reporter: { username: currentUser.username, id: currentUser.id },
                reportedPost: { id: post.id, title: post.title },
                reportedAuthor: { username: post.author },
                reason: reason, status: 'pending', reportDate: new Date().toISOString().split('T')[0]
            });
            localStorage.setItem('reports', JSON.stringify(reports));
            alert('신고가 정상적으로 접수되었습니다.');
        });
    }

    const likeBtn = document.getElementById('like-btn');
    const postLikesSpan = document.getElementById('post-likes');
    const updateLikeButtonVisual = () => {
        if (!currentUser) return;
        post.likedBy = post.likedBy || [];
        if (post.likedBy.includes(currentUser.username)) {
            likeBtn.style.color = 'var(--danger-color)';
            likeBtn.style.transform = 'scale(1.1)';
        } else {
            likeBtn.style.color = '';
            likeBtn.style.transform = '';
        }
    };
    likeBtn.addEventListener('click', () => {
        if (!Auth.isLoggedIn()) { alert('로그인이 필요합니다.'); return; }
        const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const postIndex = allPosts.findIndex(p => p.id === postId);
        if (postIndex === -1) return;
        const targetPost = allPosts[postIndex];
        targetPost.likedBy = targetPost.likedBy || [];
        const userIndexInLikedBy = targetPost.likedBy.indexOf(currentUser.username);
        if (userIndexInLikedBy > -1) {
            targetPost.likes--;
            targetPost.likedBy.splice(userIndexInLikedBy, 1);
        } else {
            targetPost.likes++;
            targetPost.likedBy.push(currentUser.username);
        }
        localStorage.setItem('posts', JSON.stringify(allPosts));
        post.likes = targetPost.likes;
        post.likedBy = targetPost.likedBy;
        postLikesSpan.textContent = post.likes;
        updateLikeButtonVisual();
    });
    updateLikeButtonVisual();
});