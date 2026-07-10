// likeDog-Net Common JS

// Initial Data Setup
const initialPosts = [
    { id: 1, title: "[잡담] 에테르 적성 자가 테스트 결과가 나왔는데...", content: "공동에서 일해도 되는 거야? 아직 고등학교 졸업 전인 학생이라 걱정되네.", author: "lalala", authorLevel: 15, views: 5881, likes: 120, date: "2026-07-08", category: "잡담", image: "https://picsum.photos/seed/post1/400/300" },
    { id: 2, title: "[잡담] 치명적 구조 재밌어?", content: "요즘 다들 치명적 구조에 대해 이야기하던데 나도 해볼까 고민 중이야.", author: "Indigo", authorLevel: 22, views: 7989, likes: 340, date: "2026-07-08", category: "잡담", image: "https://picsum.photos/seed/post2/400/300" },
    { id: 3, title: "[법률 도움 요청] 우리 집 가사 도우미가 강도 3명을...", content: "오늘 방문 청소 서비스를 예약했는데, 집에 들어온 강도 3명을 도우미분이 때려눕혔어. 이거 정당방위 인정되겠지?", author: "나만고양이있어", authorLevel: 10, views: 9631, likes: 890, date: "2026-07-07", category: "법률", image: "https://picsum.photos/seed/post3/400/300" },
    { id: 4, title: "[잡담] 낡은 지하철 골 폭파 예정", content: "옛 도시 지하철 개조 프로젝트의 일환으로 폭파한다고 하네. 다들 조심해.", author: "메티스정보실_1호", authorLevel: 45, views: 8267, likes: 156, date: "2026-07-07", category: "잡담", image: "https://picsum.photos/seed/post4/400/300" },
    { id: 5, title: "[잡담] 비전 컴퍼니의 충격적인 스캔들 폭로", content: "며칠 전 비전 컴퍼니가 보상 비용을 횡령했다는 증거를 확보했어.", author: "메티스정보실_1호", authorLevel: 45, views: 13409, likes: 1200, date: "2026-07-06", category: "잡담", image: "https://picsum.photos/seed/post5/400/300" }
];

const initialUsers = [
    { id: 1, username: "admin", name: "관리자", level: 99, role: "admin", signupDate: "2026-01-01" },
    { id: 2, username: "user1", name: "테스터1", level: 10, role: "user", signupDate: "2026-06-15" },
    { id: 3, username: "lalala", name: "라라라", level: 15, role: "user", signupDate: "2026-07-01" }
];

const initialNotis = [
    { id: 1, title: "서버 점검 안내 (7/10)", content: "보다 쾌적한 환경을 위해 서버 점검을 진행합니다.", date: "2026-07-09", important: true },
    { id: 2, title: "커뮤니티 가이드라인 개정 안내", content: "신고 처리 기준이 강화되었습니다.", date: "2026-07-05", important: false }
];

// Initialize LocalStorage
function initStorage() {
    if (!localStorage.getItem('posts')) localStorage.setItem('posts', JSON.stringify(initialPosts));
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(initialUsers));
    if (!localStorage.getItem('notis')) localStorage.setItem('notis', JSON.stringify(initialNotis));
    if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify([]));
    if (!localStorage.getItem('reports')) localStorage.setItem('reports', JSON.stringify([]));
}

initStorage();

// Auth Helper
const Auth = {
    login: (username, password) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    },
    logout: () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/likeDog/user/auth/login.html';
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('currentUser'));
    },
    isLoggedIn: () => {
        return !!localStorage.getItem('currentUser');
    },
    isAdmin: () => {
        const user = Auth.getCurrentUser();
        return user && user.role === 'admin';
    }
};

