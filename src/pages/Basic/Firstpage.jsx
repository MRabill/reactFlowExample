import { Button, Space } from 'antd';
import { fetchData } from '../../../utils/apiFunctions';
import url from '../../../utils/url';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import COLORS from '../../assets/color';
import { Col, Row } from 'antd';
import '../styles/Firstpage.css';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

function FirstPage() {
  const navigate = useNavigate();

  const {
    isLoading: userLoading,
    data: user = [],
    isSuccess: userFetched,
  } = useQuery(
    ['User'],
    () => fetchData({ url: url.BASIC }),
    { refetchOnWindowFocus: false },
    {
      onError: (e) => {
        return (
          <Alert severity="error">This is an error alert — check it out!</Alert>
        );
      },
    }
  );

  console.log(user);

  return (
    <div>
      {/* <img src="https://www.sdworx.com/_next/static/media/sdworx_logo.18890061.svg" alt="Logo" width="150"></img>
      <img src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 124.5 113.5' xml:space='preserve'%3E%3Cpath d='M56.1.2l-6.5 81.4 12.1-.2 7-81.4-12.6.2z' fill='%23e4003a'/%3E%3Cpath d='M9.6 69.7L0 76l28 32.8 9.8-6.4L9.6 69.7z' opacity='.6' fill='%23e4003a'/%3E%3Cpath d='M112.7 49.8l-46.4 58.4 11.1 5.3 47-58.1-11.7-5.6z' opacity='.8' fill='%23e4003a'/%3E%3C/svg%3E" alt="Logo" width="150" ></img>
      <p style={{color: `${COLORS.success}`}}>sfgsdfg</p>
    <Button style={{background: `${COLORS.success}`}}  type="primary" onClick={() =>  navigate("/second")}>Primary Button</Button>
    <Button onClick={() =>  navigate(`/third/test`)} >Default Button</Button> */}

      <div>
        {userFetched
          ? user.payload.map((item, index) => (
              <p key={index}>{item.FirstName}</p>
            ))
          : null}
      </div>
      <Row>
        <Col span={24}>
          <div
            style={{
              width: '100%',
              height: '70px',
              background: `${COLORS.background}`,
              boxShadow: '0px 8px 25px rgba(208, 210, 218, 0.5)',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
            }}
          >
            <Space size={50}>
              <img
                src="https://www.sdworx.com/_next/static/media/sdworx_logo.18890061.svg"
                alt="Logo"
                width="150px"
              ></img>
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
              >
                <Title
                  level={4}
                  onClick={(e) => e.preventDefault()}
                  style={{ margin: 0 }}
                >
                  h4. Ant Design
                </Title>
                {/* <a onClick={(e) => e.preventDefault()} style={{color: COLORS.black}}>
                  <Space>Home</Space>
                </a> */}
              </Dropdown>
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>Poppins</Space>
                </a>
              </Dropdown>
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>Test</Space>
                </a>
              </Dropdown>
            </Space>
          </div>
        </Col>
      </Row>
      <Title>h1. Ant Design</Title>
      <Title level={2}>h2. Ant Design</Title>
      <Title level={3}>h3. Ant Design</Title>
      <Title level={4}>h4. Ant Design</Title>
      <Title level={5}>h5. Ant Design</Title>
    </div>
  );
}

export default FirstPage;
