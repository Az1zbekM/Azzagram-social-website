// import { Key, ReactNode, useEffect, useState } from 'react'

// interface Reel {
// 	id: Key | null | undefined
// 	thumbnail_url: string | undefined
// 	caption: ReactNode
// 	media_type: string // Assuming media_type is a string, adjust accordingly
// }

// const Reels = () => {
// 	const [reelsData, setReelsData] = useState<Array<Reel>>([])

// 	useEffect(() => {
// 		// Function to fetch Instagram Reels data
// 		const fetchReelsData = async () => {
// 			try {
// 				// Fetch Instagram Reels data using the provided API
// 				const response = await fetch(
// 					'https://v1.nocodeapi.com/armwrist1/instagram/wwZufYDlcOqwuJHQ'
// 				)

// 				const responseData = await response.json()

// 				// Assuming the actual array is under the property 'data'
// 				if (Array.isArray(responseData.data)) {
// 					// Filter only photos and videos
// 					const filteredReels = responseData.data.filter(
//                         (reel: { media_type: string  }) => reel.media_type === 'VIDEO'
// 					)
// 					setReelsData(filteredReels)
// 				} else {
// 					console.error(
// 						'Invalid data structure received from API:',
// 						responseData
// 					)
// 				}
// 			} catch (error) {
// 				console.error('Error fetching Instagram Reels data:', error)
// 			}
// 		}

// 		// Call the function to fetch data
// 		fetchReelsData()
// 	}, [])

// 	return (
// 		<div className='flex h-screen w-full '>
// 			{/* Left sidebar component here */}

// 			<div className='flex-1 overflow-scroll p-5 custom-scrollbar '>
// 				<div className='h-[468px] w-[468px] mx-auto '>
// 					<div className='reels-container h-[468px] w-[468px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 scrollbar-hide'>
// 						{reelsData.map(reel => (
// 							<div
// 								key={reel.id}
// 								className='reel-item overflow-hidden border rounded-lg shadow-md h-[468px] w-[468px] scrollbar-hide'
// 							>
// 								<img
// 									src={reel.media_type === 'VIDEO' ? reel.thumbnail_url : ''}
// 									alt='Reel Thumbnail'
// 									className='h-[468px] w-[468px] object-cover transition-transform transform scrollbar-hide hover:scale-105'
// 								/>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Reels

//// Insta API above


const Reels = () => {
  return (
		<div className='flex h-screen w-full '>
			<div className='flex-1 overflow-scroll p-5 custom-scrollbar '>
				<h1 className='h1-bold flex justify-center mt-2 mb-2'>Reels</h1>

				<iframe
                    className='mx-auto rounded-lg'
					width='560'
					height='315'
					src='https://www.youtube.com/embed/mqUN4N2q4qY?si=xlNCYJRwquZSeSkh'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share allowfullscreen'
					allowFullScreen
				></iframe>
			</div>
		</div>
	)
}

export default Reels







