This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Clone the project to your system
```bash
git clone https://github.com/NewAgeSMBDevelopers/RNBoilerPlateApp.git
```

## Step 2: Update the origin
```bash
git remote remove origin
git remote add origin NEW_URL
# Verify the origin
git remote -v
```

## Step 3: Rename The Project and package name/bundleId
### 1. Install `react-native-rename`
```bash
npm install -g react-native-rename
```
#### 2. Change your project name and bundleID
```bash
npx react-native-rename "NewAppName" --bundleID "com.newname.app"
```
### 3. for android 
clean the build
```bash
cd android
./gradlew clean
```
## Step 4: Commit to new origin

# Newapp
