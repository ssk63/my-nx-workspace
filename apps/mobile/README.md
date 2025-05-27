# Mobile App

This is a React Native mobile application built with Expo in an Nx workspace.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. Install dependencies from the root of the workspace:
```bash
npm install
```

### Development

To start the development server:

```bash
npm run mobile:start
```

This will start the Expo development server. You can then:
- Scan the QR code with your mobile device (using Expo Go app)
- Press 'i' to open in iOS simulator
- Press 'a' to open in Android emulator
- Press 'w' to open in web browser

### Available Scripts

- `npm run mobile:start` - Start the Expo development server
- `npm run mobile:android` - Start the app in Android emulator
- `npm run mobile:ios` - Start the app in iOS simulator
- `npm run mobile:web` - Start the app in web browser

## Project Structure

```
apps/mobile/
├── App.tsx              # Main application component (wraps all providers)
├── src/
│   ├── config/          # Centralized config, API_URL, theme, storage keys, types
│   ├── contexts/        # ThemeContext, AuthContext, TenantContext
│   ├── screens/         # All app screens (Login, Register, TenantSelection, etc.)
│   └── navigation/      # Navigation setup
└── .expo/               # Expo configuration
```

## Features

- **Multi-tenant SaaS:** Users can belong to multiple tenants and select their organization after login.
- **Tenant-specific theming:** Each tenant can have its own theme/colors, loaded dynamically after tenant selection.
- **Centralized config:** All constants, types, and defaults are in `src/config/index.ts`.
- **Professional, DRY code:** No duplicate config, clear context/provider boundaries, and best practices throughout.
- **TypeScript support**
- **Status bar customization**
- **Clean and minimal setup**

## Theming & Multi-Tenant Flow

- The app uses a `ThemeProvider` that wraps the entire app. The theme is set dynamically after tenant selection.
- All theme values and types are defined in `src/config/index.ts`.
- After login, users select their tenant (if they belong to more than one). The app fetches the tenant's theme and applies it globally.
- All API calls use the centralized `API_URL` from config.
- AsyncStorage keys are managed via `STORAGE_KEYS` from config.
- All navigation logic is handled in screens, not in context providers.

## Best Practices

- **No hardcoded URLs or keys:** Use config for everything.
- **No navigation in context providers:** Let screens handle navigation after async actions.
- **User-friendly loading and error states** throughout the app.
- **Callback props** (e.g., `onSuccess`) for parent-driven navigation or side effects in forms.
- **Consistent naming and file structure.**

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 