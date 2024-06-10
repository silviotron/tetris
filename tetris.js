
var next = Math.floor(Math.random() * 7);
colors = ["cyan", "yellow", "purple", "green", "red", "blue", "orange"]
forms = ["I", "O", "T", "S", "Z", "J", "L"]
let moveInterval = 1000; // milisegundos (2000 = 2 segundos)
const h = 20;
const w = 10;
let score = 0
var board = new Array(h);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(w).fill(0)

}

var Piece = function (form) {
    this.rotation = 0;
    rand = next;
    next = Math.floor(Math.random() * 7);
    document.getElementById("next").style.backgroundColor = colors[next]
    document.getElementById("next").innerHTML = forms[next]
    switch (rand) {
        case 0:
            this.y = [1, 1, 1, 1];
            this.x = [3, 4, 5, 6];
            this.axis = [1.5, 4.5];
            this.color = "cyan"
            this.hsl = { h: 180, s: 100, l: 50 }
            this.form = "I";
            break;
        case 1:
            this.y = [0, 0, 1, 1];
            this.x = [4, 5, 4, 5];
            this.axis = [0.5, 4.5];
            this.color = "yellow"
            this.hsl = { h: 60, s: 100, l: 50 }
            this.form = "O";
            break;
        case 2:
            this.y = [0, 1, 1, 1];
            this.x = [4, 3, 4, 5];
            this.axis = [1, 4];
            this.color = "purple"
            this.hsl = { h: 300, s: 100, l: 25 }
            this.form = "T";
            break;
        case 3:
            this.y = [0, 0, 1, 1];
            this.x = [4, 5, 3, 4];
            this.axis = [1, 4];
            this.color = "green"
            this.hsl = { h: 120, s: 100, l: 25 }
            this.form = "S";
            break;
        case 4:
            this.y = [0, 0, 1, 1];
            this.x = [3, 4, 4, 5];
            this.axis = [1, 4];
            this.color = "red"
            this.hsl = { h: 0, s: 100, l: 50 }
            this.form = "Z";
            break;
        case 5:
            this.y = [0, 1, 1, 1];
            this.x = [3, 3, 4, 5];
            this.axis = [1, 4];
            this.color = "blue"
            this.hsl = { h: 240, s: 100, l: 50 }
            this.form = "J";
            break;
        case 6:
            this.y = [0, 1, 1, 1];
            this.x = [5, 3, 4, 5];
            this.axis = [1, 4];
            this.color = "orange"
            this.hsl = { h: 39, s: 100, l: 50 }
            this.form = "L";
            break;
        default:
            break;
    }
    this.off_y = 0;
    this.off_x = 0;
    this.chkLines = function () {
        let unique = [...new Set(this.y)];
        unique.sort()
        for (let i = 0; i < unique.length; i++) {
            line = true;
            l = unique[i] + this.off_y
            for (let e = 0; e < board[0].length; e++) {
                if (board[l][e] != 2) {
                    line = false;
                }
            }
            if (line) {
                document.getElementById("screen").removeChild(document.getElementById("screen").childNodes[l])
                board.splice(l, 1)
                board.unshift(new Array(w).fill(0))
                newRow()
                score += 100;
                document.getElementById("score").innerHTML = score

            }

        }

    }
    this.show = function () {
        for (let i = 0; i < 4; i++) {
            e = document.getElementById("screen").childNodes[this.y[i] + this.off_y].childNodes[this.x[i] + this.off_x]
            e.style.backgroundColor = this.color;
            e.style.borderColor = "hsl(" + this.hsl.h + ", " + this.hsl.s + "%, " + (this.hsl.l + 25) + "%)";
            board[this.y[i] + this.off_y][this.x[i] + this.off_x] = 1
        }
    }
    this.unShow = function () {
        for (let i = 0; i < 4; i++) {
            e = document.getElementById("screen").childNodes[this.y[i] + this.off_y].childNodes[this.x[i] + this.off_x]
            e.style.backgroundColor = "black";
            e.style.borderColor = "white";
            board[this.y[i] + this.off_y][this.x[i] + this.off_x] = 0
        }
    }
    this.move = function (ny, nx) {
        res = false;
        this.unShow()
        if (!this.canMove(ny, 0)) {
            this.show()
            for (let i = 0; i < 4; i++) {
                board[this.y[i] + this.off_y][this.x[i] + this.off_x] = 2

            }
            this.chkLines();
            p = new Piece()
            return false
        }
        else if (this.canMove(ny, nx)) {
            this.off_y += ny;
            this.off_x += nx;
            res = true;
        }
        this.show()
        return res;

    }
    this.end = function () {
        while (p.move(1, 0));
    }
    this.rotate = function () {
        rotatedY = new Array(4)
        rotatedX = new Array(4)
        s = Math.sin(Math.PI / 2);
        c = Math.cos(Math.PI / 2);
        for (let i = 0; i < 4; i++) {
            rotatedX[i] = Math.round(c * (this.x[i] - this.axis[1]) - s * (this.y[i] - this.axis[0]) + this.axis[1]);
            rotatedY[i] = Math.round(s * (this.x[i] - this.axis[1]) + c * (this.y[i] - this.axis[0]) + this.axis[0]);

            if (board[rotatedY[i] + this.off_y][rotatedX[i] + this.off_x] != 0 && board[rotatedY[i] + this.off_y][rotatedX[i] + this.off_x] != 1) {
                return false
            }
        }
        this.unShow()
        this.y = rotatedY
        this.x = rotatedX
        this.show()
        return true


    }
    this.canMove = function (ny, nx) {
        for (let i = 0; i < 4; i++) {
            if (this.x[i] + this.off_x + nx < 0 || this.y[i] + this.off_y + ny < 0 || this.x[i] + this.off_x + nx >= board[0].length || this.y[i] + this.off_y + ny >= board.length || board[this.y[i] + this.off_y + ny][this.x[i] + this.off_x + nx] != 0) {
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
setInterval(moveP, moveInterval);
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

        default:
            break;
    }
}


function moveP() {
    p.move(1, 0)
}
function create() {
    screen = document.createElement("div");
    screen.setAttribute("id", "screen");
    for (let y = 0; y < board.length; y++) {
        row = document.createElement("div");
        row.classList.add("row")
        for (let x = 0; x < board[y].length; x++) {
            box = document.createElement("div");
            box.style.backgroundColor = "black";
            box.classList.add("box")
            row.appendChild(box);
        }
        screen.appendChild(row);
    }
    document.body.appendChild(screen)
}
function newRow() {
    screen = document.getElementById("screen")
    row = document.createElement("div");
    row.classList.add("row")
    for (let x = 0; x < board[0].length; x++) {
        box = document.createElement("div");
        box.style.backgroundColor = "black";
        box.classList.add("box")
        row.appendChild(box);
    }
    screen.prepend(row);

}
