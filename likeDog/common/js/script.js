// likeDog-Net Common JS

// Initial Data Setup
const initialPosts = [
    { id: 6, boardId: 2, title: "개처럼넷 기본규정", content: "개처럼넷 기본 규정\n1.욕설금지\n2.19금 이미지 업로드 금지\n3.그외는 자유", author: "admin", authorLevel: 99, views: 15000, likes: 999, date: "2026-07-10", category: "공지", image: "https://picsum.photos/seed/post6/400/300", likedBy: [], viewedBy: [] },
    { id: 1, boardId: 1, title: "[잡담] 코로나 자가 테스트 결과가 나왔는데...", content: "그냥 일해도 되겠지?.", author: "lalala", authorLevel: 15, views: 5881, likes: 120, date: "2026-07-08", category: "잡담", image: "https://picsum.photos/seed/post1/400/300", likedBy: [], viewedBy: [] },
    { id: 2, boardId: 1, title: "[잡담] 치명적 구조 재밌어?", content: "요즘 다들 치명적 구조에 대해 이야기하던데 나도 해볼까 고민 중이야.", author: "Indigo", authorLevel: 22, views: 7989, likes: 340, date: "2026-07-08", category: "잡담", image: "https://picsum.photos/seed/post2/400/300", likedBy: [], viewedBy: [] },
    { id: 3, boardId: 1, title: "[법률 도움 요청] 우리 집 가사 도우미가 강도 3명을...", content: "오늘 방문 청소 서비스를 예약했는데, 집에 들어온 강도 3명을 도우미분이 때려눕혔어. 이거 정당방위 인정되겠지?", author: "나만고양이있어", authorLevel: 10, views: 9631, likes: 890, date: "2026-07-07", category: "법률", image: "https://picsum.photos/seed/post3/400/300", likedBy: [], viewedBy: [] },
    { id: 4, boardId: 1, title: "[잡담] 낡은 지하철 골 폭파 예정", content: "옛 도시 지하철 개조 프로젝트의 일환으로 폭파한다고 하네. 다들 조심해.", author: "메티스정보실_1호", authorLevel: 45, views: 8267, likes: 156, date: "2026-07-07", category: "잡담", image: "https://picsum.photos/seed/post4/400/300", likedBy: [], viewedBy: [] },
    { id: 5, boardId: 1, title: "[잡담] 비전 컴퍼니의 충격적인 스캔들 폭로", content: "며칠 전 비전 컴퍼니가 보상 비용을 횡령했다는 증거를 확보했어.", author: "메티스정보실_1호", authorLevel: 45, views: 13409, likes: 1200, date: "2026-07-06", category: "잡담", image: "https://picsum.photos/seed/post5/400/300", likedBy: [], viewedBy: [] },
    { id: 7, boardId: 1, title: "[잡담] 새벽 2시 이후에는 4호 엘리베이터 타지 마", content: "장난인 줄 알았는데 CCTV 확인해보니까 13층 버튼 누른 사람이 없더라. 관리실도 기록이 없다고 함.", author: "야간근무", authorLevel: 17, views: 8342, likes: 531, date: "2026-07-09", category: "잡담", image: "https://picsum.photos/seed/post7/400/300", likedBy: [], viewedBy: [] },
    { id: 8, boardId: 1, title: "[법률] 기밀 유지 계약 때문에 신고도 못 합니다", content: "퇴사하면서 서명한 계약서 때문에 겪은 일을 말해도 되는지 모르겠습니다. 이런 계약도 효력이 있나요?", author: "익명", authorLevel: 11, views: 6231, likes: 302, date: "2026-07-09", category: "법률", image: "https://picsum.photos/seed/post8/400/300", likedBy: [], viewedBy: [] },
    { id: 9, boardId: 1, title: "[의뢰] 1998년 이전 지도 구합니다", content: "현재 지도에는 없는 골목을 찾고 있습니다. 당시 종이지도나 사진 있으신 분 연락 부탁드립니다.", author: "지도수집가", authorLevel: 24, views: 3201, likes: 127, date: "2026-07-09", category: "의뢰", image: "https://picsum.photos/seed/post9/400/300", likedBy: [], viewedBy: [] },
    { id: 10, boardId: 1, title: "[잡담] 오늘도 번호 없는 전화가 왔습니다", content: "받자마자 아무 말도 안 하고 주변 소리만 들렸습니다. 이번이 벌써 다섯 번째입니다.", author: "404", authorLevel: 19, views: 10294, likes: 691, date: "2026-07-08", category: "잡담", image: "https://picsum.photos/seed/post10/400/300", likedBy: [], viewedBy: [] },
    { id: 11, boardId: 1, title: "[잡담] 창문을 두드리는 소리가 들리는데", content: "17층입니다. 밖에는 발 디딜 곳도 없습니다.", author: "잠못잠", authorLevel: 7, views: 14872, likes: 1312, date: "2026-07-08", category: "잡담", image: "https://picsum.photos/seed/post11/400/300", likedBy: [], viewedBy: [] },
    { id: 12, boardId: 1, title: "[의뢰] 녹음 파일 분석 가능하신 분", content: "사람 목소리는 아닌 것 같은데 반복적으로 같은 소리가 들립니다. 잡음 제거 가능하신 분 계실까요?", author: "Recorder", authorLevel: 28, views: 2951, likes: 183, date: "2026-07-08", category: "의뢰", image: "https://picsum.photos/seed/post12/400/300", likedBy: [], viewedBy: [] },
    { id: 13, boardId: 1, title: "[잡담] 버스 기사님도 못 봤다고 합니다", content: "정류장에서 분명 같이 기다리던 사람이 CCTV에는 안 찍혀 있었습니다.", author: "흐림", authorLevel: 13, views: 9620, likes: 548, date: "2026-07-07", category: "잡담", image: "https://picsum.photos/seed/post13/400/300", likedBy: [], viewedBy: [] },
    { id: 14, boardId: 1, title: "[법률] 습득한 USB를 열어본 것도 처벌받나요?", content: "길에서 주운 USB 안에 이상한 문서들이 있습니다. 신고하려는데 제가 먼저 확인한 것도 문제가 될까요?", author: "궁금", authorLevel: 15, views: 4175, likes: 199, date: "2026-07-07", category: "법률", image: "https://picsum.photos/seed/post14/400/300", likedBy: [], viewedBy: [] },
    { id: 15, boardId: 1, title: "[잡담] 같은 꿈을 꾸는 사람이 늘고 있습니다", content: "붉은 계단을 내려가면 문이 하나 있고, 문 앞에서 항상 누군가 서 있습니다.", author: "꿈기록", authorLevel: 21, views: 11892, likes: 840, date: "2026-07-07", category: "잡담", image: "https://picsum.photos/seed/post15/400/300", likedBy: [], viewedBy: [] },
    { id: 16, boardId: 1, title: "[의뢰] 폐병원 출입 기록 있으신 분", content: "2012년 여름에 방문했던 분을 찾습니다. 당시 사진이나 영상도 괜찮습니다.", author: "조사반", authorLevel: 31, views: 2781, likes: 142, date: "2026-07-06", category: "의뢰", image: "https://picsum.photos/seed/post16/400/300", likedBy: [], viewedBy: [] }
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

const initialBoards = [
    { id: 1, name: '종류상관없는 게시판', createdAt: '2026-07-10' },
    { id: 2, name: '공지사항', createdAt: '2026-07-10', adminOnly: true }
];

// Initialize LocalStorage
function initStorage() {
    if (!localStorage.getItem('posts')) localStorage.setItem('posts', JSON.stringify(initialPosts));
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(initialUsers));
    if (!localStorage.getItem('notis')) localStorage.setItem('notis', JSON.stringify(initialNotis));
    if (!localStorage.getItem('boards')) localStorage.setItem('boards', JSON.stringify(initialBoards));
    if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify([]));
    if (!localStorage.getItem('reports')) localStorage.setItem('reports', JSON.stringify([]));
}

