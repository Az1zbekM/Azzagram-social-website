import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

type UserCardProps = {
	user: Models.Document & { imageUrl?: string }
}

const Friends = ({ user }: UserCardProps) => {
	return (
		<Link to={`/profile/${user.$id}`} className='flex gap-3 items-center justify-start px-4 py-2'>
			<img
				src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
				alt='creator'
				className='rounded-full w-12 h-12'
				id='profileimg'
			/>

			<div className='flex-center flex-col gap-1'>
				<p className='base-medium text-light-1 text-center line-clamp-1'>
					{user.name}
				</p>
				<p className='small-regular text-light-3 text-center line-clamp-1'>
					@{user.username}
				</p>
			</div>

		
		</Link>
	)
}

export default Friends
