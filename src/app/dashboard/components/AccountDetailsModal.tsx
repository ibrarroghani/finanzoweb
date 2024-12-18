import { Modal } from 'antd';
import React from 'react';

interface IClientModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
  //eslint-disable-next-line
  data?: any;
}

const AccountDetailsModal: React.FC<IClientModalProps> = ({
  title,
  showModal,
  setShowModal,
  data,
}) => {
  console.log('data', data);
  return (
    <div>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div>
          {data.length > 0 &&
            //eslint-disable-next-line
            data.map((accountDetails: any, index: any) => (
              <div key={index} className='rounded-small my-2 bg-card p-2'>
                <p>{accountDetails.name}</p>
                <p>{accountDetails.balances_current}</p>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default AccountDetailsModal;
