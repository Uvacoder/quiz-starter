import {MultipleChoice, Essay, Theater, Sketch} from 'components/quiz'

export default function QuestionToShow({question, ...props}) {
  let QuestionToShow
  switch (question.type) {
    case 'multiple-choice':
      QuestionToShow = MultipleChoice
      break
    case 'essay':
      QuestionToShow = Essay
      break
    case 'theater':
      QuestionToShow = Theater
      break
    case 'sketch':
      QuestionToShow = Sketch
      break
    // case 'trueFalse':
    //   QuestionToShow = TrueFalse
    //   break
    default:
      return null
  }
  return <QuestionToShow question={question} {...props} />
}
