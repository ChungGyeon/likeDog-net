// likeDog-Net Signup Logic

const SignupLogic = {
    init: () => {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', SignupLogic.handleSignup);
        }
    },

    handleSignup: (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const name = document.getElementById('name').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;

        // Validation
        if (!agreeTerms) {
            alert('이용약관에 동의해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (username.length < 4) {
            alert('아이디는 4자 이상이어야 합니다.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check Duplicate
        if (users.find(u => u.username === username)) {
            alert('이미 사용 중인 아이디입니다.');
            return;
        }

        // Create New User
        const newUser = {
            id: Date.now(),
            username: username,
            name: name,
            password: password, // In real app, this should be hashed
            level: 1,
            role: 'user',
            signupDate: new Date().toISOString().split('T')[0]
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        location.href = 'login.html';
    }
};

document.addEventListener('DOMContentLoaded', SignupLogic.init);
