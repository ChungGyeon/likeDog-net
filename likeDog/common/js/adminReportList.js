document.addEventListener('DOMContentLoaded', () => {
    const reportListBody = document.getElementById('report-list-body');

    const getReports = () => JSON.parse(localStorage.getItem('reports')) || [];
    const saveReports = (reports) => localStorage.setItem('reports', JSON.stringify(reports));
    const getPosts = () => JSON.parse(localStorage.getItem('posts')) || [];
    const savePosts = (posts) => localStorage.setItem('posts', JSON.stringify(posts));

    const renderReports = () => {
        const reports = getReports();
        reportListBody.innerHTML = '';

        if (reports.length === 0) {
            reportListBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">접수된 신고가 없습니다.</td></tr>';
            return;
        }

        reports.forEach(report => {
            const isPending = report.status === 'pending';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.reportId}</td>
                <td><a href="/likeDog/user/posts/post.html?id=${report.reportedPost.id}" target="_blank" style="text-decoration: underline;">${report.reportedPost.title}</a></td>
                <td>${report.reportedAuthor.username}</td>
                <td>${report.reporter.username}</td>
                <td title="${report.reason}" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${report.reason}</td>
                <td><span class="${isPending ? 'text-danger' : 'text-success'}">${report.status}</span></td>
                <td>
                    ${isPending ? `
                        <button class="btn-sm" data-action="resolve" data-report-id="${report.reportId}" style="background-color: var(--success-color); color: #000;">완료</button>
                        <button class="btn-sm" data-action="delete-post" data-report-id="${report.reportId}" data-post-id="${report.reportedPost.id}" style="background-color: var(--danger-color); color: #fff;">게시글 삭제</button>
                    ` : '처리 완료'}
                </td>
            `;
            reportListBody.appendChild(row);
        });
    };

    const handleReportAction = (e) => {
        const action = e.target.dataset.action;
        if (!action) return;

        const reportId = parseInt(e.target.dataset.reportId, 10);
        const reports = getReports();
        const reportIndex = reports.findIndex(r => r.reportId === reportId);

        if (reportIndex === -1) return;

        if (action === 'resolve') {
            reports[reportIndex].status = 'resolved';
            saveReports(reports);
            alert('신고가 처리 완료되었습니다.');
            renderReports();
        }

        if (action === 'delete-post') {
            if (confirm('정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                const postId = parseInt(e.target.dataset.postId, 10);
                const posts = getPosts();
                const updatedPosts = posts.filter(p => p.id !== postId);
                savePosts(updatedPosts);

                reports[reportIndex].status = 'resolved (post deleted)';
                saveReports(reports);
                
                alert('게시글이 삭제되었고, 신고가 처리 완료되었습니다.');
                renderReports();
            }
        }
    };

    reportListBody.addEventListener('click', handleReportAction);
    renderReports();
});
