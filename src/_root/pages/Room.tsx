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
    // user_id
    user_id: string
    // updatedAt
    $updatedAt: string
    // $permissions  '$permissions' is an array of strings instead of a single string.
    $permissions: string[]
}

const Room = (): JSX.Element => {

    const { user } = useUserContext()

    const [messages, setMessages] = useState<Message[] | null>(null)
    const [messageBody, setMessageBody] = useState<string>("")


    useEffect(() => {
        getMessages()

        const unsubscribe = client.subscribe(
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
            );
            console.log("RESPONSE", response)
            const messages = response.documents.map(doc => ({
                username: doc.username,
                $createdAt: doc.$createdAt,
                $id: doc.$id,
                Body: doc.Body,
                $databaseId: doc.$databaseId,
                $collectionId: doc.$collectionId,
                user_id: doc.user_id,
                userId: doc.userId,
                $updatedAt: doc.$updatedAt,
                $permissions: doc.$permissions,
            }))
            setMessages(messages)
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
			<main className='min-w-full h-full bg-gray-500 mx-auto'>
				<div className='room w-full h-full p-5 sm:p-10 bg-dark-3'>
					<div className='w-full h-[50px] mb-4'>
						<form
							onSubmit={handleSubmit}
							id='message--form'
							className='w-full h-[50px] mb-4 '
						>
							<div className='w-full h-[50px] rounded'>
								<div
									id='textarea_div'
									className='w-full bg-transparent flex items-start h-[50px] '
								>
									<textarea
										required
										maxLength={1000}
										placeholder='Message'
										onChange={e => setMessageBody(e.target.value)}
										value={messageBody}
										id='textarea'
										className='p-[14px] mb-2 h-[50px] resize-none bg-transparent w-full rounded border border-r-0 border-primary-500 text-sm text-gray-500 focus:outline-none rounded-r-none md:border-r md:rounded-r overflow-y-auto custom-scrollbar'
									></textarea>
									<div id='button_div'>
										<button
											type='submit'
											className='flex items-center justify-center md:hidden w-[50px] h-[50px] rounded border border-l-0 border-primary-500 p-2 text-sm text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-l-none'
										>
											<img src='\assets\icons\sendbtn.svg' alt='Send' />
										</button>
									</div>
								</div>

								{/*input submit */}
								<div id='input_div' className='hidden md:flex mt-2'>
									<input
										className='w-full rounded border border-primary-500 p-2 text-sm text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
										type='submit'
										value={'Send'}
										id='submit'
									/>
								</div>
							</div>
						</form>
					</div>

					<div
						className={`md:mt-14 messages h-[420px] overflow-y-auto p-2 border border-primary-500 rounded custom-scrollbar flex flex-col items-start`}
					>
						{messages?.map(message => (
							<div
								key={message.$id}
								id={message.$id}
								className={`w-full mb-2 rounded p-2 flex flex-col ${
									message.user_id === user?.id ? 'items-end' : ''
								}`}
							>
								<div className='flex justify-start gap-2 items-center p-1'>
									{/* delete button shows only for current user and displays only if current user hover over the message*/}
									{message.user_id === user?.id && (
										<button
											onClick={() => deleteMessage(message.$id)}
											className='w-4 h-4 opacity-60 hover:opacity-100'
										>
											<img
												src='/assets/icons/delete.svg'
												alt='Delete'
												className='w-4 h-4 '
											/>
										</button>
									)}

									{/* timestamp if current user shows left side otherwise right side */}
									{message.user_id === user?.id && (
										<p className='text-gray-500 text-[12px]'>
											{new Date(message.$createdAt).toLocaleTimeString()}
										</p>
									)}

									<p className='text-gray-500 small-regular'>
										{message?.username ? (
											<span className='text-primary-500 small-regular'>
												<span>
													{/* shows username only other than current user */}
													{message.username 
														? message.user_id === user?.id
															? 'You'
															: 
                                                            // if user's username is too long cut it til 11 characters
                                                            message.username.length > 11  
                                                                ? `${message.username.slice(0, 10)}...` 
                                                                : message.username
														: ``}{' '}
												</span>
												<span className='text-gray-500 text-[12px] '>
													{`${
														// if not current user shows timestamp
														message.user_id !== user?.id
															? new Date(
																	message.$createdAt
															  ).toLocaleTimeString()
															: ''
													} `}
												</span>
											</span>
										) : (
											<span>Anonymous User</span>
										)}
									</p>
								</div>

								<div className='w-fit max-w-[100%]  break-words border border-primary-500 rounded p-[6px] '>
									<span
										className={`${
											message.user_id === user?.id
												? 'text-light-1'
												: 'text-light-1'
										}`}
									>
										<span role='text'>{message.Body}</span>
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		)
}

export default Room
