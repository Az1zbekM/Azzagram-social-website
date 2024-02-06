import { useUserContext } from "@/context/AuthContext"
import { Link, useLocation } from "react-router-dom"


const ChatsSidebarRoot = () => {
    // currentUser
    const { user } = useUserContext()
    const { pathname } = useLocation()

    const isActive = (path: string) => {
        return pathname === path ? true : false
    }
  return (
		<div className='w-full md:w-[300px] h-[100%] bg-black '>
			<div className='chats-sidebar-header w-full h-[75px] bg-blac'>
				<div className='w-full h-full flex items-center justify-start px-4'>
					       {/* user username */}   
					<p className='text-white text-[20px] flex items-center gap-2'>
						{user?.username}
						<span>
                            {/* down opener icon */}
							<Link to={`#`}>
								<img src='/assets/icons/downOpener.svg' alt='' />
							</Link>
						</span>
					</p>
				</div>
			</div>
			<div className='h-[40px] bg-black flex w-full items-center'>
                {/* search bar */}
                
				<Link to={`/all-chats`} className={`w-1/3 text-center p-2 ${isActive('/all-chats') ? 'border-b-4 border-primary-500' : ''}`}>
					<div>
						<span className='p-1 cursor-pointer text-white'>Primary</span>
					</div>
				</Link>

				<Link to={`/all-chats/general`} className={`w-1/3 text-center p-2 ${isActive('/all-chats/general') ? 'border-b-4 border-primary-500' : ''}`}>
					<div >
						<span className='p-1 cursor-pointer text-white'>General</span>
					</div>
				</Link>

                <Link to={`/all-chats/requests`} className={`w-1/3 text-center p-2 ${isActive('/all-chats/requests') ? 'border-b-4 border-primary-500' : ''}`}>
                <div>
					<span className='p-1 cursor-pointer text-white'>Request</span>
				</div>
                </Link>
			</div>
		</div>
	)
}

export default ChatsSidebarRoot
