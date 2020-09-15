import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const schema = yup.object().shape({
  choice: yup.string().required('Please select one of the answers.').nullable(),
})

const MultipleChoice = ({question, onSubmit}) => {
  const [isSubmitted, setSubmitted] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      choice: null,
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      if (formik.isValid) {
        onSubmit(values, actions, question)
        setSubmitted(true)
      }
    },
  })

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
                    name="choice"
                    value={choice.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.choice === choice.value}
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
          question.correctAnswer === formik.values.choice
            ? 'Correct!'
            : 'Incorrect.'
        } ${question.explanation}`}
      {formik.errors.choice}
    </div>
  )
}

export default MultipleChoice
