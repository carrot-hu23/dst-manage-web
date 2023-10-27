import react, {useEffect, useImperativeHandle} from 'react'
import * as monaco from 'monaco-editor'


export const MonacoEditor = react.forwardRef((props, ref) => {
    const editorRef = react.useRef()
    const monacoRef = react.useRef()

    useImperativeHandle(ref, () => (
        monacoRef
    ))

    useEffect(() => {
        if (editorRef.current) {
            // 向window环境注入monaco编辑器需要的work方法
            // @ts-ignore
            // window.MonacoEnvironment = {
            //     getWorkerUrl: function () {
            //         return "data:text/javascript;charset=utf-8,".concat(encodeURIComponent("\n                      self.MonacoEnvironment = {\n                        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min//'\n                      };\n                      importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/base/worker/workerMain.js');"));
            //     }
            // };
            monacoRef.current = monaco.editor.create(editorRef.current, {
                language: 'lua',
                folding: true,
                theme: 'vs',
                automaticLayout: true,
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8
                },
                minimap: {
                    enabled: true
                },
                formatOnPaste: true,
                renderValidationDecorations: 'on',
                readOnly: false,
                ...props.options
            });
        }
    }, [editorRef])
    return <>
        <div ref={editorRef} style={props.style}/>
        <span style={{
            marginLeft: '12px',
            color: 'red'
        }}/>
    </>;
})
