import React, { useState } from 'react';
import { Upload, Dropdown, Menu, Button } from 'antd';
import {
  MessageSendIcon,
  ImageUploadIcon,
  CloseIcon,
} from '@/assets/icons/bussiness-panel-icons';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';

interface InputSectionProps {
  //eslint-disable-next-line
  onSendMessage: (message: {
    id: string;
    text: string;
    timestamp: string;
    sender: string;
    receiver: string;
    files?: { file: File; url: string }[];
  }) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; url: string }[]
  >([]);
  //eslint-disable-next-line
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSendMessage = () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    onSendMessage({
      id: String(Date.now()),
      text: message.trim(),
      timestamp: new Date().toLocaleString(),
      sender: 'user',
      receiver: 'system',
      files: selectedFiles,
    });

    setMessage('');
    setSelectedFiles([]);
    setFileList([]);
  };

  //eslint-disable-next-line
  const handleFileChange = (info: any) => {
    //eslint-disable-next-line
    const newFiles = info.fileList.map((file: any) => ({
      file: file.originFileObj as File,
      url: URL.createObjectURL(file.originFileObj),
    }));
    setSelectedFiles(newFiles);
    setFileList(info.fileList);
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

  const fileUploadMenu = (
    <Menu>
      <Menu.Item key='1'>
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          showUploadList={false}
          accept='image/*,application/pdf'
          fileList={fileList}
        >
          <Button>Select Image or File</Button>
        </Upload>
      </Menu.Item>
    </Menu>
  );

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
        {selectedFiles.length > 0 && (
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
        )}
        <button
          className='send-button absolute right-12 top-7'
          onClick={handleSendMessage}
        >
          <MessageSendIcon />
        </button>
        <Dropdown overlay={fileUploadMenu} trigger={['click']}>
          <button className='upload-button absolute right-2 top-7'>
            <ImageUploadIcon />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default InputSection;
