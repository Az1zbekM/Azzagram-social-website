import ChatsSidebar from "@/components/shared/ChatsSidebar"
import Conversation from "@/components/shared/chat/Conversation"
import { Outlet, useLocation } from "react-router-dom"

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
			{/* if pathname is /all-chats/direct then render <Conversation /> otherwise don't */}
			<div className='hidden md:flex md:w-full md:h-full'>
				{pathname === `/all-chats/direct` 
				? (
					<Conversation />
				) 
				: null
				}
			</div>
		</>
	)
}

export default AllChats
