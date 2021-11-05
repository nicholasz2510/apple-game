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
title.hitArea = new PIXI.Circle(-150, 10, 60);
title.interactive = true;
title.buttonMode = true;
title.on('pointerdown', startGame);

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
resetButton.endFill();

let resetButtonText = new PIXI.Text('Reset', {fontSize: 14, fill: 0xFFFFFF, fontWeight: 100});
resetButtonText.anchor.set(0.5);
resetButtonText.x = resetButton.width / 2;
resetButtonText.y = resetButton.height / 2;
resetButton.addChild(resetButtonText);

frame.addChild(resetButton);

function startGame() {
    title.visible = false;
    game();
}

function game() {
    let elapsed = 0.0;
    app.ticker.add((delta) => {

    });
}
