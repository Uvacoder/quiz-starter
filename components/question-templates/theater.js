import React from 'react'
import useEggheadQuestion from '../../hooks/useEggheadQuestion'

const Theater = ({question, onSubmit, isCompleted}) => {
  const {formik, isSubmitted} = useEggheadQuestion(question, onSubmit)
  const [answerOpened, setAnswerOpened] = React.useState(false)

  return (
    <div>
      <h4>
        {isCompleted && '✅'} {question.type}
      </h4>
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
                  name="value"
                  value={'0'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '0'}
                />
                No
              </label>
              <label>
                <input
                  disabled={isSubmitted}
                  type="radio"
                  name="value"
                  value={'1'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '1'}
                />
                Almost
              </label>
              <label>
                <input
                  disabled={isSubmitted}
                  type="radio"
                  name="value"
                  value={'2'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '2'}
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
      {formik.errors.value}
    </div>
  )
}

export default Theater
