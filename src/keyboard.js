class Keyboard {
  constructor() {
    const engKeys = {
      Backquote: '`',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      KeyQ: 'Q',
      KeyW: 'W',
      KeyE: 'E',
      KeyR: 'R',
      KeyT: 'T',
      KeyY: 'Y',
      KeyU: 'U',
      KeyI: 'I',
      KeyO: 'O',
      KeyP: 'P',
      BracketLeft: '[',
      BracketRight: ']',
      Backslash: '\\',
      Delete: 'Delete',
      CapsLock: 'CapsLock',
      KeyA: 'a',
      KeyS: 's',
      KeyD: 'd',
      KeyF: 'f',
      KeyG: 'g',
      KeyH: 'h',
      KeyJ: 'j',
      KeyK: 'k',
      KeyL: 'l',
      Semicolon: ';',
      Quote: "'",
      Enter: 'Enter',
      ShiftLeft: 'Shift',
      KeyZ: 'z',
      KeyX: 'x',
      KeyC: 'c',
      KeyV: 'v',
      KeyB: 'b',
      KeyN: 'n',
      KeyM: 'm',
      Comma: ',',
      Period: '.',
      Slash: '/',
      ArrowUp: 'ArrowUp',
      ShiftRight: 'Shift',
      ControlLeft: 'Control',
      MetaLeft: 'Meta',
      AltLeft: 'Alt',
      Space: ' ',
      AltRight: 'Alt',
      ArrowLeft: 'ArrowLeft',
      ArrowDown: 'ArrowDown',
      ArrowRight: 'ArrowRight',
      ControlRight: 'Control',
    };

    const ruKeys = {
      Backquote: 'ё',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'Backspace',
      Tab: 'Tab',
      KeyQ: 'й',
      KeyW: 'ц',
      KeyE: 'у',
      KeyR: 'к',
      KeyT: 'е',
      KeyY: 'н',
      KeyU: 'г',
      KeyI: 'ш',
      KeyO: 'щ',
      KeyP: 'з',
      BracketLeft: 'х',
      BracketRight: 'ъ',
      Backslash: '\\',
      Delete: 'Delete',
      CapsLock: 'CapsLock',
      KeyA: 'Ф',
      KeyS: 'Ы',
      KeyD: 'В',
      KeyF: 'А',
      KeyG: 'П',
      KeyH: 'Р',
      KeyJ: 'О',
      KeyK: 'Л',
      KeyL: 'Д',
      Semicolon: 'Ж',
      Quote: 'Э',
      Enter: 'Enter',
      ShiftLeft: 'Shift',
      KeyZ: 'Я',
      KeyX: 'Ч',
      KeyC: 'С',
      KeyV: 'М',
      KeyB: 'И',
      KeyN: 'Т',
      KeyM: 'Ь',
      Comma: 'Б',
      Period: 'Ю',
      Slash: '.',
      ArrowUp: 'ArrowUp',
      ShiftRight: 'Shift',
      ControlLeft: 'Control',
      MetaLeft: 'Meta',
      AltLeft: 'Alt',
      Space: ' ',
      AltRight: 'Alt',
      ArrowLeft: 'ArrowLeft',
      ArrowDown: 'ArrowDown',
      ArrowRight: 'ArrowRight',
      ControlRight: 'Control',
    };

    if (localStorage.getItem('lang') === 'ru') {
      this.keysObj = ruKeys;
    } else {
      this.keysObj = engKeys; // makes eng default
    }

    if (localStorage.getItem('keyCase') === 'upper') {
      this.keyCase = 'upper';
    } else {
      this.keyCase = 'lower'; // так по умолчанию получается lower
    }
    // еще используются

    // this.wrapper;
    // this.printedText;

    this.render();
    this.addPhysicalKeyboardListeners();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    this.createInfo();

    document.body.prepend(this.wrapper);

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    Object.keys(this.keysObj).map((item) => {
      const key = this.createOneKey(item, this.keysObj[item]);
      keyboard.append(key);
      this.wrapper.append(keyboard);
      return keyboard; // lint required
    });
  }

  createInfo() {
    const heading = document.createElement('h1');
    heading.innerHTML = 'Virtual Keyboard';

    const info = document.createElement('ul');
    info.classList.add('info');
    info.innerHTML = `
            <li>Клавиатура создана в операционной системе Windows</li>
            <li>Работает раскладка для двух языков: русский и английский</li>
            <li>Переключение языка: левыe ctrl + alt</li>
    `;

    this.printedText = document.createElement('textarea');
    this.printedText.classList.add('printed-text');
    this.printedText.setAttribute('id', 'printed-text');
    this.printedText.setAttribute('autofocus', 'autofocus');

    this.wrapper.append(heading);
    this.wrapper.append(info);
    this.wrapper.append(this.printedText);
  }

  createOneKey(keyCode, keyKey) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.setAttribute('id', keyCode);

    switch (keyCode) {
      case 'ControlLeft':
      case 'ControlRight':
        key.innerHTML = 'Ctrl';
        key.classList.add('keyboard__key_size_m');
        break;
      case 'Backspace':
        key.innerHTML = 'Backspace';
        key.classList.add('keyboard__key_size_l');
        break;
      case 'Tab':
        key.innerHTML = 'Tab';
        key.classList.add('keyboard__key_size_m');
        break;
      case 'ShiftRight':
      case 'ShiftLeft':
        key.innerHTML = 'Shift';
        key.classList.add('keyboard__key_size_xl');
        break;
      case 'Enter':
        key.innerHTML = 'Enter';
        key.classList.add('keyboard__key_size_l');
        break;
      case 'MetaLeft':
        key.innerHTML = 'Win';
        key.classList.add('keyboard__key_size_m');
        break;
      case 'AltLeft':
      case 'AltRight':
        key.innerHTML = 'Alt';
        key.classList.add('keyboard__key_size_m');
        break;
      case 'Space':
        key.innerHTML = '';
        key.classList.add('keyboard__key_size_xxl');
        break;
      case 'Delete':
        key.innerHTML = 'Del';
        key.classList.add('keyboard__key_size_m');

        break;
      case 'CapsLock':
        key.innerHTML = 'Caps lock';
        key.classList.add('keyboard__key_size_l');
        if (localStorage.getItem('keyCase') === 'upper') {
          key.classList.add('keyboard__key_switch');
        }

        break;
      case 'ArrowLeft':
        key.innerHTML = '&larr;';
        break;
      case 'ArrowRight':
        key.innerHTML = '&rarr;';
        break;
      case 'ArrowUp':
        key.innerHTML = '&uarr;';
        break;
      case 'ArrowDown':
        key.innerHTML = '&darr;';
        break;

      default:
        if (this.keyCase === 'lower') {
          key.innerHTML = keyKey.toLowerCase();
        }
        if (this.keyCase === 'upper') {
          key.innerHTML = keyKey.toUpperCase();
        }
    }

    key.addEventListener('mousedown', this.clickHandler);
    key.addEventListener('mouseup', this.focusHandler);

    return key;
  }
}
function createKeyboard() {
  return new Keyboard();
}

window.addEventListener('load', createKeyboard());
