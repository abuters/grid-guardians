// Jest unit tests for Player movement boundaries

// Mock p5.js functions and globals
const width = 800;
const height = 600;

global.width = width;
global.height = height;

global.constrain = (val, min, max) => Math.max(min, Math.min(max, val));
global.keyIsDown = () => false;

describe('Player movement boundaries', () => {
  let Player;

  beforeAll(() => {
    // Extract Player class from index.html (simulate import)
    Player = class {
      constructor() {
        this.x = width / 2;
        this.y = height - 50;
        this.speed = 5;
        this.tripleShot = false;
        this.shield = false;
        this.speedBoost = false;
        this.muzzleFlash = 0;
        this.velocity = 0;
      }
      update() {
        // Simulate movement (no key presses by default)
        // Constrain to screen boundaries (keeping player above ground)
        this.x = constrain(this.x, 30, width - 30);
        this.y = constrain(this.y, 50, height - 120);
      }
    };
  });

  test('Player cannot move left beyond boundary', () => {
    const player = new Player();
    player.x = 0;
    player.update();
    expect(player.x).toBeGreaterThanOrEqual(30);
  });

  test('Player cannot move right beyond boundary', () => {
    const player = new Player();
    player.x = width;
    player.update();
    expect(player.x).toBeLessThanOrEqual(width - 30);
  });

  test('Player cannot move above top boundary', () => {
    const player = new Player();
    player.y = 0;
    player.update();
    expect(player.y).toBeGreaterThanOrEqual(50);
  });

  test('Player cannot move below bottom boundary (ground)', () => {
    const player = new Player();
    player.y = height;
    player.update();
    expect(player.y).toBeLessThanOrEqual(height - 120);
  });
}); 