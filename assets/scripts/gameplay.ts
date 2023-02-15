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
  JsonAsset,
} from "cc";
const { ccclass, property } = _decorator;
import { PUCKS } from "./constants";
import { pucks } from "./pucks";

@ccclass("gamplay")
export class gamplay extends Component {
  @property({ type: Prefab })
  puck: Prefab = null;
  @property({ type: JsonAsset })
  colorJson: JsonAsset = null;

  newGenLoad(): Node {
    let newGen = instantiate(this.puck);

    return newGen;
  }

  start() {
    let pucksColor = this.colorJson.json.pucksColor;

    let temp = this.newGenLoad();
    let startpos = temp.getPosition();
    var pos = startpos.x;

    let puckWidth = temp.getComponent(UITransform).getBoundingBox().width;
    let puckHeight = temp.getComponent(UITransform).getBoundingBox().height;

    const s = 5;
    var counter = 0;
    // console.log(pucksColor);

    for (let i = 0; i < s; i++) {
      let m = 5 - Math.abs(2 - i);

      for (let j = 0; j < m; j++) {
        var colour = pucksColor[counter].color;
        temp = this.newGenLoad();
        this.node.addChild(temp);

        if (colour == "Black") {
          // console.log("BLACK COLOR");

          temp.getComponent(pucks).setColor(PUCKS.BLACK);
        } else if (colour == "White") {
          // console.log("WHITE COLOR");
          temp.getComponent(pucks).setColor(PUCKS.WHITE);
        } else {
          // console.log("RED COLOR");
          temp.getComponent(pucks).setColor(PUCKS.RED);
        }
        counter++;

        temp.setPosition(startpos);
        startpos.x = startpos.x + puckWidth;
      }
      startpos.y = startpos.y - puckHeight;
      startpos.x = pos;

      if (i < Math.floor(s / 2)) {
        startpos.x = startpos.x - puckWidth * 0.5;
      } else {
        startpos.x = startpos.x + puckWidth * 0.5;
      }
      pos = startpos.x;
    }
  }
  update(deltaTime: number) {}
}
