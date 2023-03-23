import React, { useRef, useCallback, useEffect } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import _ from 'lodash';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var defaultStyle = {
  width: '50%',
  height: '600px'
};
var index = (function (props) {
  var value = props.value,
    onChange = props.onChange,
    _props$options = props.options,
    options = _props$options === void 0 ? {} : _props$options,
    _props$style = props.style,
    style = _props$style === void 0 ? {} : _props$style,
    result = __rest(props, ["value", "onChange", "options", "style"]);
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
        var totalOptions = Object.assign(Object.assign({
          mode: 'code',
          modes: ['code', 'tree', 'form', 'view', 'text'],
          indentation: 4,
          onChangeText: handleChange
        }, options), result);
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
    style: Object.assign(Object.assign({}, defaultStyle), style),
    ref: editorRef
  });
});

export { index as default };
