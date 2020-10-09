import {get} from 'lodash'
import {
  MultipleChoice,
  Essay,
  Theater,
  Sketch,
  MultipleImageChoice,
} from 'components/quiz'
import useEggheadQuestion from '@/hooks/useEggheadQuestion'
import {quizMachine} from 'machines/quizMachine'
import {useMachine} from '@xstate/react'

// this actually gives nice control over answered questions
// and should make it easier to update one's answeres
// we're taking questions from "main" machine so that
// which skips it's initialize state (doesn't fetch)

export default function AnsweredQuestionToShow({
  question,
  answeredState,
  quizId,
  isDisabled,
  // reset handlers
  handleContinue = () => {},
  handleSubmit = () => {},
  ...props
}) {
  const {formik} = useEggheadQuestion(question, props.handleSubmit)
  const [state, send] = useMachine(quizMachine, {
    context: {
      // load answers as questions from parent
      // also avoids reinitializing
      questions: answeredState.context.answers,
      // dont care about quizId anymore here
      // quizId: quizId,
      // dont need this either
      // answers: answeredState.context.answers,
    },
  })

  // console.log('answered state:', state)

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
    //   QuestionToShow = TrueFalse
    //   break
    default:
      return null
  }

  return (
    <AnsweredQuestionToShow
      // 3x question is weird
      currentQuestion={question}
      question={question}
      currentAnswer={question}
      formik={formik}
      state={state}
      handleContinue={handleContinue}
      handleSubmit={handleSubmit}
      // currentAnswer={currentAnswer}
      isDisabled={isDisabled}
      // {...props}
    />
  )
}
