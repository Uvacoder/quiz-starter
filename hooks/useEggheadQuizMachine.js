import {useLocalStorage} from 'react-use'
import {useMachine} from '@xstate/react'
import {quizMachine} from 'machines/quizMachine'
import {first, indexOf, find, get} from 'lodash'

export default function useEggheadQuizMachine(slug) {
  const [state, send] = useMachine(quizMachine, {
    context: {
      slug: slug, // quiz identifier (slug or id)
    },
  })

  const {questions, currentQuestionId} = state.context
  const currentQuestion = questions && find(questions, {id: currentQuestionId})
  const currentQuestionIdx = questions && indexOf(questions, currentQuestion)
  const nextQuestionId =
    questions &&
    (currentQuestionIdx + 1 === questions.length
      ? get(first(questions), 'id')
      : get(questions[currentQuestionIdx + 1], 'id'))

  function handleContinue() {
    send('NEXT_QUESTION', {nextQuestionId: nextQuestionId})
  }
  function handleSubmit(values, actions) {
    send('SUBMIT', {answer: {...values}, question: {...currentQuestion}})
    // window.alert(JSON.stringify(values, null, 2))
    // send('NEXT_QUESTION', {nextQuestionId: nextQuestionId})
    // const now = Date.now()
    // const date = new Date(now).toUTCString()
    // const context = {} // {quizId: quiz.id, questionId: question.id, date}
    // const response = {...values, question, context}
    // console.log({response})
    // window.alert(JSON.stringify(response, null, 2))
    // markCompleted(question)
  }

  return {
    currentQuestion,
    nextQuestionId,
    state,
    send,
    handleContinue,
    handleSubmit,
  }
}
