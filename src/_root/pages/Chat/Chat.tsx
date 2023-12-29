import React, { useEffect } from 'react'
import Message from './Message'
import './Chat.css'
interface IMessage {
  id: string
  text: string
  senderId: string
}

// styles

const styles = {
	chatContainer: {
    position: 'relative' as 'relative',
    flex: 1,
		display: 'flex',
		flexDirection: 'column' as 'column',
		height: '100vh',
		maxWidth: 'full',
		margin: '0 auto',
		padding: '20px',
		border: '1px solid black',
		borderRadius: '8px',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
	},
	messages: {
		flex: 1,
		overflowY: 'auto' as 'auto',
		marginBottom: '10px',
	},
	inputContainer: {
		display: 'flex',
	},
	input: {
		flex: 1,
		padding: '8px',
		borderRadius: '4px',
		marginRight: '10px',
		border: '1px solid #ccc',
	},
	button: {
		padding: '8px 16px',
		borderRadius: '4px',
		background: '#4CAF50',
		color: 'white',
		border: 'none',
		cursor: 'pointer',
	},
}


const Chat: React.FC = () => {

  const [messages, setMessages] = React.useState<IMessage[]>([])
	const [newMessage, setNewMessage] = React.useState<string>('');

  const sendMessage = () => {
      if(newMessage.trim() === '') return;
      
      const newMessageObj: IMessage = {
        id: (messages.length + 1).toString(),
        text: newMessage,
        senderId: 'user'
      }

      setMessages([...messages, newMessageObj]);
      setNewMessage('')
  }

  useEffect(() => {
    const chatCont = document.getElementById('chat-cont');
    if(chatCont){
      chatCont.scrollTop = chatCont.scrollHeight;
    }
  }, [messages])

  return (
    <div style={styles.chatContainer} className="chat-container" id='chat-cont'>
      <div style={styles.messages} className='message'>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div style={styles.inputContainer} className='input-container'> 
        <input 
        type="text" 
        value={newMessage} 
        onChange={(e) => setNewMessage(e.target.value)} 
        placeholder='Enter your message'
        />
        <button style={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat
