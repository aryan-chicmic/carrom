import { _decorator, Component, Node, Slider, UITransform, Input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("slider")
export class slider extends Component {
  @property({ type: Node })
  stikerNode: Node = null;
  @property({ type: Node })
  hover: Node = null;
  // slider: any;
  intitialPos = -467;
  width = 942;
  strikerIntial_y = 0;
  hover_y = 0;
  onLoad() {
    this.node.on("slide", this.move, this);
    this.strikerIntial_y = this.stikerNode.getPosition().y;
    this.hover_y = this.hover.getPosition().y;
    console.log(this.hover_y);

    this.node
      .getChildByName("Handle")
      .on(Input.EventType.TOUCH_START, this.scaleUp, this);
    // this.stikerNode.getComponent(UITransform).getBoundingBox();
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
    // currentProgress_slider = 0;
  }
  start() {}

  update(deltaTime: number) {}
}
