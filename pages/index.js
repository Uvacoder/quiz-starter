import Head from 'next/head'
import Link from 'next/link'
// import {first, indexOf, find, get} from 'lodash'
// import {useMachine} from '@xstate/react'
// import {quizMachine} from 'machines/quizMachine'

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
    currentQuestion,
    nextQuestionId,
    handleContinue,
    handleSubmit,
    state,
  } = useEggheadQuizMachine(
    'demo', // quiz identifier (slug or id)
  )

  const {formik} = useEggheadQuestionMachine(currentQuestion, handleSubmit)

  console.log(nextQuestionId)
  console.log(state)

  return (
    <div className="container">
      <Head>
        <title>Quiz Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {state.matches('initializing') ? (
            'loading...'
          ) : (
            <>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  {/* {questions.map((question) => (
                <div key={question.id}>{question.text}</div>
              ))} */}
                  {currentQuestion && currentQuestion.text}
                  <label>
                    Your answer
                    <textarea
                      // disabled={isSubmitted}
                      name="value"
                      placeholder="Type your answer here..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.value}
                    />
                  </label>
                </div>
                {!state.matches('answered') && (
                  <button type="submit">submit</button>
                )}
              </form>
              {state.matches('answered') && (
                <button type="button" onClick={handleContinue}>
                  continue
                </button>
              )}
            </>
          )}
        </div>
        {/* <div style={{opacity: 0.2}}>
          <Link href={'/[slug]'} as="/demo">
            <a>
              <h3>Quiz Demo</h3>
            </a>
          </Link>
          <button onClick={() => send('START_QUIZ')}>Start</button>
        </div> */}
      </main>
    </div>
  )
}
