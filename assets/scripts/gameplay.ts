import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Sprite,
  UITransform,
  Script,
  Graphics,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;
import { PUCKS } from "./constants";
import { pucks } from "./pucks";
@ccclass("gamplay")
export class gamplay extends Component {
  @property({ type: Prefab })
  puck: Prefab = null;

  newGenLoad(): Node {
    let newGen = instantiate(this.puck);

    return newGen;
  }

  start() {
    let temp = this.newGenLoad();
    let startpos = temp.getPosition();
    var pos = startpos.x;
    console.log(pos);
    let puckWidth = temp.getComponent(UITransform).contentSize.width;
    let puckHeight = temp.getComponent(UITransform).contentSize.height;
    // console.log(puckWidth);
const s=5
    for (let i = 0; i < s; i++) {
      let m = 5 - Math.abs(2 - i);
      for (let j = 0; j < m; j++) {
        temp = this.newGenLoad();
        this.node.addChild(temp);
        temp.setPosition(startpos);
        startpos.x = startpos.x + puckWidth;

        
      }
      startpos.x = pos;
      console.log(pos);

      startpos.y = startpos.y - puckHeight;
      if(i<Math.floor(s*0.5)){ 

        startpos.x = startpos.x - puckWidth * 0.5;
      }
      else{
        startpos.x = startpos.x + puckWidth * 0.5;
      }
      pos = startpos.x;
    }


    // var n = 3;
    // for (let i = 0; i < 3; i++) {
    //   for (let j = 0; j < n + i; j++) {
    //     temp = this.newGenLoad();
    //     this.node.addChild(temp);
    //     temp.setPosition(startpos);
    //     startpos.x = startpos.x + puckWidth;
    //   }

    //   console.log(pos);
    //   startpos.x = pos;
    //   console.log(pos);

    //   startpos.y = startpos.y - puckHeight;
    //   startpos.x = startpos.x - puckWidth * 0.5;
    //   pos = startpos.x;

    //   // puckHeight=puckHeight
    // }

    // for (let i = 2; i > 0; i--) {
    //   startpos.x = startpos.x + puckWidth;
    //   for (let j = 0; j < n + i - 1; j++) {
    //     temp = this.newGenLoad();
    //     this.node.addChild(temp);
    //     temp.setPosition(startpos);
    //     startpos.x = startpos.x + puckWidth;
    //   }

    //   console.log(pos);
    //   startpos.x = pos;
    //   console.log(pos);
    //   startpos.x = startpos.x + puckWidth * 0.5;
    //   startpos.y = startpos.y - puckHeight;
    //   pos = startpos.x;
    // }
  }
  update(deltaTime: number) {}
}
