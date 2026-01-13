# AGENTS.md - razdor-ui Development Guide

This document provides essential information for agents working in the razdor-ui codebase.

## Project Overview

- **Type**: React component library with Storybook integration
- **Tech Stack**: React 19, TypeScript, Bun, Storybook
- **Purpose**: UI components for razdor project

## Essential Commands

### Installation
```bash
bun install
```

### Running the Project
```bash
bun run index.ts
```

### Storybook Commands
```bash
# Start Storybook development server
bun run storybook

# Build Storybook for production
bun run build-storybook
```

## Code Organization

### Directory Structure
```
src/
├── components/          # React components
│   ├── Button/           # Button component
│   ├── ToastNotification/ # Toast notification component
│   ├── ToastStack/       # Toast stack manager
│   └── ...               # Other components
├── stories/             # Storybook stories and assets
└── index.css            # Global styles
```

### Component Structure Pattern
Each component follows this structure:
```
ComponentName/
├── index.tsx           # Main component implementation
├── styles.css          # Component-specific styles
└── ComponentName.stories.tsx  # Storybook stories (if applicable)
```

## Code Patterns and Conventions

### TypeScript
- Uses TypeScript with strict mode enabled
- Props use `PropsWithChildren` pattern
- Type definitions for component props
- JSDoc comments for complex props

### React Components
- Functional components with TypeScript
- Props destructuring with default values
- CSS modules for styling (component-specific CSS files)
- FontAwesome icons integration

### Component Props Pattern
```typescript
export default function ComponentName({
  children,
  prop1 = defaultValue,
  prop2,
  ...rest
}: PropsWithChildren<{
  prop1?: Type1;
  prop2?: Type2;
  // ... other props
}>) {
  // Component implementation
}
```

### CSS Class Naming
- Component-specific class names
- BEM-like naming convention
- Dynamic class concatenation using template literals

## Storybook Patterns

### Story Structure
```typescript
import type { Meta, StoryObj } from "@storybook/react";
import Component from ".";

const meta = {
  title: "COMPONENTS/ComponentName",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Control configurations
  }
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story exports
```

### Story Types
- **Default Story**: Basic component usage
- **Variation Stories**: Different prop combinations
- **Complex Stories**: Using `render` function for complex layouts
- **Interactive Stories**: With controls and actions

## Important Components

### Button Component
- Location: `src/components/Button/index.tsx`
- Features: Multiple colors, icons, sizes, states
- Color options: primary, secondary, good, bad, danger, transparent, disabled
- Supports FontAwesome icons and image icons

### ToastNotification Component
- Location: `src/components/ToastNotification/index.tsx`
- Features: Multiple types (info, success, warning, error)
- Auto-close functionality with duration control
- Positioning options (all screen positions)
- Icon support (FontAwesome and custom images)

### ToastStack Component
- Location: `src/components/ToastStack/index.tsx`
- Manages multiple toast notifications
- Provides add/remove toast functionality

## Testing Approach

### Storybook as Testing Platform
- Stories serve as visual tests
- Interactive controls for prop testing
- Auto-generated documentation

### Testing Patterns
- Each component has corresponding stories
- Stories cover different prop combinations
- Complex scenarios use `render` function
- Actions logged for interactive elements

## Gotchas and Non-Obvious Patterns

### TypeScript Configuration
- Uses `"module": "Preserve"` and `"moduleResolution": "bundler"`
- `"verbatimModuleSyntax": true` - requires explicit import extensions
- `"noEmit": true` - TypeScript doesn't emit output files

### Component Styling
- Each component has its own CSS file
- Global styles in `src/index.css`
- CSS classes are manually concatenated in components

### Icon Usage
- FontAwesome icons imported individually
- Icons passed as props to components
- Both FontAwesome icons and image URLs supported

### Toast Positioning
- ToastNotification component handles its own positioning
- Uses CSS classes for different positions
- Position prop determines screen placement

## Build System

- Uses Bun as package manager and runtime
- TypeScript compilation handled by tsconfig.json
- Storybook for component development and documentation

## Development Workflow

1. Create new component in `src/components/`
2. Add component-specific CSS file
3. Create Storybook stories for the component
4. Test component in Storybook
5. Export component for use in main application

## Dependencies

### Main Dependencies
- React 19
- React DOM 19
- @fortawesome/react-fontawesome
- @fortawesome/free-solid-svg-icons

### Development Dependencies
- Storybook with React-Vite
- TypeScript
- Bun

## Best Practices

1. **Component Isolation**: Each component should be self-contained
2. **Type Safety**: Use TypeScript types for all props
3. **Storybook First**: Develop components in Storybook before integration
4. **Consistent Styling**: Follow existing CSS patterns
5. **Documentation**: Use JSDoc comments for complex components
