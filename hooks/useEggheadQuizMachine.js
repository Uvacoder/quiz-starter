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
  const isCurrentQuestionAnswered = find(state.context.answers, {
    id: currentQuestionId,
  })
  const isDisabled = state.matches('answering') || state.matches('answered')

  function handleContinue() {
    send('NEXT_QUESTION', {nextQuestionId: nextQuestionId})
  }
  function handleSubmit(values, actions) {
    const now = Date.now()
    const date = new Date(now).toUTCString()
    // const context = {quizId: quiz.id, questionId: question.id, date}
    // const response = {...values, question, context}
    send('SUBMIT', {answer: {...values, ...currentQuestion}})
  }

  return {
    currentQuestion,
    nextQuestionId,
    state,
    send,
    handleContinue,
    handleSubmit,
    isDisabled,
    isCurrentQuestionAnswered,
  }
}
