import {Card} from "antd";
import {useEffect, useState} from "react";
import {useTheme} from "../../../hooks/useTheme";

export default ({secondaries}) => {

    useEffect(()=>{
    },[])
    const {theme} = useTheme();

    return (
        <>
            <div className="text-base font-medium pb-2">层数: {Object.keys(secondaries).length}</div>
            <div className={'scrollbar'} style={{
                height: 400,
                overflowY: 'auto',
            }}>
                {Object.keys(secondaries).map(key => (
                    <div key={key}>
                        <Card bordered={false} style={
                            theme !== 'dark'? {
                                backgroundColor: '#F0F2F5'
                            }:{}} >
                            <div>
                                <span>世界Id: {secondaries[key].id}</span>
                            </div>
                            <div>
                                <span>世界Ip: {secondaries[key].__addr}:{secondaries[key].port}</span>
                            </div>
                            <div>
                                <span>steam: {secondaries[key].steamid}</span>
                            </div>
                        </Card>
                        <br/>
                    </div>
                ))}
            </div>

        </>
    )
}