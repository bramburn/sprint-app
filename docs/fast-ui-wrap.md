# Comprehensive Guide: Best Practices for Wrapping and Creating React Components Using FAST Elements

This guide is designed to help Software Development Engineers (SWEs) effectively wrap and create reusable React components using **FAST Elements**. It caters to developers of all experience levels, providing clear explanations, practical steps, and real-world examples.

---

## **I. Introduction**

### **Scope and Objectives**
- **Purpose**: To provide best practices for wrapping FAST Elements in React, creating reusable components, and ensuring compatibility with modern web development standards.
- **Goals**:
  - Simplify the integration of FAST Elements into React applications.
  - Create reusable, shareable components for scalable projects.
  - Avoid common pitfalls while leveraging the power of FAST.

### **Target Audience**
- Beginner to advanced SWEs familiar with React and basic web component concepts.

---

## **II. Best Practices**

### **1. Register the FAST Design System Globally**
#### **Description**:
The FAST Design System provides the foundation for using FAST Elements by registering components globally.

#### **Rationale**:
- Ensures all FAST components are styled and functional.
- Reduces the need for repetitive setup in different parts of the application.

#### **Implementation Tips**:
1. Import `provideFASTDesignSystem` from `@microsoft/fast-components`.
2. Register the design system globally in your entry file (`main.tsx` or `index.tsx`):
   ```typescript
   import { provideFASTDesignSystem } from "@microsoft/fast-components";

   provideFASTDesignSystem().register();
   ```

3. Ensure this setup is done before rendering your React application.

#### **Potential Pitfalls**:
- Forgetting to register the design system can lead to unstyled or non-functional components.
- Re-registering the system multiple times may cause unexpected behavior.

#### **Example**:
```typescript
import { provideFASTDesignSystem } from "@microsoft/fast-components";

provideFASTDesignSystem().register(); // Registers all FAST components globally
```

---

### **2. Wrap FAST Components Using `@microsoft/fast-react-wrapper`**
#### **Description**:
The `@microsoft/fast-react-wrapper` library allows you to wrap FAST web components into React-friendly components.

#### **Rationale**:
- Provides a seamless way to use web components in React.
- Ensures type safety and compatibility with JSX.

#### **Implementation Tips**:
1. Install the required packages:
   ```bash
   npm install @microsoft/fast-components @microsoft/fast-react-wrapper
   ```
2. Import and wrap a FAST component:
   ```typescript
   import { provideReactWrapper } from "@microsoft/fast-react-wrapper";
   import { fastButton } from "@microsoft/fast-components";

   const { wrap } = provideReactWrapper(React);

   export const FastButton = wrap(fastButton());
   ```

3. Use the wrapped component in your React application:
   ```jsx
   <FastButton appearance="accent" onClick={() => alert("Clicked!")}>
     Click Me
   </FastButton>
   ```

#### **Potential Pitfalls**:
- Forgetting to wrap a component can lead to rendering issues.
- Passing invalid props (e.g., non-standard attributes) may cause runtime errors.

#### **Example**:
```jsx
<FastButton appearance="outline">Submit</FastButton>
```

---

### **3. Create Reusable Custom Components**
#### **Description**:
Encapsulate logic, styles, or additional functionality by creating custom React components based on wrapped FAST elements.

#### **Rationale**:
- Promotes code reuse and consistency across projects.
- Simplifies complex logic by abstracting it into reusable components.

#### **Implementation Tips**:
1. Create a new file for your custom component (e.g., `CustomButton.tsx`).
2. Extend functionality or add custom props as needed:
   ```typescript
   import React from "react";
   import { FastButton } from "./FastComponents";

   const CustomButton = ({ label, onClick }) => {
     return (
       <FastButton appearance="accent" onClick={onClick}>
         {label}
       </FastButton>
     );
   };

   export default CustomButton;
   ```

3. Use the custom component in your app:
   ```jsx
   <CustomButton label="Save" onClick={() => console.log("Saved!")} />
   ```

#### **Potential Pitfalls**:
- Overcomplicating simple components with unnecessary logic.
- Forgetting to pass down required props like `appearance` or event handlers.

---

### **4. Handle Custom Events**
#### **Description**:
Map native events emitted by FAST web components (e.g., `expanded-change`) to React-friendly event handlers.

#### **Rationale**:
- Ensures proper integration of native events with React's event system.
- Improves developer experience by enabling familiar event handling patterns.

#### **Implementation Tips**:
1. Use the `events` option in the wrapper to map native events:
   ```typescript
   import { fastMenuItem } from "@microsoft/fast-components";

   export const FastMenuItem = wrap(fastMenuItem(), {
     events: {
       onExpandedChange: "expanded-change",
     },
   });
   ```

2. Handle the mapped event in your component:
   ```jsx
   <FastMenuItem onExpandedChange={(e) => console.log(e.detail)} />
   ```

#### **Potential Pitfalls**:
- Forgetting to map events can lead to unexpected behavior.
- Overriding default event handlers without proper testing.

---

