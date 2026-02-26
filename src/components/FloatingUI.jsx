import NodePanel from './NodePanel';
import SettingsPanel from './SettingsPanel';

export default function FloatingUI({
    selectedNode,
    setNodes,
    setSelectedNodeId,
    isSettings,
    isNodePanel
}) {
    return (
        <div className="panel-card">
            {isSettings && selectedNode && (
                <SettingsPanel
                    selectedNode={selectedNode}
                    setNodes={setNodes}
                    onBack={() => setSelectedNodeId(null)}
                />
            )}
            {isNodePanel && (
                <NodePanel />
            )}
        </div>
    );
}
