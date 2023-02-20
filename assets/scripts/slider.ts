import {
  _decorator,
  Component,
  Node,
  Slider,
  UITransform,
  Input,
  tween,
  Quat,
  quat,
  Vec3,
  repeat,
  Tween,
  SpriteFrame,
  Sprite,
} from "cc";

const { ccclass, property } = _decorator;

@ccclass("slider")
export class slider extends Component {
  @property({ type: Node })
  stikerNode: Node = null;
  @property({ type: Node })
  hover: Node = null;
  @property({ type: Node })
  hoverROTATE: Node = null;
  @property({ type: Node })
  arrow: Node = null;

  intitialPos = -467;
  width = 942;
  strikerIntial_y = 0;
  arrow_y = 0;
  hover_y = 0;

  onLoad() {
    // this.arrow.active = false;
    this.node.on("slide", this.move, this);
    this.strikerIntial_y = this.stikerNode.getPosition().y;
    this.hover_y = this.hover.getPosition().y;
    this.arrow_y = this.arrow.getPosition().y;

    this.node
      .getChildByName("Handle")
      .on(Input.EventType.TOUCH_START, this.scaleUp, this);

    this.node
      .getChildByName("Handle")
      .on(Input.EventType.TOUCH_END, this.scaledown, this);
    this.node
      .getChildByName("Handle")
      .on(Input.EventType.TOUCH_CANCEL, this.scaledown, this);
  }
  scaleUp() {
    console.log(this.hover);

    this.hover.setScale(2, 2);
  }
  scaledown() {
    this.hover.setScale(1.4, 1.4);
  }
  move() {
    let progress = this.node.getComponent(Slider).progress;
    progress = progress * this.width;

    this.stikerNode.setPosition(
      this.intitialPos + progress,
      this.strikerIntial_y,
      0
    );

    this.hover.setPosition(this.intitialPos + progress, this.hover_y, 0);
    // this.arrow.setPosition(this.intitialPos + progress, this.arrow_y, 0);
    this.hoverROTATE.setPosition(this.intitialPos + progress, this.hover_y, 0);

    this.node.on(
      Input.EventType.MOUSE_DOWN,
      () => {
        this.hoverROTATE.active = true;
        tween(this.hoverROTATE)
          .by(1, {
            angle: 360,
          })
          .repeatForever()
          .start();
      },
      this
    );
    this.node.on(Input.EventType.MOUSE_UP, () => {
      this.hoverROTATE.active = false;
      Tween.stopAll();
    });
  }
  start() {}

  update(deltaTime: number) {}
}
