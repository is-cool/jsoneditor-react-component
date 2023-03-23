import React, { useCallback, useEffect, useRef } from "react";
import JSONEditor, { JSONEditorOptions } from "jsoneditor";
import 'jsoneditor/dist/jsoneditor.css';
import _ from 'lodash';

interface Props {
  value: string | number | boolean | object | [];
  onChange: (value: string) => void;
  options?: JSONEditorOptions;
  style?: React.CSSProperties;
}

const defaultStyle = {
  width: '50%',
  height: '600px'
}

export default (props: Props) => {
  const { value, onChange, options = {}, style= {}, ...result } = props;

  const editorRef = useRef<HTMLInputElement | null>(null);
  const editorObj = useRef<any | null>(null);

  // 处理value
  const handleChange = useCallback(
    (jsonValue: string) => {
      try {
        const currenValue = jsonValue === "" ? null : editorObj.current?.get();
        onChange && onChange(currenValue);
      } catch (err) {
        // throw new Error(err);
      }
    },
    [onChange]
  );

  useEffect(() => {
    // 初始化JSON编辑器
    (function () {
      if (!editorObj.current) {
        const totalOptions = {
          mode: 'code',
          modes: ['code', 'tree', 'form', 'view', 'text'],
          indentation: 4,
          onChangeText: handleChange,
          ...options,
          ...result,
        };
        editorObj.current = new JSONEditor(editorRef?.current as HTMLElement, totalOptions as JSONEditorOptions);
      }
    })();
  }, []);

  useEffect(() => {
    try {
      if (value && !_.isEqual(editorObj.current?.get(), value)) {
        editorObj.current?.update(value);
      }
    } catch (error) {
      // 当编辑器内容为空时，editorObj.current.get()会抛出异常，所以这里需要捕获
    }
  }, [value]);

  return <div style={{ ...defaultStyle, ...style }} ref={editorRef} />
};
