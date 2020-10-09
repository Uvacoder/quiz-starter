export const fetchQuizData = (slug) => {
  return fetch(`/api/quiz`).then((res) =>
    res.json().then((data) => {
      return data
    }),
  )
}