### **5. Style Components Using Design Tokens**
#### **Description**:
Customize styles using FAST's design tokens or CSS variables for consistent theming.

#### **Rationale**:
- Ensures compatibility with light/dark modes and other themes.
- Simplifies styling without breaking native look-and-feel.

#### **Implementation Tips**:
1. Use CSS variables for styling:
   ```css
   fast-button {
     --accent-fill-rest: #0078d4;
     --accent-fill-hover: #005a9e;
     --corner-radius: 4px;
   }
   ```

2. Apply design tokens programmatically if needed:
   ```typescript
   import { DesignToken } from "@microsoft/fast-foundation";

   DesignToken.create("custom-color").withDefault("#ff0000");
   ```

3. Pass styles directly via props if supported by the component.

#### **Potential Pitfalls**:
- Hardcoding colors instead of using tokens may break theme compatibility.
- Overriding too many styles can lead to inconsistent appearances.

---

### Visual Workflow Diagram

```plaintext
+-------------------+
| Register FAST DS  |
| provideFASTDesign |
+-------------------+
         |
         v
+-------------------+
| Wrap FAST Element |
|    with Wrapper    |
+-------------------+
         |
         v
+-------------------+
| Extend Component  |
| Add Logic/Props    |
+-------------------+
         |
         v
+-------------------+
| Integrate & Style |
|  (Tokens/CSS)      |
+-------------------+
```

---

## III. Conclusion

### Key Takeaways
1. Register the FAST Design System globally before using any components.
2. Wrap FAST elements using `@microsoft/fast-react-wrapper` for seamless React integration.
3. Create reusable custom components to encapsulate logic and maintain consistency.
4. Handle custom events properly and style components using design tokens for theme compatibility.

### Continuous Improvement
This guide is a living document—please share feedback or suggestions for improvement! By following these best practices, you can create powerful, maintainable UI components that enhance productivity and scalability in your projects.

---

## Resources for Further Learning

