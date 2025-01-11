# Troubleshooting Guide for Sprint App VSCode Extension

## Common Issues and Solutions

### 1. Extension Fails to Load

**Symptoms:**
- Extension icon doesn't appear in Activity Bar
- No error messages in Output panel

**Possible Solutions:**
1. Ensure you're using a compatible VSCode version (1.74.0+)
2. Check VSCode console for any hidden errors
3. Verify all dependencies are correctly installed

```bash
# Reinstall dependencies
npm install
cd webview-ui
npm install
```

### 2. Webview Not Rendering

**Symptoms:**
- Sidebar appears empty
- No content in webview

**Possible Solutions:**
1. Check browser console for any JavaScript errors
2. Verify build process completed successfully

```bash
# Rebuild extension and webview
npm run build:extension
npm run build:webview
```

### 3. Performance Issues

**Symptoms:**
- Slow loading
- High memory consumption

**Diagnostic Steps:**
1. Enable VSCode developer mode
2. Check extension activation time
3. Monitor memory usage

### 4. Message Passing Failures

**Symptoms:**
- No response from webview
- Messages not being processed

**Debugging:**
1. Add console logs in `SidebarProvider.ts`
2. Check message event listeners
3. Verify RxJS stream configuration

### 5. Development Environment Setup

**Common Setup Issues:**
- Node.js version incompatibility
- Missing global dependencies

**Recommended Environment:**
- Node.js 18.x
- npm 9.x
- VSCode 1.74.0+

### Logging and Diagnostics

Enable detailed logging:
1. Open VSCode Command Palette
2. Run: `Developer: Open Extension Logs`
3. Look for `sprint-app` logs

### Getting Help

- Check [GitHub Issues](https://github.com/yourusername/sprint-app/issues)
- Open a new issue with:
  * VSCode version
  * Extension version
  * Detailed error description
  * Reproduction steps

## Performance Optimization

### Memory Management
- Close unused webview instances
- Minimize complex state management
- Use RxJS operators for efficient stream handling

### Lazy Loading
- Implement code splitting
- Load heavy components on-demand

## Contributing Troubleshooting Improvements

If you encounter and solve a unique issue:
1. Document the problem
2. Add solution to this guide
3. Submit a pull request
