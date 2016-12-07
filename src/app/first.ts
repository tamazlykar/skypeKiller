class Messenger {
  private socket: WebSocket;

  constructor(address: string) {
    this.socket = new WebSocket(`ws:${address}`);
    this.socket.onmessage = this.receive.bind(this);
    this.setEvents();
  }

  public send(message: string) {
    if (message != '') {
      this.socket.send(message);
    }
  }

  private receive(message: MessageEvent) {
    this.printNewMessage(message.data);
  }

  private printNewMessage(message: string) {
    let messageElem = document.createElement('div');
    messageElem.className = 'message';
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('history').appendChild(messageElem);
  }

  private setEvents() {
    let input = <HTMLInputElement>document.getElementById('messageForm');
    input.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.code == 'Enter') {
        this.send(input.value);
        input.value = '';
      }
    })
  }
}


class Bootstrap {
  private messenger: Messenger;

  constructor() {
    let address = document.URL.slice(5);
    this.messenger = new Messenger(address);
  }
}


new Bootstrap();

