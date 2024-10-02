# AI-Enabled React CodePen Clone

This project is an innovative, next-gen development prototyping platform built with React 18 and styled with Tailwind CSS. It allows users to write and preview HTML, CSS, and JavaScript code in real-time, with advanced AI-assisted coding features powered by Claude, an advanced language model.

## Features

- User authentication (login/register)
- Welcome page for new users
- "My Pens" view to manage and create new pens
- Real-time HTML, CSS, and JavaScript editing
- Live preview of the code
- AI-assisted coding with Claude
- Chat interface for interacting with the AI
- Intelligent code suggestions and explanations
- AI-Powered Code Completion
- Advanced AI Code Analysis
- Performance Scoring
- User authentication and authorization
- Subscription-based service with multiple tiers
- Token usage tracking for billing purposes
- Admin dashboard for monitoring platform statistics
- User onboarding tutorial
- Version control system
- Collaborative coding
- Customizable themes (light/dark mode)
- Adjustable layout (horizontal/vertical)
- Performance optimization
- Accessibility improvements
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-react-codepen-clone.git
   ```

2. Navigate to the project directory:
   ```
   cd ai-react-codepen-clone
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:
   ```
   WDS_SOCKET_PORT=0
   ```

5. Set up your Stripe account and add your publishable key to `src/services/SubscriptionService.js`.

### Running the Application

In the project directory, run:

```
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Start at the welcome page and either register or login.
2. You'll be taken to the "My Pens" page where you can view your existing pens or create a new one.
3. Click on a pen or create a new one to enter the editor.
4. Use the editor to write and preview your HTML, CSS, and JavaScript code.
5. Interact with the AI assistant using the chat interface for coding help and suggestions.
6. Use the "Back to My Pens" button to return to your list of pens.
7. Logout when you're done.

## Development

This project uses Tailwind CSS for styling. The main configuration file for Tailwind is `tailwind.config.js` in the root directory. To add or modify styles, you can:

1. Use Tailwind utility classes directly in your JSX.
2. Add custom styles in the `src/index.css` file.
3. Extend the Tailwind configuration in `tailwind.config.js` if needed.

## Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
