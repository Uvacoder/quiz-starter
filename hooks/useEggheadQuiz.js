import React from 'react'
import {findIndex, find, isEmpty} from 'lodash'
import {useLocalStorage} from 'react-use'

export default function useEggheadQuiz(quiz) {
  const {questions} = quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)

  const [completedQuestions, setCompleted, resetCompleted] = useLocalStorage(
    quiz.id,
    [],
  )

  function isCompleted(question) {
    return !isEmpty(find(completedQuestions, {id: question.id}))
  }

  function markCompleted(question) {
    !isCompleted(question) && setCompleted([question, ...completedQuestions])
  }

  function resetQuizProgress(condition = true) {
    if (condition) {
      resetCompleted()
      window.location.reload()
    } else return null
  }

  function onSubmit(values, actions, question) {
    const now = Date.now()
    const date = new Date(now).toUTCString()
    const context = {quizId: quiz.id, questionId: question.id, date}
    const response = {...values, question, context}
    console.log({response})
    window.alert(JSON.stringify(response, null, 2))
    markCompleted(question)
  }

  function questionIndex(question) {
    findIndex(questions, {id: question.id})
  }

  function nextQuestion(question) {
    const currentQuestionIndex = findIndex(questions, {id: question.id})
    return questions[currentQuestionIndex + 1]
  }

  return {
    questions,
    nextQuestion,
    questionIndex,
    onSubmit,
    resetQuizProgress,
    isCompleted,
  }
}
