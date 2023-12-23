import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'

const LeftSidebar = () => {
	const { mutate: signOut, isSuccess } = useSignOutAccount()
	const navigate = useNavigate()
	const { user } = useUserContext()
	useEffect(() => {
		if (isSuccess) navigate(0)
	}, [isSuccess, navigate])
	return (
		<nav className='leftsidebar'>
			<div className='flex flex-col gap-10'>
				<Link to='/' className='flex gap-3 items-center'>
					<img
						src='/assets/images/logo.svg'
						alt='logo'
						width={175}
						height={36}
					/>
				</Link>

				<Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img
                        src={user.imageUrl || '/assets/images/profile.png'}
                        alt='Profile image'
                        className='w-14 h-14 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>
                            {user.name}
                        </p>
                        <p className='small-medium text-light-4 '>@{user.username}</p>
                    </div>
                </Link>
			</div>
		</nav>
	)
}

export default LeftSidebar
