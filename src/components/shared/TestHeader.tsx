import { useUserContext } from "@/context/AuthContext"

const TestHeader = () => {
    const { user } = useUserContext()
  return (
		<div id='header--wrapper' className='header--wrapper rounded-sm gap-3 flex justify-center items-center w-full h-8 bg-dark-3'>
			{/* {user ? <p>{user.name}</p> : <p>Not logged in</p>} */}
{/* user name and user id */}
            <p className='text-light-1'>{user?.name}</p>
            <p className='text-light-1'>Email: {user?.email}</p>
		</div>
	)
}

export default TestHeader
