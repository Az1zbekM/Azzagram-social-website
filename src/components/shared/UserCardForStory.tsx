import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import { useState } from 'react'


import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

type UserCardProps = {
	users: Models.Document[] | undefined
}

const UserCardForStory = ({ users }: UserCardProps) => {
	const [activeIndex] = useState(0)


	return (
		<Carousel orientation='horizontal' className='w-[80%]'>
			<CarouselPrevious
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					fontSize: '24px',
					color: '#555',
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)',
					left: '10px',
				}}
                className=' md:flex md:items-center md:ml-2'
			>
				{'<'}
			</CarouselPrevious>
			<CarouselContent className='-ml-2 md:-ml-4 w-full'>
				{users && users.map((user, index)  => (
					<CarouselItem
						key={index}
						className={`pl-2 basis-1/5 md:pl-4 ${activeIndex === index ? 'active' : ''}`}
					>
						<Link
							to={`/profile/${user.$id}`}
							className='flex flex-col items-center gap-2'
						>
							<img
								src={
									user.imageUrl
										? user.imageUrl
										: '/assets/icons/profile-placeholder.svg'
								}
								alt='creator'
								className='rounded-full w-12 h-12 object-cover'
								id='profileimg'
							/>
							<p className='text-light-1 text-sm text-center font-bold'>
								{user.name.slice(0, 10)}
							</p>
						</Link>
					</CarouselItem>
				))}
                
			</CarouselContent>
			<CarouselNext
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					fontSize: '24px',
					color: '#555',
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)',
					right: '10px',
				}}
                className=' md:flex md:items-center  md:mr-2'
			>
				{'>'}
			</CarouselNext>
		</Carousel>
	)
}

export default UserCardForStory
