class InterpreterResult {
  private _text: string;

  constructor(text: string) {
    this._text = text;
  }

  get text(): string {
    return this._text;
  }
}

class InterpreterResultHolder {
  private _holder: Array<InterpreterResult> = [];

  public add(result?: InterpreterResult): void {
    if (result !== undefined) {
      this._holder.push(result);
    }
  }

  public get(): Array<InterpreterResult> {
    return this._holder;
  }
}

class Interpreter {

  private _needBreak: boolean = false;
  private _needRepeat: boolean = false;
  private _countBottle: number = 99;

  public execute(command: string): InterpreterResultHolder {
    let holder = new InterpreterResultHolder();

    for (let i = 0, len = command.length; i < len; i++) {
      holder.add(this._execute(command[i], command));
      while (this._needRepeat) {
        holder.add(this._execute(command[i], command));
      }
      if (this._needBreak) {
        break;
      }
    }

    return holder;
  }

  private _execute(command: string, value: string): InterpreterResult {
    this._needBreak = false;
    switch (command) {
      case 'H':
        return this.commandH();
      case 'Q':
        return this.commandQ(value);
      case '9':
        return this.command9();
      case '+':
        this.commandPlus();
        break;
      default:
        this._needBreak = true;
        return new InterpreterResult('Syntax error');
    }
  }

  private commandH(): InterpreterResult {
    return new InterpreterResult('Hello, world!')
  }

  private commandQ(value: string): InterpreterResult {
    return new InterpreterResult(value);
  }

  private command9(): InterpreterResult {
    let count: number = this._countBottle--,
        bottle: string = ' bottle' + (count === 1 ? '' : 's');

    if (this._countBottle > 0) {
      this._needRepeat = true;
    } else {
      this._needRepeat = false;
      this._countBottle = 99;
    }

    return new InterpreterResult( count + bottle + ' of beer on the wall')
  }

  private commandPlus(): void {
    let inc = 0;
    inc++;
  }
}


class GenerateUlList {
  public get(results: InterpreterResultHolder): HTMLUListElement {
    const ul = this.createUList();
    results.get().forEach(function (result: InterpreterResult) {
      let li: HTMLLIElement = document.createElement('li');
      li.innerText = result.text;
      this.appendChild(li);
    }, ul);

    return ul;
  }

  private createUList(): HTMLUListElement {
    return document.createElement('ul');
  }

}

window.onload = () => {
  const answerElement: HTMLDivElement = document.querySelector('.js-answer');

  const interpreter = new Interpreter();
  const list = new GenerateUlList();
  document.querySelector('.js-cli').addEventListener('submit', function (e) {
    e.preventDefault();
    let inputCmd = this[0].value;
    this[0].value = null;

    const holder: InterpreterResultHolder = interpreter.execute(inputCmd);

    let div: HTMLDivElement = answerElement.cloneNode(true);
    div.classList.remove('css-hidden');
    div.querySelector('.js-input_command').innerHTML = inputCmd;
    div.querySelector('.js-answer').appendChild(list.get(holder));

    this.insertBefore(div, this.lastElementChild);

    document.getElementById('js-cmd_input-active').scrollIntoView();
  });
};