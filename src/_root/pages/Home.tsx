import { TypeAnimation } from 'react-type-animation'

const Home = () => {
	return (
		<div className='flex-center flex h-screen w-screen'>
			<h1 className='text-9xl flex-center align-center'>
				Home
				<TypeAnimation
					sequence={['Page', 3000, 'Side', 3000]}
					className='text-primary-500 ml-9  text-9xl  font-bold '
					speed={30}
					repeat={Infinity}
					style={{ fontSize: 'inherit' }}
					cursor={false}
					wrapper='div'
				/>
			</h1>
		</div>
	)
}

export default Home
