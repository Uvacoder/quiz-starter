import Head from 'next/head'
import MockData from 'data/quizzes'
import {createServer} from 'miragejs'
import useEggheadQuiz from 'hooks/useEggheadQuiz'
import QuestionToShow from 'components/quiz/questionToShow'
import AnsweredQuestionToShow from 'components/quiz/answeredQuestionToShow'
import {filter, map} from 'lodash'
import {Element} from 'react-scroll'

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
    nextQuestionId,
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
      <main className="flex flex-col items-center justify-center min-h-screen w-full md:py-32 py-0">
        {state.matches('initializing') ? (
          'loading...'
        ) : (
          <>
            {map(
              filter(state.context.answers, (a) => a.id !== currentQuestion.id),
              (answer) => (
                <AnsweredQuestionToShow
                  key={answer.id}
                  question={answer}
                  answers={state.context.answers}
                  quizId={QUIZ_ID}
                  currentAnswer={answer}
                  // answered -> disabled
                  handleSubmit={() => {}}
                  handleContinue={() => {}}
                  isDisabled={true}
                />
              ),
            )}
            <QuestionToShow
              question={currentQuestion}
              currentAnswer={currentAnswer}
              state={state}
              handleSubmit={handleSubmit}
              handleContinue={handleContinue}
              isDisabled={isDisabled}
            />
            <Element name={nextQuestionId} />
          </>
        )}
      </main>
    </>
  )
}
