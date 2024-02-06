import { useToast } from '@/components/ui'
import { useGetUsers } from '@/lib/react-query/queries'
import { Loader } from 'lucide-react'
import Friends from './Friends'

const General = () => {
	const { toast } = useToast()

	const { data: friends, isLoading, isError: isErrorCreators } = useGetUsers()

	if (isErrorCreators) {
		toast({ title: 'Something went wrong.' })

		return
	}
	return (
		<div className='w-full md:w-[300px] md:h-[100%] p-4 h-full bg-black overflow-y-auto custom-scrollbar'>
			{/*ADD FRIENDS TO primary chat */}
			{isLoading && !friends ? (
				<Loader className='m-auto flex h-10 justify-center items-center' />
			) : (
				<ul className=' flex flex-col gap-4 '>
					{friends?.documents.map(creator => (
						<li key={creator?.$id} className='flex-1 min-w-[20px] w-full  '>
							<Friends users={creator} />
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default General
