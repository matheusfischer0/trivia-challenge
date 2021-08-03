import "react-native-gesture-handler";
import React from "react";
import Routes from "./src/routes";
import { QuizProvider } from "./src/hooks/quiz";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <QuizProvider>
      <StatusBar style="dark" />
      <Routes />
    </QuizProvider>
  );
}
