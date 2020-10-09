import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'
import useEggheadQuestion from '@/hooks/useEggheadQuestion'

const Theater = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  isAnswered,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const [showExplanation, setShowExplanation] = React.useState(false)

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {isAnswered && state.matches('answered') && '✅'}
        {question.type}
        {question.text}
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          type="button"
        >
          {showExplanation ? 'hide explanation' : 'show explanation'}
        </button>
        {showExplanation && question.explanation && (
          <Explanation>{question.explanation}</Explanation>
        )}
      </QuestionWrapper>
      <AnswerWrapper>
        <form onSubmit={formik.handleSubmit}>
          <>
            {/* {answerOpened && question.explanation && question.explanation} */}
            <div role="group" aria-labelledby="choices">
              <div>Did you remember?</div>
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value={'0'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '0'}
                />
                No
              </label>
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value={'1'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '1'}
                />
                Almost
              </label>
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value={'2'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '2'}
                />
                Yes
              </label>
            </div>
            {formik.errors.value}

            <button disabled={isDisabled} type="submit">
              submit
            </button>
          </>
        </form>

        {state.matches('answered') && (
          <button type="button" onClick={handleContinue}>
            continue
          </button>
        )}
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default Theater
