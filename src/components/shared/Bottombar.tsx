import { bottombarLinks } from '@/constants'
import {Link , useLocation} from 'react-router-dom'

const Bottombar = () => {
  
  const {pathname} = useLocation()
  
  return (
		<section className='bottom-bar sm:border-t-[1px] border-light-4 rounded-none'>
			{bottombarLinks.map(link => {
				const isActive = pathname === link.route

				return (
					<Link
						to={link.route}
						key={link.label}
						className={`group ${
							isActive && 'bg-primary-500 rounded-[10px]'
						} flex-center  items-center flex-col gap-1 p-4  hover:rounded-[10px] `}
					>
						<img
							src={link.imgURL}
							width={16}
							height={16}
							alt={link.label}	
							className={`group-hover:invert-white ${
								isActive && 'invert-white'
							} `}	
						/>
						<p className='tiny-medium text-light-2 '>{link.label.length > 5 ? link.label.slice(0, 5) + '...' : link.label}</p>
					</Link>
				)
			})}
		</section>
	)
}

export default Bottombar
