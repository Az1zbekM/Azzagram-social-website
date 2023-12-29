// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
// import { INavLink } from '@/types'
// import { sidebarLinks } from '@/constants'
// import { Loader } from '@/components/shared'
// import { Button } from '@/components/ui/button'
// import { useSignOutAccount } from '@/lib/react-query/queries'
// import { INITIAL_USER, useUserContext } from '@/context/AuthContext'
// import './../../components/shared/Leftsidebar.css'
// import { Skeleton } from '@/components/ui/skeleton'
// import Conversation from './Chat/Conversation'




// const ChatPage = () => {
// 	const navigate = useNavigate()
// 	const { pathname } = useLocation()
// 	const { user, setUser, setIsAuthenticated, isLoading } = useUserContext()

// 	const { mutate: signOut } = useSignOutAccount()

// 	const handleSignOut = async (
// 		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
// 	) => {
// 		e.preventDefault()
// 		signOut()
// 		setIsAuthenticated(false)
// 		setUser(INITIAL_USER)
// 		navigate('/sign-in')
// 	}


// 	return (
// 		<div className='flex h-screen  w-full overflow-auto custom-scrollbar '>
// 			<nav className='p-4 w-[100px] md:flex flex-col justify-between bg-dark-1  border-r border-r-[#5c5c7b]'>
// 				<div className='flex flex-col gap-6'>
// 					{/* <Link to='/' className='flex justify-center items-center'>
// 					<img
// 						src='/public/assets/images/logo.svg'
// 						alt='logo'
// 						width={220}
// 						height={40}
// 						className='ml-1'
// 					/>
// 				</Link> */}

// 					{isLoading || !user.email ? (
// 						<div className='flex-center  w-full h-full p-4'>
// 							<Loader />
// 						</div>
// 					) : (
// 						<Link
// 							to={`/profile/${user.id}`}
// 							className='flex gap-3 items-center justify-center p-2'
// 						>
// 							<img
// 								id='profileimg'
// 								src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
// 								alt='profile'
// 								className='h-10 w-10 rounded-full'
// 							/>
// 						</Link>
// 					)}

// 					<ul className='flex flex-col gap-5 justify-center items-center '>
// 						{sidebarLinks.map((link: INavLink) => {
// 							const isActive = pathname === link.route

// 							return (
// 								<span>
// 									<li
// 										key={link.label}
// 										className={`leftsidebar-link group ${
// 											isActive && 'bg-primary-500'
// 										}`}
// 									>
// 										<NavLink
// 											to={link.route}
// 											className='flex gap-4 items-center p-4'
// 										>
// 											<img
// 												src={link.imgURL}
// 												alt={link.label}
// 												width={24}
// 												height={24}
// 												className={`group-hover:invert-white ${
// 													isActive && 'invert-white'
// 												}			`}
// 											/>
// 										</NavLink>
// 									</li>
// 									<hr className='border-[#5c5c7b] w-full mt-2' />
// 								</span>
// 							)
// 						})}
// 						<Button
// 							className={`bg-transparent hover:hidden `}
// 							onClick={handleSignOut}
// 						>
// 							<img src='/public/assets/icons/logout.svg' alt='logout' />
// 						</Button>
// 					</ul>
// 				</div>
// 			</nav>

// 			<div
// 				className='flex flex-col overflow-y-auto w-[30%] bg-dark-3 border-r border-r-[#5c5c7b]'
// 				id='chat-users'
// 			>
				// <div className='flex chat-topbar  h-[15%] bg-dark-1 w-full border-b border-b-[#5c5c7b]'>
				// 	<div className='flex w-full justify-center gap-4 items-center'>
				// 		<img
				// 			src='/public/assets/icons/chat.svg'
				// 			alt='chat'
				// 			width={44}
				// 			height={44}
				// 		/>
				// 		<h1 className='text-3xl font-bold'>All Chats</h1>
				// 	</div>
				// </div>

				// <div className='flex chat-sidebar h-[85%] bg-dark-3 w-full overflow-auto custom-scrollbar'>
				// 	<ul className='flex flex-col gap-4 p-4 bg-dark-3 w-full h-screen '>
				// 		{false &&
				// 			[0, 1, 2, 3, 4].map((_, i) => (
				// 				<div
				// 					key={i}
				// 					className='flex items-center flex-col gap-4 p-4 bg-dark-1 w-full h-[100px] rounded-2xl '
				// 				>
				// 					<div className='flex items-start w-full gap-4 '>
				// 						<Skeleton className='w-16 h-16 bg-white rounded-full ' />
				// 						<div className='flex flex-col gap-4 items-start justify-center align-middle h-full'>
				// 							<Skeleton className='flex w-40 h-4 bg-white rounded-full align-middle ' />
				// 							<Skeleton className='flex w-20 h-4 bg-white rounded-full align-middle ' />
				// 						</div>
				// 					</div>
				// 				</div>
				// 			))}
				// 		<Conversation />
				// 		<Conversation />
				// 		<Conversation />
				// 	</ul>
				// </div>
// 			</div>

// 			<div className='flex overflow-y-auto w-[70%] bg-dark-1' id='chat-content'>
// 				<div className='flex  flex-col w-full h-screen justify-center items-center'>
// 					<img
// 						src='/public/assets/icons/chat.svg'
// 						alt='chat.svg'
// 						width={100}
// 						height={100}
// 						className='mb-5'
// 					/>
// 					<h1 className='text-2xl font-bold'>Your messages</h1>
// 					<h2 className='text-xl font-serif text-light-3'>
// 						Send private photos and messages to a friend
// 					</h2>
// 					<button onClick={() => OpenDialog()} className='btn bg-primary-500 py-2 px-4 rounded-xl mt-4'>Send messages</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default ChatPage





