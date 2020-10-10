import {get} from 'lodash'
import {useMachine} from '@xstate/react'
import {quizMachine} from 'machines/quizMachine'

import {
  MultipleChoice,
  Essay,
  Theater,
  Sketch,
  MultipleImageChoice,
} from 'components/quiz'

export default function AnsweredQuestionToShow({
  question,
  answers,
  quizId,
  ...props
}) {
  const [state, send] = useMachine(quizMachine, {
    context: {
      quizId: quizId,
      // Passing answers from main machine causes
      // this machine to skip initializing (loading).
      // Answers are just questions with answer value.
      questions: answers,
    },
  })

  //   console.log(state)

  let AnsweredQuestionToShow
  switch (get(question, 'type')) {
    case 'multiple-choice':
      AnsweredQuestionToShow = MultipleChoice
      break
    case 'multiple-image-choice':
      AnsweredQuestionToShow = MultipleImageChoice
      break
    case 'essay':
      AnsweredQuestionToShow = Essay
      break
    case 'theater':
      AnsweredQuestionToShow = Theater
      break
    case 'sketch':
      AnsweredQuestionToShow = Sketch
      break
    // case 'trueFalse':
    //   AnsweredQuestionToShow = TrueFalse
    //   break
    default:
      return null
  }
  return <AnsweredQuestionToShow question={question} state={state} {...props} />
}
