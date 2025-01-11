// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { Subject } from 'rxjs';
import { WebviewMessage, ExtensionMessage } from '@shared/messages';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Sprint App extension is now active!');

	// Create a message subject for handling webview communications
	const messageSubject = new Subject<WebviewMessage>();

	// Register the command to open the webview
	const disposableWebview = vscode.commands.registerCommand('sprint-app.openWebview', () => {
		// Create a new webview panel
		const panel = vscode.window.createWebviewPanel(
			'sprintAppWebview', // Unique identifier for the webview
			'Sprint App', // Title of the panel
			vscode.ViewColumn.One, // Column to show the webview in
			{
				enableScripts: true, // Enable JavaScript in the webview
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'webview-ui', 'dist'))
				]
			}
		);

		// Get the path to the webview's HTML file
		const webviewPath = vscode.Uri.file(
			path.join(context.extensionPath, 'webview-ui', 'dist', 'index.html')
		);

		// Convert the path to a webview URI
		const webviewUri = panel.webview.asWebviewUri(webviewPath);

		// Set the HTML content of the webview
		panel.webview.html = getWebviewContent(panel.webview, webviewUri);

		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
			(message: WebviewMessage) => {
				// Process the message using RxJS
				messageSubject.next(message);
			},
			undefined,
			context.subscriptions
		);

		// Subscribe to message processing
		const subscription = messageSubject.subscribe((message) => {
			try {
				switch (message.type) {
					case 'user_input':
						// Process user input message
						const response: ExtensionMessage = {
							type: 'response',
							id: message.id,
							timestamp: Date.now(),
							payload: {
								processedText: `Received: ${message.payload.text}`,
								length: message.payload.text.length
							}
						};
						
						// Send response back to webview
						panel.webview.postMessage(response);
						break;
					
					default:
						console.warn('Unhandled message type:', message.type);
				}
			} catch (error) {
				// Send error response
				const errorResponse: ExtensionMessage = {
					type: 'error',
					id: message.id,
					timestamp: Date.now(),
					payload: null,
					error: error instanceof Error ? error.message : 'Unknown error'
				};
				
				panel.webview.postMessage(errorResponse);
			}
		});

		// Cleanup when panel is disposed
		panel.onDidDispose(() => {
			subscription.unsubscribe();
		});
	});

	// Add the command to subscriptions
	context.subscriptions.push(disposableWebview);
}

function getWebviewContent(webview: vscode.Webview, webviewUri: vscode.Uri): string {
	// Use a Content Security Policy to only allow loading resources from our extension's directory
	const nonce = getNonce();

	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="Content-Security-Policy" content="default-src 'none'; 
				script-src 'nonce-${nonce}' 'unsafe-eval';
				style-src ${webview.cspSource} 'unsafe-inline';
				img-src ${webview.cspSource} https:;">
			<title>Sprint App</title>
			<base href="${webviewUri.toString()}">
		</head>
		<body>
			<div id="root"></div>
			<script nonce="${nonce}" src="assets/main.js"></script>
		</body>
		</html>
	`;
}

// Generate a random nonce to help prevent XSS attacks
function getNonce(): string {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const length = 32;
	let text = '';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

// This method is called when your extension is deactivated
export function deactivate() {}
