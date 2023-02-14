import {
  _decorator,
  Component,
  Node,
  Sprite,
  SpriteFrame,
  Prefab,
  instantiate,
} from "cc";
const { ccclass, property } = _decorator;

import { PUCKS } from "./constants";

@ccclass("pucks")
export class pucks extends Component {
  @property({ type: SpriteFrame })
  redPuck: SpriteFrame = null;

  @property({ type: SpriteFrame })
  blackPuck: SpriteFrame = null;

  @property({ type: SpriteFrame })
  whitePuck: SpriteFrame = null;

  setRed() {
    this.node.getComponent(Sprite).spriteFrame = this.redPuck;
  }
  setColor(puckcolor: PUCKS) {
    // throw new Error("Method not implemented.");+
    switch (puckcolor) {
      case PUCKS.BLACK:
        this.node.getComponent(Sprite).spriteFrame = this.blackPuck;
        break;
      case PUCKS.RED:
        this.node.getComponent(Sprite).spriteFrame = this.redPuck;
        break;
      case PUCKS.WHITE:
        this.node.getComponent(Sprite).spriteFrame = this.whitePuck;
        break;
    }
  }

  start() {
    // console.log(this.node);
  }

  update(deltaTime: number) {}
}
