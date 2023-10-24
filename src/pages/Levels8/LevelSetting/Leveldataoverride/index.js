import {useEffect} from "react";
import Forest from "../LeveldataoverrideView";


export default ({levelForm, dstWorldSetting}) => {

    function setValue(value) {
        levelForm.setFieldsValue({
            leveldataoverride: value,
        });
    }

    function getValue(levelForm) {
        const value = levelForm.getFieldValue().leveldataoverride
        if (value === undefined || value === null || value === '') {
            return 'return {}'
        }
        return value
    }

    useEffect(() => {
    }, [])
    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Forest changeValue={setValue} leveldataoverride={getValue(levelForm)} dstWorldSetting={dstWorldSetting} />
        </>
    )
}