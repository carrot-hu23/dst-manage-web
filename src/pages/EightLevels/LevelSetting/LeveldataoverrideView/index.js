import {useRef, useState} from "react";

import {Switch} from "antd";

import ConfigEditor from "./ConfigEditor";
import ConfigViewEditor from "./ConfigViewEditor";


export default ({leveldataoverride, dstWorldSetting, changeValue}) => {

    const ref = useRef(leveldataoverride)
    const [view, setView] = useState(true)
    function updateValue(newValue) {
        changeValue(newValue)
        ref.current = newValue
        // console.log(newValue)
    }
    return (
        <>
            <Switch
                checkedChildren={"可视化"} unCheckedChildren={"编辑"}
                onClick={(checked, event) => setView(checked)}
                checked={view}
                defaultChecked={view}/>
            <br/><br/>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            {view && <ConfigEditor valueRef={ref} changeValue={updateValue} />}
            {/* eslint-disable-next-line react/jsx-no-bind */}
            {!view && <ConfigViewEditor changeValue={updateValue} valueRef={ref}  dstWorldSetting={dstWorldSetting} />}
        </>
    )

}