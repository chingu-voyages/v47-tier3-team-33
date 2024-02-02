import { Puff } from 'react-loader-spinner';

const Loader = () => {
	return (
		<div className='h-screen w-full flex flex-col justify-center items-center'>
			<Puff
				visible={true}
				height='200'
				width='200'
				color='#Ff6666'
				ariaLabel='puff-loading'
				wrapperStyle={{}}
				wrapperClass=''
			/>
			<div className='text-3xl mt-20 text-pink'>Loading...</div>
		</div>
	);
};

export default Loader;
