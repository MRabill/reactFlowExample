import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Typography, Input, Select, Dropdown, Space, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Text } = Typography;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const RequestNode = ({ data, isConnectable }) => {
  useEffect(() => {
    data.addParametersElement('input', 'type', 'JSON');
    data.addParametersElement('input', 'body', '');
  }, []);

  const key = getRandomInt(9999);

  const typeChange = (event) => {
    data.addParametersElement('input', 'type', event.target.value);
  };

  const bodyChange = (event) => {
    data.addParametersElement('input', 'body', event.target.value);
  };

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
            onChange={typeChange}
          >
            <option value="JSON">JSON</option>
            <option value="RAW">RAW</option>
            <option value="XML">XML</option>
            <option value="CSV">CSV</option>
          </select>
          <Text style={{ color: '#002855' }}>Body</Text>
          <Form name="basic" autoComplete="off">
            <Form.Item name="body">
              <Input
                key={key + 1}
                onChange={bodyChange}
                style={{ width: '100%' }}
                placeholder="Body"
              />
            </Form.Item>
          </Form>
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
