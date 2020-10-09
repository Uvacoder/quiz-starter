import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'

const Theater = ({
  formik,
  question,
  state,
  handleContinue,
  isDisabled,
  isAnswered,
}) => {
  const [answerOpened, setAnswerOpened] = React.useState(false)
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
          {answerOpened && (
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
              {answerOpened && (
                <button disabled={isDisabled} type="submit">
                  submit
                </button>
              )}
            </>
          )}
        </form>
        {!answerOpened && (
          <button onClick={() => setAnswerOpened(!answerOpened)} type="button">
            {answerOpened ? 'hide answer' : 'show answer'}
          </button>
        )}
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
