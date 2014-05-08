/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @see http://jsninja.pl/wkr-kongruencja/
 * @licence The MIT License {@link http://piecioshka.mit-license.org/}
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

            _.bindAll(this, '_enterHandler', '_submitHandler');

            // after click submit do calculation
            s.submit.on('click', this._submitHandler);

            // print result on any input have been modify
            s.first.on('keydown', this._enterHandler);
            s.second.on('keydown', this._enterHandler);
            s.third.on('keydown', this._enterHandler);

            // set focus on first input
            s.first.focus();
        },

        _enterHandler: function (e) {
            // if `enter`
            if (e.keyCode === 13) {
                this._printResult(this._calculate());
            } else {
                this._clearResult();
            }
        },

        _submitHandler: function (e) {
            this._printResult(this._calculate());
            e.preventDefault();
        },

        _calculate: function () {
            var s = this.settings;
            var first = s.first.val();
            var second = s.second.val();
            var third = s.third.val();
            return (first - second) % third;
        },

        _printResult: function (result) {
            var stringResult = (result === 0) ? 'True' : 'False';
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