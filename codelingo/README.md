# Codelingo - Coding Education Platform

A modern, scalable React application for coding education built with TypeScript, Vite, and best practices for enterprise-level development.

## 🚀 Features

- **Modern React 19.1.1** with TypeScript for type safety
- **Vite** for fast development and building
- **React Router** for declarative routing
- **TanStack Query** for server state management
- **Zustand** for client state management
- **Tailwind CSS** for utility-first styling
- **MSW** for API mocking during development
- **Comprehensive testing** with React Testing Library and Vitest
- **Feature-based architecture** for scalability
- **Type-safe environment configuration**

## 📁 Project Structure

```
src/
├── app/                    # Application layer
│   ├── app.tsx            # Main app component
│   ├── provider.tsx       # Global providers
│   ├── router.tsx         # Route configuration
│   └── routes/            # Route components
├── components/            # Shared UI components
├── features/              # Feature-based modules
│   └── auth/             # Authentication feature
├── config/               # Configuration files
├── hooks/                # Shared custom hooks
├── lib/                  # External library configurations
├── stores/               # Global state stores
├── testing/              # Testing utilities
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codelingo
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Architecture Principles

### Feature-Based Organization
Each feature is self-contained with its own:
- API layer
- Components
- Hooks
- Types
- State management

### State Management Strategy
- **Server State**: TanStack Query for caching, synchronization, and background updates
- **Client State**: Zustand for UI state, user preferences, and temporary data
- **URL State**: React Router for navigation and shareable state

### Type Safety
- Comprehensive TypeScript coverage
- Strict type checking enabled
- Runtime validation for API responses
- Type-safe environment variables

### Testing Strategy
- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for features
- API mocking with MSW

## 🔧 Configuration

### Environment Variables

Required environment variables (see `.env.example`):

- `VITE_API_BASE_URL` - API base URL
- `VITE_API_TIMEOUT` - API request timeout
- `VITE_ANALYTICS_ID` - Analytics tracking ID
- `VITE_ENABLE_MOCK_API` - Enable/disable API mocking

### Tailwind CSS

Custom design system with:
- Primary color palette
- Extended spacing scale
- Custom animations
- Component classes

## 📚 Key Technologies

- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TanStack Query** - Server state
- **Zustand** - Client state
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **MSW** - API mocking
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 🤝 Contributing

1. Follow the established folder structure
2. Write tests for new features
3. Use TypeScript for all new code
4. Follow the existing code style
5. Update documentation as needed

## 📄 License

MIT License - see LICENSE file for details+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
