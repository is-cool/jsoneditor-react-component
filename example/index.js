import React from "react";
import ReactDOM from "react-dom";
import JSONEditor from "jsoneditor-react-component";

const appRoot = document.createElement("div");
appRoot.id = "app";

document.body.appendChild(appRoot);

const APP = () => {
  const onChangeText = (value) => {
    console.log("onChangeText", value);
  };
  return <JSONEditor value={""} onChange={onChangeText} />;
};

ReactDOM.render(<React.StrictMode><APP/></React.StrictMode>, appRoot);
