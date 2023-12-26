import { TypeAnimation } from 'react-type-animation';

const Home = () => {
	return (
		<div className='flex-center flex h-full w-full '>
			<h1 className='text-9xl flex-center align-center'>
				Home
				<TypeAnimation
					sequence={['Page', 1000, 'Side', 1000]}
					className='text-primary-500 ml-9  text-9xll  font-bold'
					speed={60}
					repeat={Infinity}
					style={{ fontSize: 'inherit' }}
					cursor={false}
					wrapper='div'
				/>
			</h1>
		</div>
	)
}

export default Home;
