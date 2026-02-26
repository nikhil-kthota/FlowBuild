import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

export default function SettingsPanel({ selectedNode, setNodes, onBack }) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (selectedNode) {
            setText(selectedNode.data.text || '');
        }
    }, [selectedNode]);

    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    return { ...node, data: { ...node.data, text: value } };
                }
                return node;
            })
        );
    };

    return (
        <div className="settings-panel">
            <header>
                <button className="back-btn" onClick={onBack}>
                    <BiArrowBack />
                </button>
                <span>Message</span>
            </header>
            <div className="settings-content">
                <label className="field-label">Text</label>
                <textarea
                    value={text}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
