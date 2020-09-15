import React from 'react'
import Quizzes from '../data/quizzes'
import {get, find} from 'lodash'
import QuizTemplate from '../components/quiz'

function Quiz({quiz}) {
  return (
    <>
      <QuizTemplate quiz={quiz} />
    </>
  )
}

export async function getStaticPaths() {
  const paths = Quizzes.map((quiz) => ({
    params: {
      slug: get(quiz, 'slug'),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const quiz = find(Quizzes, {id: context.params.slug})

  return {
    props: {
      quiz,
    },
  }
}

export default Quiz
