import { Stack } from "expo-router";

// Import your global CSS file
import "../global.css";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar animated translucent={false} backgroundColor="#dda15e" />
      <Stack
        screenOptions={{
          // headerShown: false,
          header: () => <Header />,
        }}
      ></Stack>
    </>
  );
}
