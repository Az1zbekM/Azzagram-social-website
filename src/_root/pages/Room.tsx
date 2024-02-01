import TestHeader from '@/components/shared/TestHeader'
import { useUserContext } from '@/context/AuthContext'
import { appwriteConfig, client, databases } from '@/lib/appwrite/config'
import { ID, Permission, Query, Role } from 'appwrite'
import { useEffect, useState } from 'react'

 interface Payload {
		$id: string 
 }

//  
interface Message {
    // username
    username: string
    $createdAt: string
    $id: string
    Body: string
    // databaseId
    $databaseId: string
    // collectionId
    $collectionId: string
    // userId
    userId: string
    // updatedAt
    $updatedAt: string
    // $permissions  '$permissions' is an array of strings instead of a single string.
    $permissions: string[]
}

const Room = (): JSX.Element => {
    
    const {user} = useUserContext()

    const [messages, setMessages] = useState<Message[] | null>(null) 
    const [messageBody, setMessageBody] = useState<string>("")
    

    useEffect(() => {
        getMessages()
        
      const unsubscribe =  client.subscribe(
           `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.messagesCollectionId}.documents`, 
            response => {   
                console.log("SUBSCRIPTION", response)    

                if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                     console.log("MESSAGE CREATED")  
                     setMessages(prevState => [response.payload as Message, ...(prevState || [])])
                }   
                if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                    console.log("MESSAGE DELETED")
                    setMessages(prevState => (prevState || []).filter(message => message.$id !== (response.payload as Payload).$id))
                }


            })

                return () => {
                    unsubscribe()
                }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let payload = {
            user_id: user?.id,
            username: user?.name,
            Body: messageBody
        }

        let permissions = [
        Permission.write(Role.users(user?.$id as string)),
        ]

        let response = await databases.createDocument<Message>(
            appwriteConfig.databaseId,
            appwriteConfig.messagesCollectionId,
            ID.unique(),
            payload,
            permissions
        )

        
        console.log("CREATED", response)
        // setMessages(prevState => [response, ...prevState])
        setMessageBody("")
    }

    const getMessages = async (): Promise<void> => {
        try {
            const response = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.messagesCollectionId,
                [Query.orderDesc('$createdAt')]
            )
            console.log("RESPONSE", response)

            setMessages(response.documents)

        } catch (error) {
            console.log("error", error)
        }
    }

    const deleteMessage = async (message_id: string): Promise<void> => {
        try {
            const response = await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.messagesCollectionId,
                message_id
            )
            console.log("DELETE", response)

            // setMessages(prevState => prevState.filter(message => message.$id !== message_id))

        } catch (error) {
            console.log("DELETE", error)
        }
    }
    return (
			<main className='max-w-[600px] mx-auto my-5'>
				<TestHeader />
				<div className='room p-[2em] border-2 border-primary-500 rounded bg-dark-3'>
					<form onSubmit={handleSubmit} id='message--form'>
						<div>
							<textarea
								required
								maxLength={1000}
								placeholder='Message'
								onChange={e => setMessageBody(e.target.value)}
								value={messageBody}
								className='bg-dark-3 w-full rounded border border-primary-500 p-2 text-sm text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
							></textarea>
							{/*input submit */}
							<div className='mt-0'>
								<input
									className='mb-2 w-full rounded border border-primary-500 p-2 text-sm text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
									type='submit'
									value={'Send'}
									id='submit'
								/>
							</div>
						</div>
					</form>
					<div>
						{messages?.map(message => (
							<div key={message.$id} className='flex flex-col gap-2 mb-2'>
								<div className='flex justify-between items-center'>
									<p>
										{message?.username ? (
											<span>{message.username}</span>
										) : (
											<span>Anonymous User</span>
										)}
									</p>

									<p className='text-gray-500 small-regular'>
										{/* create date but only display time */}
										{new Date(message.$createdAt).toLocaleTimeString()}
									</p>

									{message.$permissions.includes(`delete(\"users\")`) && (
										<button onClick={() => deleteMessage(message.$id)}>
											<img src='/assets/icons/trash.svg' alt='delete' />
										</button>
									)}
									{/* <button onClick={() => deleteMessage(message.$id)}>
										<img src='/assets/icons/trash.svg' alt='delete' />
									</button> */}
								</div>

								<div className=' w-fit max-w-full break-words border border-primary-500 rounded p-2'>
									<span className='text-primary-500'>{message.Body}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		)
}

export default Room