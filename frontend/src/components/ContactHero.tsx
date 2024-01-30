import contactus from '../assets/contactus-img.png'

const ContactHero = () => {
    return (
        <div className='flex justify-content absolute container w-full z-20'> 
         
          <img
            className='object-contain h-48 w-auto'
            src={contactus}
            alt='contact us sign'
          />
         
           <div className='text-center leading-10 absolute top-48'>
                <span className='text-[#3C0345] text-2xl text-medium'>
                    Customer satisfaction is very 
                </span>
                <br/>
                <span className='text-[#3C0345] text-2xl text-medium'>
                    important to us! Send a
                </span>
                <br/>
                <span className='text-[#3C0345] text-2xl text-medium'>
                    message using the contact
                    
                </span>
                <br/>
                <span className='text-[#3C0345] text-2xl text-medium'>
                    form below for inquires. 
                </span>
                </div>
            </div>
       
    )
}

export default ContactHero;

