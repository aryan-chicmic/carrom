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
  Collider2D,
  CircleCollider2D,
  Contact2DType,
  Prefab,
  BlockInputEvents,
} from "cc";
import { physics } from "./physics";
import { Slider } from "cc";
import { slider } from "./slider";
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
  reposition = false;
  @property({ type: Node })
  arrow: Node = null;
  @property({ type: Node })
  hoverGreen: Node = null;
  @property({ type: Node })
  hoverRotate: Node = null;
  @property({ type: Node })
  slider: Node = null;
  @property({ type: Prefab })
  puckPrefab: Prefab = null;
  onLoad() {
    // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    this.hoverGreen.active = true;
    this.hoverRotate.active = true;
  }
  start() {
    this.node.on(Input.EventType.TOUCH_START, this.fetchLocationStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.increaseHeight, this);
    this.node.on(Input.EventType.TOUCH_END, this.fetchLocationEnd, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this.fetchLocationEnd, this);

    console.log(this.node);
  }
  fetchLocationStart(event: EventTouch) {
    console.log("TOUCH STARTED");

    this.arrow.active = true;
    this.hoverGreen.active = true;
    this.hoverRotate.active = true;
  }
  setSpeed() {
    this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(
      -this.xDifference,
      -this.yDifference
    );
  }
  fetchLocationEnd(event: EventTouch) {
    this.arrow.active = false;
    this.cursorEndPosonX = event.getUILocation().x;
    this.cursorEndPosonY = event.getUILocation().y;
    this.arrow.setScale(2, 2);
    this.setSpeed();
    this.hoverGreen.active = false;
    this.hoverRotate.active = false;
    this.reposition = true;
  }
  increaseHeight(event: EventTouch) {
    this.cursorEndPosonX = event.getUILocation().x;
    this.cursorEndPosonY = event.getUILocation().y;
    // console.log(this.cursorEndPosonX, this.cursorEndPosonY);
    var stikerPosition = this.node.getWorldPosition();
    this.yDifference = this.cursorEndPosonY - stikerPosition.y;
    this.xDifference = this.cursorEndPosonX - stikerPosition.x;
    let d = Math.sqrt(
      this.xDifference * this.xDifference + this.yDifference * this.yDifference
    );

    this.arrow.setScale(d * 0.03, d * 0.03);

    var delta_x = this.cursorEndPosonX - stikerPosition.x;
    var delta_y = this.cursorEndPosonY - stikerPosition.y;
    var angle = Math.atan2(delta_y, delta_x);
    angle = (angle * 180) / Math.PI;

    this.arrow.angle = angle + 90;
  }
  resetIntialPos(noBegan: any) {
    this.node.addComponent(RigidBody2D);
    this.node.getComponent(RigidBody2D).gravityScale = 0;

    this.node.getComponent(CircleCollider2D).enabled = true;
    this.node.setPosition(-459.3464, -607.097);
    console.log(this.node);
  }

  update(deltaTime: number) {
    if (
      Math.abs(this.node.getComponent(RigidBody2D).linearVelocity.x) < 0.5 &&
      Math.abs(this.node.getComponent(RigidBody2D).linearVelocity.y) < 0.5 &&
      this.reposition
    ) {
      this.node.getComponent(RigidBody2D).linearVelocity.x = 0;
      this.node.getComponent(RigidBody2D).linearVelocity.y = 0;
      this.node.setPosition(-459.3464, -607.097);
      this.hoverGreen.setPosition(-459.3464, -607.097);
      this.hoverRotate.setPosition(-459.3464, -607.097);
      this.hoverGreen.active = false;
      this.hoverRotate.active = false;
      this.reposition = false;
      this.node.getComponent(RigidBody2D).gravityScale = 0;
      this.slider.getComponent(Slider).progress = 0;
    } else {
      // this.checkNoPuckIsMoving();
    }
  }
  // checkNoPuckIsMoving() {
  //   if (this.puckPrefab.getComponent(RigidBody2D).linearVelocity > 0.5) {
  //     // CCDirector::sharedDirector()->getTouchDispatcher()->removeDelegate(stiker);
  //     this.node.getComponent(BlockInputEvents).enabled = false;
  //   } else {
  //     this.node.getComponent(BlockInputEvents).enabled = true;
  //   }
  // }

  // checkIfRedIsOnHold() {
  //   if (this.isRedOnHold) {
  //     //Re add red puck
  //   }
  // }
}
