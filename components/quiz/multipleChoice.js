import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'
import Submit from '@/components/quiz/submit'
import Continue from '@/components/quiz/continue'
import SubmitAndContinue from '@/components/quiz/submitAndContinue'

const MultipleChoice = ({
  formik,
  question,
  state,
  handleContinue,
  isDisabled,
  isAnswered,
}) => {
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value
  const showExplanation = question.explanation && state.matches('answered')

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {isAnswered && state.matches('answered') && (
          <span>{hasAnsweredCorrectly ? '✅' : '❎'}</span>
        )}
        {question.type}
        {question.text}
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div role="group" aria-labelledby="choices">
            {question.choices.map((choice) => {
              const correctAnswer = question.correctAnswer === choice.value
              return (
                <div key={choice.value}>
                  <label>
                    <input
                      disabled={isDisabled}
                      type="radio"
                      name="value"
                      value={choice.value}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.value === choice.value}
                    />
                    {choice.text}
                    {isAnswered &&
                      state.matches('answered') &&
                      (correctAnswer ? ' (correct)' : ' (incorrect)')}
                  </label>
                </div>
              )
            })}
          </div>
          {formik.errors.value}
          {question.explanation ? (
            <Submit
              isDisabled={isDisabled}
              isSubmitting={state.matches('answering')}
            />
          ) : (
            <SubmitAndContinue
              state={state}
              handleContinue={handleContinue}
              isDisabled={state.matches('answering')}
              isSubmitting={state.matches('answering')}
            />
          )}
        </form>

        {state.matches('answered') && question.explanation && (
          <Continue onClick={handleContinue} />
        )}
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default MultipleChoice
