import { _decorator, Component, Node, EPhysics2DDrawFlags } from "cc";
const { ccclass, property } = _decorator;

@ccclass("physics")
export class physics extends Component {
  onLoad() {
    // PhysicsSystem2D: any.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
  }
  start() {}

  update(deltaTime: number) {}
}
