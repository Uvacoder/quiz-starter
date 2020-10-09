import React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {fetchQuizData} from 'utils/fetchQuizData'
import MockData from 'data/quizzes'
import {createServer} from 'miragejs'

createServer({
  routes() {
    this.get(`/api/quiz/demo`, () => MockData[0]) // first quiz being a demo quiz
    this.passthrough()
  },
})

export default function Completed() {
  const [quiz, setQuiz] = React.useState()
  const router = useRouter()
  const quizId = router.query.quiz
  React.useEffect(() => {
    quizId && fetchQuizData(quizId).then((data) => setQuiz(data))
  }, [quizId])

  return (
    <>
      <Head>
        <title>Quiz Completed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center text-center justify-center min-h-screen w-full text-xl">
        {quiz?.id} quiz completed 🙌
      </main>
    </>
  )
}
