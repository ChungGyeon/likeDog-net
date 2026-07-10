// likeDog-Net Find Password Logic

const FindPwLogic = {
    init: () => {
        const findForm = document.getElementById('find-pw-form');
        if (findForm) {
            findForm.addEventListener('submit', FindPwLogic.handleFind);
        }
    },

    handleFind: (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const resultBox = document.getElementById('result-box');
        const pwDisplay = document.getElementById('pw-display');

        if (!username) {
            alert('아이디를 입력해주세요.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);

        if (user) {
            // User found
            resultBox.classList.add('show');
            pwDisplay.textContent = user.password;
        } else {
            // User not found
            alert('해당 아이디로 가입된 정보를 찾을 수 없습니다.');
            resultBox.classList.remove('show');
        }
    }
};

document.addEventListener('DOMContentLoaded', FindPwLogic.init);
