document.addEventListener('DOMContentLoaded', () => {
    // This script was moved to common/js/dashboard.js, but for this request, we modify it here.
    // A better practice would be to link to the external JS file.
    const Auth = window.Auth || { isAdmin: () => true }; // Fallback for Auth object

    if (!Auth.isAdmin()) {
        alert('관리자 권한이 없습니다.');
        location.href = '/likeDog/user/home/index.html';
        return;
    }

    // --- Data Reset Logic ---
    const resetBtn = document.getElementById('reset-data-btn');
    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('정말로 모든 데이터를 초기화하시겠습니까? 저장된 모든 게시글, 사용자, 게시판 등이 삭제되고 예시 데이터로 대체됩니다.')) {
                localStorage.clear();
                alert('데이터가 초기화되었습니다. 페이지를 새로고침합니다.');
                location.reload();
            }
        });
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const reports = JSON.parse(localStorage.getItem('reports')) || [];

    // Update stat cards
    document.getElementById('stat-users').textContent = users.length;
    document.getElementById('stat-posts').textContent = posts.length;
    document.getElementById('stat-reports').textContent = reports.filter(r => r.status === 'pending').length;

    // Get last 10 reports and reverse to show newest first
    const recentReports = reports.slice(-10).reverse();
    const tbody = document.getElementById('recent-reports');

    if (recentReports.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px;">최근 신고 내역이 없습니다.</td></tr>';
    } else {
        tbody.innerHTML = recentReports.map(r => {
            const isPending = r.status === 'pending';
            return `
                    <tr>
                        <td>${r.reportId}</td>
                        <td><a href="/likeDog/user/posts/post.html?id=${r.reportedPost.id}" target="_blank" style="text-decoration: underline;">${r.reportedPost.title}</a></td>
                        <td title="${r.reason}" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.reason}</td>
                        <td>${r.reporter.username}</td>
                        <td><span class="${isPending ? 'text-danger' : 'text-success'}">${r.status}</span></td>
                    </tr>
                `;
        }).join('');
    }
});