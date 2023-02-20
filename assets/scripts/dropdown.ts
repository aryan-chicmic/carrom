import {
  _decorator,
  Component,
  Node,
  EditBox,
  Input,
  UITransform,
  JsonAsset,
  instantiate,
  Prefab,
  Label,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Registration")
export class Registration extends Component {
  @property(EditBox)
  public Name: EditBox = null!;
  @property(EditBox)
  public Username: EditBox = null!;
  @property(EditBox)
  public Password: EditBox = null!;

  @property(Node)
  dropDownIcon = null;
  @property(Node)
  scrollView = null;
  @property({ type: JsonAsset })
  countries = null;
  @property(Prefab)
  dropDownItem = null;

  dropDownCheck = false;

  onLoad() {
    this.Name.node.on("text-changed", this.editBegin, this);

    this.dropDownIcon.on(Input.EventType.TOUCH_START, this.dropDown, this);
    let countryData = this.countries.json.data;
    countryData.map((e) => {
      let item = instantiate(this.dropDownItem);
      item.getComponent(Label).string = e.name;
      this.scrollView
        .getChildByName("view")
        .getChildByName("content")
        .addChild(item);
    });
  }

  dropDown() {
    let scrollViewArr = this.scrollView.children;

    if (!this.dropDownCheck) {
      this.scrollView.getComponent(UITransform).height = 500;
      scrollViewArr.map((e) => {
        e.getComponent(UITransform).height = 500;
      });

      this.dropDownCheck = true;
    } else {
      this.scrollView.getComponent(UITransform).height = 0;
      scrollViewArr.map((e) => {
        e.getComponent(UITransform).height = 0;
      });

      this.dropDownCheck = false;
    }
  }
  editBegin(name) {
    console.log(name._string);
  }
  start() {}

  update(deltaTime: number) {}
}
