export default class MovableObjects extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public velocity: number;
  public timer: Phaser.Time.TimerEvent;

  constructor(data: MovableObjectData) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    if (data.origin) this.setOrigin(data.origin.x, data.origin.y);

    this.init(data);
  }

  public init(data: MovableObjectData): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = data.velocity;
  }

  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.setAlive(true);
  }

  public isDead(): boolean {
    return false;
  }

  protected preUpdate(time: number, delta: number): void {
    this.update();
    super.preUpdate(time, delta);
  }

  public update(): void {
    if (this.active && this.isDead()) {
      this.setAlive(false);
    }
  }

  public setAlive(state: boolean): void {
    this.body.enable = state;
    this.setVisible(state);
    this.setActive(state);

    if (this.timer) {
        this.timer.paused = !state;
    }
    if (!state){
      this.emit('killed');
    }

  }

  public move():void {
    this.body.setVelocityX(this.velocity);
  }
}

type MovableObjectData = {
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: string,
  velocity: number,
  frame?: string,
  origin?: {x: number, y: number}
};

export { MovableObjectData };