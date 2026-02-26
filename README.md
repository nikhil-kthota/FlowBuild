# FlowBuild

A highly unique Chatbot Flow Builder developed with React and `@xyflow/react` (React Flow). This application allows users to build dynamic messaging flows with a customized UI.

## Features
- **Modern Unique UI**: Utilizes an aesthetic 'Lime and Yellow' dark/light palette instead of typical boilerplate UI blocks.
- **Drag & Drop Logic**: Seamlessly pull new `Message` nodes directly from the node panel.
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
