import React from "react";
import { JSONEditorOptions } from "jsoneditor";
import 'jsoneditor/dist/jsoneditor.css';
interface Props {
    value: string;
    onChange: (value: string) => void;
    options?: JSONEditorOptions;
    style?: React.CSSProperties;
}
declare const _default: (props: Props) => JSX.Element;
export default _default;
