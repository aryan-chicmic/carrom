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
} from "cc";
import { COLLIDER_TYPES } from "./constants";
const { ccclass, property } = _decorator;

@ccclass("physics")
export class physics extends Component {
  @property({ type: Enum(COLLIDER_TYPES) })
  collider_type: COLLIDER_TYPES = COLLIDER_TYPES.NONE;
  score = 0;
  onLoad() {
    // PhysicsSystem2D: any.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
  }
  start() {
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
    }
    if (PhysicsSystem2D.instance) {
      PhysicsSystem2D.instance.on(
        Contact2DType.BEGIN_CONTACT,
        this.onBegin,
        this
      );
    }
  }
  onBegin(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // console.log(selfCollider);
    // console.log(otherCollider);
    if (
      selfCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.STIKER &&
      otherCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.HOLES
    ) {
      this.score -= 1;
      // console.log(this.score);
    } else if (
      selfCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.PUCKS &&
      otherCollider.node.getComponent(physics).collider_type ==
        COLLIDER_TYPES.HOLES
    ) {
      this.score += 1;
      // console.log(this.score);
      // } else if((selfCollider.node.getComponent(physics).collider_type ==
      // COLLIDER_TYPES.STIKER || selfCollider.node.getComponent(physics).collider_type ==
      // COLLIDER_TYPES.PUCKS) &&otherCollider.node.getComponent(physics).collider_type ==
      // COLLIDER_TYPES.B) {
    } else {
      // console.log("Collided");
    }
  }

  update(deltaTime: number) {}
}
