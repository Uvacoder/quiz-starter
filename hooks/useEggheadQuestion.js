import React from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'

export default function useEggheadQuestion(question, onSubmit) {
  const {type, text, explanation, choices, correctAnswer} = question
  const [isSubmitted, setSubmitted] = React.useState(false)

  function schemaFor(type) {
    switch (type) {
      case 'multiple-choice':
        return yup.object().shape({
          value: yup
            .string()
            .required('Please select one of the answers.')
            .nullable(),
        })

      case 'essay':
        return yup
          .object()
          .shape({
            value: yup
              .string()
              .required('Answer cant stay empty')
              .min(3, 'Answer must be at least 3 characters'),
          })
          .nullable()

      case 'theater':
        return yup.object().shape({
          value: yup
            .mixed()
            .oneOf(['0', '1', '2'])
            .required('Choice is required'),
        })

      default:
        return null
    }
  }

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validationSchema: schemaFor(type),
    onSubmit: (values, actions) => {
      if (formik.isValid) {
        onSubmit(values, actions, question)
        setSubmitted(true)
      }
    },
  })

  return {formik, isSubmitted}
}
