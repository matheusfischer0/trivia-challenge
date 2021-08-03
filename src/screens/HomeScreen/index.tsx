import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useQuiz } from "../../hooks/quiz";

export default function HomeScreen() {
  const { startQuiz } = useQuiz();
  const { navigate } = useNavigation();

  async function handleStartQuiz() {
    await startQuiz();
    navigate("QuizScreen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Trivia Challenge</Text>
      <Text style={styles.presentation}>
        You will be presented with 10 True or False questions
      </Text>
      <Text style={styles.question}>Can you score 100%?</Text>
      <TouchableOpacity onPress={handleStartQuiz}>
        <Text style={styles.start}>Begin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 50,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  presentation: {
    fontSize: 26,
    textAlign: "center",
  },
  question: {
    fontSize: 26,
    textAlign: "center",
  },
  start: {
    textTransform: "uppercase",
    fontSize: 26,
  },
});
