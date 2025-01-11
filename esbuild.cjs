const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');
const format = process.argv.includes('--cjs') ? 'cjs' : 'esm';

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',
	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const outputDir = 'dist';
	
	// Ensure output directory exists
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	const entryFile = 'src/extension.ts';
	const outfile = format === 'cjs' ? 'extension.cjs' : 'extension.mjs';

	try {
		const ctx = await esbuild.context({
			entryPoints: [entryFile],
			bundle: true,
			format: format,
			minify: production,
			sourcemap: !production,
			sourcesContent: false,
			platform: 'node',
			target: ['node16'],
			outfile: path.join(outputDir, outfile),
			external: ['vscode'],
			logLevel: 'info',
			plugins: [esbuildProblemMatcherPlugin],
			define: {
				'process.env.NODE_ENV': production ? '"production"' : '"development"'
			},
			banner: {
				js: format === 'cjs' 
					? `
						// In CommonJS, these are already available
						const __filename = __filename || require('url').fileURLToPath(require('url').pathToFileURL(__filename).href);
						const __dirname = __dirname || require('path').dirname(__filename);
					`
					: `
						import { fileURLToPath } from 'url';
						import { dirname } from 'path';
						const __filename = fileURLToPath(import.meta.url);
						const __dirname = dirname(__filename);
					`
			}
		});

		if (watch) {
			await ctx.watch();
		} else {
			await ctx.rebuild();
			await ctx.dispose();
		}

		console.log(`Build completed successfully. Output: ${path.join(outputDir, outfile)}`);
	} catch (error) {
		console.error('Build failed:', error);
		process.exit(1);
	}
}

main().catch(console.error);