// UI Helpers
function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const user = Auth.getCurrentUser();
    const isAdmin = Auth.isAdmin();

    let navHtml = `
        <nav>
            <ul>
                <li><a href="/likeDog/user/home/index.html" id="nav-home">홈</a></li>
                <li><a href="/likeDog/user/boards/list.html" id="nav-board">게시판</a></li>
                <li><a href="/likeDog/user/notifications/list.html" id="nav-noti">공지사항</a></li>
                ${isAdmin ? '<li><a href="/likeDog/admin/dashboard/index.html" style="color: #eaff00;">관리자</a></li>' : ''}
            </ul>
        </nav>
    `;

    let userHtml = '';
    if (user) {
        const profileImgStyle = user.profileImage ? `style="background-image: url('${user.profileImage}')"` : '';
        userHtml = `
            <div class="user-status">
                <div class="user-info">
                    <div class="name">${user.name}</div>
                    <div class="level">Lv.${user.level}</div>
                </div>
                <a href="/likeDog/user/mypage/profile.html"><div class="profile-img" ${profileImgStyle}></div></a>
                <button onclick="Auth.logout()" class="btn-sm btn-secondary">로그아웃</button>
            </div>
        `;
    } else {
        userHtml = `
            <div class="user-status">
                <a href="/likeDog/user/auth/login.html" class="btn-sm btn-primary">로그인</a>
                <a href="/likeDog/user/auth/signup.html" class="btn-sm btn-secondary">회원가입</a>
            </div>
        `;
    }

    header.innerHTML = `
        <a href="/likeDog/user/home/index.html" class="logo">likeDog-Net</a>
        ${navHtml}
        ${userHtml}
    `;

    // Set Active Nav
    const path = window.location.pathname;
    if (path.includes('home')) document.getElementById('nav-home')?.classList.add('active');
    if (path.includes('boards')) document.getElementById('nav-board')?.classList.add('active');
    if (path.includes('notifications')) document.getElementById('nav-noti')?.classList.add('active');
}

// Post Renderer
function createPostCard(post) {
    const boards = JSON.parse(localStorage.getItem('boards')) || [];
    const boardMap = boards.reduce((acc, board) => {
        acc[board.id] = board.name;
        return acc;
    }, {});
    const boardName = boardMap[post.boardId] || '미분류';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const author = users.find(u => u.username === post.author);
    const authorImgStyle = author && author.profileImage ? `style="background-image: url('${author.profileImage}')"` : '';

    return `
        <div class="card" onclick="location.href='/likeDog/user/posts/post.html?id=${post.id}'">
            <div class="card-image-wrapper">
                <img src="${post.image || 'https://via.placeholder.com/400x300'}" class="card-image" alt="post">
                <div class="card-views">👁️ ${post.views}</div>
            </div>
            <div class="card-content">
                <div>
                    <span class="card-tag" style="color: var(--accent-color);">${boardName}</span>
                    <span class="card-tag">${post.category}</span>
                </div>
                <h3 class="card-title">${post.title}</h3>
                <p class="card-desc">${post.content}</p>
                <div class="card-footer">
                    <div class="card-author">
                        <div class="author-img" ${authorImgStyle}></div>
                        <span>${post.author}</span>
                    </div>
                    <span>❤️ ${post.likes}</span>
                </div>
            </div>
        </div>
    `;
}

function renderBoard() {
    const grid = document.getElementById('post-grid');
    const filter = document.getElementById('category-filter');
    const writeBtn = document.getElementById('write-btn');

    if (!grid) return;

    function getPosts() {
        return JSON.parse(localStorage.getItem('posts')) || [];
    }

    function renderPosts(filteredPosts) {
        if (filteredPosts.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">게시글이 없습니다.</p>';
            return;
        }
        grid.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
    }

    renderPosts(getPosts());

    if (filter) {
        filter.addEventListener('change', (e) => {
            const cat = e.target.value;
            const posts = getPosts();
            const filtered = cat === 'all' ? posts : posts.filter(p => p.category === cat);
            renderPosts(filtered);
        });
    }

    if (writeBtn) {
        writeBtn.addEventListener('click', () => {
            if (!Auth.isLoggedIn()) {
                alert('로그인이 필요합니다.');
                location.href = '../auth/login.html';
            } else {
                location.href = '../posts/edit.html';
            }
        });
    }
}

// Global scope expose for event handlers
window.Auth = Auth;
window.createPostCard = createPostCard;

// On Load
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();

    // Render board if on the board page
    if (document.getElementById('post-grid')) {
        renderBoard();
    }
});
