import {createMachine, assign} from 'xstate'
import {get, find, first, isEmpty} from 'lodash'
import {fetchQuizData} from 'utils/fetchQuizData'

export const quizMachine = createMachine(
  {
    id: 'quiz',
    initial: 'initializing',
    title: 'Demo Quiz',
    context: {
      questions: null,
      currentQuestionId: null,
      answers: [],
      quizId: null,
    },
    states: {
      initializing: {
        invoke: {
          id: 'fetch-questions',
          src: 'fetchQuizData',
          onDone: {
            target: 'idle',
            actions: assign({
              questions: (_context, event) => {
                const {data} = event
                const questions = get(data, 'questions')
                return questions
              },
              currentQuestionId: (_context, event) => {
                const {data} = event
                const questions = get(data, 'questions')
                const firstQuestionId = get(first(questions), 'id')
                return firstQuestionId
              },
            }),
          },
        },
        always: [{target: 'idle', cond: 'questionsArePresent'}],
      },
      idle: {
        on: {
          SUBMIT: {
            target: 'answering',
            actions: assign({
              answers: (context, event) => {
                const {answers} = context
                return [...answers, event.answer]
              },
            }),
          },
        },
      },
      answering: {
        invoke: {
          id: 'postingAnswer',
          src: (context, _event) => {
            const {answers, currentQuestionId} = context
            const answer = find(answers, {id: currentQuestionId})
            // I'm just faking a promise here
            // could use axios.post() etc
            return new Promise((resolve, reject) => {
              if (true) {
                setTimeout(() => resolve(), 800)
              } else {
                reject()
              }
            })
          },

          onDone: {target: 'answered'},
          onError: {target: 'failure'}, // todo
        },
      },
      answered: {
        on: {
          NEXT_QUESTION: {
            target: 'idle',
            actions: assign({
              currentQuestionId: (_context, event) => {
                return event.nextQuestionId
              },
            }),
          },
        },
      },
      hist: {
        type: 'history',
        history: 'shallow',
      },
      failure: {
        always: [{target: 'idle'}], // todo
      },
    },
  },
  {
    guards: {
      questionsArePresent: (context, _event) => {
        return !isEmpty(context.questions)
      },
    },
    services: {
      fetchQuizData: (ctx) => fetchQuizData(ctx.quizId),
    },
  },
)
