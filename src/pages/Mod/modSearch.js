import { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Pagination } from 'antd';
import { searchMod } from '../../api/modApi';

const { Search } = Input;
// const { Meta } = Card;

const ModCard = ({modInfo}) => (
  <Card
    hoverable
    style={{
      width: 150,
      padding: '8px',
    }}
    cover={
      <img
        alt="example"
        src="https://steamuserimages-a.akamaihd.net/ugc/879754964162469530/9FED5DDBE3EB31E6115EFDC9D96AAF6B2693A577/"
      />
    }
  >
    <br />
    {/* <Meta title="防卡两招" description="www.instagram.com" /> */}
    <span>防卡两招</span>
    <span>作者：发发</span>
  </Card>
);

const ModSearch = () => {

  const [modList, setModList] = useState([])

  const onSearch = (text) => {
    searchMod(text).then(data=>{
        console.log(data);
    }).catch(error=>{console.log(error);})
  };

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <br />
      <br />
      <Row>
        {modList.map(modinfo=>(<Col key={modinfo.id} xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard modInfo={modinfo} />
          <br />
        </Col>))}
        {/* <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
          <br />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <ModCard />
        </Col> */}
      </Row>

      <br /><br />

      <Pagination  onShowSizeChange={onShowSizeChange} defaultCurrent={1} total={500} />
    </>
  );
};

export default ModSearch;
