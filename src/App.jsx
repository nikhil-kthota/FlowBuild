import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import MessageNode from './components/MessageNode';
import FloatingUI from './components/FloatingUI';
import CustomEdge from './components/CustomEdge';

const nodeTypes = {
  message: MessageNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [
  {
    id: '1',
    type: 'message',
    data: { text: 'test message 1' },
    position: { x: 250, y: 250 },
  },
];

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}

function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const onNodeDoubleClick = useCallback(
    (event, node) => {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
      if (selectedNodeId === node.id) setSelectedNodeId(null);
    },
    [setNodes, setEdges, selectedNodeId]
  );

  const onConnect = useCallback(
    (params) => {
      const sourceEdges = edges.filter(e => e.source === params.source);
      if (sourceEdges.length > 0) {
        showToast('Source handle can only have one connecting edge', 'error');
        return;
      }
      setEdges((eds) => addEdge({ ...params, type: 'custom', markerEnd: { type: MarkerType.ArrowClosed } }, eds));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { text: '' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onSelectionChange = ({ nodes }) => {
    if (nodes && nodes.length === 1) {
      setSelectedNodeId(nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  };

  const onPaneClick = () => {
    setSelectedNodeId(null);
  };

  const validateFlow = () => {
    if (nodes.length <= 1) {
      showToast('Saved Successfully', 'success');
      return;
    }

    let emptyTargetHandleCount = 0;

    nodes.forEach(node => {
      const isTarget = edges.some(edge => edge.target === node.id);
      if (!isTarget) {
        emptyTargetHandleCount++;
      }
    });

    if (emptyTargetHandleCount > 1) {
      showToast('Cannot save flow: More than one node has empty target handles', 'error');
    } else {
      showToast('Saved Successfully', 'success');
    }
  };

  return (
    <div className="app-container">
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <button className="theme-toggle-btn-top" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <main className="main-content">
        <div className="app-title-bar" style={{ padding: '1rem 2rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
          FlowBuild
        </div>
        <div className="hero-section" style={{ paddingTop: '1rem' }}>
          <h1>THE TEAM THAT BUILDS TOMORROW</h1>
          <p>
            Drag and drop nodes on the right to build your chatbot logic. <br />
            <span style={{ color: '#ff4444' }}>Double click a node to delete it. Select an edge and press Backspace to delete it.</span>
          </p>
        </div>

        <div className="builder-layout">
          <div className="panel-area">
            {selectedNode ? (
              <FloatingUI
                theme={theme}
                toggleTheme={toggleTheme}
                onSave={validateFlow}
                selectedNode={selectedNode}
                setNodes={setNodes}
                setSelectedNodeId={setSelectedNodeId}
                isSettings={true}
              />
            ) : (
              <FloatingUI
                theme={theme}
                toggleTheme={toggleTheme}
                onSave={validateFlow}
                isNodePanel={true}
              />
            )}

            <button className="save-btn" onClick={validateFlow}>
              <span>SAVE</span>
              <span>CHANGES</span>
            </button>
          </div>

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
              onSelectionChange={onSelectionChange}
              onNodeDoubleClick={onNodeDoubleClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              defaultEdgeOptions={{ type: 'custom' }}
              fitView
            >
              <Background gap={16} size={1} />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </main>
    </div>
  );
}
