import React, { useState } from 'react';
import { Upload, Input, notification } from 'antd';
import {
  MessageSendIcon,
  ImageUploadIcon,
  CloseIcon,
  DocumentIcon,
} from '@/assets/icons/bussiness-panel-icons';

const { TextArea } = Input;
import Image from 'next/image';
import useFileUpload from '@/hooks/data-hooks/chat/use-file-upload';
import { fileSizeCheck } from '@/utils/file-size';
// import { IMessage } from './Chat';

interface InputSectionProps {
  //eslint-disable-next-line
  onSendMessage: (message: string, fileSlug?: string) => void;

  //eslint-disable-next-line
  onSendDocument: (fileSlug: string) => void;

  isLoading?: boolean;
  message_slug: string;
}

const InputSection: React.FC<InputSectionProps> = ({
  onSendMessage,
  onSendDocument,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line when Shift+Enter is pressed
        return;
      }
      // Prevent default to avoid unwanted new line
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    if (fileSlug) {
      onSendDocument(fileSlug);
    } else {
      onSendMessage(message);
    }
    setMessage('');
    setFileSlug('');
    setSelectedFiles([]);
    setFileList([]);
  };

  //eslint-disable-next-line
  const handleFileChange = (info: any) => {
    // Only keep the latest file
    const file = info.fileList[info.fileList.length - 1];
    if (file) {
      if (fileSizeCheck(file.size)) {
        notification.error({
          message: 'File size is too large',
          description: 'Please select a file smaller than 5MB',
        });
        return;
      }
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
    setFileSlug('');
  };

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
          onKeyDown={handleKeyDown}
          disabled={selectedFiles.length > 0}
          style={{
            resize: 'none',
            paddingRight: '5rem',
            paddingBottom: selectedFiles.length > 0 ? '5rem' : '1rem', // Adjust padding to accommodate image preview
          }}
        />

        {/* File Preview */}
        {selectedFiles.length > 0 && (
          <div className='absolute bottom-4 left-0 right-0 flex p-2'>
            <div className='relative mb-2 mr-2'>
              {selectedFiles[0].file.type.startsWith('image/') ? (
                <div className='rounded-small h-16 w-16 overflow-hidden bg-primary-light'>
                  <Image
                    src={selectedFiles[0].url}
                    alt='preview'
                    width={64}
                    height={64}
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : (
                <div className='flex h-12 min-w-[3rem] max-w-[12rem] items-center justify-start gap-2 rounded border px-2'>
                  <DocumentIcon />
                  <div className='flex max-w-[8rem]'>
                    <span
                      className='truncate text-xs'
                      title={selectedFiles[0].file.name}
                    >
                      {selectedFiles[0].file.name
                        .split('.')
                        .slice(0, -1)
                        .join('.')}
                    </span>
                    <span className='text-xs'>
                      .{selectedFiles[0].file.name.split('.').pop()}
                    </span>
                  </div>
                </div>
              )}
              <button
                className='absolute -right-3.5 -top-1 flex h-4 w-4 items-center justify-center bg-muted'
                onClick={() => handleRemoveFile(selectedFiles[0])}
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className='h-3 w-3 animate-spin rounded-full border-2 border-solid border-blue-500 border-t-transparent'></div>
                ) : (
                  <CloseIcon />
                )}
              </button>
            </div>
          </div>
        )}

        <button
          className='send-button absolute right-12 top-7'
          onClick={handleSendMessage}
          disabled={isLoading || isUploading}
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
          disabled={message.trim().length > 0}
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
