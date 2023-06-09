import {useParams} from "react-router-dom";
import {Button, message, Space} from "antd";
import {rollbackApi} from "../../api/gameApi";

export default ()=> {
    const {cluster} = useParams()

    function rollback(dayNums) {
        rollbackApi(cluster,dayNums)
            .then(() => {
                message.success(`回档${dayNums}天成功`)
            }).catch(() => { message.error(`回档${dayNums}天失败`) })
    }
    
    return(
        <>
            <Space size={'small'} wrap>
                <Button onClick={() => { rollback(1) }} >回档一天</Button>
                <Button onClick={() => { rollback(2) }} >回档两天</Button>
                <Button onClick={() => { rollback(3) }} >回档三天</Button>
                <Button onClick={() => { rollback(4) }} >回档四天</Button>
                <Button onClick={() => { rollback(5) }} >回档五天</Button>
                <Button onClick={() => { rollback(6) }} >回档六天</Button>
            </Space>
        </>
    )
}