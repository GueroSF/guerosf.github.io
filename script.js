var InterpreterResult = /** @class */ (function () {
    function InterpreterResult(text) {
        this._text = text;
    }
    Object.defineProperty(InterpreterResult.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    return InterpreterResult;
}());
var InterpreterResultHolder = /** @class */ (function () {
    function InterpreterResultHolder() {
        this._holder = [];
    }
    InterpreterResultHolder.prototype.add = function (result) {
        if (result !== undefined) {
            this._holder.push(result);
        }
    };
    InterpreterResultHolder.prototype.get = function () {
        return this._holder;
    };
    return InterpreterResultHolder;
}());
var Interpreter = /** @class */ (function () {
    function Interpreter() {
        this._needBreak = false;
        this._needRepeat = false;
        this._countBottle = 99;
    }
    Interpreter.prototype.execute = function (command) {
        var holder = new InterpreterResultHolder();
        for (var i = 0, len = command.length; i < len; i++) {
            holder.add(this._execute(command[i], command));
            while (this._needRepeat) {
                holder.add(this._execute(command[i], command));
            }
            if (this._needBreak) {
                break;
            }
        }
        return holder;
    };
    Interpreter.prototype._execute = function (command, value) {
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
    };
    Interpreter.prototype.commandH = function () {
        return new InterpreterResult('Hello, world!');
    };
    Interpreter.prototype.commandQ = function (value) {
        return new InterpreterResult(value);
    };
    Interpreter.prototype.command9 = function () {
        var count = this._countBottle--, bottle = ' bottle' + (count === 1 ? '' : 's');
        if (this._countBottle > 0) {
            this._needRepeat = true;
        }
        else {
            this._needRepeat = false;
            this._countBottle = 99;
        }
        return new InterpreterResult(count + bottle + ' of beer on the wall');
    };
    Interpreter.prototype.commandPlus = function () {
        var inc = 0;
        inc++;
    };
    return Interpreter;
}());
var GenerateUlList = /** @class */ (function () {
    function GenerateUlList() {
    }
    GenerateUlList.prototype.get = function (results) {
        var ul = this.createUList();
        results.get().forEach(function (result) {
            var li = document.createElement('li');
            li.innerText = result.text;
            this.appendChild(li);
        }, ul);
        return ul;
    };
    GenerateUlList.prototype.createUList = function () {
        return document.createElement('ul');
    };
    return GenerateUlList;
}());
window.onload = function () {
    var answerElement = document.querySelector('.js-answer');
    var interpreter = new Interpreter();
    var list = new GenerateUlList();
    document.querySelector('.js-cli').addEventListener('submit', function (e) {
        e.preventDefault();
        var inputCmd = this[0].value;
        this[0].value = null;
        var holder = interpreter.execute(inputCmd);
        var div = answerElement.cloneNode(true);
        div.classList.remove('css-hidden');
        div.querySelector('.js-input_command').innerHTML = inputCmd;
        div.querySelector('.js-answer').appendChild(list.get(holder));
        this.insertBefore(div, this.lastElementChild);
    });
};
