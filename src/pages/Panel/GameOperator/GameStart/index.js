import {useTranslation} from "react-i18next";
import {Space, Switch} from "antd";

export default ({levelName, title})=>{
    
    const {t} = useTranslation()
    
    return(
        <>
            <Space size={8} >
                <span>{title}</span>
                <Switch
                    checkedChildren={t('start')} unCheckedChildren={t('stop')}
                    onClick={(checked, event) => {

                    }}
                    // checked
                    // defaultChecked
                />
            </Space>
        </>
    )
}