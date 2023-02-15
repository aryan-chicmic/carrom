import { _decorator, Component, Node, Slider, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("slider")
export class slider extends Component {
  @property({ type: Node })
  stikerNode: Node = null;
  // slider: any;
  intitialPos = -467;
  width = 942;
  strikerIntial_y = 0;
  onLoad() {
    this.node.on("slide", this.move, this);
    this.strikerIntial_y = this.stikerNode.getPosition().y;
    // this.stikerNode.getComponent(UITransform).getBoundingBox();
  }
  move() {
    let progress = this.node.getComponent(Slider).progress;
    progress = progress * this.width;
    this.stikerNode.setPosition(
      this.intitialPos + progress,
      this.strikerIntial_y,
      0
    );
    // currentProgress_slider = 0;
  }
  start() {}

  update(deltaTime: number) {}
}
