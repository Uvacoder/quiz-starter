import {useMachine} from '@xstate/react'
import {quizMachine} from 'machines/quizMachine'
import {first, indexOf, find, get} from 'lodash'
import {useRouter} from 'next/router'
import {scroller} from 'react-scroll'

export default function useEggheadQuizMachine(quizId) {
  const [state, send] = useMachine(quizMachine, {
    context: {
      quizId: quizId,
    },
  })

  const {questions, currentQuestionId, answers} = state.context
  const currentQuestion = questions && find(questions, {id: currentQuestionId})
  const currentQuestionIdx = questions && indexOf(questions, currentQuestion)
  const nextQuestionId =
    questions &&
    (currentQuestionIdx + 1 === questions.length
      ? get(first(questions), 'id') // go back to first question
      : get(questions[currentQuestionIdx + 1], 'id'))
  const isCurrentQuestionAnswered = find(state.context.answers, {
    id: currentQuestionId,
  })
  const currentAnswer = find(answers, {id: currentQuestionId})
  const isDisabled = state.matches('answering') || state.matches('answered')

  const router = useRouter()
  function handleContinue() {
    if (currentQuestionIdx + 1 === questions.length) {
      router.push(`/completed?quiz=${quizId}`)
    } else {
      send('NEXT_QUESTION', {nextQuestionId: nextQuestionId})
      scroller.scrollTo(get(currentQuestion, 'id'), {
        smooth: 'easeInOutQuint',
        delay: 100,
        duration: 1050,
      })
    }
  }
  function handleSubmit(values, _actions) {
    // const now = Date.now()
    // const date = new Date(now).toUTCString()
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
    currentAnswer,
  }
}
