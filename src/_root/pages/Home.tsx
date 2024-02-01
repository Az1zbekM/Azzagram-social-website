import { Models } from 'appwrite'

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from '@/components/shared'
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queries'
import UserCardForStory from '@/components/shared/UserCardForStory'

const Home = () => {
	// const { toast } = useToast();

	const {
		data: posts,
		isLoading: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts()
	const {
		data: creators,
		isLoading: isUserLoading,
		isError: isErrorCreators,
	} = useGetUsers(10)

	if (isErrorPosts || isErrorCreators) {
		return (
			<div className='flex flex-1'>
				<div className='home-container'>
					<p className='body-medium text-light-1'>Something bad happened</p>
				</div>
				<div className='home-creators'>
					<p className='body-medium text-light-1'>Something bad happened</p>
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-1'>
			<div className='home-container'>
				{/* profiles section dynamically generated here	 */}
					<div className='home-profiles w-full flex justify-center items-center gap-9'>
						{isUserLoading && !creators ? (
							<Loader />
						) : (
							<UserCardForStory users={creators?.documents} />
						)}
					</div>

					{/* posts section */}
				<div className='home-posts'>
					{isPostLoading && !posts ? (
						<Loader />
					) : (
						<ul className='flex flex-col flex-1 gap-9 w-full '>
							{posts?.documents.map((post: Models.Document	) => (
								<li key={post.$id} className='flex justify-center w-full'>
									<PostCard post={post} />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className='home-creators'>
				<h3 className='h3-bold text-light-1'>Top Creators</h3>
				{isUserLoading && !creators ? (
					<Loader />
				) : (
					<ul className='grid 2xl:grid-cols-2 gap-6'>
						{creators?.documents.map(creator => (
							<li key={creator?.$id}>
								<UserCard user={creator} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default Home
