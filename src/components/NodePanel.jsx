import { BiMessageRoundedDots } from 'react-icons/bi';

export default function NodePanel() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <div
                className="nodes-panel-item"
                onDragStart={(event) => onDragStart(event, 'message')}
                draggable
            >
                <BiMessageRoundedDots className="nodes-panel-icon" />
                <span>Message</span>
            </div>
        </>
    );
}
