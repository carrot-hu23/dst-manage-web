
import React from "react";

import Editor from '../Editor';

const HomeMod = (props) => {
    function setValue(value) {
        props.mod.setFieldsValue({
            modoverrides: value,
        });
    }

    return (
        <>
            <Editor
                value={props.mod.getFieldValue().modoverrides}
                // eslint-disable-next-line react/jsx-no-bind
                setValue={setValue}
                styleData={{
                    height: '348px'
                }}
            />
        </>
    );
}
export default HomeMod;