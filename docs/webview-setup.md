To set up your folder structure for a VS Code extension with backend code in the main directory and a React-based webview UI in a `webview-ui` subfolder, using Vite and Vitest, follow these steps:

---

## **Folder Structure**
Here’s the recommended folder structure for your project:

```
my-vscode-extension/
├── src/                  # Backend (extension) code
│   ├── extension.ts      # Main entry point for VS Code extension
│   ├── commands.ts       # Optional: Commands logic
│   └── utils/            # Optional: Utility functions
├── webview-ui/           # Frontend (React app for webview)
│   ├── src/
│   │   ├── App.tsx       # React root component
│   │   ├── main.tsx      # React entry point
│   │   └── components/   # React components
│   ├── index.html        # HTML template for Vite
│   ├── vite.config.ts    # Vite configuration
│   └── tsconfig.json     # TypeScript configuration for frontend
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration for backend
└── README.md             # Project documentation
```

---

## **Step 1: Initialize the Backend (Extension)**
1. Create a new VS Code extension project:
   ```bash
   yo code
   ```
   Select "TypeScript" as the language and skip Webpack bundling since we’ll use Vite.

2. Install dependencies:
   ```bash
   npm install --save-dev typescript @types/vscode vscode
   ```

3. Modify `package.json` to include the extension's entry point:
   ```json
   "main": "./out/extension.js",
   "scripts": {
     "compile": "tsc -p .",
     "watch": "tsc -w -p .",
     "build": "npm run compile"
   }
   ```

4. Configure TypeScript for the backend (`tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./out",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "typeRoots": ["./node_modules/@types"],
       "types": ["vscode"]
     },
     "exclude": ["node_modules", ".vscode-test"]
   }
   ```

---

## **Step 2: Set Up the Frontend (Webview UI)**
1. Navigate to the `webview-ui` folder:
   ```bash
   mkdir webview-ui && cd webview-ui
   ```

2. Create a new React app using Vite:
   ```bash
   npm create vite@latest . -- --template react-ts
   ```

3. Install additional dependencies:
   ```bash
   npm install --save-dev @eslint/js@^9.17.0 @testing-library/jest-dom@^6.6.3 @testing-library/react@^16.1.0 @types/react@^18.3.18 @types/react-dom@^18.3.5 @types/vscode@^1.96.0 @types/vscode-webview@^1.57.5 @vitejs/plugin-react@^4.3.4 @vitest/coverage-v8@^2.1.8 eslint@^9.17.0 eslint-plugin-react-hooks@^5.0.0 eslint-plugin-react-refresh@^0.4.16 globals@^15.14.0 jsdom@^26.0.0 typescript@~5.6.2 typescript-eslint@^8.18.2 vite@^6.0.5 vitest@^2.1.8 vscode@^1.1.37

   ```

   ```bash
   npm i react@^18.3.1 react-dom@^18.3.1
   ```

4. Configure Vite (`webview-uXXXX/vite.config.ts`):
   ```typescript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
      outDir: '../out/webview-settings', // Output directory relative to the root project
      emptyOutDir: true, // Clean the output directory on each build

      rollupOptions: {
        input: './index.html',
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`,
          manualChunks: undefined, // Avoid chunking for simplicity in webview scripts
        },
      },
    },
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  });


   ```

5. Add a test setup file (`webview-ui/src/setupTests.ts`):
   ```typescript
   import '@testing-library/jest-dom';
   ```

6. Update `package.json` scripts in `webview-ui`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "test": "vitest"
   }
   ```

---

## **Step 3: Connect Backend to Webview**
1. In your backend (`extension.ts`), load the webview content:
```typescript
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.showWebview', () => {
      const panel = vscode.window.createWebviewPanel(
        'webview',
        'My Webview',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      const webviewPath = path.join(context.extensionPath, 'out', 'webview', 'index.html');
      panel.webview.html = getWebviewContent(webviewPath);
    })
  );
}

function getWebviewContent(filePath: string): string {
  const fs = require('fs');
  return fs.readFileSync(filePath, 'utf8');
}
```

2. Add the command to `package.json`:
```json
"contributes": {
  "commands": [
    {
      "command": "extension.showWebview",
      "title": "Show Webview"
    }
  ]
}
```

---

## **Step 4: Build and Debug**
1. Build both backend and frontend:
```bash
npm run build          # Backend build (root)
cd webview-ui && npm run build  # Frontend build (webview)
```

2. Debug the extension by pressing `F5` in VS Code.

---

## **Step 5: Testing with Vitest**
1. Write React tests in `webview-ui/src/__tests__/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
```

2. Run tests:
```bash
cd webview-ui && npm run test
```

---

This setup ensures a clean separation between the backend and frontend while leveraging Vite for fast builds and Vitest for testing React components efficiently.

Citations:
[1] https://stackoverflow.com/questions/72787382/what-is-the-intended-test-structure-of-vitest-inside-vue-projects
[2] https://dev.to/mcbarna/setup-react-with-vite-on-vscode-a-step-by-step-tutorial-591g
[3] https://code.visualstudio.com/api/extension-guides/webview
[4] https://www.procoding.org/setup-vitest-with-react-for-unit-testing-replace-jest
[5] https://dev.to/samuel_kinuthia/testing-react-applications-with-vitest-a-comprehensive-guide-2jm8
[6] https://blog.logrocket.com/vitest-adoption-guide/
[7] https://stackoverflow.com/questions/75657294/use-vite-to-create-webview-in-vscode-extension
[8] https://www.npmjs.com/package/@tomjs/vite-plugin-vscode
[9] https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
[10] https://www.reddit.com/r/reactjs/comments/12ej0gf/migrating_to_vite_make_the_build_folder_structure/
[11] https://www.youtube.com/watch?v=WSbARHnQzsc
[12] https://vitest.dev/guide/
[13] https://dev.to/topeogunleye/building-a-modern-react-app-with-vite-eslint-and-prettier-in-vscode-13fj
[14] https://dev.to/nx/react-vite-and-typescript-get-started-in-under-2-minutes-56f
[15] https://www.youtube.com/watch?v=CFhJF2Co4_w
[16] https://www.linkedin.com/pulse/setting-up-react-vite-vscode-your-easy-guide-barnabas-ukagha-phcmf
[17] https://github.com/jallen-dev/vscode-react-starter
[18] https://dev.to/rakshit47/create-vs-code-extension-with-react-typescript-tailwind-1ba6
[19] https://github.com/vitest-dev/vscode/issues/271
[20] https://www.eliostruyf.com/vite-bundling-visual-studio-code-extension/
[21] https://marketplace.visualstudio.com/items?itemName=vitest.explorer
[22] https://mayashavin.com/articles/test-react-components-with-vitest
[23] https://akoskm.com/how-to-test-react-apps-with-vitest-and-vite/
[24] https://www.youtube.com/watch?v=nvkRBHXIi2M
[25] https://dev.to/janoskocs/setting-up-a-react-project-using-vite-typescript-vitest-2gl2
[26] https://johnsmilga.com/articles/2024/10/15
[27] https://www.youtube.com/watch?v=SMsZDg-t_mA