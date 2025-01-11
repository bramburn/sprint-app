# Sprint App VSCode Extension

A powerful VSCode extension with an interactive sidebar and webview UI.

## Features

- Custom sidebar integration
- React-based webview UI
- RxJS message handling
- Vitest for testing

## Project Structure

```
sprint-app/
├── src/                # Extension source code
│   ├── extension.ts    # Main extension entry point
│   └── SidebarProvider.ts  # Sidebar webview provider
├── webview-ui/         # React webview application
│   ├── src/
│   │   ├── App.tsx     # Main React component
│   │   └── main.tsx    # React entry point
│   └── vite.config.ts  # Vite configuration
└── media/              # Extension assets
    └── icon.svg        # Sidebar icon
```

## Development Setup

### Prerequisites
- Node.js 18.x
- npm 9.x
- VSCode 1.74.0+

### Installation

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `cd webview-ui && npm install`

### Running the Extension

- `npm run watch`: Watch and compile both extension and webview
- `npm run watch:extension`: Watch only extension code
- `npm run watch:webview`: Watch only webview code

### Testing

- `npm test`: Run tests for extension
- `cd webview-ui && npm test`: Run tests for webview

## Key Technologies

- TypeScript
- React
- VSCode Webview API
- RxJS
- Vite
- Vitest

## Debugging

1. Open the project in VSCode
2. Go to the Run and Debug view
3. Select "Run Extension" configuration
4. Press F5 to start debugging

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
