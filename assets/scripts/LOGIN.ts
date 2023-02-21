import { _decorator, Component, Node, Input, director, EditBox } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LOGIN")
export class LOGIN extends Component {
  @property({ type: Node })
  userName = null;

  @property({ type: Node })
  password = null;

  @property({ type: Node })
  logInButton: Node;

  onLoad(): void {
    this.logInButton.on(Input.EventType.TOUCH_START, this.fetchUserData, this);
  }

  fetchUserData() {
    let username = this.userName.getComponent(EditBox).string;
    let password = this.password.getComponent(EditBox).string;
    this.userRequest(username, password);
  }

  userRequest(username, password) {
    let xhttp = new XMLHttpRequest();
    let body = {
      email: username,
      password: password,
    };

    let method = "POST";
    let url = "http://3.18.231.59:4002/v1/user/login";
    let apiKey = "HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR";
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("apiKey", apiKey);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = () => {
      // console.log(xhttp.response);
      if (xhttp.readyState != 4) {
        return;
      }
      let data = xhttp.response;

      console.log(JSON.parse(data));

      director.loadScene("gameplay");
    };
    console.log(JSON.stringify(body));

    xhttp.send(JSON.stringify(body));
  }

  start() {}

  update(deltaTime: number) {}
}
