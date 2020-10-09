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
  // formik,
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  currentAnswer,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value
  const showExplanation = question.explanation && state.matches('answered')

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {/* {currentAnswer && state.matches('answered') && (
          <span>{hasAnsweredCorrectly ? '✅' : '❎'}</span>
        )} */}
        {question.type}
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
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
                    {choice.text}{' '}
                    {currentAnswer &&
                      state.matches('answered') &&
                      (correctAnswer ? '✅' : '❌')}
                    <img
                      src={choice.image}
                      alt={choice.text}
                      className="border border-gray-200"
                    />
                  </label>
                </div>
              )
            })}
          </div>
        </form>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div role="group" aria-labelledby="choices">
            <div className="text-lg font-semibold">Your answer</div>
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
                    {choice.text}{' '}
                    {currentAnswer &&
                      state.matches('answered') &&
                      (correctAnswer ? '✅' : '❌')}
                  </label>
                </div>
              )
            })}
          </div>
          {formik.errors.value}
          {question.explanation || question.correctAnswer ? (
            <Submit
              isDisabled={isDisabled}
              isSubmitting={state.matches('answering')}
              explanation={question.explanation}
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

        {state.matches('answered') && (
          <div className="pt-4 font-semibold">
            {hasAnsweredCorrectly ? '🎉 Correct!' : 'Incorrect'}
          </div>
        )}

        {state.matches('answered') &&
          (question.explanation || question.correctAnswer) && (
            <Continue onClick={handleContinue} />
          )}
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default MultipleImageChoice
