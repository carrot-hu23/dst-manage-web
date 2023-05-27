/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-template */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable react/prop-types */

import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import luaparse from "luaparse";

const Editor = ({value, setValue, styleData}) => {

    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const monacoRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        setCode(value)
    }, [])

    function check(value) {
        try {
            luaparse.parse(value);

            monacoRef.current.editor.setModelMarkers(
                editorRef.current.getModel(),
                "owner",
                []
            );
            setError("")
        } catch (err) {
            console.log(err);
            const a = err + "";
            var matches = a.match(/\[(\d+):(\d+)\]/);
            if (matches) {
                var start = parseInt(matches[1], 10);
                var end = parseInt(matches[2], 10);
                setError(`第${start}行配置文件语法出错`)
                monacoRef.current.editor.setModelMarkers(
                    editorRef.current.getModel(),
                    "owner",
                    [
                        {
                            message: "语法错误",
                            severity: monacoRef.current.MarkerSeverity.Error,
                            startLineNumber: start,
                            startColumn: 1,
                            endLineNumber: start,
                            endColumn: end
                        }
                    ]
                );
            }
        }
    }

    function onChange(value) {
        setValue(value)
        setCode(value);
        check(value)
    }

    function handleEditorDidMount(editor, monaco) {
        // here is another way to get monaco instance
        // you can also store it in `useRef` for further usage
        monacoRef.current = monaco;
        editorRef.current = editor;

        // 将命令与右键菜单关联
        editor.addAction({
            id: "formatLuaCode",
            label: "Format Code",
            contextMenuGroupId: "navigation",
            keybindings: [
                // 设置右键菜单快捷键为 Shift+F10
                // eslint-disable-next-line no-bitwise
                monaco.KeyMod.Shift | monaco.KeyCode.F10
            ],
            run() {
                // const formatCode = formatText(editorRef.current.getValue());
                // editorRef.current.setValue(formatCode);
                // setCode(formatCode);
            }
        });
        check(editorRef.current.getValue())
    }

    return (
        <>
            <MonacoEditor
                height={styleData.height}
                language="lua"
                value={code}
                onChange={onChange}
                onMount={handleEditorDidMount}
            />
            <br />
            <span style={{
                marginLeft: '12px',
                color: 'red'
            }} >{error}</span>
        </>
    );
}
export default Editor;