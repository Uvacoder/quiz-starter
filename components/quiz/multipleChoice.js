import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import Markdown from 'components/quiz/markdown'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {isEmpty} from 'lodash'

const MultipleChoice = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  currentAnswer,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value
  const showExplanation =
    question.explanation && (!state.matches('idle') || question.value)

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {/* {currentAnswer && state.matches('answered') && (
          <span>{hasAnsweredCorrectly ? '✅' : '❎'}</span>
        )} */}
        {question.type}
        <Markdown>{question.text}</Markdown>
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
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
                      (state.matches('answered') || question.value) &&
                      question.correctAnswer &&
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
            isEmpty(question.value) && (
              <SubmitAndContinue
                state={state}
                handleContinue={handleContinue}
                isDisabled={state.matches('answering')}
                isSubmitting={state.matches('answering')}
              />
            )
          )}
        </form>

        {(state.matches('answered') || question.value) &&
          question.correctAnswer && (
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

export default MultipleChoice
