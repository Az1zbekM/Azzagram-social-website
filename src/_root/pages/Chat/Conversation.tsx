import AvatarWithBadge from "./AvatarWithBadge"

const Conversation = () => {
  return (
		<div className='flex gap-4 p-4 align-middle hover:cursor-pointer bg-dark-1 rounded-2xl w-full h-[100px]'>
			<div className='flex gap-4 align-middle p-1 hover:cursor-pointer bg-dark-1 rounded-md h-full'>
				<div className='flex gap-4 align-middle hover:cursor-pointer bg-dark-1 rounded-md '>
					<AvatarWithBadge src='https://i.pravatar.cc' notificationCount={1} />
				</div>
				<div className='flex flex-col gap-3 items-start justify-center align-middle h-full '>
					<p className='text-light-1  rounded-full w-20 h-4 line-height-4 text-start flex align-middle font-bold'>
						User
					</p>

					<p className='text-light-1 rounded-full w-40 h-4 line-height-4 text-start flex align-middle text-sm'>
						Last message
					</p>
				</div>
			</div>
		</div>
	)
}

export default Conversation
