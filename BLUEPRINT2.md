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
│   │   ├── list.html      # 유저 전체 리스트
│   │   └── usersInfo.html # 유저 1명의 정보(게시한글,댓글 확인 가능한 곳)
│   │
│   │
│   ├── boards
│   │   └──  list.html     #관리자 시점에서 보이는 게시글, 이곳에서 접근하는 게시글은 수정,삭제가 자유롭다.
│   │
│   │
│   └── reports          
│       └── list.html   #유저가 신고한 게시글이 올라오는 페이지
│
├── user                     # 사용자 시스템
│   │
│   ├── home
│   │   └── index.html       #메인페이지
│   │
│   ├── auth
│   │   ├── login.html      #로그인페이지
│   │   ├── signup.html    #회원가입페이지
│   │   └── find-password.html   #비밀번호 찾는 페이지, 현시점 구현계획 x
│   │
│   ├── boards
│   │   └── list.html #게시글 전체가 보이는 리스트
│   │
│   ├── posts
│   │   ├── post.html #실제 유저 게시글
│   │   └── edit.html #해당 게시글 수정페이지
│   │
│   │
│   └── mypage
│       ├── profile.html   #유저 정보 확인 페이지, 이곳에서 자신이 쓴 글, 댓글 확인 가능 + 정보수정가능
│       ├── posts.html
│       └── comments.html
│   
│   
│
└── common                   # 공통 시스템
├── css
├── js
└──images
```


# 구현 시 주의사항
1. 공용으로 사용되는 style.css, script.js를 우선 확인 후, 작업을 수행한다.
2. 각 html에 대응하는 css,js는 common 디렉토리의 css,js에 각기 구현한다. (예시: test.html의 css,js는 test.css.js파일로 구현)
3. 외부 DB를 사용하지 않고 오로지 브라우저의 localStorege만을 사용하여 구현한다.


#Todo
1. user/posts/post.html에서 게시글 수정,삭제 버튼 디자인 꾸미기 [x]
2. ./post.html에서 자신이 작성한 댓글 수정, 삭제 기능 필요 [x]
3. ./post.html에서 댓글의 답글을 작성하는 기능을 추가, 이 답글또한 수정,삭제가 가능해야 함 [x]
4. user/mypage/profile.html에서 정보수정 버튼을 닉네임 변경으로 변경 [x]
5. /profile.html에서 계정설정 버튼을 삭제 [x]
6. /profile.html에서 알림설정 버튼을 비밀번호 변경 버튼으로 변경 및 기능 구현 [x]
7. /profile.html에서 회원탈퇴 버튼 기능을 구현, 이때 삭제 확인은 총 두번 정말 삭제할 것인지 묻고, 현재 비밀번호도 맞췄을 경우 삭제하도록 구현