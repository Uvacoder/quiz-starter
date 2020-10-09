import React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'

export default function Completed() {
  const router = useRouter()
  const quizId = router.query.quiz

  return (
    <>
      <Head>
        <title>Quiz Completed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center text-center justify-center min-h-screen w-full text-xl">
        {quizId} quiz completed 🙌
      </main>
    </>
  )
}
