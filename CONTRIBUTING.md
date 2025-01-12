# Contributing to Sprint App VSCode Extension

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch for your feature or bugfix

## Development Setup

### Prerequisites
- Node.js 18.x
- npm 9.x
- VSCode 1.74.0+

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/sprint-app.git

# Navigate to the project directory
cd sprint-app

# Install dependencies
npm install

# Install webview dependencies
cd webview-ui
npm install
```

## Running the Extension

### Development Mode
```bash
# Watch and compile both extension and webview
npm run watch

# Watch only extension code
npm run watch:extension

# Watch only webview code
npm run watch:webview
```

## Testing

### Run Tests
```bash
# Run extension tests
npm test

# Run webview tests
cd webview-ui
npm test
```

## Submitting Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests to ensure everything works
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Create a Pull Request

## Code Style

- Follow the existing code style
- Use ESLint to check your code
- Write tests for new features
- Keep PRs focused and concise

## Reporting Bugs

- Use GitHub Issues
- Provide a clear and descriptive title
- Include steps to reproduce the issue
- Mention your environment (OS, VSCode version, etc.)

## Questions?

Feel free to open an issue or reach out to the maintainers.

Thank you for contributing!
