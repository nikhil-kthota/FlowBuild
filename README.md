# FlowBuild

A highly unique Chatbot Flow Builder developed with React and `@xyflow/react` (React Flow). This application allows users to build dynamic messaging flows with a customized UI.

## Overview & Architecture
This project was built to address the core objective: **building a simple Chatbot flow builder that connects multiple messages together to decide the order of execution.**

To ensure the codebase is highly **extensible** to easily add new features in the future, the architecture was explicitly split:
- **Modular Custom Nodes**: `MessageNode` is a detached, custom registered ReactFlow component. Adding new node types (like 'Condition', 'Input', or 'Delay' nodes) is as simple as creating a new component and registering it in the `nodeTypes` object in `App.jsx`.
- **Reusable Panel System**: The side UI is detached from the canvas logic. `SettingsPanel` takes a generic selected node object, meaning it can easily be expanded to render different input types (dropdowns, checkboxes) based on whatever `node.type` is currently selected.
- **Custom Edge Logic**: Execution order heavily depends on restricted edge targets. The `onConnect` verification explicitly restricts source handles to a single edge, laying robust groundwork for an engine that would parse this diagram into an execution tree later.

## Features
- **Frontend**: Heavy focus on frontend architecture, smooth UI/UX interactions, and highly customized component logic to create a premium experience.
- **Modern Unique UI**: Utilizes an aesthetic Lime  and dark/light palette instead of typical boilerplate UI blocks.
- **Drag & Drop Logic**: Seamlessly pull new `Message` nodes directly from the node panel using HTML5 APIs.
- **Node Configuration**: Select any node to update its message contents on the fly.
- **Edge Control**: Custom logic ensures only one outgoing message per node. Select any edge and delete it easily via an inline button.
- **Validation Mechanics**: Instantly validates logic on "Save", reporting back using stylish Toasts if multiple nodes exist with blank targets.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   
Open your localhost url in your browser.

## Built With
- React (via Vite)
- JavaScript
- `@xyflow/react`
- Vanilla CSS Variables
- react-icons
