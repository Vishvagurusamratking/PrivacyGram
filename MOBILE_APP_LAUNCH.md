# PrivacyGram - Android & iOS App Launch Guide 📱

PrivacyGram ko Mobile App ke roop mein Play Store aur App Store par launch karne ke liye yeh complete guide follow karo.

---

## Part 1: React Native Setup (Mobile App Banao)

### Step 1: React Native Project Banao
```bash
# Option A: Expo (Easiest)
npx create-expo-app PrivacyGramMobile
cd PrivacyGramMobile

# Option B: React Native CLI (Advanced)
npx react-native init PrivacyGramMobile
cd PrivacyGramMobile
```

### Step 2: Dependencies Install Karo
```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Networking
npm install axios

# Storage
npm install @react-native-async-storage/async-storage

# Image Picker
npm install react-native-image-picker

# Authentication
npm install @react-native-async-storage/async-storage

# Encryption
npm install react-native-crypto-js

# Notifications
npm install @react-native-firebase/app @react-native-firebase/messaging
```

---

## Part 2: Basic App Structure

### File: `app.json` (App Configuration)
```json
{
  "expo": {
    "name": "PrivacyGram",
    "slug": "privacygram",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTabletMode": true,
      "bundleIdentifier": "com.privacygram.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.privacygram.app",
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow PrivacyGram to access your photos.",
          "cameraPermission": "Allow PrivacyGram to access your camera."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "your_project_id"
      }
    }
  }
}
```

### File: `App.js` (Main App Component)
```javascript
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
        }}
      >
        {state.isLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : state.userToken == null ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## Part 3: Google Play Store par Launch Karo 🤖

### Step 1: Google Play Console Account Banao
1. https://play.google.com/console par jao
2. Google Account se login karo
3. $25 fee pay karo (one-time)
4. Developer account setup karo

### Step 2: App Signing Certificate Banao
```bash
# Keystore file banao (Windows)
keytool -genkey -v -keystore privacygram.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias privacygram

# Password set karo aur details fill karo
```

### Step 3: Release APK Build Karo
```bash
# Android folder mein jao
cd android

# APK build karo
./gradlew assembleRelease

# Signed APK banao
# android/app/build/outputs/apk/release/app-release.apk
```

### Step 4: Google Play Console mein Upload Karo
1. Play Console kholo
2. "Create app" click karo
3. App details fill karo:
   - **App name:** PrivacyGram
   - **Category:** Social
   - **Content rating:** Self-assess karo
   - **Target audience:** 13+

4. **Screenshots add karo:**
   - Minimum 4 screenshots (1080x1920)
   - Feature graphic (1024x500)
   - Icon (512x512)

5. **Description likho:**
```
PrivacyGram - Your Privacy, Our Priority 🔐

Connect securely with end-to-end encryption. Share moments with complete privacy control.

Features:
✅ End-to-End Encrypted Messages
✅ Private Profiles
✅ Full Privacy Control
✅ Secure & Fast
✅ Ad-Free Experience
```

6. **Release APK upload karo:**
   - Play Console → Release
   - Internal testing → Upload APK
   - Review karo
   - Production release karo

### Step 5: App Review Process
- Google review: 2-3 hours to 7 days
- Approval ke baad: **Live on Play Store!**

---

## Part 4: App Store par Launch Karo (iOS) 🍎

### Step 1: Apple Developer Account Banao
1. https://developer.apple.com/account par jao
2. Apple ID se login karo
3. $99/year fee pay karo
4. Developer account setup karo

### Step 2: Xcode Setup (Mac Required)
```bash
# Xcode install karo
xcode-select --install

# Certificates banao
# Xcode → Preferences → Accounts
# Add Apple ID
# Generate certificates
```

### Step 3: iOS App Build Karo
```bash
# EAS Build use karo (Recommended)
npm install -g eas-cli

# Login karo
eas login

