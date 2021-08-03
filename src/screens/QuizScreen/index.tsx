import { useNavigation } from "@react-navigation/native";
import { decode } from "html-entities";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useQuiz } from "../../hooks/quiz";

export default function QuizScreen() {
  const {
    numberOfQuestions,
    activeQuestionId,
    activeQuestion,
    answerQuestion,
  } = useQuiz();
  const { navigate } = useNavigation();

  async function handleAnswer(answer: string) {
    await answerQuestion(answer);
    if (activeQuestionId + 1 === numberOfQuestions) {
      navigate("ResultScreen");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.category}>{activeQuestion.category}</Text>
      <View style={styles.content}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>{decode(activeQuestion.question)}</Text>
        </View>
      </View>
      <View style={styles.answerBox}>
        <TouchableOpacity
          onPress={() => handleAnswer("False")}
          style={[styles.answer, styles.false]}
        >
          <Text style={styles.answerText}>False</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAnswer("True")}
          style={[styles.answer, styles.true]}
        >
          <Text style={styles.answerText}>True</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.questionNumber}>{`${
        activeQuestionId + 1
      } of ${numberOfQuestions}`}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
  },
  category: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  questionBox: {
    height: 250,
    width: "90%",
    borderWidth: 1,
    borderColor: "#3f3f3f",
    justifyContent: "center",
    padding: 20,
  },
  question: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
  answerBox: {
    marginTop: 15,
    flexDirection: "row",
  },
  answer: {
    justifyContent: "center",
    flex: 1,
  },
  answerText: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  true: {
    backgroundColor: "#9fff9f",
  },
  false: {
    backgroundColor: "#ff9f9f",
  },
  questionNumber: {
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
