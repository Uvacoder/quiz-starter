export const fetchQuizData = (quizId) => {
  return fetch(`/api/quiz/${quizId}`).then((res) =>
    res.json().then((data) => {
      return data
    }),
  )
}