initStorage();

// Auth Helper
const Auth = {
    login: (username, password) => {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === username);

        if (!user) {
            return false; // User not found
        }

        // Special case for admin and user1
        if (user.username === 'admin' || user.username === 'user1') {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }

        // For all other users, check the password
        // It also handles users who haven't set a password yet (user.password is undefined)
        if (user.password && user.password === password) {
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
    const boards = JSON.parse(localStorage.getItem('boards')) || [];

    // Create board dropdown HTML
    const boardDropdownItems = boards.map(board => 
        `<li><a href="/likeDog/user/boards/list.html?boardId=${board.id}">${board.name}</a></li>`
    ).join('');

    const boardNavHtml = `
        <li class="nav-dropdown">
            <a href="/likeDog/user/boards/list.html" id="nav-board">게시판</a>
            <ul class="dropdown-menu">
                <li><a href="/likeDog/user/boards/list.html">전체 게시판</a></li>
                ${boardDropdownItems}
            </ul>
        </li>
    `;

    let navHtml = `
        <nav>
            <ul>
                <li><a href="/index.html" id="nav-home">홈</a></li>
                ${boardNavHtml}
                <li><a href="/likeDog/user/boards/list.html?boardId=2" id="nav-noti">공지사항</a></li>
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
        <a href="/index.html" class="logo">likeDog-Net</a>
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

function renderHomePage() {
    const container = document.getElementById('home-content-container');
    if (!container) return;

    const boards = JSON.parse(localStorage.getItem('boards')) || [];
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];

    let allSectionsHtml = '';

    // 1. "All Posts" Section
    const recentPosts = allPosts.slice(0, 10);
    let recentPostsHtml = '';
    if (recentPosts.length > 0) {
        recentPostsHtml = recentPosts.map(post => createPostCard(post)).join('');
    } else {
        recentPostsHtml = '<p style="text-align: center; color: var(--text-secondary); padding: 40px 0; grid-column: 1 / -1;">게시글이 없습니다.</p>';
    }
    
    allSectionsHtml += `
        <section class="board-section">
            <div class="board-section-header">
                <h2>전체 게시판</h2>
                <a href="/likeDog/user/boards/list.html">더보기 &gt;</a>
            </div>
            <div class="card-grid">
                ${recentPostsHtml}
            </div>
        </section>
    `;

    // 2. Individual Board Sections
    if (boards.length > 0) {
        boards.forEach(board => {
            const boardPosts = allPosts.filter(p => p.boardId === board.id).slice(0, 10);
            
            let postsHtml = '';
            if (boardPosts.length > 0) {
                postsHtml = boardPosts.map(post => createPostCard(post)).join('');
            } else {
                postsHtml = '<p style="text-align: center; color: var(--text-secondary); padding: 40px 0; grid-column: 1 / -1;">이 게시판에는 아직 게시글이 없습니다.</p>';
            }

            allSectionsHtml += `
                <section class="board-section">
                    <div class="board-section-header">
                        <h2>${board.name}</h2>
                        <a href="/likeDog/user/boards/list.html?boardId=${board.id}">더보기 &gt;</a>
                    </div>
                    <div class="card-grid">
                        ${postsHtml}
                    </div>
                </section>
            `;
        });
    }

    container.innerHTML = allSectionsHtml;
}

function renderBoardPage() {
    const container = document.getElementById('board-page-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('boardId') ? parseInt(urlParams.get('boardId'), 10) : null;

    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const boards = JSON.parse(localStorage.getItem('boards')) || [];
    
    const grid = document.getElementById('post-grid');
    const titleEl = document.getElementById('board-page-title');
    const filter = document.getElementById('category-filter');
    const writeBtn = document.getElementById('write-btn');

    let postsToShow = [];

    if (boardId) {
        const board = boards.find(b => b.id === boardId);
        if (board) {
            titleEl.textContent = board.name;
            postsToShow = allPosts.filter(p => p.boardId === boardId);
        } else {
            titleEl.textContent = '알 수 없는 게시판';
        }
    } else {
        titleEl.textContent = '전체 게시글';
        postsToShow = allPosts;
    }

    function renderFilteredPosts() {
        const category = filter.value;
        const finalPosts = category === 'all' ? postsToShow : postsToShow.filter(p => p.category === category);

        if (finalPosts.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px; color: #666;">게시글이 없습니다.</p>';
            return;
        }
        grid.innerHTML = finalPosts.map(post => createPostCard(post)).join('');
    }

    filter.addEventListener('change', renderFilteredPosts);
    writeBtn.addEventListener('click', () => {
        if (!Auth.isLoggedIn()) {
            alert('로그인이 필요합니다.');
            location.href = '/likeDog/user/auth/login.html';
        } else {
            // Pass boardId to edit page so it can be pre-selected
            const url = boardId ? `/likeDog/user/posts/edit.html?boardId=${boardId}` : '/likeDog/user/posts/edit.html';
            location.href = url;
        }
    });

    renderFilteredPosts(); // Initial render
}

// Global scope expose for event handlers
window.Auth = Auth;
window.createPostCard = createPostCard;

// On Load
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();

    if (document.getElementById('home-content-container')) {
        renderHomePage();
    } else if (document.getElementById('board-page-container')) {
        renderBoardPage();
    }
});
