import React from 'react'
import useEggheadQuestion from '../../../hooks/useEggheadQuestion'

const MultipleChoice = ({question, onSubmit}) => {
  const {formik, isSubmitted} = useEggheadQuestion(question, onSubmit)

  return (
    <div>
      <h4>{question.type}</h4>
      <p>{question.text}</p>
      <form onSubmit={formik.handleSubmit}>
        <div role="group" aria-labelledby="choices">
          {question.choices.map((choice) => {
            const correctAnswer = question.correctAnswer === choice.value
            return (
              <div key={choice.value}>
                <label>
                  <input
                    disabled={isSubmitted}
                    type="radio"
                    name="value"
                    value={choice.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.value === choice.value}
                  />
                  {choice.text}
                  {isSubmitted
                    ? correctAnswer
                      ? ' (correct)'
                      : ' (incorrect)'
                    : null}
                </label>
              </div>
            )
          })}
        </div>
        <button disabled={!formik.isValid || isSubmitted} type="submit">
          submit
        </button>
      </form>
      {question.explanation &&
        isSubmitted &&
        `${
          question.correctAnswer === formik.values.value
            ? 'Correct!'
            : 'Incorrect.'
        } ${question.explanation}`}
      {formik.errors.value}
    </div>
  )
}

export default MultipleChoice
