import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  Sprite,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;
import { singleton } from "./singleton";
@ccclass("loading")
export class loading extends Component {
  // @property({ type: Sprite })
  // spritedemo: Sprite = null;
  spritesArr: SpriteFrame[];
  //   spriteArr: any;
  onLoad() {
    this.caller();
  }
  async caller() {
    // this.node.getChildByName("logo").active = false;
    var s1 = singleton.getInstance();

    this.spritesArr = await s1.resourceLoad("Carrom");
    console.log(this.spritesArr);

    // this.spritedemo.node.active = true;

    this.fetchBack();
  }

  fetchBack() {
    let bg = this.spritesArr[singleton.getInstance().assetIndex("bg")];
    console.log(bg);
    this.node.getComponent(Sprite).spriteFrame = bg;
  }

  start() {}

  update(deltaTime: number) {}
}
