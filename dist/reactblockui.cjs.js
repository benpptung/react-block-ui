'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

function Loader() {
  return React__default.createElement(
    "div",
    { className: "loading-indicator" },
    React__default.createElement(
      "span",
      { className: "loading-bullet" },
      "\u2022"
    ),
    ' ',
    React__default.createElement(
      "span",
      { className: "loading-bullet" },
      "\u2022"
    ),
    ' ',
    React__default.createElement(
      "span",
      { className: "loading-bullet" },
      "\u2022"
    )
  );
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var propTypes = {
  blocking: PropTypes.bool,
  children: PropTypes.node,
  renderChildren: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

var defaultProps = {
  tag: 'div',
  renderChildren: true,
  loader: Loader
};

var BlockUi$1 = function (_Component) {
  inherits(BlockUi, _Component);

  function BlockUi(props) {
    classCallCheck(this, BlockUi);

    var _this = possibleConstructorReturn(this, (BlockUi.__proto__ || Object.getPrototypeOf(BlockUi)).call(this, props));

    _this.tabbedUpTop = _this.tabbedUpTop.bind(_this);
    _this.tabbedDownTop = _this.tabbedDownTop.bind(_this);
    _this.tabbedUpBottom = _this.tabbedUpBottom.bind(_this);
    _this.tabbedDownBottom = _this.tabbedDownBottom.bind(_this);

    _this.catchTopFocus = function (c) {
      return _this.topFocus = c;
    };
    _this.catchBlocker = function (c) {
      return _this.blocker = c;
    };
    _this.catchHelper = function (c) {
      return _this.helper = c;
    };

    return _this;
  }

  createClass(BlockUi, [{
    key: 'blockingTab',
    value: function blockingTab(e) {
      var withShift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return this.props.blocking && (e.key === 'Tab' || e.keyCode === 9) && e.shiftKey == withShift;
    }
  }, {
    key: 'tabbedUpTop',
    value: function tabbedUpTop(e) {
      if (this.blockingTab(e)) {
        this.blocker.focus();
      }
    }
  }, {
    key: 'tabbedDownTop',
    value: function tabbedDownTop(e) {
      if (this.blockingTab(e)) {
        e.preventDefault();
        this.blocker.focus();
      }
    }
  }, {
    key: 'tabbedUpBottom',
    value: function tabbedUpBottom(e) {
      if (this.blockingTab(e, true)) {
        this.topFocus.focus();
      }
    }
  }, {
    key: 'tabbedDownBottom',
    value: function tabbedDownBottom(e) {
      if (this.blockingTab(e, true)) {
        e.preventDefault();
        this.topFocus.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.blocking !== this.props.blocking) {
        if (nextProps.blocking) {
          // blocking started
          if (this.helper && this.helper.parentNode && this.helper.parentNode.contains && this.helper.parentNode.contains(document.activeElement)) {
            this.focused = document.activeElement;
            // https://www.tjvantoll.com/2013/08/30/bugs-with-document-activeelement-in-internet-explorer/#blurring-the-body-switches-windows-in-ie9-and-ie10
            if (this.focused && this.focused !== document.body) {
              setTimeout(function () {
                return _this2.topFocus && _this2.topFocus.focus();
              }, 0);
            }
          }
        } else {
          var ae = document.activeElement;
          if (this.focused && (!ae || ae === document.body || ae === this.topFocus)) {
            this.focused.focus();
            this.focused = null;
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Tag = _props.tag,
          blocking = _props.blocking,
          className = _props.className,
          children = _props.children,
          message = _props.message,
          Loader$$1 = _props.loader,
          renderChildren = _props.renderChildren,
          attributes = objectWithoutProperties(_props, ['tag', 'blocking', 'className', 'children', 'message', 'loader', 'renderChildren']);


      var classes = blocking ? 'block-ui ' + className : className;
      var renderChilds = !blocking || renderChildren;

      return React__default.createElement(
        Tag,
        _extends({}, attributes, { className: classes, 'aria-busy': blocking }),
        blocking && React__default.createElement('div', { tabIndex: '0', onKeyUp: this.tabbedUpTop, onKeyDown: this.tabbedDownTop, ref: this.catchTopFocus }),
        renderChilds && children,
        blocking && React__default.createElement(
          'div',
          { className: 'block-ui-container',
            tabIndex: '0',
            ref: this.catchBlocker,
            onKeyUp: this.tabbedUpBottom,
            onKeyDown: this.tabbedDownBottom
          },
          React__default.createElement('div', { className: 'block-ui-overlay' }),
          React__default.createElement(
            'div',
            { className: 'block-ui-message-container' },
            React__default.createElement(
              'div',
              { className: 'block-ui-message' },
              message,
              React__default.isValidElement(Loader$$1) ? Loader$$1 : React__default.createElement(Loader$$1, null)
            )
          )
        ),
        React__default.createElement('span', { ref: this.catchHelper })
      );
    }
  }]);
  return BlockUi;
}(React.Component);

BlockUi$1.defaultProps = defaultProps;

module.exports = BlockUi$1;
//# sourceMappingURL=reactblockui.cjs.js.map
