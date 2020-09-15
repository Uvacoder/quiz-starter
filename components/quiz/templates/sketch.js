import React from 'react'
import dynamic from 'next/dynamic'

const ExcalidrawWithoutSSR = dynamic(
  () => import('../../../node_modules/excalidraw/dist/excalidraw.min.js'),
  {
    ssr: false,
  },
)

const Sketch = () => {
  const options = {
    zenModeEnabled: true,
    viewBackgroundColor: '#F1F1F1', // '#AFEEEE'
  }
  const [output, setOutput] = React.useState({})

  function onChange(sketch) {
    setOutput(sketch)
  }

  return (
    <div style={{position: 'absoulte'}}>
      <ExcalidrawWithoutSSR
        width="800px"
        height="600px"
        onChange={onChange}
        options={options}
        user={{name: 'Excalidraw User'}}
      />
    </div>
  )
}

export default Sketch
