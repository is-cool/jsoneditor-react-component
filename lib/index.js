import React, { useRef, useCallback, useEffect } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import _ from 'lodash';

var defaultStyle = {
  width: '100%',
  height: '600px'
};
var index = (function (props) {
  var value = props.value,
    onChange = props.onChange,
    _props$options = props.options,
    options = _props$options === void 0 ? {} : _props$options;
    props.style;
  var editorRef = useRef(null);
  var editorObj = useRef(null);
  // 处理value
  var handleChange = useCallback(function (jsonValue) {
    var _a;
    try {
      var currenValue = jsonValue === "" ? null : (_a = editorObj.current) === null || _a === void 0 ? void 0 : _a.get();
      onChange && onChange(currenValue);
    } catch (err) {
      // throw new Error(err);
    }
  }, [onChange]);
  useEffect(function () {
    // 初始化JSON编辑器
    (function () {
      if (!editorObj.current) {
        var totalOptions = Object.assign({
          mode: 'code',
          modes: ['code', 'tree', 'form', 'view', 'text'],
          indentation: 4,
          onChangeText: handleChange
        }, options);
        editorObj.current = new JSONEditor(editorRef === null || editorRef === void 0 ? void 0 : editorRef.current, totalOptions);
      }
    })();
  }, []);
  useEffect(function () {
    var _a, _b;
    try {
      if (value && !_.isEqual((_a = editorObj.current) === null || _a === void 0 ? void 0 : _a.get(), value)) {
        (_b = editorObj.current) === null || _b === void 0 ? void 0 : _b.update(value);
      }
    } catch (error) {
      // 当编辑器内容为空时，editorObj.current.get()会抛出异常，所以这里需要捕获
    }
  }, [value]);
  return /*#__PURE__*/React.createElement("div", {
    style: Object.assign({}, defaultStyle),
    ref: editorRef
  });
});

export { index as default };
