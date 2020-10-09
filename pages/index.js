import Head from 'next/head'
import QuestionToShow from 'components/quiz/questionToShow'

import MockData from 'data/quizzes'
import {createServer} from 'miragejs'

import useEggheadQuizMachine from 'hooks/useEggheadQuizMachine'
import useEggheadQuestionMachine from 'hooks/useEggheadQuestionMachine'

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
    nextQuestionId,
    handleContinue,
    handleSubmit,
    isCurrentQuestionAnswered,
    isDisabled,
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
      <main>
        <div>
          {state.matches('initializing') ? (
            'loading...'
          ) : (
            <QuestionToShow
              state={state}
              question={currentQuestion}
              formik={formik}
              handleContinue={handleContinue}
              isAnswered={isCurrentQuestionAnswered}
              isDisabled={isDisabled}
            />
          )}
        </div>
      </main>
    </>
  )
}
