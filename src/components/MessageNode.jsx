import { Handle, Position } from '@xyflow/react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';

export default function MessageNode({ data, selected }) {
  return (
    <div className={`custom-node ${selected ? 'custom-node-selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="node-header">
        <div className="node-header-left">
          <BiMessageRoundedDots className="node-icon" />
          <span>Send Message</span>
        </div>
        <div className="whatsapp-icon">
          <FaWhatsapp />
        </div>
      </div>
      <div className="node-content">
        {data.text || 'text message'}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
