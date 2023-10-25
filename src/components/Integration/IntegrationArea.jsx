import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

import {
  Button,
  Input,
  Row,
  notification,
  Space,
  message,
  Typography,
} from 'antd';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
const { Text, Link } = Typography;
import { v4 as uuidv4 } from 'uuid';
import { fetchData, postData } from '../../../utils/apiFunctions';
import Sidebar from './SideBar';
import RequestNode from './Node/RequestNode';
import KYCIntegration from './Node/KYCIntegration';
import ActionNode from './Node/ActionNode';

import 'reactflow/dist/style.css';
import '../../styles/Integration/IntegrationArea.css';
import '../../styles/Integration/Node.css';
import url from '../../../utils/url';

const initialNodes = [
  //   {
  //     id: 'dndnode_1',
  //     type: 'InputNode',
  //     position: { x: 0, y: 0 },
  //     data: { value: 123 },
  //   },
];
// we define the nodeTypes outside of the component to prevent re-renderings
const nodeTypes = {
  RequestNode: RequestNode,
  KYCIntegration: KYCIntegration,
  ActionNode: ActionNode,
};

let id = 3;
const getId = () => `dndnode_${id++}`;

function IntegrationArea() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [apiKey, setapiKey] = useState(uuidv4());
  const [loading, setLoading] = useState([]);
  // const [config, setConfig] = useState({});

  let config = { Integration: [] };

  function addConfigElement(key, value) {
    config[key] = value;
    console.log(config);
  }

  function addConfigIntegration(value) {
    config.Integration.push(value);
    console.log(config);
  }

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Integration successful 🎉',
      description: 'Your Integration has been successfully published!',
    });
  };

  const warning = (text) => {
    messageApi.open({
      type: 'warning',
      content: `You can not have more that one ${text}`,
    });
  };

  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: `Error: ${text}`,
    });
  };

  const publishMutation = useMutation(
    (values) =>
      postData({
        url: url.PUBLISH,
        body: values,
      }),
    {
      onSuccess: async (values) => {
        // await queryClient.invalidateQueries('logData');
        openNotificationWithIcon('success');
        setLoading(false);
      },
      onError: async (values) => {
        error('Server Down! Unable to publish');
        setLoading(false);
      },
    }
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, messageApicontextHolder] = message.useMessage();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onChange = (event) => {
    const color = event.target.value;
    console.log('test' + color);
  };

  const publish = () => {
    setLoading(true);
    publishMutation.mutate(config);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // console.log(type);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `xasdad node`, onChange: onChange },
      };

      let inputConfig = {};

      if (type == 'RequestNode') {
        if (config.hasOwnProperty('Input')) {
          warning('input node');
        } else {
          inputConfig = {
            type: 'InputNode',
            name: 'RequestNode',
            body: 'body',
            node: newNode,
          };
          addConfigElement('Input', inputConfig);
          setNodes((nds) => nds.concat(newNode));
        }
      }
      if (type == 'KYCIntegration') {
        inputConfig = {
          type: 'Integration',
          name: 'KYCIntegration',
          body: 'body',
          node: newNode,
        };
        addConfigIntegration(inputConfig);
        setNodes((nds) => nds.concat(newNode));
      }
      if (type == 'ActionNode') {
        if (config.hasOwnProperty('Output')) {
          warning('output node');
        } else {
          inputConfig = {
            type: 'OutputNode',
            name: 'RequestNode',
            body: 'body',
            node: newNode,
          };
          addConfigElement('Output', inputConfig);
          setNodes((nds) => nds.concat(newNode));
        }
      }
    },
    [reactFlowInstance]
  );

  return (
    <div
      className="dndflow"
      style={{ width: '100vw', height: '100vh', background: 'white' }}
    >
      {messageApicontextHolder}
      <ReactFlowProvider>
        <Sidebar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#ccc" variant={'dots'} />
            <Panel style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <Input
                    style={{ width: '300px' }}
                    placeholder="Name of Integration"
                  />
                  <Text
                    style={{ color: '#002855' }}
                    copyable={{
                      tooltips: false,
                      text: `${apiKey}`,
                    }}
                  >
                    <b>API Key: </b>
                    {apiKey}
                  </Text>
                  <Text
                    style={{ color: '#002855' }}
                    copyable={{
                      tooltips: false,
                      text: `https://mrindustries/publish/${apiKey}`,
                    }}
                  >
                    <b>Endpoint: </b>
                    {`https://mrindustries/publish/${apiKey}`}
                  </Text>
                </div>

                <div>
                  <Button
                    style={{
                      background: '#CECECE',
                      color: 'white',
                      marginRight: '20px',
                      width: '150px',
                    }}
                  >
                    Pause
                  </Button>
                  {contextHolder}
                  <Button
                    style={{
                      background: '#007EA7',
                      color: 'white',
                      width: '150px',
                    }}
                    onClick={() => publish()}
                    loading={loading}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </Panel>
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default IntegrationArea;
