# Project Instructions & Guidelines

## Tech Stack
- Frontend: Next.js, React, TypeScript
- State Management: Zustand
- Validation: Yup

## Folder Structure & Responsibilities

Please adhere to the following folder structure and responsibilities when developing in this project:

### `validate` folder
- **Purpose**: For creating validation schema files.
- **Tooling**: Use `yup` for all schema validations.
- **Organization**: Separate the validation files by service or domain feature.

### `type` folder
- **Purpose**: For creating TypeScript interface and type definition files.
- **Organization**: Separate the type files by service or domain feature.

### `hook` folder
- **Purpose**: For creating custom React hooks and API integration files.
- **Tooling**: State management and API calls should be handled via `Zustand`.
- **Organization**: Keep hooks modular and specific to features/services.

### `util` folder
- **Purpose**: For storing general utility, helper functions, and shared constants.
- **Organization**: Keep functions pure and reusable across the entire project.

## General Rules
- Write functional components with React Hooks.
- Ensure all files are strictly typed with TypeScript.
- Follow Next.js (App Router) best practices.

## AI Agent Skills
*Call these skills strictly under the specified conditions to save tokens and maximize efficiency:*
- **react-doctor**: ONLY use when finishing a feature, fixing a bug, before a commit, or if explicitly asked to scan/triage React diagnostics.
- **threejs-animation**: ONLY use for 3D animations (keyframes, skeletal, morph targets, mixing).
- **threejs-fundamentals**: ONLY use for 3D scene setup (cameras, renderer, object hierarchies, transforms).
- **web-design-guidelines**: ONLY use when explicitly asked to review UI, audit design, check accessibility, or review UX.
