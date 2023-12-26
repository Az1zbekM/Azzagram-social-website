import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import './Topbar.css';
const Topbar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();
    const {user} = useUserContext();
    useEffect(() => {
        if(isSuccess) navigate(0);
        
    }, [isSuccess, navigate]);
    return (
			<section className='topbar sm:border-b-[0.1px] border-light-4  '>
				<div className='flex-between py-4 px-5 items-center'>
					<Link to='/' className='flex gap-3 items-center'>
						<img
							src='/assets/images/logo.svg'
							alt='logo'
							width={135}
							height={325}
						/>
					</Link>

					<div className='flex gap-4'>
						<Button
							variant={'ghost'}
							className=' shed-button_ghost'
							onClick={() => signOut()}
						>
							<img src='/assets/icons/logout.svg' alt='Logout' />
						</Button>
						<Link to={`/profile/${user.id}`} className='flex-center gap-3'>
							<img
								src={user.imageUrl || '/assets/images/profile.png'}
								alt='Profile image'
								className='w-8 h-8 rounded-full'
							/>
						</Link>
					</div>
				</div>
			</section>
		)
}
 
export default  Topbar;