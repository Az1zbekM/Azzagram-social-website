// import { useCallback, useState } from "react";
// import { FileWithPath, useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui/button";
// import { convertFileToUrl } from "@/lib/utils";

// type FileUploaderProps = {
//   fieldChange: (files: File[]) => void;
//   mediaUrl: string;
// };

// const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       setFile(acceptedFiles);
//       fieldChange(acceptedFiles);
//       setFileUrl(convertFileToUrl(acceptedFiles[0]));
//     },
//     [file]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg", ".svg", ".gif", ".webp"],
//     },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
//       <input {...getInputProps()} className="cursor-pointer" />

//       {fileUrl ? (
//         <>
//           <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
//             <img src={fileUrl} alt="image" className="file_uploader-img" />
//           </div>
//           <p className="file_uploader-label">Click or drag photo to replace</p>
//         </>
//       ) : (
//         <div className="file_uploader-box ">
//           <img
//             src="/assets/icons/file-upload.svg"
//             width={96}
//             height={77}
//             alt="file upload"
//           />

//           <h3 className="base-medium text-light-2 mb-2 mt-6">
//             Drag photo here
//           </h3>
//           <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

//           <Button type="button" className="shad-button_dark_4">
//             Select from computer
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;

import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
	fieldChange: (files: File[]) => void
	mediaUrl: string 
	type: 'image' | 'video'
}

const FileUploader = ({ fieldChange, mediaUrl, type }: FileUploaderProps) => {
	const [file, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			const newFile = acceptedFiles[0]
			setFile([newFile])
			fieldChange([newFile])
			setFileUrl(convertFileToUrl(newFile))
		},
		[fieldChange]

	)

    type Accept = 'image/*' | 'video/*'

const { getRootProps, getInputProps } = useDropzone({
	onDrop,
  accept: {
    [type]: ['image/*' || 'video/*'] as Accept[		],
  }
})


	return (
		<div
			{...getRootProps(		)}
			className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'
		>
			<input {...getInputProps(	)} className='cursor-pointer' />

			{fileUrl ? (
				<>
					<div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
						{type === 'image' ? (
							<img src={fileUrl}   alt='image' className='file_uploader-img' />
						) : (
							<video controls  className='file_uploader-video' >
								<source src={fileUrl} type='video/mp4' />
								Your browser does not support the video tag.
							</video>
						)}
					</div>
					<p className='file_uploader-label'>
						Click or drag {type === 'image' ? 'photo' : 'video'} to replace
					</p>
				</>
			) : (
				<div className='file_uploader-box'>
					{type === 'image' ? (
						<img
							src='/assets/icons/file-upload.svg'
							width={96}
							height={77}
							alt='file upload'
						/>
					) : (
						<img
							src='/assets/icons/file-upload-video.svg'
							width={96}
							height={77}
							alt='file upload'
							className='invert-white'
						/>
					)}

					<h3 className='base-medium text-light-2 mb-2 mt-6'>
						Drag {type === 'image' ? 'photo' : 'video'} here
					</h3>
					<p className='text-light-4 small-regular mb-6'>
						{type === 'image' ? 'SVG, PNG, JPG' : 'MP4, MKV, AVI, MOV, WEBM'}
					</p>

					<Button type='button' className='shad-button_dark_4'>
						Select from computer
					</Button>
				</div>
			)}
		</div>
	)
}

export default FileUploader