1. [FAST Documentation](https://www.fast.design/docs)
2. [FAST React Wrapper](https://github.com/microsoft/fast)
3. [VS Code Webview API](https://code.visualstudio.com/api/extension-guides/webview)
4. [Design Tokens](https://www.fast.design/docs/design-systems/design-tokens/)

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/35208055/11fb3a2a-8238-40ec-8f01-cc8bb556c636/main.tsx

# Creating Custom Shareable Components Based on the FAST Wrapper in React for VS Code Extensions


This guide provides a step-by-step approach to creating custom, reusable, and shareable components using the FAST wrapper in React. These components can be used across multiple projects or shared with your team to maintain consistency and efficiency.

---

## **I. Introduction**

### **Scope and Objectives**
- **Purpose**: To create custom components based on the FAST wrapper that are reusable and shareable across React applications, particularly for VS Code extension webviews.
- **Goals**:
  - Leverage the `@microsoft/fast-react-wrapper` library to wrap FAST components.
  - Extend functionality by creating custom components tailored to specific needs.
  - Ensure compatibility, performance, and maintainability.

### **Target Audience**
- SWEs familiar with React, FAST Elements, and basic VS Code extension development.

---

## **II. Best Practices for Creating Custom Components**

### **1. Understand the Basics of FAST Wrapping**
#### **Description**:
The `@microsoft/fast-react-wrapper` library allows you to wrap FAST web components into React-friendly components.

#### **Rationale**:
- Provides a seamless way to use web components in React.
- Ensures type safety and compatibility with JSX.

#### **Implementation Tips**:
1. Import the necessary FAST component and wrapper:
   ```javascript
   import { provideReactWrapper } from "@microsoft/fast-react-wrapper";
   import { fastButton } from "@microsoft/fast-components";

   const { wrap } = provideReactWrapper(React);
   export const FastButton = wrap(fastButton());
   ```

2. Use the wrapped component in your project:
   ```jsx
   <FastButton appearance="accent">Click Me</FastButton>
   ```

#### **Potential Pitfalls**:
- Forgetting to register the design system globally can lead to unstyled components.
- Not wrapping components properly may cause rendering issues.

---

### **2. Create Custom Components by Extending FAST Components**
#### **Description**:
Extend functionality or encapsulate logic by creating custom React components based on wrapped FAST elements.

#### **Rationale**:
- Allows you to add custom logic, styles, or additional props.
- Encapsulates reusable functionality for consistency across projects.

#### **Implementation Tips**:
1. Create a new component that wraps a FAST component with additional logic or props:
   ```javascript
   import React from "react";
   import { FastButton } from "./FastComponents";

   const CustomButton = ({ label, onClick }) => {
     return (
       <FastButton appearance="accent" onClick={onClick}>
         {label}
       </FastButton>
     );
   };

   export default CustomButton;
   ```

2. Use the custom component in your app:
   ```jsx
   <CustomButton label="Submit" onClick={() => console.log("Clicked!")} />
   ```

#### **Potential Pitfalls**:
- Overcomplicating simple components by adding unnecessary logic.
- Forgetting to pass down required props like `appearance` or `onClick`.

---

### **3. Share Components Across Projects**
#### **Description**:
Package your custom components into a library for reuse across multiple projects.

#### **Rationale**:
- Promotes consistency and reduces duplication of effort.
- Simplifies maintenance by centralizing updates.

#### **Implementation Tips**:
1. Create an NPM package for your custom components:
   ```bash
   mkdir fast-custom-components
   cd fast-custom-components
   npm init -y
   ```

2. Structure your project with reusable components:
   ```
   src/
     components/
       CustomButton.js
       CustomCard.js
     index.js
   ```

3. Export all components from `index.js`:
   ```javascript
   export { default as CustomButton } from "./components/CustomButton";
   export { default as CustomCard } from "./components/CustomCard";
   ```

4. Publish your package to NPM (or a private registry):
   ```bash
   npm publish
   ```

5. Install and use the package in other projects:
   ```bash
   npm install fast-custom-components
   ```
   ```jsx
   import { CustomButton } from "fast-custom-components";

   <CustomButton label="Click Me" />;
   ```

#### **Potential Pitfalls**:
- Failing to document usage instructions for shared components.
- Not versioning updates properly can break dependent projects.

---

### **4. Add Support for Custom Events**
#### **Description**:
If your custom component uses native events (e.g., `expanded-change`), map them to React-friendly event handlers.

#### **Rationale**:
- Ensures proper integration of native events with React's event system.
- Improves developer experience by enabling familiar event handling patterns.

#### **Implementation Tips**:
1. Map native events using the `events` option in the wrapper:
   ```javascript
   import { fastMenuItem } from "@microsoft/fast-components";

   export const FastMenuItem = wrap(fastMenuItem(), {
     events: {
       onExpandedChange: "expanded-change",
     },
   });
   ```

2. Use the mapped event in your component:
   ```jsx
   <FastMenuItem onExpandedChange={(e) => console.log(e.detail)} />
   ```

#### **Potential Pitfalls**:
- Forgetting to map events can lead to unexpected behavior.
- Overriding default event handlers without proper testing.

---

### **5. Style Components Using Design Tokens**
#### **Description**:
Customize styles using FAST's design tokens or CSS variables.

#### **Rationale**:
- Ensures consistent theming across components.
- Simplifies adaptation to different environments (e.g., light/dark mode).

#### **Implementation Tips**:
1. Use CSS variables for styling:
   ```css
   fast-button {
     --accent-fill-rest: #0078d4;
     --accent-fill-hover: #005a9e;
     --corner-radius: 4px;
   }
   ```

2. Apply design tokens programmatically if needed:
   ```javascript
   import { DesignToken } from "@microsoft/fast-foundation";

   DesignToken.create("custom-color").withDefault("#ff0000");
   ```

3. Pass styles directly via props if supported by the component.

#### **Potential Pitfalls**:
- Hardcoding colors instead of using tokens may break theme compatibility.
- Overriding too many styles can lead to inconsistent appearances.

---

## III. Conclusion

### Key Takeaways
1. Use the `@microsoft/fast-react-wrapper` library to seamlessly integrate FAST elements into React.
2. Create reusable custom components by extending functionality or encapsulating logic.
3. Share your components via NPM packages for consistency across projects.
4. Handle custom events properly and use design tokens for consistent styling.

### Continuous Improvement
This guide is a living document—please share feedback or suggestions for improvement! By following these best practices, you can create powerful, reusable UI components that enhance productivity and maintainability in your VS Code extensions and other React applications.

---

## Visual Workflow Diagram

```plaintext
+-------------------+
| Register FAST DS  |
| provideFASTDesign |
+-------------------+
         |
         v
+-------------------+
| Wrap FAST Element |
|    with Wrapper    |
+-------------------+
         |
         v
+-------------------+
| Extend Component  |
| Add Logic/Props    |
+-------------------+
         |
         v
+-------------------+
| Package & Share  |
|  (Optional)       |
+-------------------+
```

This workflow ensures a structured approach to creating and sharing custom FAST-based React components!

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/35208055/11fb3a2a-8238-40ec-8f01-cc8bb556c636/main.tsx
[2] https://fast.design/docs/1.x/integrations/react
[3] https://reflex.dev/blog/2024-04-16-custom-components/
[4] https://learn.microsoft.com/ja-jp/fluent-ui/web-components/integrations/react
[5] https://www.digitalocean.com/community/tutorials/how-to-create-custom-components-in-react
[6] https://www.digitalocean.com/community/tutorials/how-to-create-wrapper-components-in-react-with-props
[7] https://github.com/brillout/awesome-react-components
[8] https://www.youtube.com/watch?v=LME0Uv9SlDA
[9] https://www.youtube.com/watch?v=lMPMD-7ZrBc
[10] https://javascript.plainenglish.io/build-custom-react-components-like-a-professional-c1de0303e6c8?gi=e08011b4d22a
[11] https://dev.to/infrasity-learning/building-powerful-components-with-react-custom-hooks-29ej