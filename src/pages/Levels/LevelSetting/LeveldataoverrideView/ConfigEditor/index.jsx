
import {useTheme} from "../../../../../hooks/useTheme";
import Editor from "../../../../../components2/Editor";

export default ({valueRef, changeValue}) => {
    const {theme} = useTheme();
    function onchange(value) {
        // valueRef.current = value
        changeValue(value)
    }

    return (
        <>
            <Editor
                // value={getValue(levelForm)}
                value={valueRef.current}
                // eslint-disable-next-line react/jsx-no-bind
                setValue={onchange}
                styleData={{
                    height: '370px',
                    language: 'lua',
                    theme: theme === 'dark'?'vs-dark':''
                }}
            />
        </>
    )
}