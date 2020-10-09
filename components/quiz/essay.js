import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'
import Markdown from '@/components/quiz/markdown'
import Submit from '@/components/quiz/submit'
import Continue from '@/components/quiz/continue'

const Essay = ({
  formik,
  question,
  state,
  handleContinue,
  isDisabled,
  currentAnswer,
}) => {
  const showExplanation = question.explanation && !state.matches('idle')

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {/* {question.type} */}
        <Markdown>{question.text}</Markdown>
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          {currentAnswer ? (
            <>
              ✓ Your answer
              <Markdown className="p-3 font-semibold">
                {currentAnswer.value}
              </Markdown>
            </>
          ) : (
            <>
              <label htmlFor="value">Your answer</label>
              <textarea
                className="w-full p-3 bg-gray-100"
                disabled={isDisabled}
                name="value"
                placeholder="Type your answer here..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.value}
              />
            </>
          )}
          {formik.submitCount > 0 && formik.errors.value}
          <Submit
            isDisabled={isDisabled}
            isSubmitting={state.matches('answering')}
          />
        </form>
        {state.matches('answered') && <Continue onClick={handleContinue} />}
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default Essay
