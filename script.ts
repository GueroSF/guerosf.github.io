window.onload = () => {
  let answerElement = document.querySelector('.js-answer');


  // const clon = (elem) => {
  //   let parent = elem.closest('.js-cli');
  //   let clone = parent.cloneNode(true);
  //   clone.querySelector('input').value = '';
  //   parent.innerHTML = '<span>Команда> </span><span class="lastCmd">' + elem.value + '</span>';
  //   document.body.insertBefore(clone, null);
  //   count = 0;
  // };


  const execute = (input: string) => {
    const output = (input:string, value:string) => {
      let data = {
        break: false,
        repeat: false,
        text: ''
      };
      switch (input) {
        case 'H':
          data.text = 'Hello, world!';
          break;
        case 'Q':
          data.text = value;
          break;
        case '9':
          data.repeat = countBottle !== 1;
          data.text = countBottle-- + ' bottles of beer on the wall';
          break;
        case '+':
          let inc = 0;
          inc++;
          break;
        default:
          data.break = true;
          data.text = 'Syntax error';
          break;
      }

      return data;
    };
    const r = (command:string, value:string) => {
      data = output(command, value);
      li = document.createElement('li');
      li.innerText = data.text;
      ul.appendChild(li);
      if (data.repeat) {
        r(command,value);
      }

      return data.break;
    };
    let ul = document.createElement('ul');
    let li, data, countBottle:number = 99;
    for (let i = 0, len = input.length; i < len; i++) {
      if (r(input[i], input)) {
        break;
      }
    }

    return ul;
  };

  document.querySelector('.js-cli').addEventListener('submit', function (e) {
    e.preventDefault();
    let inputCmd = this[0].value;
    this[0].value = null;

    let div = answerElement.cloneNode(true);
    div.classList.remove('css-hidden');
    div.querySelector('.js-input_command').innerHTML = inputCmd;
    div.querySelector('.js-answer').appendChild(execute(inputCmd));

    this.insertBefore(div, this.lastElementChild);
    // document.getElementById('js-cmd_input-active').focus({preventScroll:true});
    console.dir(this[0].parentElement);
    // console.dir(parent);

  });
  // document.body.addEventListener('keypress', (e) => {
  //   if (e.code == 'Enter') {
  //     let elem = document.querySelector('.input');
  //     for (let i = 0; i < elem.value.length; i++) {
  //       output(elem.value[i], elem.value, (data) => {
  //         if (data == 0) {
  //           let div = document.createElement('div');
  //           div.innerHTML = 'Syntax error';
  //           document.body.appendChild(div);
  //           return i = elem.value.length;
  //         } else {
  //           let div = document.createElement('div');
  //           div.innerHTML = data;
  //           document.body.appendChild(div);
  //         }
  //       });
  //     }
  //     clon(elem);
  //     document.querySelector('input').focus();
  //   }
  // });

  // let count = 0;
  //
  // document.body.addEventListener('keyup', (e) => {
  //   let enter = document.querySelectorAll('.lastCmd');
  //   if (enter.length != 0) {
  //     if (e.keyCode == 38) {
  //       cmd.value = enter[count].innerText;
  //       count++;
  //     } else if (e.keyCode == 40) {
  //       cmd.value = enter[count].innerText;
  //       count--;
  //     }
  //     if (count < 0) {
  //       count = 0;
  //     } else if (count >= enter.length) {
  //       count = enter.length - 1;
  //     }
  //   }
  // });
};