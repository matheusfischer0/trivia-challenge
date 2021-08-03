import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useQuiz } from "../../hooks/quiz";

export default function ResultScreen() {
  const { navigate } = useNavigation();
  const { questions, answers, numberOfQuestions, resetQuiz } = useQuiz();

  function countCorrect() {
    let sumOfCorrects = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct) {
        sumOfCorrects += 1;
      }
    }
    return sumOfCorrects;
  }

  async function handleResetQuiz() {
    await resetQuiz();
    navigate("Home");
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>You scored</Text>
        <Text
          style={styles.score}
        >{`${countCorrect()}/${numberOfQuestions}`}</Text>
        {answers.map((answer, i) => (
          <View key={i} style={styles.answerBox}>
            <Text style={styles.answerIcon}>{answer.correct ? "+" : "-"}</Text>
            <Text style={styles.answer}>
              {`${decode(questions[answer.questionId].question)}`}
            </Text>
          </View>
        ))}
        <TouchableOpacity style={styles.reset} onPress={handleResetQuiz}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  answerBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    paddingVertical: 10,
  },
  answer: {
    flex: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  answerIcon: {
    flex: 1,
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
  score: {
    fontSize: 26,
    textAlign: "center",
  },
  reset: {
    backgroundColor: "#ff9f9f",
    alignItems: "center",
    padding: 10,
    margin: 20,
  },
  resetText: {
    fontSize: 26,
  },
});
