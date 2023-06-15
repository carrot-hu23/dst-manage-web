import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Button, message, Space} from "antd";

import {rollbackApi} from "../../api/gameApi";


export default ()=> {

    const { t } = useTranslation()

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
                <Button onClick={() => { rollback(1) }} >{t('rollback1')}</Button>
                <Button onClick={() => { rollback(2) }} >{t('rollback2')}</Button>
                <Button onClick={() => { rollback(3) }} >{t('rollback3')}</Button>
                <Button onClick={() => { rollback(4) }} >{t('rollback4')}</Button>
                <Button onClick={() => { rollback(5) }} >{t('rollback5')}</Button>
                <Button onClick={() => { rollback(6) }} >{t('rollback6')}</Button>
            </Space>
        </>
    )
}