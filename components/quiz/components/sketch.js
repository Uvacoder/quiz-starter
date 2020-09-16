import React from 'react'
import dynamic from 'next/dynamic'
import useEggheadQuestion from 'hooks/useEggheadQuestion'

const ExcalidrawWithoutSSR = dynamic(() => import('excalidraw'), {
  ssr: false,
})

const Sketch = ({question, onSubmit, isCompleted}) => {
  const {formik, isSubmitted} = useEggheadQuestion(question, onSubmit)
  const options = {
    zenModeEnabled: true,
    viewBackgroundColor: '#F1F1F1', // '#AFEEEE'
  }
  const [output, setOutput] = React.useState([])
  const [isOpen, setOpen] = React.useState(false)

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({value: output})
    return () => {}
  }, [output])

  return (
    <div>
      <h4>
        {isCompleted && '✅'} {question.type}
      </h4>
      <p>{question.text}</p>
      <button onClick={() => setOpen(!isOpen)}>
        {isOpen ? '✏️ close sketch' : '✏️ open sketch'}
      </button>
      {isOpen && (
        <form onSubmit={formik.handleSubmit}>
          <button disabled={isSubmitted} type="submit">
            submit
          </button>
          {formik.submitCount > 0 && formik.errors.value}
          <input type="hidden" name="value" value={formik.values.value} />
          <div>
            <ExcalidrawWithoutSSR
              width={800}
              height={600}
              onChange={onChange}
              options={options}
              user={{name: 'Excalidraw User'}}
              initialData={output}
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default Sketch
