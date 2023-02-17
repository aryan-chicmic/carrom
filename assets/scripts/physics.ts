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
import { COLLIDER_TYPES } from "./constants";
import { pucks } from "./pucks";
import { stiker } from "./stiker";
const { ccclass, property } = _decorator;

@ccclass("physics")
export class physics extends Component {
  puckvar: boolean = false;
  @property({ type: Enum(COLLIDER_TYPES) })
  collider_type: COLLIDER_TYPES = COLLIDER_TYPES.NONE;
  score = 0;
  onLoad() {
    // PhysicsSystem2D: any.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
  }
  start() {
    let collider = this.getComponent(Collider2D);
    if (collider && this.collider_type != COLLIDER_TYPES.NONE) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
    }
    // if (PhysicsSystem2D.instance) {
    //   PhysicsSystem2D.instance.on(
    //     Contact2DType.BEGIN_CONTACT,
    //     this.onBegin,
    //     this
    //   );
    // }
  }
  onBegin = (
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) => {
    // console.log(selfCollider);
    // console.log(otherCollider);
    if (
      selfCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.STIKER &&
      otherCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.HOLES
    ) {
      selfCollider.node.getComponent(RigidBody2D).linearVelocity = Vec2.ZERO;

      console.log("STRIKER COLLIDED>>>>>");

      setTimeout(() => {
        let striker: Node = selfCollider.node;
        striker.getComponent(RigidBody2D).destroy();
        // striker.getComponent(CircleCollider2D).destroy();

        striker.getComponent(CircleCollider2D).enabled = false;
        tween(striker)
          .to(1, { position: otherCollider.node.getPosition() })

          .call(() => {
            striker.getComponent(stiker).resetIntialPos(this.onBegin);

            // selfCollider.node.setPosition(-459.3464, -607.097);
          })
          .start();
      });

      this.score -= 10;
      // console.log(this.score);
    } else if (
      selfCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.PUCKS &&
      otherCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.HOLES
    ) {
      var puckColor = selfCollider.getComponent(pucks).puckColorType;

      console.log(selfCollider.getComponent(pucks).puckColorType);
      // if (puckColor == 2) {
      //   if(previousPuck==1){
      //     this.score
      //   }
      //   this.score += 10;
      // } else if (puckColor == 3) {
      //   this.score += 20;
      // }
      if (puckColor == 1) {
        this.puckvar = true;
      } else if (puckColor == 2 && this.puckvar == true) {
        this.score += 60;
        this.puckvar = false;
      } else if (puckColor == 3 && this.puckvar == true) {
        this.score += 70;
        this.puckvar = false;
      } else if (puckColor == 2 && this.puckvar == false) {
        this.score += 10;
      } else if (puckColor == 3 && this.puckvar == true) {
        this.score += 20;
      }
      console.log(this.score);

      // else
      selfCollider.node.getComponent(RigidBody2D).linearVelocity = Vec2.ZERO;

      setTimeout(() => {
        let striker: Node = selfCollider.node;
        striker.getComponent(RigidBody2D).destroy();
        // striker.getComponent(CircleCollider2D).destroy();

        striker.getComponent(CircleCollider2D).enabled = false;
        tween(striker)
          .to(1, { position: otherCollider.node.getPosition() })

          .call(() => {
            striker.getComponent(stiker).resetIntialPos(this.onBegin);

            // selfCollider.node.setPosition(-459.3464, -607.097);
          })
          .start();
      });
    }
  };

  update(deltaTime: number) {}
}
