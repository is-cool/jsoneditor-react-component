# jsoneditor-react-component
[![Version](https://img.shields.io/npm/v/jsoneditor-react.svg)](https://www.npmjs.com/package/jsoneditor-react-component)
[![Licence](https://img.shields.io/npm/l/jsoneditor-react.svg)])
## Installation

```
npm i jsoneditor-react-component
```

## Usage

```js
import JSONEditor from "jsoneditor-react-component";
```
然后在jsx中使用:

```js
 const onChangeText = (value) => {
    console.log("onChangeText", value);
  };
  //options默认配置：mode: 'code', modes: ['code', 'tree', 'form', 'view', 'text'], indentation: 4
 <JSONEditor options={} value={'{"a": "c"}'} onChange={onChangeText} />
```
If you want use with Ajv

```js
import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true, verbose: true });

 const onChangeText = (value) => {
    console.log("onChangeText", value);
  };
  //options默认配置：mode: 'code', modes: ['code', 'tree', 'form', 'view', 'text'], indentation: 4, 更多配置请参考https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
 <JSONEditor options={ ajv } value={'{"a": "c"}'} onChange={onChangeText} />
```

If you want use with Ace Editor:

```js
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

 const onChangeText = (value) => {
    console.log("onChangeText", value);
  };
  //options默认配置：mode: 'code', modes: ['code', 'tree', 'form', 'view', 'text'], indentation: 4, 更多配置请参考https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
 <JSONEditor options={{ ace, theme="ace/theme/github" }} value={'{"a": "c"}'} onChange={onChangeText} />
```


## Options
```js
/**
     * Provide a custom version of the Ace editor and use this instead of the version that comes embedded with JSONEditor. Only applicable when mode is `code`.
     *
     * Note that when using the minimalist version of JSONEditor (which has Ace excluded), JSONEditor will try to load the Ace plugins `ace/mode/json` and `ace/ext/searchbox`.
     * These plugins must be loaded beforehand or be available in the folder of the Ace editor.
     */
    ace?: AceAjax.Ace | undefined;
    /**
     * Provide a custom instance of [ajv](https://github.com/epoberezkin/ajv), the library used for JSON schema validation.
     * @example { ajv: Ajv({ allErrors: true, verbose: true }) }
     */
    ajv?: Ajv | undefined;
    /**
     * Set a callback function triggered when the contents of the JSONEditor change.
     * This callback does not pass the changed contents, use `get()` or `getText()` for that.
     * Note that `get()` can throw an exception in mode `text`, `code`, or `preview`, when the editor contains invalid JSON.
     * Will only be triggered on changes made by the user, not in case of programmatic changes via the functions `set`, `setText`, `update`, or `updateText`.
     * See also callback functions `onChangeJSON(json)` and `onChangeText(jsonString)`.
     */
    onChange?: (() => void) | undefined;
    /**
     * Set a callback function triggered when the contents of the JSONEditor change.
     * Passes the changed JSON document. Only applicable when option mode is `tree`, `form`, or `view`.
     * The callback will only be triggered on changes made by the user, not in case of programmatic changes via the functions `set`, `setText`, `update`, or `updateText`.
     * @see onChangeText for more details
     */
    onChangeJSON?: ((json: any) => void) | undefined;
    /**
     * Set a callback function triggered when the contents of the JSONEditor change.
     * Passes the changed JSON document as a string.
     * The callback will only be triggered on changes made by the user, not in case of programmatic changes via the functions `set`, `setText`, `update`, or `updateText`.
     * @see onChangeJSON for more details
     */
    onChangeText?: ((jsonString: string) => void) | undefined;
    /**
     * Set a callback function to add custom CSS classes to the rendered nodes.
     * Only applicable when option mode is `tree`, `form`, or `view`.
     * The function must either return a string containing CSS class names, or return undefined in order to do nothing for a specific node.
     * In order to update css classes when they depend on external state, you can call `editor.refresh()`.
     */
    onClassName?: ((classNameParams: OnClassNameParams) => string | undefined) | undefined;
    /**
     * Set a callback function to be invoked when a node is expanded/collapsed (not programtically via APIs).
     * Only applicable when option mode is `tree`, `form`, or `view`.
     */
    onExpand?: (expandParams: ExpandOptions) => void | undefined;
    /**
     * Set a callback function to determine whether individual nodes are editable or readonly.
     * Only applicable when option mode is `tree`, `text`, or `code`.
     * In case of mode `tree`, the callback is invoked as `editable(node)`, where the first parameter is a `Node`.
     * The function must either return a boolean value to set both the nodes field and value editable or readonly,
     * or return `{ field: boolean; value: boolean }` to set the readonly attribute for field and value individually.
     * In modes `text` and `code`, the callback is invoked as `editable(node)` where node is an empty object (no field, value, or path).
     * In that case the function can return false to make the text or code editor completely readonly.
     */
    onEditable?: ((node: EditableNode | object) => boolean | FieldEditable) | undefined;
    /**
     * Set a callback function triggered when an error occurs.
     * Invoked with the error as first argument. The callback is only invoked
     * for errors triggered by a users action, like switching from `code` mode to `tree` mode
     * or clicking the Format button whilst the editor doesn't contain valid JSON.
     */
    onError?: ((error: Error) => void) | undefined;
    /**
     * Set a callback function triggered right after the mode is changed by the user.
     * Only applicable when the mode can be changed by the user (i.e. when option modes is set).
     */
    onModeChange?: ((newMode: JSONEditorMode, oldMode: JSONEditorMode) => void) | undefined;
    /**
     * Customize the name of object and array nodes. By default the names are brackets with the number of children inside, like {5} and [32].
     * The number inside can be customized. using onNodeName. The onNodeName function should return a string containing the name for the node.
     * If nothing is returned, the size (number of children) will be displayed.
     */
    onNodeName?: ((nodeName: OnNodeNameParams) => string | undefined) | undefined;
    /**
     * Set a callback function for custom validation. Available in all modes.
     * On a change of the JSON, the callback function is invoked with the changed data.
     * The function should return an array with errors or null if there are no errors.
     * The function can also return a Promise resolving with the errors retrieved via an asynchronous validation (like sending a request to a server for validation).
     * @see schema for JSON schema validation.
     */
    onValidate?: ((json: any) => ValidationError[] | Promise<ValidationError[]>) | undefined;
    /**
     * Set a callback function for validation and parse errors. Available in all modes.
     * On validation of the json, if errors of any kind were found this callback is invoked with the errors data.
     * On change, the callback will be invoked only if errors were changed.
     * @param errors validation errors
     */
    onValidationError?: ((errors: ReadonlyArray<SchemaValidationError | ParseError>) => void) | undefined;
    /**
     * Set a callback function to customize the context menu in tree mode. Each time the user clicks on the context menu button, an array of menu items is created.
     * If this callback is configured, the array with menu items is passed to this function. The menu items can be customized in this function in any aspect of these menu items,
     * including deleting them and/or adding new items. The function should return the final array of menu items to be displayed to the user.
     * Each menu item is represented by an object, which may also contain a submenu array of items.
     */
    onCreateMenu?: ((menuItems: MenuItem[], node: MenuItemNode) => MenuItem[]) | undefined;
    /**
     * If true, unicode characters are escaped and displayed as their hexadecimal code (like \u260E) instead of of the character itself (like ☎).
     * @default false
     */
    escapeUnicode?: boolean | undefined;
    /**
     * If true, object keys in `tree`, `view` or `form` mode will be listed alphabetically instead by their insertion order.
     * Sorting is performed using a natural sort algorithm, which makes it easier to see objects that have string numbers as keys.
     * @default false
     */
    sortObjectKeys?: boolean | undefined;
    /**
     * If false, nodes can be dragged from any parent node to any other parent node. If true, nodes can only be dragged inside the same parent node, which effectively only allows reordering of nodes.
     * By default, limitDragging is true when no JSON schema is defined, and false otherwise.
     */
    limitDragging?: boolean;
    /**
     * Enables history, adds a button Undo and Redo to the menu of the JSONEditor. Only applicable when mode is `tree`, `form`, or `preview`.
     * @default true
     */
    history?: boolean | undefined;
    /**
     * Set the editor mode. Available values: `tree`, `view`, `form`, `code`, `text`, `preview`.
     * In `view` mode, the data and datastructure is readonly. In `form` mode, only the value can be changed, the data structure is readonly.
     * Mode `code` requires the Ace editor to be loaded on the page. Mode `text` shows the data as plain text.
     * The `preview` mode can handle large JSON documents up to 500 MiB. It shows a preview of the data, and allows to transform, sort, filter, format, or compact the data.
     * @default 'tree'
     */
    mode?: JSONEditorMode | undefined;
    /**
     * Create a box in the editor menu where the user can switch between the specified modes.
     * @see mode for configuration
     */
    modes?: JSONEditorMode[] | undefined;
    /**
     * Initial field name for the root node. Can also be set using `setName(name)`. Only applicable when mode is `tree`, `view`, or `form`.
     * @default undefined
     */
    name?: string | undefined;
    /**
     * Validate the JSON object against a JSON schema. A JSON schema describes the structure that a JSON object must have, like required properties or the type that a value must have.
     * @see onValidate for custom validation.
     * @see http://json-schema.org/
     */
    schema?: object | undefined;
    /**
     * Schemas that are referenced using the `$ref` property from the JSON schema that are set in the schema option, the object structure in the form of `{ reference_key: schemaObject }`.
     */
    schemaRefs?: object | undefined;
    /**
     * When enabled and schema is configured, the editor will suggest text completions based on the schema properties, examples and enums.
     * - Limitation: the completions will be presented only for a valid json.
     * - Only applicable when mode is `code`.
     * @default false
     */
    allowSchemaSuggestions?: boolean | undefined;
    /**
     * Enables a search box in the upper right corner of the JSONEditor. Only applicable when mode is `tree`, `view`, or `form`.
     * @default true
     */
    search?: boolean | undefined;
    /**
     * Number of indentation spaces. Only applicable when mode is `code`, `text`, or `preview`.
     * @default 2
     */
    indentation?: number | undefined;
    /**
     * Set the Ace editor theme. Please note that only the default theme is included with JSONEditor, so if you specify another one you need to make sure it is loaded.
     * @default 'ace/theme/jsoneditor'
     */
    theme?: string | undefined;
    /**
     * Array of templates that will appear in the context menu, Each template is a json object precreated that can be added as a object value to any node in your document.
     */
    templates?: Template[] | undefined;
    /**
     * Providing this will enable this feature in your editor in `tree` mode.
     */
    autocomplete?: AutoCompleteOptions | undefined;
    /**
     * Adds main menu bar. Contains format, sort, transform, search etc. functionality. Applicable in all modes.
     * @default true
     */
    mainMenuBar?: boolean | undefined;
    /**
     * Adds navigation bar to the menu. The navigation bar visualizes the current position on the tree structure as well as allows breadcrumbs navigation.
     * Only applicable when mode is `tree`, `form` or `view`.
     * @default true
     */
    navigationBar?: boolean | undefined;
    /**
     * Adds status bar to the bottom of the editor. The status bar shows the cursor position and a count of the selected characters.
     * Only applicable when mode is `code`, `text`, or `preview`.
     * @default true
     */
    statusBar?: boolean | undefined;
    /**
     * Set a callback function triggered when a text is selected in the JSONEditor.
     * Only applicable when mode is `code` or `text`.
     * @param start Selection start position
     * @param end Selected end position
     * @param text selected text
     */
    onTextSelectionChange?: ((start: SelectionPosition, end: SelectionPosition, text: string) => void) | undefined;
    /**
     * Set a callback function triggered when Nodes are selected in the JSONEditor.
     * Only applicable when mode is `tree`.
     * @param start
     * @param end
     */
    onSelectionChange?: ((start: SerializableNode, end: SerializableNode) => void) | undefined;
    /**
     * Set a callback function that will be triggered when an event will occur in a JSON field or value.
     * Only applicable when mode is `form`, `tree` or `view`.
     * @param node the Node where event has been triggered
     * @param event the event fired
     */
    onEvent?: ((node: EditableNode, event: Event) => void) | undefined;
    /**
     * Callback method, triggered when the editor comes into focus
     */
    onFocus?: (event: Event) => void | undefined;
    /**
     * Callback method, triggered when the editor goes out of focus
     */
    onBlur?: (event: Event) => void | undefined;
    /**
     * When true, values containing a color name or color code will have a color picker rendered on their left side.
     * @default true
     */
    colorPicker?: boolean | undefined;
    /**
     * Callback function triggered when the user clicks a color. Can be used to implement a custom color picker.
     * @param parent An HTML element where the color picker can be attached. JSONEditor comes with a built-in color picker,
     * powered by {@link https://github.com/Sphinxxxx/vanilla-picker|vanilla-picker}.
     * @param color The current color.
     * @param onChange A callback which has to be invoked with the new color selected in the color picker.
     */
    onColorPicker?: ((parent: HTMLElement, color: string, onChange: (color: Color) => void) => void) | undefined;
    /**
     * By default (true), a tag with the date/time of a timestamp is displayed right from values containing a timestamp.
     * By default, a value is considered a timestamp when it is an integer number with a value larger than Jan 1th 2000, 946684800000.
     * When timestampTag a is a function, a timestamp tag will be displayed when this function returns true, and no timestamp is displayed when the function returns false.
     * When the function returns a non-boolean value like null or undefined, JSONEditor will fallback on the built-in rules to determine whether or not to show a timestamp.
     * Whether a value is a timestamp can be determined implicitly based on the value, or explicitly based on field or path.
     * You can for example test whether a field name contains a string like: 'date' or 'time'.
     * Only applicable for modes `tree`, `form`, and `view`.
     * @default true
     * @example ({ field, value, path }) => field === 'dateCreated'
     */
    timestampTag?: boolean | ((node: TimestampNode) => boolean) | undefined;
    /**
     * Customizing the way formating the timestamp. Called when a value is timestamp after timestampTag. If it returns null, the timestamp would be formatted with default setting.
     * Only applicable for modes `tree`, `form`, and `view`.
     * @default value => new Date(value).toISOString()
     */
    timestampFormat?: ((node: TimestampNode) => string | null) | undefined;
    /**
     * The default language comes from the browser navigator, but you can force a specific language. So use here string as 'en' or 'pt-BR'.
     * Built-in languages: 'en', 'pt-BR', 'zh-CN', 'tr', 'ja', 'fr-FR'. Other translations can be specified via the option `languages`.
     */
    language?: string | undefined;
    /**
     * You can override existing translations or provide a new translation for a specific language. To do it provide an object at languages with language and the keys/values to be inserted.
     * All available fields for translation can be found in the source file `src/js/i18n.js`.
     * @example { 'pt-BR': { 'auto': 'Automático testing' }, 'en': { 'auto': 'Auto testing' } }
     */
    languages?: Record<string, Partial<Record<TranslationKey, string>>> | undefined;
    /**
     * The container element where modals (like for sorting and filtering) are attached:
     * an overlay will be created on top of this container, and the modal will be created in the center of this container.
     */
    modalAnchor?: HTMLElement | undefined;
    /**
     * The container element where popups (for example drop down menus, for JSON Schema error tooltips, and color pickers) will be absolutely positioned.
     * By default, this is the root `div` element of the editor itself. When the JSONEditor is inside a `div` element which hides overflowing contents (CSS overflow: auto or overflow: hidden),
     * tooltips will be visible only partly.
     * In this case, a popupAnchor outside of the element without hidden overflow will allow the tooltips to be visible when overflowing the `div` element of the JSONEditor.
     */
    popupAnchor?: HTMLElement | undefined;
    /**
     * Enable sorting of arrays and object properties. Only applicable for mode `tree`.
     * @default true
     */
    enableSort?: boolean | undefined;
    /**
     * Enable filtering, sorting, and transforming JSON using a {@link https://jmespath.org/|JMESPath} query. Only applicable for mode `tree`.
     * @default true
     */
    enableTransform?: boolean | undefined;
    /**
     * Number of children allowed for a given node before the 'show more/show all' message appears (in `tree`, `view`, or `form` modes).
     * @default 100
     */
    maxVisibleChilds?: number | undefined;
    /**
     * Create a query string based on query options filled in the Transform Wizard in the Transform modal. Normally used in combination with `executeQuery`.
     * The input for the function are the entered query options and the current JSON, and the output must be a string containing the query.
     * This query will be executed using `executeQuery`. Note that there is a special case '@' for filter.field and sort.field.
     * It means that the field itself is selected, for example when having an array containing numbers.
     */
    createQuery?: ((json: any, queryOptions: QueryOptions) => string) | undefined;
    /**
     * Replace the build-in query language used in the Transform modal with a custom language. Normally used in combination with `createQuery`.
     * The input for the function is the current JSON and a query string, and output must be the transformed JSON.
     */
    executeQuery?: ((json: any, query: string) => any) | undefined;
    /**
     * A text description displayed on top of the Transform modal. Can be used to explain a custom query language implemented via `createQuery` and `executeQuery`.
     * The text can contain HTML code like a link to a web page.
     */
    queryDescription?: string | undefined;
```
##### 更多配置请参考https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
##### thanks for your use 🥹!