/* eslint-disable react/jsx-boolean-value */
import { Tabs} from 'antd';
import ServerIni from '../ServerIni';
import Editor from '../Editor';

const Level = (props) => {

    function setValue(value) {
        props.form.setFieldsValue({
            leveldataoverride: value,
        });
    }

    return (
        <>
            <Editor
                value={props.form.getFieldValue().leveldataoverride}
                // eslint-disable-next-line react/jsx-no-bind
                setValue={setValue}
                styleData={{
                    height: '348px'
                }}
            />
        </>
    )
}
// eslint-disable-next-line react/prop-types
const HomeMaster = ({ master }) => {

    const items = [
        {
            key: '1',
            label: `世界配置`,
            children: <Level form={master} />,
        },
        {
            key: '2',
            label: `其他配值`,
            children: <ServerIni form={master} isMaster={true} />,
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )
}

export default HomeMaster;
