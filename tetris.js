const h = 20;
const w = 10;
var board = new Array(h);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(w).fill(false)

}

var Piece = function (form) {
    this.rotation = 0;
    rand = Math.floor(Math.random() * 7);
    switch (rand) {
        case 0:
            this.y = [1, 1, 1, 1];
            this.x = [3, 4, 5, 6];
            this.axis = [1.5, 4.5];
            this.color = "cyan"
            this.form = "I";
            break;
        case 1:
            this.y = [0, 0, 1, 1];
            this.x = [4, 5, 4, 5];
            this.axis = [0.5, 4.5];
            this.color = "yellow"
            this.form = "O";
            break;
        case 2:
            this.y = [0, 1, 1, 1];
            this.x = [4, 3, 4, 5];
            this.axis = [1, 4];
            this.color = "purple"
            this.form = "T";
            break;
        case 3:
            this.y = [0, 0, 1, 1];
            this.x = [4, 5, 3, 4];
            this.axis = [1, 4];
            this.color = "green"
            this.form = "S";
            break;
        case 4:
            this.y = [0, 0, 1, 1];
            this.x = [3, 4, 4, 5];
            this.axis = [1, 4];
            this.color = "red"
            this.form = "Z";
            break;
        case 5:
            this.y = [0, 1, 1, 1];
            this.x = [3, 3, 4, 5];
            this.axis = [1, 4];
            this.color = "blue"
            this.form = "J";
            break;
        case 6:
            this.y = [0, 1, 1, 1];
            this.x = [5, 3, 4, 5];
            this.axis = [1, 4];
            this.color = "orange"
            this.form = "L";
            break;
        default:
            break;
    }
    this.off_y = 0;
    this.off_x = 0;
    this.show = function () {
        for (let i = 0; i < 4; i++) {
            e = document.getElementById((this.y[i] + this.off_y) + "," + (this.x[i] + this.off_x));
            e.style.backgroundColor = this.color;
            board[this.y[i] + this.off_y][this.x[i] + this.off_x] = true
        }
    }
    this.unShow = function () {
        for (let i = 0; i < 4; i++) {
            e = document.getElementById((this.y[i] + this.off_y) + "," + (this.x[i] + this.off_x));
            e.style.backgroundColor = "black";
            board[this.y[i] + this.off_y][this.x[i] + this.off_x] = false
        }
    }
    this.move = function (ny, nx) {
        res = false;
        this.unShow()
        if (this.canMove(ny, nx)) {
            this.off_y += ny;
            this.off_x += nx;
            res = true;
        }
        this.show()
        return res;

    }
    this.end = function () {
        while (p.move(1, 0));
        p = new Piece()
    }
    this.rotate = function () {
        rotatedY = new Array(4)
        rotatedX = new Array(4)
        s = Math.sin(Math.PI / 2);
        c = Math.cos(Math.PI / 2);
        for (let i = 0; i < 4; i++) {
            rotatedX[i] = Math.round(c * (this.x[i] - this.axis[1]) - s * (this.y[i] - this.axis[0]) + this.axis[1]);
            rotatedY[i] = Math.round(s * (this.x[i] - this.axis[1]) + c * (this.y[i] - this.axis[0]) + this.axis[0]);
            console.log(i + ": ( " + rotatedX[i] + " , " + rotatedY[i] + " ) -> ( " + this.x[i] + " , " + this.y[i] + " )")
        }
        console.log("")
        this.unShow()
        this.y = rotatedY
        this.x = rotatedX
        this.show()


    }
    this.canMove = function (ny, nx) {
        for (let i = 0; i < 4; i++) {
            if (this.x[i] + this.off_x + nx < 0 || this.y[i] + this.off_y + ny < 0 || this.x[i] + this.off_x + nx >= 10 || this.y[i] + this.off_y + ny >= 20 || board[this.y[i] + this.off_y + ny][this.x[i] + this.off_x + nx]) {
                return false;
            }
        }
        return true;

    }
    this.show();

};

create()
p = new Piece();
p.show();

window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(evt) {
    switch (evt.key) {
        case "ArrowUp":
        case "w":
            p.rotate();
            break;
        case "ArrowRight":
        case "d":
            p.move(0, 1)
            break;
        case "ArrowDown":
        case "s":
            p.move(1, 0)
            break;
        case "ArrowLeft":
        case "a":
            p.move(0, -1)
            break;
        case " ":
            p.end()
            break;
        case "Enter":
            p = new Piece()
            break;

        default:
            break;
    }
}






function create() {
    screen = document.createElement("div");
    screen.setAttribute("id", "screen");
    for (let y = 0; y < board.length; y++) {
        row = document.createElement("div");
        row.classList.add("row")
        for (let x = 0; x < board[y].length; x++) {
            box = document.createElement("div");
            box.setAttribute("id", y + "," + x);
            box.style.backgroundColor = "black";
            box.classList.add("box")
            row.appendChild(box);
        }
        screen.appendChild(row);
    }
    document.body.appendChild(screen)
}
