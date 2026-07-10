document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('create-board-btn');
    const newBoardNameInput = document.getElementById('new-board-name');
    const boardListBody = document.getElementById('board-list-body');

    // --- Data Handling ---
    const getBoards = () => {
        const boards = localStorage.getItem('boards');
        if (!boards) {
            // If no boards exist, create a default one
            const defaultBoard = [{ id: Date.now(), name: '최신 게시판', createdAt: new Date().toISOString().split('T')[0] }];
            localStorage.setItem('boards', JSON.stringify(defaultBoard));
            return defaultBoard;
        }
        return JSON.parse(boards);
    };

    const saveBoards = (boards) => {
        localStorage.setItem('boards', JSON.stringify(boards));
    };

    // --- Rendering ---
    const renderBoards = () => {
        const boards = getBoards();
        boardListBody.innerHTML = ''; // Clear existing list

        if (boards.length === 0) {
            boardListBody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px;">생성된 게시판이 없습니다.</td></tr>';
            return;
        }

        boards.forEach(board => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${board.id}</td>
                <td>${board.name}</td>
                <td>${board.createdAt}</td>
                <td>
                    <button class="btn-secondary" data-board-id="${board.id}" style="background-color: var(--danger-color); color: white; padding: 5px 10px; font-size: 0.8rem; width: auto; margin: 0;">삭제</button>
                </td>
            `;
            boardListBody.appendChild(row);
        });
    };

    // --- Event Handlers ---
    const handleCreateBoard = () => {
        const boardName = newBoardNameInput.value.trim();
        if (!boardName) {
            alert('게시판 이름을 입력해주세요.');
            return;
        }

        const boards = getBoards();

        if (boards.some(board => board.name === boardName)) {
            alert('이미 존재하는 게시판 이름입니다.');
            return;
        }

        const newBoard = {
            id: Date.now(),
            name: boardName,
            createdAt: new Date().toISOString().split('T')[0]
        };

        boards.push(newBoard);
        saveBoards(boards);
        
        newBoardNameInput.value = ''; // Clear input
        renderBoards(); // Re-render the list
    };

    const handleDeleteBoard = (e) => {
        if (!e.target.matches('button[data-board-id]')) {
            return; // Exit if the click is not on a delete button
        }

        const boardId = parseInt(e.target.dataset.boardId, 10);
        const boards = getBoards();
        const boardToDelete = boards.find(b => b.id === boardId);

        if (boardToDelete && confirm(`'${boardToDelete.name}' 게시판을 정말로 삭제하시겠습니까?`)) {
            const updatedBoards = boards.filter(board => board.id !== boardId);
            saveBoards(updatedBoards);
            renderBoards();
        }
    };

    // --- Initial Setup ---
    createBtn.addEventListener('click', handleCreateBoard);
    boardListBody.addEventListener('click', handleDeleteBoard);
    renderBoards(); // Initial render on page load
});
