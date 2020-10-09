import React from 'react'
// import '../node_modules/excalidraw/dist/excalidraw.min.css'
// import 'excalidraw/dist/excalidraw.min.css'
// import '../styles/excalidraw.css'

const App = ({Component, pageProps}) => {
  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
        rel="stylesheet"
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
