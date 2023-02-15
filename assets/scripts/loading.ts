import {
  _decorator,
  Component,
  Node,
  SpriteFrame,
  Sprite,
  UITransform,
  director,
} from "cc";
const { ccclass, property } = _decorator;
import { singleton } from "./singleton";
@ccclass("loading")
export class loading extends Component {
  // @property({ type: Sprite })
  // spritedemo: Sprite = null;
  @property({ type: Node })
  logopic: Node = null;
  spritesArr: SpriteFrame[];
  //   spriteArr: any;
  onLoad() {
    this.caller();
    director.preloadScene("gameplay");
  }
  async caller() {
    // this.node.getChildByName("logo").active = false;
    var s1 = singleton.getInstance();

    this.spritesArr = await s1.resourceLoad("Carrom");
    console.log(this.spritesArr);

    // this.spritedemo.node.active = true;

    this.fetchBack();
    setTimeout(() => this.fetchLogo(), 3000);
  }

  fetchBack() {
    let bg = this.spritesArr[singleton.getInstance().assetIndex("bg")];
    console.log(bg);
    this.node.getComponent(Sprite).spriteFrame = bg;
  }

  fetchLogo() {
    let logo = this.spritesArr[singleton.getInstance().assetIndex("logo")];
    console.log(logo);
    this.logopic.getComponent(Sprite).spriteFrame = logo;
    setTimeout(() => director.loadScene("gameplay"), 4000);
  }

  start() {}

  update(deltaTime: number) {}
}
