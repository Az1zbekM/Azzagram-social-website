import React from 'react'
interface IMessageProps {
    message: {
        id: string
        text: string
        senderId: string
    }
}
const Message: React.FC<IMessageProps> = ({ message }) => {
  return (
    <div className={`message ${message.senderId}`}>
      <div  className='avatar'>{message.senderId[0].toUpperCase()}</div>
      <div className='text'>{message.text}</div>
    </div>
  )
}

export default Message
