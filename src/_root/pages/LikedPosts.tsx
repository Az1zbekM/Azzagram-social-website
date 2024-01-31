import { GridPostList, Loader } from '@/components/shared'
import { useGetCurrentUser } from '@/lib/react-query/queries'

const LikedPosts = () => {
	const { data: currentUser, isLoading } = useGetCurrentUser()

	if (isLoading)
		return (
			<div className='flex-center w-full h-full'>
				<Loader />
			</div>
		)

	if (!currentUser) return <div className='flex-center w-full h-full'>No data</div>
	return (
		<>
			{currentUser.loked.length === 0 && (
				<p className='text-light-4'>No liked posts</p>
			)}

			<GridPostList posts={currentUser.loked} showStats={false} />
		</>
	)
}

export default LikedPosts
