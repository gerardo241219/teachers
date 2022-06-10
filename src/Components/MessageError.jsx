import React from 'react'

const MessageError = ({children}) => {
  return (
    <div className='mt-1'>
        <p className='text-xs text-red-600 ml-2'>{children}</p>
    </div>
  )
}

export default MessageError