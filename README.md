# HERGuard - Women Safety Mobile App

## 📱 App Overview

HERGuard is a comprehensive women's safety mobile application built with React Native and Expo, specifically designed to provide immediate emergency assistance and preventive safety measures for women in Bangladesh.

### 🎯 Core Mission

To empower women with instant access to emergency services, legal rights information, and safety resources through a user-friendly, reliable mobile application.

## 🚀 Key Features

### 1. 🆘 Smart SOS System

- **One-tap emergency button** with 10-second cancellation window
- **Auto-alert system** sends notifications if user doesn't respond
- **Live location sharing** with emergency contacts
- **Multi-channel alerts** (push notifications + SMS fallback)

### 2. 🤖 AI-Powered Safety

- **Voice trigger** activation with "HERGuard Help!" command
- **Sound detection** for scream-like noises
- **Motion detection** for falls, shakes, or forceful movements
- **Automatic evidence collection** during emergencies

### 3. 🗺️ Intelligent Safe Mapping

- **Real-time safe zones** mapping (police stations, hospitals, safe spaces)
- **Risk area identification** and avoidance routing
- **Live navigation** to nearest safe locations
- **Crowd-sourced safety** data integration

### 4. 👥 Guardian Network

- **Trusted contacts** management with instant alert system
- **Live location tracking** during emergencies
- **Evidence sharing** (audio recordings, photos)
- **Group coordination** for collective safety

### 5. ⚖️ Legal Empowerment

- **Bangladesh-specific** women's legal rights information
- **Emergency contact** directory (police, hospitals, support centers)
- **Complaint filing** guidance and FIR templates
- **Legal aid** resources and helpline numbers

## 🛠️ Technical Stack

### Frontend

- **React Native** with Expo SDK 54
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **React Native Maps** for location services
- **Expo Location** for GPS tracking

### Key Dependencies

```json
{
  "@react-navigation/native": "Navigation",
  "@react-navigation/bottom-tabs": "Tab navigation",
  "react-native-maps": "Interactive maps",
  "expo-location": "GPS services",
  "expo-camera": "Evidence collection",
  "expo-av": "Audio recording",
  "expo-sharing": "Location sharing"
}
```

## 🏗️ Project Structure

```
her-guard/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen
│   │   ├── safemap.tsx        # Safe map screen
│   │   ├── guardians.tsx      # Guardians management
│   │   └── legal.tsx          # Legal rights
│   ├── _layout.tsx            # Root layout
│   └── modal.tsx              # Modal screens
├── assets/
│   └── images/                # App icons and images
├── app.json                   # Expo configuration
└── package.json              # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd her-guard
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally** (if not already installed)

   ```bash
   npm install -g expo-cli
   ```

4. **Start the development server**

   ```bash
   npx expo start
   # or
   npm start
   ```

5. **Run on device/emulator**
   ```bash
   # Scan QR code with Expo Go app (physical device)
   # Press 'a' for Android emulator
   # Press 'i' for iOS simulator (macOS only)
   ```

### Environment Setup

#### For Android Development

1. Install Android Studio
2. Set up Android Virtual Device (AVD)
3. Enable Developer Options on physical device
4. Enable USB Debugging

#### For iOS Development (macOS only)

1. Install Xcode
2. Install iOS Simulator
3. Set up Apple Developer Account (for physical device testing)

## 🎨 UI/UX Design

### Color Scheme

```css
Primary: #BF40BF (Medium Purple)
Accent Pink: #FFB6C1
Accent Purple: #DA70D6
Background: #F5F0F5
Text: #333333
Success: #4CAF50
Warning: #FF0000
```

### Design Principles

- **Minimalist interface** for emergency situations
- **Large touch targets** for easy interaction
- **High contrast** colors for visibility
- **Intuitive navigation** with bottom tabs
- **Dark/light theme** support

## 🔧 Configuration

### app.json Setup

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow HERGuard to use your location for emergency alerts and safe navigation."
        }
      ]
    ],
    "android": {
      "permissions": ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"]
    }
  }
}
```

## 📱 Platform Support

### Currently Supported

- ✅ Android (Primary)
- ✅ iOS (Development)
- ✅ Web (Limited functionality)

### Device Requirements

- Android 6.0+ (API 23+)
- iOS 13.0+
- GPS capability
- Internet connectivity (with offline fallback)

## 🤝 Contributing

We welcome contributions from developers who are passionate about women's safety and technology.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Areas for Contribution

- **UI/UX improvements**
- **New safety features**
- **Bug fixes and performance optimization**
- **Localization (Bangla language support)**
- **Backend integration**
- **Testing and documentation**

### Development Guidelines

- Follow React Native best practices
- Use TypeScript for type safety
- Maintain consistent code style
- Write meaningful commit messages
- Test on both Android and iOS when possible

## 🐛 Troubleshooting

### Common Issues

1. **Plugin configuration errors**

   ```bash
   npx expo start --clear
   ```

2. **Location permissions not working**

   - Check app.json configuration
   - Verify device location settings
   - Test on physical device

3. **Build failures**
   ```bash
   rm -rf node_modules
   npm install
   npx expo start -c
   ```

### Debugging Tips

- Use React Native Debugger
- Check Expo DevTools
- Test on physical devices
- Monitor console logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Bangladesh Women's Rights Organizations
- React Native and Expo communities
- Open-source contributors
- Safety advocates and testers

## 📞 Support

For technical support or safety feature suggestions:

- Create an issue on GitHub
- Contact the development team
- Join our community discussions

---

**HERGuard - Empowering Women Through Technology** 🛡️

_Built with ❤️ for a safer tomorrow_
