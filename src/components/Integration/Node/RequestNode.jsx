import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Typography, Input, Select, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const RequestNode = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const key = getRandomInt(9999);

  return (
    <div className="text-updater-node">
      <div>
        <div
          style={{
            background: '#D9D9D9',
            width: '100%',
            height: '25px',
            borderRadius: '5px 5px 0px 0px',
            paddingLeft: '5px',
          }}
        >
          <Text style={{ color: '#002855' }}>
            <b>Request Node</b>
          </Text>
          {/* <Text style={{ color: '#002855' }}>{data.label}</Text> */}
        </div>
        <div style={{ width: '100%', height: '100%', padding: '10px' }}>
          {/* <label for="cars">Type</label> */}
          <Text style={{ color: '#002855' }}>Type</Text>
          <select
            name="cars"
            id="cars"
            style={{
              width: '100%',
              height: '30px',
              border: '1px solid #D9D9D9',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          >
            <option value="volvo">JSON</option>
            <option value="saab">RAW</option>
            <option value="mercedes">XML</option>
            <option value="audi">CSV</option>
          </select>
          <Text style={{ color: '#002855' }}>Body</Text>
          <Input
            key={key + 1}
            // onChange={onChange}
            style={{ width: '100%' }}
            onChange={data.onChange}
            placeholder="Body"
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        style={{
          width: '15px',
          height: '15px',
          background: '#007EA7',
          bottom: '-7px',
        }}
      />
    </div>
  );
};

export default RequestNode;
