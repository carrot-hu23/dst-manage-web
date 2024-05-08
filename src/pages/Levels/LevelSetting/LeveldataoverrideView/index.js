import {useRef, useState} from "react";

import {Segmented, Switch} from "antd";

import ConfigEditor from "./ConfigEditor";
import ConfigViewEditor from "./ConfigViewEditor";


export default ({leveldataoverride, dstWorldSetting, changeValue}) => {

    const ref = useRef(leveldataoverride)
    const [view, setView] = useState("view")
    function updateValue(newValue) {
        changeValue(newValue)
        ref.current = newValue
        // console.log(newValue)
    }
    return (
        <>
            <div>
                <Segmented onChange={v=>setView(v)} options={['editor', 'view']} />
            </div>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            {view === 'view' && <ConfigViewEditor changeValue={updateValue} valueRef={ref}  dstWorldSetting={dstWorldSetting} />}
            {/* eslint-disable-next-line react/jsx-no-bind */}
            {view === 'editor' && <ConfigEditor valueRef={ref} changeValue={updateValue} />}
        </>
    )

}