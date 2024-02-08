import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useState } from "react";
type UserCardProps = {
  user: Models.Document & { imageUrl?: string };
};

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };
  return (
		<>
			<div className='user-card'>
				<Link
					to={`/profile/${user.$id}`}
					className='flex-center flex-col gap-4 '
				>
					<img
						src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
						alt='creator'
						className='rounded-full w-14 h-14'
						id='profileimg'
					/>

					<div className='flex-center flex-col gap-1'>
						<p className='base-medium text-light-1 text-center line-clamp-1'>
							{user.name}
						</p>
						<p className='small-regular text-light-3 text-center line-clamp-1'>
							@{user.username}
						</p>
					</div>
				</Link>
				<Button
					type='button'
					onClick={handleFollow}
					size='sm'
					className='shad-button_primary px-5'
				>
					{isFollowing ? 'Unfollow' : 'Follow'}
				</Button>
			</div>
		</>
	)
};

export default UserCard;
