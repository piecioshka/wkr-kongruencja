/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @see https://piecioshka.github.io/wkr-kongruencja/
 * @license The MIT License {@link https://piecioshka.mit-license.org/}
 */
(function (root, factory) {
    root.App = factory(root._);
}(this, function (_) {
    'use strict';

    function App(options) {
        this.settings = _.extend({}, options);
        this.initialize();
    }

    App.prototype = {
        initialize: function () {
            var s = this.settings;

            _.bindAll(this, '_keyDownHandler', '_submitHandler');

            // after click submit do calculation
            s.submit.on('click', this._submitHandler);

            // print result on any input have been modify
            s.first.on('keydown', this._keyDownHandler);
            s.second.on('keydown', this._keyDownHandler);
            s.third.on('keydown', this._keyDownHandler);

            // set focus on first input
            s.first.focus();
        },

        _isEnter: function (e) {
            return e.keyCode === 13;
        },

        _isShortcut: function (e) {
            return e.ctrlKey || e.shiftKey || e.metaKey || e.altKey;
        },

        _keyDownHandler: function (e) {
            if (this._isShortcut(e)) {
                return;
            }

            if (this._isEnter(e)) {
                if (this._checkParams()) {
                    this._printResult(this._calculate());
                }
            } else {
                this._clearResult();
            }
        },

        _submitHandler: function (e) {
            if (this._checkParams()) {
                this._printResult(this._calculate());
            }
            e.preventDefault();
        },

        _checkParams: function () {
            var s = this.settings;
            var a = s.first.val();
            var b = s.second.val();
            var c = s.third.val();

            var errors = [];
            var status;

            if (!(/^\d+$/).test(a)) {
                errors.push('Niepoprawna wartość pierwszego parametru');
            }

            if (!(/^\d+$/).test(b)) {
                errors.push('Niepoprawna wartość drugiego parametru');
            }

            if (!(/^\d+$/).test(c)) {
                errors.push('Niepoprawna wartość trzeciego parametru');
            }

            if (_.size(errors)) {
                alert(_.first(errors));
            }

            // update status by error list
            status = !_.size(errors);

            return status;
        },

        _calculate: function () {
            var s = this.settings;
            var a = s.first.val();
            var b = s.second.val();
            var c = s.third.val();
            return (a - b) % c;
        },

        _printResult: function (result) {
            var stringResult = (result === 0) ? 'Tak, przystaje' : 'Nie, nie przystaje';
            var $r = this.settings.result;
            $r.parent().removeClass('hidden');
            $r.text(stringResult);
        },

        _clearResult: function () {
            this.settings.result.parent().addClass('hidden');
        }
    };

    return App;
}));