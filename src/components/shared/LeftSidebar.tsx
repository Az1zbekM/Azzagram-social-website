import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { INavLink } from '@/types'
import { sidebarLinks } from '@/constants'
import { Loader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { INITIAL_USER, useUserContext } from '@/context/AuthContext'
import '../shared/Leftsidebar.css'
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
		<nav className='leftsidebar p-6'>
			<div className='flex flex-col gap-6'>
				<Link to='/' className='flex justify-center items-center gap-3 mb-2'>
					<img
						src='/assets/icons/chat.svg'
						alt='Go Go Go'
						className='w-8 h-8'
					/>
					<h1 className='body-bold font-serif text-primary-500 text-3xl '>
						Azzagram
					</h1>
				</Link>
				<hr className='border-primary-500 border-1 w-full m-0 p-0 mt-[-10px]' />
				{isLoading || !user.email ? (
					<div className='h-14'>
						<Loader />
					</div>
				) : (
					<Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
						<img
							id='profileimg'
							src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt='profile'
							className='h-12 w-12 rounded-full ml-[10px]'
						/>
						<div className='flex flex-col'>
							<p className='body-bold'>{user.name}</p>
							<p className='small-regular text-light-3'>@{user.username}</p>
						</div>
					</Link>
				)}

				<ul className='flex flex-col gap-4'>
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route

						return (
							<li
								key={link.label}
								className={`leftsidebar-link group ${isActive && 'bg-primary-500'
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
										className={`group-hover:invert-white ${isActive && 'invert-white'
											}			`}
									/>
									{link.label}
								</NavLink>
							</li>
						)
					})}
				</ul>
				<Button
					variant='ghost'
					className='p-4 flex gap-4 items-center w-[67%] justify-start rounded-full hover:valid:bg-red hover:text-white focus:bg-red focus:text-white active:bg-red active:text-white font-black'
					onClick={e => handleSignOut(e)}
				>
					<img
						src='/assets/icons/logout.svg'
						alt='logout'
						className='fill-white !important'
					/>
					<p className='small-medium lg:base-medium font-bold'>Logout</p>
				</Button>
			</div>


		</nav>
	)
}

export default LeftSidebar


