'use strict';

const START_X = 100;
const START_Y = 10;
const WIDTH = 420;
const HEIGHT = 270;

const COLUMN_WIDTH = 40;
const MAX_COLUMN_HEIGHT = 150;
const LINE_HEIGHT = 20;
const PLAYER_COLOR = `rgba(255,0,0,1)`;
const GAP = 10;
const Y_POSITION = START_Y + 3 * GAP + 2 * LINE_HEIGHT + GAP;


const getMaxTime = (times) => {
  let maxTime = 0;

  for (let i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }

  return maxTime;
};

const getPlayerScoreHeight = (time, maxTime) => {
  const playerScoreHeight = Math.round((time * MAX_COLUMN_HEIGHT) / maxTime);

  return playerScoreHeight;
};

// Draw cloud or shadow
const drawCloud = (ctx, x, y, cloudColor) => {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(x, y, WIDTH, HEIGHT);
};

// Draw Heading string
const drawText = (ctx, text, x, y) => {
  ctx.font = `16px PT Mono`;
  ctx.fillStyle = `#000`;
  ctx.fillText(text, x, y);
};

// Draw stats column
const drawRect = (ctx, x, y, height, name, score) => {

  if (name === `Вы`) {
    ctx.fillStyle = PLAYER_COLOR;
  } else {
    ctx.fillStyle = `hsl(240, 100%, ${Math.random() * 100}%)`;
  }
  ctx.fillRect(x, y, COLUMN_WIDTH, height);

  // Name and Score
  drawText(ctx, score, x, y - GAP);
  drawText(ctx, name, x, y + height + LINE_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  const maxTime = getMaxTime(times);

  drawCloud(ctx, START_X + GAP, START_Y + GAP, `rgba(0,0,0,0.7)`);
  drawCloud(ctx, START_X, START_Y, `#fff`);

  drawText(ctx, `Ура вы победили!`, START_X + 3 * GAP, START_Y + 3 * GAP);
  drawText(ctx, `Список результатов:`, START_X + 3 * GAP, START_Y + 3 * GAP + LINE_HEIGHT);

  // Draw stats
  for (let i = 0; i < players.length; i++) {
    const playerScoreHeight = getPlayerScoreHeight(times[i], maxTime);
    const score = Math.round(times[i]);
    const xPosition = START_X + 6 * GAP + (COLUMN_WIDTH + 4 * GAP) * i;
    const yPosition = Y_POSITION + (MAX_COLUMN_HEIGHT - playerScoreHeight);

    drawRect(ctx, xPosition, yPosition, playerScoreHeight, players[i], score);
  }
};

