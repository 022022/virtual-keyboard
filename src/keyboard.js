class Keyboard {
  constructor() {
    this.engKeys = {
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

    this.ruKeys = {
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

    this.ctrlFlag = false;
    this.altFlag = false;
    this.shiftFlag = false;
    this.capsFlag = false;

    this.textarea = {};

    this.render();
    this.addPhysicalKeyboardListeners();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');
    document.body.prepend(this.wrapper);

    this.createInfo();

    this.createKeyboard();
  }

  createKeyboard(animateIds = null) {
    this.ctrlFlag = false;
    this.altFlag = false;
    this.shiftFlag = false;

    if (localStorage.getItem('lang') === 'ru') {
      this.keysObj = this.ruKeys;
    } else {
      localStorage.setItem('lang', 'en');
      this.keysObj = this.engKeys;
    }

    if (localStorage.getItem('keyCase') === 'upper') {
      this.keyCase = 'upper';
    } else {
      this.keyCase = 'lower'; //
    }

    let keyboard;
    if (document.getElementById('keyboard')) {
      keyboard = document.getElementById('keyboard');
      keyboard.innerHTML = '';
    } else {
      keyboard = document.createElement('div');
      keyboard.setAttribute('id', 'keyboard');
    }

    keyboard.classList.add('keyboard');

    Object.keys(this.keysObj).map((item) => {
      const key = this.createOneKey(item, this.keysObj[item]);
      keyboard.append(key);
      this.wrapper.append(keyboard);
      return keyboard;
    });

    this.focusHandler();

    if (animateIds) {
      animateIds.map((item) => document.getElementById(item).classList.add('animateButton'));
    }
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

    if (this.alreadyHaveText) {
      this.printedText.value = this.alreadyHaveText;
    }

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
        if (this.capsFlag) {
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

        if (this.capsFlag) {
          key.innerHTML = keyKey.toUpperCase();
        } else {
          key.innerHTML = keyKey.toLowerCase();
        }
    }

    key.addEventListener('mousedown', this.clickHandler);
    key.addEventListener('mouseup', this.focusHandler);

    return key;
  }

  clickHandler = (event) => {
    const clickedId = event.target.id;
    let char;

    this.textarea = document.getElementById('printed-text');

    switch (clickedId) {
      case 'CapsLock':
        this.capsFlag = !this.capsFlag;
        this.createKeyboard();
        return;

      case 'ArrowLeft':
        char = '←';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;
      case 'ArrowRight':
        char = '→';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;
      case 'ArrowUp':
        char = '↑';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;
      case 'ArrowDown':
        char = '↓';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;

      case 'Enter':

        char = '\n';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;

      case 'Space':
        char = ' ';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;

      case 'Tab':
        char = '\t';
        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        break;

      case 'Backspace':
        if (this.textarea.selectionStart === this.textarea.selectionEnd) {
          this.textarea.setRangeText('', this.textarea.selectionStart - 1, this.textarea.selectionEnd, 'end');
        } else {
          this.textarea.setRangeText('', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        }

        break;

      case 'Delete':
        if (this.textarea.selectionStart === this.textarea.selectionEnd) {
          this.textarea.setRangeText('', this.textarea.selectionStart, this.textarea.selectionEnd + 1, 'end');
        } else {
          this.textarea.setRangeText('', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        }
        break;

      case 'ShiftRight':
      case 'ControlRight':
      case 'AltRight':
      case 'MetaLeft':
        event.target.classList.toggle('active');
        break;

      case 'ShiftLeft':
        event.target.classList.toggle('active');
        this.shiftFlag = !this.shiftFlag;
        break;

      case 'ControlLeft':
        event.target.classList.toggle('active');
        if (this.ctrlFlag === false) {
          this.ctrlFlag = true;
          if (this.altFlag === true) {
            this.switchLang();
          }
        } else {
          this.ctrlFlag = false;
        }
        break;

      case 'AltLeft':
        event.target.classList.toggle('active');
        if (this.altFlag === false) {
          this.altFlag = true;
          if (this.ctrlFlag === true) {
            this.switchLang();
          }
        } else {
          this.altFlag = false;
        }
        break;

      default:
        if (this.capsFlag || this.shiftFlag) {
          char = this.keysObj[clickedId].toUpperCase();
        } else {
          char = this.keysObj[clickedId].toLowerCase();
        }

        this.textarea.setRangeText(char, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
    }

    this.textarea.focus();
  };
}

function createKeyboardPage() {
  return new Keyboard();
}

window.addEventListener('load', createKeyboardPage());
