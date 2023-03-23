# Usage

## Installation

```
npm i jsoneditor-react-component
```

## Quick start

```js
import JSONEditor from "jsoneditor-react-component";
 const onChangeText = (value) => {
    console.log("onChangeText", value);
  };
  //options默认配置：mode: 'code', modes: ['code', 'tree', 'form', 'view', 'text'], indentation: 4, 更多配置请参考https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
 <JSONEditor options={} value={""} onChange={onChangeText} />
```
