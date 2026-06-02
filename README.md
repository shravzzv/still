# Still

Still is a deliberately minimal, cross-platform todo application designed to explore how the same product can be built and delivered across mobile, web, and desktop platforms.

The project emphasizes simplicity, local-first task management, and a consistent user experience while serving as a practical vehicle for learning platform-specific development patterns.

## Applications

| Platform | Technology          | Location              |
| -------- | ------------------- | --------------------- |
| Mobile   | React Native + Expo | `apps/native`         |
| Web      | Next.js             | `apps/web`            |
| Desktop  | Electron            | Built from `apps/web` |

## Technology Stack

- TypeScript
- React
- React Native
- Expo
- Next.js
- Electron

## Objectives

- Build and maintain a single product across multiple platforms.
- Develop a practical understanding of mobile, web, and desktop application architecture.
- Learn how platform capabilities influence application design and implementation.
- Explore packaging and distribution workflows for production applications.

## Repository Structure

```txt
still/
├── apps/
│   ├── native/     # React Native + Expo application
│   └── web/        # Next.js application and Electron integration
├── packages/       # Shared packages (when needed)
└── package.json
```

## Status

Active development.

The repository currently contains the mobile implementation and ongoing work toward web and desktop versions of Still.
