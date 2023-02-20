import {
  _decorator,
  Component,
  Node,
  EPhysics2DDrawFlags,
  Collider2D,
  Enum,
  Contact2DType,
  IPhysics2DContact,
  PhysicsSystem2D,
  RigidBody2D,
  Vec2,
  tween,
  Vec3,
  CircleCollider2D,
} from "cc";

import { COLLIDER_TYPES, PUCKS } from "./constants";
import { pucks } from "./pucks";
import { stiker } from "./stiker";
import { Slider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("physics")
export class physics extends Component {
  @property({ type: Enum(COLLIDER_TYPES) })
  collider_type: COLLIDER_TYPES = COLLIDER_TYPES.NONE;
  score = 0;
  isRedOnHold: boolean = false;
  count = 0;
  onLoad() {}
  start() {
    let collider = this.getComponent(Collider2D);
    if (collider && this.collider_type == COLLIDER_TYPES.HOLES) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
    }
  }
  onBegin = (
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) => {
    this.count++;
    switch (otherCollider.node.getComponent(physics).collider_type) {
      case COLLIDER_TYPES.STIKER:
        console.log("Stiker self case");
        otherCollider.node.getComponent(RigidBody2D).linearVelocity = new Vec2(
          0,
          0
        );

        console.log("STRIKER COLLIDED>>>>>");

        setTimeout(() => {
          let striker: Node = otherCollider.node;
          striker.getComponent(RigidBody2D).destroy();

          striker.getComponent(CircleCollider2D).enabled = false;
          tween(striker)
            .to(1, { position: selfCollider.node.getPosition() })

            .call(() => {
              striker.getComponent(stiker).resetIntialPos(this.onBegin);
            })
            .start();
        });

        break;
      case COLLIDER_TYPES.PUCKS:
        console.log("Pucks Self case");
        var puckColor = otherCollider.getComponent(pucks).puckColorType;

        console.log(otherCollider.getComponent(pucks).puckColorType);
        switch (puckColor) {
          // case PUCKS.NONE:
          //   if (this.isRedOnHold == true) {
          //     console.log("Red needs to be instationated again");
          //   } else {
          //     console.log("None Case", this.count);
          //   }
          //   break;
          case PUCKS.RED:
            console.log("Red in the Hole");
            this.isRedOnHold = true;
            console.log("isRedOnHold true", this.isRedOnHold);

            break;

          case PUCKS.BLACK:
            console.log("in case of black", this.isRedOnHold);

            if (this.isRedOnHold) {
              console.log("Red puck fully done");
              this.isRedOnHold = false;
            } else {
              console.log("Black Puck");
            }
            break;

          case PUCKS.WHITE:
            console.log("in case of white", this.isRedOnHold);
            if (this.isRedOnHold) {
              console.log("Red puck fully done");
              this.isRedOnHold = false;
            } else {
              console.log("White Puck");
            }
            break;
          default:
            console.log("Instationate red again");
            this.isRedOnHold = false;
        }

        console.log(this.score);

        otherCollider.node.getComponent(RigidBody2D).linearVelocity = Vec2.ZERO;

        setTimeout(() => {
          let puck: Node = otherCollider.node;
          puck.getComponent(RigidBody2D).destroy();

          puck.getComponent(CircleCollider2D).enabled = false;
          tween(puck)
            .to(1, { position: selfCollider.node.getPosition() })

            .call(() => {
              puck.destroy();
            })
            .start();
        });
        break;
    }
  };



  update(deltaTime: number) {}
}
