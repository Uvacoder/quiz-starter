import Head from 'next/head'
import MockData from 'data/quizzes'
import {createServer} from 'miragejs'
import useEggheadQuiz from '@/hooks/useEggheadQuiz'
import QuestionToShow from 'components/quiz/questionToShow'

const QUIZ_ID = 'demo'

createServer({
  routes() {
    this.get(`/api/quiz/${QUIZ_ID}`, () => MockData[0]) // first quiz being a demo quiz
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
  } = useEggheadQuiz(QUIZ_ID)

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
