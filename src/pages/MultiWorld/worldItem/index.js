import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

// eslint-disable-next-line arrow-body-style
const Item = (props) => {

    return <Card style={{
        margin: ' 0 0 16px',
        background: props.selected ? '#75abe9':'white'
    }}>
        <Row onClick={() => {
            console.log(11111);
            props.onClick(props.index)
            props.setCurrWorld(props.world)
        }}>
            <Col flex="64px">
                <div>
                    {props.world.world_name}
                </div>
            </Col>
        </Row>
    </Card>
}


const WorldItem = ({ worlds, currWorld, setCurrWorld, setIndex }) => {

    const [selectedItem, setSelectedItem] = useState(null);

    function handleItemClick(index) {
        setSelectedItem(index);
    }


    return <>
        {worlds.map((world, index) => <Item
            style={{
                backgroundColor: selectedItem === index ? 'yellow' : 'white' 
            }}
            key={world.world_name}
            selected={selectedItem === index}
            onClick={() => {
                handleItemClick(index)
                setIndex(index)
            }}
            world={world}
            setCurrWorld={setCurrWorld} />)}
    </>
}

export default WorldItem