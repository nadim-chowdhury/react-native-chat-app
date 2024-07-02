import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="LoginScreen/index">
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="AuthScreen/index" />
        <Stack.Screen name="LoginScreen/index" />
        <Stack.Screen name="RegisterScreen/index" />
        <Stack.Screen name="AccountSettingsScreen/index" />
        <Stack.Screen name="AppSettingsScreen/index" />
        <Stack.Screen name="ChatScreen/index" />
        <Stack.Screen name="ConversationsListScreen/index" />
        <Stack.Screen name="DialerScreen/index" />
        <Stack.Screen name="FileManagerScreen/index" />
        <Stack.Screen name="ForgotPasswordScreen/index" />
        <Stack.Screen name="GroupChatScreen/index" />
        <Stack.Screen name="GroupChatScreen2/index" />
        <Stack.Screen name="GroupDetailsScreen/index" />
        <Stack.Screen name="GroupListScreen/index" />
        <Stack.Screen name="CallScreen/index" />
        <Stack.Screen name="InCallScreen/index" />
        <Stack.Screen name="IncomingCallScreen/index" />
        <Stack.Screen name="IndividualChatScreen/index" />
        <Stack.Screen name="MediaGalleryScreen/index" />
        <Stack.Screen name="MediaScreen/index" />
        <Stack.Screen name="NotificationsScreen/index" />
        <Stack.Screen name="ProfileSettingsScreen/index" />
        <Stack.Screen name="SettingsScreen/index" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
