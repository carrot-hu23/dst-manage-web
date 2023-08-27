import Editor from "../../../../Home/Editor";
import {useTheme} from "../../../../../hooks/useTheme";

export default ({valueRef, changeValue}) => {
    const {theme, toggleTheme} = useTheme();
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