import React from 'react';
import { FaFacebook, FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
} from 'react-share';

interface IShare {
	url: string;
	onClose: () => void;
}

const ShareModal = ({ url, onClose }: IShare) => {
	return (
		<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50'>
			<div className='bg-white p-8 rounded-md max-w-md'>
				<h2 className='text-lg font-semibold mb-4'>Share Event</h2>
				<div className='flex flex-col space-y-4'>
					<FacebookShareButton url={url}>
						<div className='flex items-center cursor-pointer'>
							<FaFacebook className='mr-2' />
							<span>Share on Facebook</span>
						</div>
					</FacebookShareButton>
					<TwitterShareButton url={url}>
						<div className='flex items-center cursor-pointer'>
							<FaTwitterSquare className='mr-2' />
							<span>Share on Twitter</span>
						</div>
					</TwitterShareButton>
					<LinkedinShareButton url={url}>
						<div className='flex items-center cursor-pointer'>
							<FaLinkedin className='mr-2' />
							<span>Share on LinkedIn</span>
						</div>
					</LinkedinShareButton>
				</div>
				<button
					className='bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mt-4 w-full'
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default ShareModal;
