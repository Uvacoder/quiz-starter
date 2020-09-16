import React from 'react'
import useEggheadQuestion from '../../hooks/useEggheadQuestion'

const Essay = ({question, onSubmit, isCompleted}) => {
  const {formik, isSubmitted} = useEggheadQuestion(question, onSubmit)

  return (
    <div>
      <h4>
        {isCompleted && '✅'} {question.type}
      </h4>
      <p>{question.text}</p>
      <form onSubmit={formik.handleSubmit}>
        <div role="group" aria-labelledby="choices">
          <label>
            Your answer
            <textarea
              disabled={isSubmitted}
              name="value"
              placeholder="Type your answer here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.value}
            />
          </label>
        </div>
        <button
          disabled={(formik.submitCount > 0 && !formik.isValid) || isSubmitted}
          type="submit"
        >
          submit
        </button>
      </form>
      {question.explanation && isSubmitted && question.explanation}
      {formik.submitCount > 0 && formik.errors.value}
    </div>
  )
}

export default Essay
