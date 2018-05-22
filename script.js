window.onload = () => {
  const clon = (elem) => {
    let parent = elem.closest('.cmd');
    let clone = parent.cloneNode(true);
    clone.querySelector('input').value = '';
    parent.innerHTML = '<span>Команда> </span><span class="lastCmd">' + elem.value + '</span>';
    document.body.insertBefore(clone, null);
    count = 0;
  };

  const output = (input, value, callback) => {
    switch (input) {
      case 'H':
        callback('Hello, world!');
        break;
      case 'Q':
        callback(value);
        break;
      case '9':
        let text = '99 bottles of beer on the wall<br/>';
        for (let b = 98; b > 0; b--) {
          text += b + ' bottles of beer!<br/>';
        }
        callback(text);
        break;
      case '+':
        let inc = 0;
        inc++;
        break;
      default:
        callback(0);
        break;
    }
  };

  document.body.addEventListener('keypress', (e) => {
    if (e.code == 'Enter') {
      let elem = document.querySelector('#cmd');
      for (let i = 0; i < elem.value.length; i++) {
        output(elem.value[i], elem.value, (data) => {
          if (data == 0) {
            let div = document.createElement('div');
            div.innerHTML = 'Syntax error';
            document.body.appendChild(div);
            return i = elem.value.length;
          } else {
            let div = document.createElement('div');
            div.innerHTML = data;
            document.body.appendChild(div);
          }
        });
      }
      clon(elem);
      document.querySelector('input').focus();
    }
  });

  let count = 0;

  document.body.addEventListener('keyup', (e) => {
    let enter = document.querySelectorAll('.lastCmd');
    if (enter.length != 0) {
      if (e.keyCode == 38) {
        cmd.value = enter[count].innerText;
        count++;
      } else if (e.keyCode == 40) {
        cmd.value = enter[count].innerText;
        count--;
      }
      if (count < 0) {
        count = 0;
      } else if (count >= enter.length) {
        count = enter.length - 1;
      }
    }
  });
};