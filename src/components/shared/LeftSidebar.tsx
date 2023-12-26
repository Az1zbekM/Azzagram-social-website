// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
// import { INavLink } from '@/types'
// import { Button } from '../ui/button'
// import { useSignOutAccount } from '@/lib/react-query/queries'

// import { useEffect } from 'react'
// import { useUserContext } from '@/context/AuthContext'
// import { sidebarLinks } from '@/constants'



// const LeftSidebar = () => {
// const { pathname } = useLocation()

// 	const { mutate: signOut, isSuccess } = useSignOutAccount()
// 	const navigate = useNavigate()
// 	const { user } = useUserContext()
// 	useEffect(() => {
// 		if (isSuccess) navigate(0)
// 	}, [isSuccess, navigate])
// 	return (
// 		<nav className='leftsidebar'>
// 			<div className='flex flex-col gap-11 '>
// 				<Link to='/' className='flex gap-3 items-center'>
// 					<img
// 						src='/assets/images/logo.svg'
// 						alt='logo'
// 						width={175}
// 						height={36}
// 					/>
// 				</Link>

// 				<Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
// 					<img
// 						src={user.imageUrl || '/assets/images/profile.png'}
// 						alt='Profile image'
// 						className='w-14 h-14 rounded-full'
// 					/>
// 					<div className='flex flex-col'>
// 						<p className='body-bold'>{user.name}</p>
// 						<p className='small-medium text-light-4 '>@{user.username}</p>
// 					</div>
// 				</Link>

// 				<ul className='flex flex-col gap-6'>
// 					{sidebarLinks.map((link: INavLink) => {
// 						const isActive = pathname === link.route

// 						return (
// 							<li
// 								key={link.label}
// 								className={`leftsidebar-link  group ${
// 									isActive && 'bg-primary-500'
// 								}  `}
// 							>
// 								<NavLink
// 									to={link.route}
// 									className={`flex gap-4 items-center p-4`}
// 								>
// 									<img
// 										src={link.imgURL}
// 										alt={link.label}
// 										className={`group-hover:invert-white ${
// 											isActive && 'invert-white'
// 										}`}
// 									/>
// 									{link.label}
// 								</NavLink>
// 							</li>
// 						)
// 					})}
// 				</ul>
// 			</div>

// 			<Button
// 				variant={'ghost'}
// 				className=' shed-button_ghost flex gap-3 items-center w-full  justify-start hover:text-red'
// 				onClick={() => signOut()}
// 			>
// 				<img
// 					src='/assets/icons/logout.svg'
// 					alt='Logout'
// 				/>
// 				<p className='small-medium lg:base-medium'>Logout</p>
// 			</Button>
// 		</nav>
// 	)
// }

// export default LeftSidebar



import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { INavLink } from '@/types'
import { sidebarLinks } from '@/constants'
import { Loader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { INITIAL_USER, useUserContext } from '@/context/AuthContext'

const LeftSidebar = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { user, setUser, setIsAuthenticated, isLoading } = useUserContext()

	const { mutate: signOut } = useSignOutAccount()

	const handleSignOut = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		signOut()
		setIsAuthenticated(false)
		setUser(INITIAL_USER)
		navigate('/sign-in')
	}

	return (
		<nav className='leftsidebar'>
			<div className='flex flex-col gap-11'>
				<Link to='/' className='flex gap-3 items-center'>
					<img
						src='/assets/images/logo.svg'
						alt='logo'
						width={170}
						height={36}
					/>
				</Link>

				{isLoading || !user.email ? (
					<div className='h-14'>
						<Loader />
					</div>
				) : (
					<Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
						<img
							src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt='profile'
							className='h-14 w-14 rounded-full'
						/>
						<div className='flex flex-col'>
							<p className='body-bold'>{user.name}</p>
							<p className='small-regular text-light-3'>@{user.username}</p>
						</div>
					</Link>
				)}

				<ul className='flex flex-col gap-6'>
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route

						return (
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
										className={`group-hover:invert-white ${
											isActive && 'invert-white'
										}`}
									/>
									{link.label}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</div>

			<Button
				variant='ghost'
				className='shad-button_ghost'
				onClick={e => handleSignOut(e)}
			>
				<img src='/assets/icons/logout.svg' alt='logout' />
				<p className='small-medium lg:base-medium'>Logout</p>
			</Button>
		</nav>
	)
}

export default LeftSidebar
