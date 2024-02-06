import ChatsSidebar from "@/components/shared/ChatsSidebar"
import Conversation from "@/components/shared/chat/Conversation"
import { Link, Outlet, useLocation } from "react-router-dom"

const AllChats = (   ) => {
  const { pathname } = useLocation()


  return (
		<>
			<div className='w-full md:w-fit h-full md:flex md:flex-col'>
				<div className='h-[20%] w-full md:w-[250px]'>
					<ChatsSidebar />
				</div>
				<section className='h-[80%] w-full'>
					<Outlet />
				</section>
			</div>

			<div
				className={`w-full h-full bg-black gap-2 flex flex-col items-center justify-center ${
					pathname === '/all-chats' ? 'flex' : 'hidden'
				}`}
			>
				<div className=''>
					<img
						src='/assets/icons/chat.svg'
						alt='chat logo'
						className='w-20 h-20 invert-white'
					/>
				</div>
				<div className=''>
					<span className='text-white text-3xl'>Your chats</span>
				</div>
				<div>
					<span className='text-gray-400'>
						Send private photos and messages to a friend or group.
					</span>
				</div>
				<div>
					<button className='bg-primary-500 border border-primary-500 px-3 py-1 rounded-lg hover:bg-primary-500 hover:text-white'>
						{/* link to direct */}
						
						<Link to={`/all-chats/direct`}>Start a conversation</Link>
					</button>
				</div>
			</div>

			{pathname === `/all-chats/direct` && (
				<div
					className={`w-full h-full bg-slate-700 ${
						pathname === '/all-chats/direct' ? 'flex' : 'hidden'
					}`}
				>
					<Conversation />
				</div>
			)}
		</>
	)
}

export default AllChats
