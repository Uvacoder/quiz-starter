import React from 'react'
import {findIndex} from 'lodash'

export default function useEggheadQuiz(quiz) {
  const {questions} = quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)

  function onSubmit(values, actions, question) {
    const now = Date.now()
    const date = new Date(now).toUTCString()
    const context = {quizId: quiz.id, questionId: question.id, date}
    const response = {...values, question, context}
    console.log({response})
  }

  function getQuestionIndex(question) {
    findIndex(questions, {id: question.id})
  }

  function nextQuestion(question) {
    const currentQuestionIndex = findIndex(questions, {id: question.id})
    return questions[currentQuestionIndex + 1]
  }

  return {questions, nextQuestion, onSubmit, getQuestionIndex}
}
