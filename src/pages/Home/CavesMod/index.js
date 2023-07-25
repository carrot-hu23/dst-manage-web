
import React from "react";

import Editor from '../Editor';

const CavesMod = (props) => {
    function setValue(value) {
        props.mod.setFieldsValue({
            cavesModoverrides: value,
        });
    }

    return (
        <>
            <Editor
                value={props.mod.getFieldValue().cavesModoverrides}
                // eslint-disable-next-line react/jsx-no-bind
                setValue={setValue}
                styleData={{
                    height: '348px',
                    language: 'lua',
                }}
            />
        </>
    );
}
export default CavesMod;