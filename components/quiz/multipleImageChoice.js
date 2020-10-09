import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'
import Submit from '@/components/quiz/submit'
import Continue from '@/components/quiz/continue'
import SubmitAndContinue from '@/components/quiz/submitAndContinue'
import Markdown from '@/components/quiz/markdown'
import useEggheadQuestion from '@/hooks/useEggheadQuestion'

const MultipleImageChoice = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  isAnswered,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value
  const showExplanation = question.explanation && state.matches('answered')

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {isAnswered && state.matches('answered') && (
          <span>{hasAnsweredCorrectly ? '✅' : '❎'}</span>
        )}
        {question.type}
        <Markdown>{question.text}</Markdown>
        <form onSubmit={formik.handleSubmit}>
          <div
            className="grid gap-4 grid-cols-2 py-4"
            role="group"
            aria-labelledby="choices"
          >
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
                      className="mr-1"
                    />
                    {choice.text}
                    <img
                      src={choice.image}
                      alt={choice.text}
                      className="border border-gray-200"
                    />

                    {isAnswered &&
                      state.matches('answered') &&
                      (correctAnswer ? ' (correct)' : ' (incorrect)')}
                  </label>
                </div>
              )
            })}
          </div>
        </form>
        {/* {question.choices && (
          <div className="grid gap-4 grid-cols-2 py-4">
            {question.choices.map((choice) => {
              const correctAnswer = question.correctAnswer === choice.value
              const selected = formik.values.value === choice.value
              return (
                <div
                  key={choice.value}
                  className={`border-2 ${
                    selected ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  {selected && '⦿'} {choice.text}
                  <img
                    src={choice.image}
                    alt={choice.text}
                    className="border border-gray-200"
                  />
                </div>
              )
            })}
          </div>
        )} */}
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
                      className="mr-1"
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

export default MultipleImageChoice
