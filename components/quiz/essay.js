import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'
import Markdown from '@/components/quiz/markdown'
import Submit from '@/components/quiz/submit'
import Continue from '@/components/quiz/continue'
import useEggheadQuestion from '@/hooks/useEggheadQuestion'

const Essay = ({
  // formik,
  question,
  state,
  handleContinue,
  isDisabled,
  handleSubmit,
  currentAnswer,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const showExplanation =
    (question.explanation && !state.matches('idle')) || currentAnswer

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {question.type}
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
        <Markdown>{question.text}</Markdown>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          {currentAnswer ? (
            <>
              <div className="text-lg font-semibold">Your answer</div>
              <Markdown className="p-3 mb-6 font-semibold">
                {currentAnswer.value}
              </Markdown>
            </>
          ) : (
            <>
              <label className="text-lg font-semibold" htmlFor="value">
                Your answer
              </label>
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
            explanation={question.explanation}
          />
        </form>
        {state.matches('answered') && <Continue onClick={handleContinue} />}
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default Essay
