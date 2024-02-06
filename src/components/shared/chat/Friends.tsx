import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

type User = {
	users: Models.Document & { imageUrl?: string }
}

const Friends = ({	users  }:	User ) => {
    const {user} = useUserContext()
	return (
        // 
		<Link to={`/all-chats/direct`} className='flex gap-3 items-center justify-start px-4 py-2'>
			<img
				src={users.imageUrl || '/assets/icons/profile-placeholder.svg'}
				alt='creator'
				className='rounded-full w-12 h-12'
				id='profileimg'
			/>

			<div className='flex-center flex-col gap-1'>
				<p className='base-medium text-light-1 text-center line-clamp-1'>
					{/*show only other user's name*/}
                    {users.name === user?.name ? 'You' : users.name && users.name.length > 10 ? users.name.slice(0, 10) + '...' : users.name}
				</p>
				<p className='small-regular text-light-3 text-center line-clamp-1'>
					@{users.username.length > 10 ? users.username.slice(0, 10) + '...' : users.username}
				</p>
			</div>

		
		</Link>
	)
}

export default Friends