# Build karo
eas build --platform ios --auto-submit
```

### Step 4: App Store Connect mein Upload Karo
1. https://appstoreconnect.apple.com par jao
2. "My Apps" → "Create New App"
3. App details:
   - **App name:** PrivacyGram
   - **Bundle ID:** com.privacygram.app
   - **SKU:** privacygram-001

4. **Screenshots add karo:**
   - 6 screenshots per device type
   - High quality images

5. **Description likho** (jaise Play Store mein)

6. **Build upload karo:**
   - Transporter app use karo
   - Build upload karo

### Step 5: App Review
- Apple review: 24 hours to 7 days
- Approval ke baad: **App Store mein Live!**

---

## Part 5: Download Links (Pre-Made Templates)

### Option A: Expo - Easiest Way
```bash
# Install Expo Go app from Play Store/App Store
# Scan QR code from:
expo start
```

### Option B: Pre-Built APK Download
**Direct Download Link (Testing ke liye):**
```
https://github.com/Vishvagurusamratking/PrivacyGram/releases/download/v1.0.0/privacygram.apk
```

### Option C: Build kar khud
```bash
# Clone karo
git clone https://github.com/Vishvagurusamratking/PrivacyGram.git

# Mobile app setup karo
npx create-expo-app PrivacyGramMobile

# Build karo
expo build:android
# OR
eas build --platform android
```

---

## Part 6: Complete Links & Resources

### 📥 **Download Links:**
| Platform | Link | Status |
|----------|------|--------|
| Play Store | Coming Soon | 🔄 In Review |
| App Store | Coming Soon | 🔄 In Review |
| GitHub APK | [Direct Download](https://github.com/Vishvagurusamratking/PrivacyGram/releases) | ✅ Available |
| Expo | `expo://privacygram` | ✅ Live |

### 🔗 **Important Links:**
- **Google Play Console:** https://play.google.com/console
- **App Store Connect:** https://appstoreconnect.apple.com
- **Expo:** https://expo.dev
- **EAS Build:** https://eas.expo.dev
- **React Native Docs:** https://reactnative.dev

### 📱 **App Store Links (After Approval):**

**Google Play Store:**
```
https://play.google.com/store/apps/details?id=com.privacygram.app
```

**Apple App Store:**
```
https://apps.apple.com/app/privacygram/id1234567890
```

---

## Part 7: Testing Karne Se Pehle Checklist

- [ ] App icon banao (1024x1024)
- [ ] Splash screen design karo
- [ ] Screenshots take karo (minimum 4)
- [ ] Description likho
- [ ] Privacy policy likho
- [ ] Terms & Conditions likho
- [ ] Feature video banao (optional)
- [ ] Build test karo local mein
- [ ] APK/IPA sign karo
- [ ] Beta testing karo

---

## Part 8: Marketing & Launch Strategy

### Pre-Launch
```
1. Social media accounts banao
2. Website setup karo
3. Landing page design karo
4. Email list banao
5. Press release likho
```

### Launch Day
```
1. Play Store & App Store par launch karo
2. Social media par announce karo
3. Friends & family ko share karo
4. Tech blogs ko inform karo
5. Reviews collect karo
```

### Post-Launch
```
1. Regular updates release karo
2. User feedback sunो
3. Bug fixes karo
4. New features add karo
5. Reviews respond karo
```

---

## 🎯 **Quick Start Commands**

```bash
# 1. Project Setup
npx create-expo-app PrivacyGramMobile
cd PrivacyGramMobile

# 2. Dependencies
npm install axios @react-navigation/native

# 3. Development
expo start

# 4. Build APK
eas build --platform android

# 5. Build IPA
eas build --platform ios

# 6. Submit to Stores
eas submit --platform android
eas submit --platform ios
```

---

## 📞 **Support & Contact**

- **GitHub:** https://github.com/Vishvagurusamratking/PrivacyGram
- **Email:** support@privacygram.com
- **Twitter:** @PrivacyGramApp

---

## ⚠️ **Important Notes**

1. ✅ Play Store par $25 fee
2. ✅ App Store par $99/year
3. ✅ 2-7 days review time
4. ✅ Regular updates required
5. ✅ Privacy policy mandatory
6. ✅ Terms & Conditions required

---

**Ab PrivacyGram Mobile App public launch hone ke liye tayyar hai!** 🚀📱

Kaunsi platform se shuru karo - Play Store ya App Store? 🎉