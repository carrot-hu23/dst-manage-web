import {Button, Input, Modal, Space} from "antd";
import {useState} from "react";

export default ({title, isModalOpen, setIsModalOpen, add}) => {

    const [inputValue, setInputValue] = useState('');

    return (<>
        <Modal title={title}
               open={isModalOpen}
               onOk={() => {
                   add(inputValue)
                   setIsModalOpen(false)
                   setInputValue("")
               }}
               onCancel={() => setIsModalOpen(false)}>
            <br/>
            <Input
                placeholder="Input a ku_id"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}/>
            <br/>
        </Modal>

        <div>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>{title}</Button>
            <br/>
            <br/>
        </div>
    </>)
}