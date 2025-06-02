let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let message = document.querySelector('.message');
let result = document.querySelector('.result');

let turn0 = true;

const winpatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        message.innerText = `Player ${turn0 ? 'O' : 'X'}'s turn`;
        checkwinner();
    });
});

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            result.innerText = `Player ${pos1} wins!`;
            alert(`Player ${pos1} wins!`);
            // Disable all boxes after a win
            message.innerText = "";
            boxes.forEach(box => box.disabled = true);
            return;
        }
    }

    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        result.innerText = "It's a draw!";
        message.innerText = "";
    }
};

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turn0 = true;
    message.innerText = "Player O's turn";
    result.innerText = "";
}

reset.addEventListener("click", resetGame);
