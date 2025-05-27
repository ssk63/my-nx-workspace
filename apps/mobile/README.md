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
├── App.tsx              # Main application component
├── index.ts            # Entry point
├── tsconfig.json       # TypeScript configuration
└── .expo/             # Expo configuration
```

## Features

- React Native with Expo
- TypeScript support
- Status bar customization
- Clean and minimal setup

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 