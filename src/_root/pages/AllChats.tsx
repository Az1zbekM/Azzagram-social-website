import ChatsSidebar from "@/components/shared/ChatsSidebar"
import { Outlet } from "react-router-dom"

const AllChats = () => {
  return (
		<div className='w-full h-full md:flex md:flex-col'>
        <div className="h-[20%] w-full">
           <ChatsSidebar />
        </div>
    
      <section className="h-[80%] w-full"> 
        <Outlet />
      </section>
		</div>
	)
}

export default AllChats