import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { INavLink } from '@/types'
import { sidebarLinks } from '@/constants'
import { Button } from '@/components/ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { INITIAL_USER, useUserContext } from '@/context/AuthContext'
import './../../components/shared/Leftsidebar.css'
import { Skeleton } from '@/components/ui/skeleton'
import Conversation from './Chat/Conversation'

const ChatPage = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { user, setUser, setIsAuthenticated, isLoading } = useUserContext()

	const { mutate: signOut } = useSignOutAccount()

	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleOpenDialog = () => {
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
	}

	const handleSignOut = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		signOut()
		setIsAuthenticated(false)
		setUser(INITIAL_USER)
		navigate('/sign-in')
	}

	const OpenDialog = () => {
		// Customize your dialog content here
		return (
			<div className='dialog-overlay w-screen h-screen fixed top-0 left-0 z-50  bg-[rgba(0,0,0,0.9)] '>
				<div className='dialog-content w-1/3 h-[70%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-3 rounded-2xl'>
					<div className='dialog-header flex justify-center align-middle h-[10%] w-full '>
						<h2 className='text-center flex items-center justify-center text-xl font-bold border-b-2 border-b-[#5c5c7b] w-full'>
							New message
						</h2>
					</div>
					<div className='dialog-body w-full h-[9%] border-b-2 border-b-[#5c5c7b] '>
            Search
          </div>

					<div className='dialog-users w-full h-[66%] border-b-2 border-b-[#5c5c7b] '></div>

					<div className='dialog-footer w-full h-[15%] '>
						<button onClick={handleCloseDialog}>Close Dialog</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='flex h-screen  w-full overflow-auto custom-scrollbar '>
			<nav className='p-4 w-[100px] md:flex flex-col justify-between bg-dark-1  border-r border-r-[#5c5c7b]'>
				<div className='flex flex-col gap-6'>
					{/* Existing code... */}

					<ul className='flex flex-col gap-5 justify-center items-center '>
						{sidebarLinks.map((link: INavLink) => {
							const isActive = pathname === link.route

							return (
								<span>
									<li
										key={link.label}
										className={`leftsidebar-link group ${
											isActive && 'bg-primary-500'
										}`}
									>
										<NavLink
											to={link.route}
											className='flex gap-4 items-center p-4'
										>
											<img
												src={link.imgURL}
												alt={link.label}
												width={24}
												height={24}
												className={`group-hover:invert-white ${
													isActive && 'invert-white'
												}			`}
											/>
										</NavLink>
									</li>
									<hr className='border-[#5c5c7b] w-full mt-2' />
								</span>
							)
						})}
						<Button
							className={`bg-transparent hover:hidden `}
							onClick={handleSignOut}
						>
							<img src='/public/assets/icons/logout.svg' alt='logout' />
						</Button>
					</ul>
				</div>
			</nav>

			<div
				className='flex flex-col overflow-y-auto w-[30%] bg-dark-3 border-r border-r-[#5c5c7b]'
				id='chat-users'
			>
				<div className='flex chat-topbar  h-[15%] bg-dark-1 w-full border-b border-b-[#5c5c7b]'>
					<div className='flex w-full justify-center gap-4 items-center'>
						<img
							src='/public/assets/icons/chat.svg'
							alt='chat'
							width={44}
							height={44}
						/>
						<h1 className='text-3xl font-bold'>All Chats</h1>
					</div>
				</div>

				<div className='flex chat-sidebar h-[85%] bg-dark-3 w-full overflow-auto custom-scrollbar'>
					<ul className='flex flex-col gap-4 p-4 bg-dark-3 w-full h-screen '>
						{isLoading &&
							[0, 1, 2, 3, 4].map((_, i) => (
								<div
									key={i}
									className='flex items-center flex-col gap-4 p-4 bg-dark-1 w-full h-[100px] rounded-2xl '
								>
									<div className='flex items-start w-full gap-4 '>
										<Skeleton className='w-16 h-16 bg-white rounded-full ' />
										<div className='flex flex-col gap-4 items-start justify-center align-middle h-full'>
											<Skeleton className='flex w-40 h-4 bg-white rounded-full align-middle ' />
											<Skeleton className='flex w-20 h-4 bg-white rounded-full align-middle ' />
										</div>
									</div>
								</div>
							))}
						<Conversation />
						<Conversation />
						<Conversation />
					</ul>
				</div>
			</div>

			<div className='flex overflow-y-auto w-[70%] bg-dark-1' id='chat-content'>
				<div className='flex  flex-col w-full h-screen justify-center items-center'>
					<img
						src='/public/assets/icons/chat.svg'
						alt='chat.svg'
						width={100}
						height={100}
						className='mb-5'
					/>
					<h1 className='text-2xl font-bold'>Your messages</h1>
					<h2 className='text-xl font-serif text-light-3'>
						Send private photos and messages to a friend
					</h2>
					<button
						onClick={handleOpenDialog}
						className='btn bg-primary-500 py-2 px-4 rounded-xl mt-4'
					>
						Send messages
					</button>
				</div>
			</div>

			{isDialogOpen && <OpenDialog />}
		</div>
	)
}

export default ChatPage

