# 개처럼 커뮤니티
CRUD의 대표적이라면 게시판에 글쓰기,수정,삭제가 대표적
이를 구현하는 프로젝트 아닌 프로젝트.

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
├── admin                    # 관리자 시스템
│   │
│   ├── dashboard
│   │   └── index.html
│   │
│   ├── users
│   │   ├── list.html
│   │   ├── detail.html
│   │   └── edit.html
│   │
│   ├── boards
│   │   ├── list.html
│   │   ├── new.html
│   │   ├── edit.html
│   │   └── detail.html
│   │
│   ├── posts
│   │   ├── list.html
│   │   └── detail.html
│   │
│   ├── comments
│   │   └── list.html
│   │
│   └── reports
│       └── list.html
│
├── user                     # 사용자 시스템
│   │
│   ├── home
│   │   └── index.html
│   │
│   ├── auth
│   │   ├── login.html
│   │   ├── signup.html
│   │   └── find-password.html
│   │
│   ├── boards
│   │   ├── list.html
│   │   └── detail.html
│   │
│   ├── posts
│   │   ├── new.html
│   │   ├── detail.html
│   │   └── edit.html
│   │
│   ├── comments
│   │   └── edit.html
│   │
│   ├── mypage
│   │   ├── profile.html
│   │   ├── posts.html
│   │   ├── comments.html
│   │   └── likes.html
│   │
│   └── notifications
│       └── list.html
│
└── common                   # 공통 시스템
│
├── layouts
├── components
├── css
├── js
├── images
└── error
```