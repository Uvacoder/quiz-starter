import React from 'react'
import QuestionWrapper from '@/components/quiz/questionWrapper'
import AnswerWrapper from '@/components/quiz/answerWrapper'
import Explanation from '@/components/quiz/explanation'
import QuizWrapper from '@/components/quiz/wrapper'
import useEggheadQuestion from '@/hooks/useEggheadQuestion'
import Markdown from '@/components/quiz/markdown'
import SubmitAndContinue from '@/components/quiz/submitAndContinue'

const Theater = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  isAnswered,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const [showExplanation, setShowExplanation] = React.useState(
    question?.value ? true : false,
  )

  return (
    <QuizWrapper>
      <QuestionWrapper>
        {isAnswered && state.matches('answered') && '✅'}
        {question.type}
        <Markdown>{question.text}</Markdown>
        <button
          className="mt-4 bg-gray-700 px-3 py-2 rounded-md text-white"
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
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <>
            {/* {answerOpened && question.explanation && question.explanation} */}
            <div className="text-lg font-semibold">Did you remember?</div>
            <div
              className="mt-4 grid grid-flow-col-dense gap-2"
              role="group"
              aria-labelledby="choices"
            >
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value={'0'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '0'}
                  className="mr-1"
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
                  className="mr-1"
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
                  className="mr-1"
                />
                Yes
              </label>
            </div>
            {formik.errors.value}
            <SubmitAndContinue
              state={state}
              handleContinue={handleContinue}
              isDisabled={state.matches('answering')}
              isSubmitting={state.matches('answering')}
            />
          </>
        </form>
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default Theater
