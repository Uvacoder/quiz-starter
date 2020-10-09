import {get, map, filter} from 'lodash'
import Head from 'next/head'
import MockData from 'data/quizzes'
import {createServer} from 'miragejs'
import useEggheadQuiz from '@/hooks/useEggheadQuiz'
import useEggheadQuestion from '@/hooks/useEggheadQuestion'
import QuestionToShow from 'components/quiz/questionToShow'
import AnsweredQuestionToShow from 'components/quiz/answeredQuestionToShow'
import {Element, scroller} from 'react-scroll'

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
    nextQuestionId,
  } = useEggheadQuiz(QUIZ_ID)

  const {formik} = useEggheadQuestion(currentQuestion, handleSubmit)

  // React.useEffect(() => {
  //   scroller.scrollTo(get(currentQuestion, 'id'), {
  //     dynamic: true,
  //     smooth: 'easeInOut',
  //     duration: 250,
  //   })
  // }, [currentQuestion])

  console.log(state)

  return (
    <>
      <Head>
        <title>Quiz Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center min-h-screen w-full ">
        {/* ukaz currentQuestion a zbytek ber z answers!!!! */}
        {state.matches('initializing') ? (
          'loading...'
        ) : (
          <>
            <div className="opacity-75">
              {map(
                filter(
                  state.context.answers,
                  // all answers but current one
                  (a) => a.id !== currentQuestion.id,
                ),
                (a) => {
                  return (
                    <div
                      key={a.id}
                      className="flex flex-col items-center justify-start lg:pt-32 sm:pt-16 pt-4"
                    >
                      <AnsweredQuestionToShow
                        quizId={QUIZ_ID}
                        question={a}
                        formik={formik}
                        key={a.id}
                        answeredState={state}
                        handleSubmit={handleSubmit}
                        handleContinue={handleContinue}
                        currentAnswer={currentAnswer}
                        // answered -> disable
                        isDisabled={true}
                      />
                    </div>
                  )
                },
              )}
            </div>
            <div className="w-full min-h-screen flex flex-col items-center justify-start lg:py-32 sm:py-16 py-4">
              <QuestionToShow
                formik={formik}
                state={state}
                handleSubmit={handleSubmit}
                question={currentQuestion}
                handleContinue={handleContinue}
                currentAnswer={currentAnswer}
                isDisabled={isDisabled}
              />
              <Element name={get(currentQuestion, 'id')} />
            </div>
          </>
        )}
      </main>
    </>
  )
}
