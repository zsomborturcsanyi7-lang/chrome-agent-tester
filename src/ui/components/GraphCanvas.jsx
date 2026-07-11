import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useGraphData } from '../hooks/useGraphData';

const GraphCanvas = () => {
  const { nodes, edges } = useGraphData();

  return (
    <div style={{ width: '800px', height: '600px' }} className="bg-slate-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background color="#334155" gap={20} />
        <Controls />
        <MiniMap 
          nodeColor={(n) => n.style?.border.includes('#38bdf8') ? '#38bdf8' : '#1e293b'}
          maskColor="rgba(15, 23, 42, 0.7)"
        />
      </ReactFlow>
    </div>
  );
};

export default GraphCanvas;
