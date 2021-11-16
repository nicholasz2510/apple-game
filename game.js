let appleColumns = 17;
let appleRows = 10;

let app = new PIXI.Application({ width: 720, height: 470, backgroundAlpha: 0 });
document.body.appendChild(app.view);

let background = PIXI.Sprite.from('images/background.png');
background.anchor.set(0.5);
background.x = app.screen.width / 2;
background.y = app.screen.height / 2;
app.stage.addChild(background);

let title = PIXI.Sprite.from('images/title.png');
title.anchor.set(0.5);
title.x = app.screen.width / 2;
title.y = app.screen.height / 2;
app.stage.addChild(title);
title.hitArea = new PIXI.Circle(-150, 15, 60);
title.interactive = true;
title.buttonMode = true;
title.on('pointerdown', start);

let frame = PIXI.Sprite.from('images/frame.png');
frame.anchor.set(0.5);
frame.x = app.screen.width / 2;
frame.y = app.screen.height / 2;
app.stage.addChild(frame);

let resetButton = new PIXI.Graphics();
resetButton.x = -300;
resetButton.y = 198;
resetButton.lineStyle(1, 0xFFFFFF);
resetButton.drawRect(0, 0, 50, 20);
let resetButtonText = new PIXI.Text('Reset', {fontSize: 14, fill: 0xFFFFFF, fontWeight: 100});
resetButtonText.anchor.set(0.5);
resetButtonText.x = resetButton.width / 2;
resetButtonText.y = resetButton.height / 2;
resetButton.addChild(resetButtonText);
frame.addChild(resetButton);
resetButton.interactive = true;
resetButton.buttonMode = true;
resetButton.on('pointerdown', reset);

let applesContainer = new PIXI.Container();
applesContainer.x = 84;
applesContainer.y = 88;
app.stage.addChild(applesContainer);

let appleTexture = PIXI.Texture.from('images/apple.png');

let board = new Array(appleRows);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(appleColumns);
}

let dragStartX;
let dragStartY;
let isDrag = false;

let selectionRect = new PIXI.Graphics();

function start() {
    title.visible = false;
    fillBoard();
    // console.log(board);
    drawApples();
    game();
}

function fillBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = Math.floor(Math.random() * 9) + 1;
        }
    }
}

function drawApples() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let apple = new PIXI.Sprite(appleTexture);
            apple.anchor.set(0.5);
            apple.x = j * 32;
            apple.y = i * 32;
            apple.height = 24;
            apple.width = 24;

            let appleNum = new PIXI.Text(String(board[i][j]), {fill: 'white', fontWeight: 'bold', fontSize: 24});
            appleNum.y = 2;
            appleNum.anchor.set(0.5);
            apple.addChild(appleNum);

            apple.hitArea = new PIXI.Circle(16, 16, 16);

            applesContainer.addChild(apple);
        }
    }
}

function game() {
    app.stage.interactive = true
    app.stage.on('pointerdown', (event) => onDragStart(event));
    app.stage.on('pointermove', (event) => onDragMove(event));
    app.stage.on('pointerup', (event) => onDragEnd(event));

    // let elapsed = 0.0;
    // app.ticker.add((delta) => {
    // });
}

function onDragStart(event) {
    isDrag = true;
    dragStartX = event.data.global.x;
    dragStartY = event.data.global.y;
}

function onDragMove(event) {
    if (!isDrag) {
        return;
    }
    let x = event.data.global.x;
    let y = event.data.global.y;

    selectionRect.clear();
    selectionRect.lineStyle(1, 0x0000FF);
    selectionRect.beginFill(0xFFFF00, 0.3);
    selectionRect.drawRect(dragStartX, dragStartY, x - dragStartX, y - dragStartY);
    selectionRect.endFill();
    app.stage.addChild(selectionRect);

    let convertedCoords = coordsRealTo2D(dragStartX, dragStartY, x, y);
}

function onDragEnd(event) {
    isDrag = false;
    selectionRect.clear();

    let dragEndX = event.data.global.x;
    let dragEndY = event.data.global.y;
}

function coordsRealTo2D(startX, startY, endX, endY) {
    let newStartX;
    let newStartY;
    let newEndX;
    let newEndY;

    if (endX < startX) {
        newStartX = endX;
        newEndX = startX;
    } else {
        newStartX = startX;
        newEndX = endX;
    }
    if (endY < startY) {
        newStartY = endY;
        newEndY = startY;
    } else {
        newStartY = startY;
        newEndY = endY;
    }

    newStartX = Math.floor((newStartX - 68) / 32);
    newEndX = Math.ceil((newEndX - 116) / 32);
    newStartY = Math.floor((newStartY - 72) / 32);
    newEndY = Math.ceil((newEndY - 120) / 32);

    console.log([newStartX, newStartY, newEndX, newEndY]);

    return [newStartX, newStartY, newEndX, newEndY];
}

function reset() {
    title.visible = true;
    applesContainer.removeChildren();
}
