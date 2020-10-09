import Head from 'next/head'
import QuestionToShow from 'components/quiz/questionToShow'

import MockData from 'data/quizzes'
import {createServer} from 'miragejs'

import useEggheadQuizMachine from '@/hooks/useEggheadQuiz'
import useEggheadQuestionMachine from '@/hooks/useEggheadQuestion'

createServer({
  routes() {
    this.get('/api/quiz', () => MockData)
    this.passthrough()
  },
})

export default function Home() {
  const {
    state,
    currentQuestion,
    handleContinue,
    handleSubmit,
    isDisabled,
    currentAnswer,
    nextQuestionId,
    isCurrentQuestionAnswered,
  } = useEggheadQuizMachine(
    'demo', // quiz identifier (slug or id)
  )

  const {formik} = useEggheadQuestionMachine(currentQuestion, handleSubmit)

  // useEggheadQuizProgress()

  console.log(state)

  return (
    <>
      <Head>
        <title>Quiz Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center min-h-screen w-full md:py-32 py-0">
        {state.matches('initializing') ? (
          'loading...'
        ) : (
          <QuestionToShow
            state={state}
            question={currentQuestion}
            formik={formik}
            handleContinue={handleContinue}
            currentAnswer={currentAnswer}
            isDisabled={isDisabled}
          />
        )}
      </main>
    </>
  )
}
