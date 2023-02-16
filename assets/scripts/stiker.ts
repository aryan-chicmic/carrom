import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  Input,
  EventTouch,
  UITransform,
  Vec2,
  math,
  RigidBody2D,
  PhysicsSystem2D,
  EPhysics2DDrawFlags,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("stiker")
export class stiker extends Component {
  // intialPosition_y = 0;
  // finalPosition_y = 0;
  // intialPosition_x = 0;
  // finalPosition_x = 0;
  cursorEndPosonY = null;
  cursorEndPosonX = null;
  cursorStartPosonX = null;
  cursorStartPosonY = null;
  yDifference = 0;
  xDifference = 0;

  @property({ type: Node })
  arrow: Node = null;
  @property({ type: Node })
  hoverGreen: Node = null;
  @property({ type: Node })
  hoverRotate: Node = null;
  onLoad() {
    PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    this.hoverGreen.active = true;
    this.hoverRotate.active = true;
  }
  start() {
    this.node.on(Input.EventType.TOUCH_START, this.fetchLocationStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.increaseHeight, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this.fetchLocationEnd, this);
  }
  fetchLocationStart(event: EventTouch) {
    this.arrow.active = true;
    this.cursorStartPosonX = event.getUILocation().x;
    this.cursorStartPosonY = event.getUILocation().y;
    console.log(
      "Start Positions: ",
      this.cursorStartPosonX,
      this.cursorStartPosonY
    );

    // console.log(event.getLocationX());
  }
  fetchLocationEnd(event: EventTouch) {
    this.arrow.active = false;
    this.cursorEndPosonX = event.getUILocation().x;
    this.cursorEndPosonY = event.getUILocation().y;
    this.arrow.setScale(2, 2);
    this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(
      -this.xDifference,
      -this.yDifference
    );
    this.hoverGreen.active = false;
    this.hoverRotate.active = false;
  }
  increaseHeight(event: EventTouch) {
    this.cursorEndPosonX = event.getUILocation().x;
    this.cursorEndPosonY = event.getUILocation().y;
    console.log(this.cursorEndPosonX, this.cursorEndPosonY);

    this.yDifference = this.cursorEndPosonY - this.cursorStartPosonY;
    this.xDifference = this.cursorEndPosonX - this.cursorStartPosonX;
    let d = Math.sqrt(
      this.xDifference * this.xDifference + this.yDifference * this.yDifference
    );
    console.log("Difference: ", d);

    // this.yDifference = -1 * this.yDifference;
    this.arrow.setScale(d * 0.03, d * 0.03);

    var stikerPosition = this.node.getWorldPosition();
    var delta_x = this.cursorEndPosonX - stikerPosition.x;
    var delta_y = this.cursorEndPosonY - stikerPosition.y;
    var angle = Math.atan2(delta_y, delta_x);
    angle = (angle * 180) / Math.PI;

    console.log("angle: " + angle);

    this.arrow.angle = angle + 90;
  }
  update(deltaTime: number) {}
}
