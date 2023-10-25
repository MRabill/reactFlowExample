import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Typography, Input, Select, Space, InputNumber } from 'antd';

const { Text } = Typography;
const options = [
  { label: 'identity', value: 'Identity' },
  { label: 'risk', value: 'Risk' },
  { label: 'transaction', value: 'Transaction' },
  { label: 'dept', value: 'Dept' },
];
// for (let i = 10; i < 36; i++) {
//   options.push({
//     label: i.toString(36) + i,
//     value: i.toString(36) + i,
//   });
// }
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const KYCIntegration = ({ data, isConnectable }) => {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  useEffect(() => {
    data.addIntegrationElement('KYCIntegration', 'criteria', []);
  }, []);

  const key = getRandomInt(9999);

  const criteriaChange = (criteria) => {
    data.addIntegrationElement('KYCIntegration', 'criteria', criteria);
    // console.log(event);
  };

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        isConnectable={isConnectable}
        style={{
          width: '15px',
          height: '15px',
          background: '#007EA7',
          bottom: '-7px',
        }}
      />
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
            <b>KYC Scoring</b>
          </Text>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '10px',
            maxWidth: '300px',
          }}
        >
          <Text style={{ color: '#002855' }}>Criteria</Text>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
              maxWidth: '300px',
              marginBottom: '10px',
            }}
            placeholder="Search criteria"
            // defaultValue={['a10', 'c12']}
            onChange={criteriaChange}
            options={options}
          />
          <Text style={{ color: '#002855' }}>Models</Text>
          <select
            name="model"
            id="models"
            style={{
              width: '100%',
              height: '30px',
              border: '1px solid #D9D9D9',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          >
            <option value="volvo">RiskX</option>
            <option value="saab">AMLGuard</option>
            <option value="mercedes">TransactIQ</option>
            <option value="audi">VerifAI</option>
          </select>
          <Text style={{ color: '#002855' }}>Low</Text>
          <InputNumber
            style={{
              width: '100%',
              // marginLeft: '10px',
            }}
            defaultValue="0.2"
            min="0"
            max="1"
            step="0.1"
            // onChange={onChange}
            // stringMode
          />
          <Text style={{ color: '#002855' }}>Medium</Text>
          <InputNumber
            style={{
              width: '100%',
              // marginLeft: '10px',
            }}
            defaultValue="0.5"
            min="0"
            max="1"
            step="0.1"
            // onChange={onChange}
            // stringMode
          />
          <Text style={{ color: '#002855' }}>High</Text>
          <InputNumber
            style={{
              width: '100%',
              // marginLeft: '10px',
            }}
            defaultValue="0.8"
            min="0"
            max="1"
            step="0.1"
            // onChange={onChange}
            // stringMode
          />
          {/* <Input
            key={key + 1}
            onChange={onChange}
            style={{ width: '100%' }}
            placeholder="Name of Integration"
          /> */}
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

export default KYCIntegration;
