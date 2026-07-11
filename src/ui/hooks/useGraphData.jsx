import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';

export function useGraphData() {
  const nodes = useLiveQuery(() => db.nodes.toArray()) || [];
  const edges = useLiveQuery(() => db.edges.toArray()) || [];

  // Intelligent Layout Calculation (Force-directed Lite)
  const rfNodes = nodes.map((node, index) => {
    // Determine position based on URL path depth and index
    const depth = new URL(node.url).pathname.split('/').filter(Boolean).length;
    
    return {
      id: node.url,
      type: 'default',
      data: { 
        label: (
          <div className="flex flex-col items-center">
            {node.favIconUrl && <img src={node.favIconUrl} className="w-4 h-4 mb-1" />}
            <span className="text-center line-clamp-2">{node.title || 'Untitled'}</span>
          </div>
        )
      },
      // Staggered layout to avoid overlap
      position: { 
        x: (depth * 250) + (Math.sin(index) * 50), 
        y: (index * 120) % 800 
      },
      style: {
        background: node.status === 'active' ? '#1e293b' : '#0f172a',
        color: node.status === 'active' ? '#f8fafc' : '#64748b',
        border: node.status === 'active' ? '2px solid #38bdf8' : '1px solid #334155',
        boxShadow: node.status === 'active' ? '0 0 15px rgba(56, 189, 248, 0.3)' : 'none',
        width: 180,
        borderRadius: '12px',
        padding: '12px'
      }
    };
  });

  const rfEdges = edges.map((edge) => ({
    id: `e-${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    animated: true,
    style: { stroke: '#38bdf8', strokeWidth: 2 },
    label: edge.weight > 1 ? `x${edge.weight}` : '',
    labelStyle: { fill: '#38bdf8', fontSize: 10, fontWeight: 700 }
  }));

  return { nodes: rfNodes, edges: rfEdges };
}
