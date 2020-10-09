import {createServer} from 'miragejs'
import {filter, first} from 'lodash'
import MockData from 'data/quizzes'

export const fetchQuizData = (slug) => {
  return fetch(`/api/quiz`).then((res) =>
    res.json().then((data) => {
      return data
    }),
  )
}
