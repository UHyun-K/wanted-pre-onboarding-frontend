import React from 'react'

export default function Form({title ,onSubmit, children}) {
  return (
    <div className="mt-16 px-4 ">
       <h1 className="text-3xl font-bold text-center">{title}</h1>
       <form
            onSubmit={onSubmit}
            className="flex flex-col mt-12 space-y-4"
            >
                {children}
        </form>
    </div>
  )
}
