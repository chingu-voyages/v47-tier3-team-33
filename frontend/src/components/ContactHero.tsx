import contactus from '../assets/contactus-img.png';
import contactText from '../assets/contactUs-text.svg';

const ContactHero = () => {
	return (
		<div className='flex flex-col justify-content container w-full z-20'>
			<img
				className='object-contain h-[450px]'
				src={contactus}
				alt='contact us sign'
			/>
			<div className='flex mx-10'>
			<img src={contactText} alt='contact us message' className='my-4 w-[800px] h-[300px]' />
			</div>
			
		</div>
	);
};

export default ContactHero;
