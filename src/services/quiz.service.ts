import { api } from "./api";

export async function getQuestions() {
  return await api.get("/", {
    params: {
      amount: 10,
      difficulty: "hard",
      type: "boolean",
    },
  });
}
