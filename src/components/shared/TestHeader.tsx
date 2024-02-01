import { useUserContext } from "@/context/AuthContext"

const TestHeader = () => {
    const { user } = useUserContext()
  return (
		<div id='header--wrapper' className='header--wrapper rounded-sm gap-3 flex justify-center items-center w-full h-8'>
			{/* {user ? <p>{user.name}</p> : <p>Not logged in</p>} */}
{/* user name and user id */}
            <p className='text-light-1'>{user?.name}</p>
		</div>
	)
}

export default TestHeader
