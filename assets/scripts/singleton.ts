import {
  _decorator,
  Component,
  Node,
  resources,
  SpriteFrame,
  Sprite,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("singleton")
export class singleton extends Component {
  spritesArray: SpriteFrame[] = [];
  private static instance: singleton = null;
  spriteFrameIndex: number;
  private singleton() {}
  static getInstance(): singleton {
    if (!this.instance) {
      this.instance = new singleton();
    }
    return singleton.instance;
  }
  /**
   * @description resourceLoading
   * @param folder name
   * @returns void
   */
  resourceLoad(folder: string) {
    resources.preloadDir(folder, SpriteFrame);

    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir(folder, SpriteFrame, (err, assets: SpriteFrame[]) => {
        if (!err) {
          console.log("in promise");

          this.spritesArray = assets;
          console.log(this.spritesArray);
          return resolve(this.spritesArray);
        } else {
          return reject(err);
        }
      });
    });
  }

  public assetIndex(name: string) {
    this.spriteFrameIndex = this.spritesArray.findIndex(
      (spritesArray) => spritesArray.name === name
    );
    console.log(this.spriteFrameIndex);

    return this.spriteFrameIndex;
  }
  start() {}

  update(deltaTime: number) {}
}
