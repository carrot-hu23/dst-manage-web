/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-template */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable react/prop-types */

import React, {useState, useRef, useEffect, useImperativeHandle, forwardRef} from "react";
import MonacoEditor from '@uiw/react-monacoeditor';
import luaparse from "luaparse";
import {Beautify} from "lua-format";

const Editor2 = forwardRef( ({monacoRef2}) => {
    const styleData = {}
    const readOnly = false

    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const monacoRef = useRef(null);
    const editorRef = useRef(null);

    useImperativeHandle(monacoRef2, () => ({
        monacoRef: editorRef.current
    }))

    useEffect(() => {
        // if (editorRef.current) {
        //     // 每次数据更新后将最后一行滚动到可视区域
        //     editorRef.current.revealLine(editorRef.current.getModel().getLineCount());
        // }
        console.log("---------------")
        console.log(monacoRef2)
        console.log(styleData)
        console.log(readOnly)
    })

    function check(value) {
        if (styleData.language !== undefined && styleData.language !== "lua") {
            return
        }
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
        check(value)
    }

    function beautifyLua(luaCode) {
        const code = Beautify(luaCode, {
            RenameVariables: true,
            RenameGlobals: false,
            SolveMath: true
        })
        const watermark = `--discord.gg/boronide, code generated using luamin.js™\n\n\n\n\n`
        return code.replace(watermark, "")
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
                const formatCode = beautifyLua(editorRef.current.getValue(), '\x20\x20')
                editorRef.current.setValue(formatCode)
                setCode(formatCode);
            }
        });
        check(editorRef.current.getValue())
    }

    return (
        <>
            <MonacoEditor
                height={styleData.height || 500}
                language={styleData.language || "plaintext"}
                onChange={onChange}
                editorDidMount={handleEditorDidMount}
                // onMount={handleEditorDidMount}
                theme={styleData.theme || 'light'}
                options={{
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    cursorStyle: 'line',
                    automaticLayout: true,
                    // theme: 'vs-dark',
                    readOnly,
                    minimap: styleData.minimap || {
                        enabled: true
                    },
                }}
            />

            <span style={{
                marginLeft: '12px',
                color: 'red'

            }}>{error}</span>
        </>
    );
})
export default Editor2;