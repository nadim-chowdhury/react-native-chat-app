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
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="AccountSettingsScreen" />
        <Stack.Screen name="AppSettingsScreen" />
        {/* <Stack.Screen name="AuthScreen" /> */}
        <Stack.Screen name="ChatScreen" />
        <Stack.Screen name="ConversationsListScreen" />
        <Stack.Screen name="DialerScreen" />
        <Stack.Screen name="FileManagerScreen" />
        <Stack.Screen name="ForgotPasswordScreen" />
        <Stack.Screen name="GroupChatScreen" />
        <Stack.Screen name="GroupChatScreen2" />
        <Stack.Screen name="GroupDetailsScreen" />
        <Stack.Screen name="GroupListScreen" />
        {/* <Stack.Screen name="CallScreen" /> */}
        {/* <Stack.Screen name="InCallScreen" /> */}
        <Stack.Screen name="IncomingCallScreen" />
        <Stack.Screen name="IndividualChatScreen" />
        <Stack.Screen name="LoginScreen" />
        <Stack.Screen name="MediaGalleryScreen" />
        <Stack.Screen name="MediaScreen" />
        <Stack.Screen name="NotificationsScreen" />
        <Stack.Screen name="ProfileSettingsScreen" />
        <Stack.Screen name="RegisterScreen" />
        <Stack.Screen name="SettingsScreen" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
