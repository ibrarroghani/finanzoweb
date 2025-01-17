import React, { useState } from 'react';
import { Upload, Input } from 'antd';
import {
  MessageSendIcon,
  ImageUploadIcon,
  CloseIcon,
} from '@/assets/icons/bussiness-panel-icons';

const { TextArea } = Input;
import Image from 'next/image';
import useFileUpload from '@/hooks/data-hooks/chat/use-file-upload';
// import { IMessage } from './Chat';

interface InputSectionProps {
  //eslint-disable-next-line
  onSendMessage: (message: string, fileSlug?: string) => void;
  isLoading?: boolean;
  message_slug: string;
}

const InputSection: React.FC<InputSectionProps> = ({
  onSendMessage,
  isLoading,
  message_slug,
}) => {
  const [message, setMessage] = useState('');
  const [fileSlug, setFileSlug] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; url: string }[]
  >([]);
  //eslint-disable-next-line
  const [fileList, setFileList] = useState<any[]>([]);

  const { mutate: uploadFile, isPending: isUploading } =
    useFileUpload(message_slug);

  console.log('isUploading', isUploading);

  const handleSendMessage = () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    // onSendMessage({
    //   id: String(Date.now()),
    //   message: message.trim(),
    //   dateTime: new Date(),
    //   type: 'text',
    //   sender: 'client',
    //   senderName: 'Dan Koa',
    //   senderImage: '',
    //   senderImageType: 'source',
    //   status: 'read',
    //   files: selectedFiles,
    // });

    onSendMessage(message, fileSlug);

    setMessage('');
    setSelectedFiles([]);
    setFileList([]);
  };

  // //eslint-disable-next-line
  // const handleFileChange = (info: any) => {
  //   //eslint-disable-next-line
  //   const newFiles = info.fileList.map((file: any) => ({
  //     file: file.originFileObj as File,
  //     url: URL.createObjectURL(file.originFileObj),
  //   }));
  //   setSelectedFiles(newFiles);
  //   setFileList(info.fileList);
  // };

  //eslint-disable-next-line
  const handleFileChange = (info: any) => {
    // Only keep the latest file
    const file = info.fileList[info.fileList.length - 1];
    if (file) {
      const newFile = {
        file: file.originFileObj as File,
        url: URL.createObjectURL(file.originFileObj),
      };
      setSelectedFiles([newFile]);
      setFileList([file]);

      const formData = new FormData();

      formData.append('file', file.originFileObj);

      uploadFile(formData, {
        onSuccess: (response) => {
          setFileSlug(response.data.slug);
        },
      });
    } else {
      setSelectedFiles([]);
      setFileList([]);
    }
  };

  const handleRemoveFile = (fileToRemove: { file: File; url: string }) => {
    setSelectedFiles((prev) =>
      prev.filter(({ file }) => file !== fileToRemove.file)
    );
    setFileList((prev) =>
      //eslint-disable-next-line
      prev.filter((file: any) => file.originFileObj !== fileToRemove.file)
    );
    URL.revokeObjectURL(fileToRemove.url);
  };

  // const fileUploadMenu = [
  //   {
  //     key: '1',
  //     label: (
  //       <Upload
  //         beforeUpload={() => false}
  //         onChange={handleFileChange}
  //         showUploadList={false}
  //         multiple
  //         accept='image/*,application/pdf'
  //         fileList={fileList}
  //       >
  //         <Button>Select Image or File</Button>
  //       </Upload>
  //     ),
  //   },
  // ];

  return (
    <div className='input-section flex items-center justify-between px-4'>
      {/* Input Section */}
      <div className='relative flex w-full flex-col'>
        {/* Input Field */}
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder='Enter your message here...'
          style={{
            resize: 'none',
            paddingRight: '5rem',
            paddingBottom: selectedFiles.length > 0 ? '5rem' : '1rem', // Adjust padding to accommodate image preview
          }}
        />
        {/* Image Preview */}
        {/* {selectedFiles.length > 0 && (
          <div className='absolute bottom-0 left-0 right-0 flex flex-wrap p-2'>
            {selectedFiles.map(({ file, url }, index) => (
              <div key={index} className='relative mb-2 mr-2'>
                {file.type.startsWith('image/') ? (
                  <div className='rounded-small h-10 w-10 overflow-hidden bg-card'>
                    <Image
                      src={url}
                      alt='preview'
                      width={40}
                      height={40}
                      className='object-cover'
                    />
                  </div>
                ) : (
                  <div className='flex h-12 w-12 items-center justify-center rounded border'>
                    <span className='text-xs'>{file.name}</span>
                  </div>
                )}
                <button
                  className='absolute -right-2 -top-1'
                  onClick={() => handleRemoveFile({ file, url })}
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )} */}

        {selectedFiles.length > 0 && (
          <div className='absolute bottom-6 left-0 right-0 flex p-2'>
            <div className='relative mb-2 mr-2'>
              {selectedFiles[0].file.type.startsWith('image/') ? (
                <div className='rounded-small h-10 w-10 overflow-hidden bg-card'>
                  <Image
                    src={selectedFiles[0].url}
                    alt='preview'
                    width={40}
                    height={40}
                    className='object-cover'
                  />
                </div>
              ) : (
                <div className='flex h-12 w-12 items-center justify-center rounded border'>
                  <span className='text-xs'>{selectedFiles[0].file.name}</span>
                </div>
              )}
              <button
                className='absolute -right-3.5 -top-1'
                onClick={() => handleRemoveFile(selectedFiles[0])}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}

        <button
          className='send-button absolute right-12 top-7'
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          <MessageSendIcon />
        </button>

        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          showUploadList={false}
          multiple
          accept='image/*,application/pdf'
          fileList={fileList}
        >
          <button className='upload-button absolute right-2 top-7'>
            <ImageUploadIcon />
          </button>
        </Upload>
        {/* <Dropdown menu={{ items: fileUploadMenu }} trigger={['click']}>
          <button className='upload-button absolute right-2 top-7'>
            <ImageUploadIcon />
          </button>
        </Dropdown> */}
      </div>
    </div>
  );
};

export default InputSection;
