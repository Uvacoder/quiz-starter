import Head from 'next/head'
import MockData from 'data/quizzes'
import {createServer} from 'miragejs'
import useEggheadQuiz from '@/hooks/useEggheadQuiz'
import QuestionToShow from 'components/quiz/questionToShow'

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
  } = useEggheadQuiz(
    'demo', // quiz id
  )

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
            // formik={formik}
            state={state}
            handleSubmit={handleSubmit}
            question={currentQuestion}
            handleContinue={handleContinue}
            currentAnswer={currentAnswer}
            isDisabled={isDisabled}
          />
        )}
      </main>
    </>
  )
}
