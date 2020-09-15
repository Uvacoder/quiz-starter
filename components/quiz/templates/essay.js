import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const schema = yup
  .object()
  .shape({
    essay: yup
      .string()
      .required('Answer is required')
      .min(3, 'Answer must be at least 3 characters'),
  })
  .nullable()

const Essay = ({question, onSubmit}) => {
  const [isSubmitted, setSubmitted] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      essay: '',
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
          <label>
            Your answer
            <textarea
              disabled={isSubmitted}
              name="essay"
              placeholder="Type your answer here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.essay}
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
      {formik.submitCount > 0 && formik.errors.essay}
    </div>
  )
}

export default Essay
