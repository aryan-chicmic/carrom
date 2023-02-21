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
  ScrollView,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Registration")
export class Registration extends Component {
  // @property(EditBox)
  // public Name: EditBox = null!;
  // @property(EditBox)
  // public Username: EditBox = null!;
  // @property(EditBox)
  // public Password: EditBox = null!;
  @property(Label)
  buttonLabel = null;
  @property(Node)
  dropDownIcon = null;
  @property(ScrollView)
  scrollView: ScrollView = null;
  @property({ type: JsonAsset })
  countries = null;
  @property(Prefab)
  dropDownItem = null;

  dropDownCheck = false;
  count = 0;
  onLoad() {
    this.scrollView.getComponent(UITransform).height = 0;
    this.scrollView.getComponent(UITransform).height = 0;
    this.dropDownIcon.on(Input.EventType.TOUCH_START, this.dropDown, this);
    let countryData = this.countries.json.data;
    countryData.map((e) => {
      let item = instantiate(this.dropDownItem);
      let button = item.getChildByName("Button");
      button.getChildByNAme("Label").getComponent(Label).string = e.name;

      this.scrollView.content.addChild(item);
    });
  }

  dropDown() {
    this.count = 1;
    this.scrollView.getComponent(UITransform).height = 500;
    this.scrollView.getComponent(UITransform).height = 475;
    let scrollViewArr = this.scrollView.content.children;

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

  start() {}

  update(deltaTime: number) {}
}
