import Editor from "../../../Home/Editor";
import {useTheme} from "../../../../hooks/useTheme";

export default ({levelForm})=>{
    const {theme, toggleTheme} = useTheme();
    const value = getValue(levelForm)
    function setValue(value) {
        levelForm.setFieldsValue({
            modoverrides: value,
        });
    }
    function getValue(levelForm) {
        const value = levelForm.getFieldValue().modoverrides
        if (value === undefined || value === null ||value === '') {
            return 'return {}'
        }
        return value
    }
    return(
        <>
            <Editor
                value={value}
                // eslint-disable-next-line react/jsx-no-bind
                setValue={setValue}
                styleData={{
                    height: '370px',
                    language: 'lua',
                    theme: theme === 'dark'?'vs-dark':''
                }}
            />
        </>
    )
}