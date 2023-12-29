const AvatarWithBadge = ({ src, notificationCount }: { src: string; notificationCount: number }) => {
	return (
		<div style={{ position: 'relative', display: 'inline-block'  }}>
			<div
				style={{
					width: '64px',
					height: '64px',
					borderRadius: '50%',
					overflow: 'hidden',
				}}
			>
				<img
					src={src}
					alt='User Avatar'
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				/>
			</div>
			{notificationCount > 0 && (
				<div
					style={{
						position: 'absolute',
						bottom: '0',
						left: '90%',
						transform: 'translateX(-50%)',
						backgroundColor: 'red',
						color: 'white',
						borderRadius: '50%',
						padding: '4px 8px',
						fontSize: '10px',
						fontWeight: 'bold',
					}}
				>
					{notificationCount}
				</div>
			)}
		</div>
	)
}

export default AvatarWithBadge