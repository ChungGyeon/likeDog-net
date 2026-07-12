document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (Auth.login(username, password)) {
        alert('로그인 성공!');
        location.href = '../home/index.html';
    } else {
        alert('아이디 또는 비밀번호를 확인해주세요.');
    }
});