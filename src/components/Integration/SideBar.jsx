import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu, Typography, Row, Col, Divider } from 'antd';
import { MdAnalytics } from 'react-icons/md';

const { Text, Link } = Typography;

const inputNodes = [
  {
    title: 'Input Node 1',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
  },
  {
    title: 'Input Node 2',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
  },
];

const integrationNodes = [
  {
    title: 'Integration Node 1',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
  },
  {
    title: 'Integration Node 2',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
  },
];

const outputNodes = [
  {
    title: 'Output Node 1',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
  },
  {
    title: 'Output Node 2',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
  },
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const SideBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <aside>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '20px',
        }}
      >
        <Text strong style={{ marginLeft: '15px' }}>
          Process Toolbar
        </Text>
        <Text style={{ marginLeft: '15px' }}>
          Drag and Drop a process to create a new workflow
        </Text>
      </div>

      {/* <Divider orientation="left">Node list</Divider> */}

      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: '100%',
          //   paddingTop: '10px',
        }}
        items={[
          {
            label: 'Input Node',
            key: 'input-node',
            children: inputNodes.map((node, index) => ({
              label: (
                <div
                  key={index + 1}
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, 'RequestNode')}
                  draggable
                >
                  {node.icon}
                  {node.title}
                </div>
              ),
              key: index + 1,
            })),
          },
          {
            label: 'Integration Node',
            key: 'integration-node',
            children: integrationNodes.map((node, index) => ({
              label: (
                <div
                  key={index + 10}
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, 'KYCIntegration')}
                  draggable
                >
                  {node.icon}
                  {node.title}
                </div>
              ),
              key: index + 10,
            })),
          },
          {
            label: 'Output Node',
            key: 'output-node',
            children: outputNodes.map((node, index) => ({
              label: (
                <div
                  key={index + 20}
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, 'ActionNode')}
                  draggable
                >
                  {node.icon}
                  {node.title}
                </div>
              ),
              key: index + 20,
            })),
          },
        ]}
      />
    </aside>
  );
};

export default SideBar;
