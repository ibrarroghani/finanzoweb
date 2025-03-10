import React, { useState } from 'react';
import { Upload, Input, notification, UploadFile } from 'antd';
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
import { useDashboardPageContext } from '@/app/dashboard/context/DashboardPageContext';
import { UploadChangeParam } from 'antd/es/upload';

interface ISelectedFile {
  file: File;
  url: string;
}

const InputSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [fileSlug, setFileSlug] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    connectionSlugId,
    handleSendMessage,
    handleSendDocument,
    isLoadingState,
  } = useDashboardPageContext();

  const { mutate: uploadFile, isPending: isUploading } =
    useFileUpload(connectionSlugId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line when Shift+Enter is pressed
        return;
      }

      // Prevent default to avoid unwanted new line
      e.preventDefault();

      if (isUploading) return;
      if (!message.trim()) return;
      handleSendMessage(message);
      setMessage('');
    }
  };

  const handleMessage = () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    if (fileSlug) {
      handleSendDocument(fileSlug);
    } else {
      handleSendMessage(message);
    }
    setMessage('');
    setFileSlug('');
    setSelectedFiles([]);
    setFileList([]);
  };

  const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
    // Only keep the latest file
    const file = info.fileList[info.fileList.length - 1];
    if (file) {
      if (
        file.size === undefined ||
        file.size === 0 ||
        fileSizeCheck(file.size)
      ) {
        notification.error({
          message: 'File size is too large or invalid',
          description: 'Please select a valid file smaller than 5MB',
        });
        return;
      }
      const newFile = {
        file: file.originFileObj as File,
        url: URL.createObjectURL(file.originFileObj as File),
      };
      setSelectedFiles([newFile]);
      setFileList([file]);

      const formData = new FormData();

      formData.append('file', file.originFileObj as File);

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
          key={selectedFiles.length}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder='Enter your message here...'
          onKeyDown={handleKeyDown}
          disabled={selectedFiles.length > 0}
          className={`resize-none pr-20 ${selectedFiles.length > 0 ? 'pb-20' : 'pb-4'}`}
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
          onClick={handleMessage}
          disabled={isLoadingState || isUploading}
        >
          <MessageSendIcon />
        </button>

        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          showUploadList={false}
          multiple
          accept='.jpg,.jpeg,.png,.pdf,.zip'
          fileList={fileList}
          disabled={message.trim().length > 0}
        >
          <button className='upload-button absolute right-2 top-7'>
            <ImageUploadIcon />
          </button>
        </Upload>
      </div>
    </div>
  );
};

export default InputSection;
