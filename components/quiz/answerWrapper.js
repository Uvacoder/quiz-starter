import React from 'react'

export default function AnswerWrapper({children}) {
  return (
    <div className="col-span-2 p-8 flex flex-col flex-shrink-0 w-full ">
      {children}
    </div>
  )
}
