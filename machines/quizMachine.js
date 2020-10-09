import {createMachine, assign} from 'xstate'
import {get, find, first, filter, isEmpty} from 'lodash'
import {fetchQuizData} from 'utils/fetchQuizData'

export const quizMachine = createMachine(
  {
    id: 'quiz',
    initial: 'initializing',
    context: {
      questions: null,
      currentQuestionId: '1',
      answers: [],
      slug: null,
    },
    states: {
      initializing: {
        invoke: {
          id: 'fetch-questions',
          src: 'fetchQuizData',
          onDone: {
            target: 'idle',
            actions: assign({
              questions: (context, event) => {
                const {data} = event
                console.log({data})
                const questions = get(
                  first(filter(data, (quiz) => quiz.slug === context.slug)),
                  'questions',
                )
                // console.log({questions})
                return questions
              },
            }),
          },
        },
        always: [{target: 'idle', cond: 'questionsArePresent'}],
        // entry: assign({
        //   questions: (ctx, _e) => {
        //     return ctx.questions
        //   },
        // }),
      },
      idle: {
        on: {
          SUBMIT: {
            target: 'answering',
            actions: assign({
              answers: (context, event) => {
                const {answers} = context
                return [...answers, event]
              },
            }),
          },
        },
      },
      answering: {
        invoke: {
          id: 'postingAnswer',
          src: (context, event) => {
            const {answers, currentQuestionId} = context
            const answer = get(
              find(answers, {question: {id: currentQuestionId}}),
              'answer',
            )
            console.log({answer})

            // return axios.post()
            return new Promise((resolve, reject) => {
              if (true) {
                resolve()
              } else {
                reject()
              }
            })
          },
          onDone: {target: 'answered'},
          onError: {target: 'failure'},
        },
        // on: {'': [{target: 'answered'}]},
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
      failure: {
        always: [{target: 'idle'}],
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
      fetchQuizData: (ctx) => fetchQuizData(ctx.slug),
    },
  },
)

// export const quizMachine = createMachine({
//   id: 'quiz',
//   initial: 'welcome',
//   context: {
//     currentQuestion: 0,
//     currentQuestionDisplay: 1,
//     questions: [],
//     answeredQuestions: [],
//     totalAnswered: 0,
//   },
//   states: {
//     welcome: {
//       on: {
//         START_QUIZ: 'loading',
//       },
//     },
//     loading: {
//       invoke: {
//         id: 'getQuizData',
//         // src: 'fetchQuizData',
//         src: (context, event) => fetchQuizData(),
//         onDone: {
//           target: 'quiz',
//           //   actions: () => console.log('onDone action'),
//           actions: assign({
//             questions: (_, event) => event.data,
//           }),
//         },
//         onError: {
//           target: 'failure',
//         },
//       },
//     },
//     failure: {
//       on: {
//         RETRY: 'loading',
//         START_OVER: 'welcome',
//       },
//     },
//     quiz: {
//       on: {
//         '': {
//           target: 'results',
//           actions: [],
//           //   cond: 'allQuestionsAnswered',
//         },

//         ANSWER_FALSE: {
//           actions: 'updateAnswer',
//         },
//         ANSWER_TRUE: {
//           actions: 'updateAnswer',
//         },
//       },
//     },
//     results: {
//       on: {
//         PLAY_AGAIN: 'welcome',
//       },
//       exit: 'resetQuiz', // just save it instead of reset?
//     },
//   },
//   //   actions: {
//   //     resetGame: assign({
//   //       currentQuestion: 0,
//   //       currentQuestionDisplay: 1,
//   //       questions: [],
//   //       answeredQuestions: [],
//   //       totalAnswered: 0,
//   //     }),
//   //     updateAnswer: assign((ctx, event) => ({
//   //       questions: [
//   //         ...ctx.questions.slice(0, ctx.currentQuestion),
//   //         {
//   //           ...ctx.questions[ctx.currentQuestion],
//   //           userAnswer: event.answer,
//   //           correct:
//   //             ctx.questions[ctx.currentQuestion].correctAnswer === event.answer,
//   //         },
//   //         ...ctx.questions.slice(ctx.currentQuestion + 1),
//   //       ],
//   //       totalAnswered:
//   //         ctx.questions[ctx.currentQuestion].correctAnswer === event.answer
//   //           ? (ctx.totalCorrectAnswers += 1)
//   //           : ctx.totalCorrectAnswers,
//   //       currentQuestion: (ctx.currentQuestion += 1),
//   //       currentQuestionDisplay: (ctx.currentQuestionDisplay += 1),
//   //     })),
//   //   },
//   guards: {
//     allQuestionsAnswered: (ctx) => {
//       return (
//         ctx.questions.filter((question) => question.correct !== undefined)
//           .length === ctx.questions.length && true
//       )
//     },
//   },
//   services: {
//     fetchQuizData: () => fetchQuizData(),
//   },
// })
