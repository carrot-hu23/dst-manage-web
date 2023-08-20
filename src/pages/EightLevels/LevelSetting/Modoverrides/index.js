import Editor from "../../../Home/Editor";

export default ({levelForm})=>{
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
                }}
            />
        </>
    )
}