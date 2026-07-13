# 개처럼 커뮤니티
개처럼 커뮤니티'는 별도의 라이브러리나 프레임워크 없이 순수 HTML, CSS, JavaScript만으로 구현된 동적 웹 애플리케이션입니다. 

서버와 데이터베이스를 `localStorage`로 대체하여, 프론트엔드 환경에서 게시판의 핵심 기능인 CRUD(생성, 읽기, 수정, 삭제)를 어떻게 구현할 수 있는지 보여주는 실습형 프로젝트입니다. 

사용자는 회원가입부터 게시글 및 댓글 작성, 프로필 수정, 계정 삭제에 이르는 전체적인 서비스 흐름을 경험할 수 있으며, 관리자 페이지를 통해 기본적인 콘텐츠 관리 기능 또한 확인할 수 있습니다.

## 역할별 기능

### 사용자
- 회원가입
- 로그인
- 게시판 조회
- 게시글 CRUD 
- 댓글 CRUD
- 좋아요
- 게시글 신고
- 마이페이지
- 프로필 수정

### 관리자
- 회원 관리
- 게시판 관리
- 공지사항 관리
- 신고 처리
- 게시글 삭제
- 댓글 삭제
- 대시보드

# 파일구조 
```text
likeDog
│
├── admin
│   ├── boards
│   │   └── list.html # 관리자가 모든 게시글을 관리하는 페이지.
│   ├── dashboard
│   │   └── index.html # 사이트 현황을 요약하는 관리자 대시보드.
│   ├── reports
│   │   └── list.html # 사용자가 신고한 내역을 관리하는 페이지.
│   └── users
│       ├── list.html # 모든 사용자 목록을 관리하는 페이지.
│       └── usersInfo.html # 특정 사용자의 상세 정보 및 활동을 확인하는 페이지.
│
├── common
│   ├── css
│   │   ├── adminboardList.css
│   │   ├── find-password.css
│   │   ├── post.css
│   │   ├── signup.css
│   │   └── style.css # 각 페이지의 시각적 스타일을 정의하는 CSS 파일들.
│   ├── images
│   │   └── likedog_background.png # 사이트 전반에 사용되는 배경 이미지.
│   └── js
│       ├── adminboardList.js
│       ├── adminDashboardIndex.js
│       ├── adminlist.js
│       ├── adminReportList.js
│       ├── adminuserInfo.js
│       ├── find-password.js
│       ├── login.js
│       ├── script.js # 페이지의 동적 기능과 공통 로직을 담은 JS 파일들.
│       ├── signup.js
│       ├── userMyComments.js
│       ├── userMyPosts.js
│       ├── userPost.js
│       ├── userPostLogic.js
│       └── userProfile.js
│
└── user
    ├── auth
    │   ├── find-password.html # 비밀번호 찾기 기능을 위한 페이지.
    │   ├── login.html # 사용자가 서비스에 로그인하는 페이지.
    │   └── signup.html # 새로운 사용자가 계정을 생성하는 페이지.
    ├── boards
    │   └── list.html # 사용자가 게시글 목록을 확인하는 페이지.
    ├── home
    │   └── index.html # 사이트의 메인 랜딩 페이지.
    ├── mypage
    │   ├── comments.html # 사용자가 본인이 작성한 모든 댓글을 확인하는 페이지.
    │   ├── posts.html # 사용자가 본인이 작성한 모든 게시글을 확인하는 페이지.
    │   └── profile.html # 사용자의 프로필 정보를 확인하고 수정하는 페이지.
    └── posts
        ├── edit.html # 새 게시글을 작성하거나 기존 글을 수정하는 페이지.
        └── post.html # 단일 게시글의 상세 내용과 댓글을 보여주는 페이지.
```


# 구현 시 주의사항
1. 공용으로 사용되는 style.css, script.js를 우선 확인 후, 작업을 수행한다.
2. 각 html에 대응하는 css,js는 common 디렉토리의 css,js에 각기 구현한다. (예시: test.html의 css,js는 test.css.js파일로 구현)
3. 외부 DB를 사용하지 않고 오로지 브라우저의 localStorege만을 사용하여 구현한다.
