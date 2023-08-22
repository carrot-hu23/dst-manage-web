import Editor from "../../../../Home/Editor";

export default ({valueRef}) => {

    function onchange(value) {
        valueRef.current = value
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
                }}
            />
        </>
    )
}