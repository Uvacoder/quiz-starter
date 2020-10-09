import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'

const Essay = ({
  formik,
  question,
  state,
  handleContinue,
  isDisabled,
  isAnswered,
}) => {
  const showExplanation = question.explanation && state.matches('answered')

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {isAnswered && state.matches('answered') && '✅'}
        {question.type}
        {question.text}
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
      </QuestionWrapper>
      <AnswerWrapper>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>
              Your answer
              <textarea
                disabled={isDisabled}
                name="value"
                placeholder="Type your answer here..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.value}
              />
            </label>
            {formik.submitCount > 0 && formik.errors.value}
          </div>
          {!isDisabled && (
            <button disabled={isDisabled} type="submit">
              submit
            </button>
          )}
          {state.matches('answering') && 'submitting...'}
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

export default Essay
