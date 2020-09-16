import React from 'react'

import MultipleChoice from './question-templates/multipleChoice'
import Essay from './question-templates/essay'
import Theater from './question-templates/theater'
import Sketch from './question-templates/sketch'

import useEggheadQuiz from '../hooks/useEggheadQuiz'

const QuizTemplate = ({quiz}) => {
  const {questions, onSubmit, isCompleted, resetQuizProgress} = useEggheadQuiz(
    quiz,
  )

  return (
    <div>
      {questions.map((question) => {
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

        return (
          <QuestionToShow
            question={question}
            onSubmit={onSubmit}
            key={question.id}
            isCompleted={isCompleted(question)}
          />
        )
      })}
      <br />
      <br />
      <button
        onClick={() =>
          resetQuizProgress(
            window.confirm(
              'This will reset your progress in this quiz. Are you sure?',
            ),
          )
        }
        type="button"
      >
        reset quiz
      </button>
    </div>
  )
}

export default QuizTemplate
