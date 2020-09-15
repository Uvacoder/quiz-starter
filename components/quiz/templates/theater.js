import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

const schema = yup.object().shape({
  choice: yup.mixed().oneOf(['0', '1', '2']).required('Choice is required'),
})

const Theater = ({question, onSubmit}) => {
  const [isSubmitted, setSubmitted] = React.useState(false)
  const [answerOpened, setAnswerOpened] = React.useState(false)

  const formik = useFormik({
    validateOnMount: false,
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
        {answerOpened && (
          <>
            {answerOpened && question.explanation && question.explanation}
            <div role="group" aria-labelledby="choices">
              <div>Did you remember?</div>
              <label>
                <input
                  disabled={isSubmitted}
                  type="radio"
                  name="choice"
                  value={'0'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.choice === '0'}
                />
                No
              </label>
              <label>
                <input
                  disabled={isSubmitted}
                  type="radio"
                  name="choice"
                  value={'1'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.choice === '1'}
                />
                Almost
              </label>
              <label>
                <input
                  disabled={isSubmitted}
                  type="radio"
                  name="choice"
                  value={'2'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.choice === '2'}
                />
                Yes
              </label>
            </div>
            {answerOpened && (
              <button disabled={!formik.isValid || isSubmitted} type="submit">
                submit
              </button>
            )}
          </>
        )}
      </form>
      {!answerOpened && (
        <button onClick={() => setAnswerOpened(!answerOpened)} type="button">
          {answerOpened ? 'hide answer' : 'show answer'}
        </button>
      )}
      {formik.errors.choice}
    </div>
  )
}

export default Theater
