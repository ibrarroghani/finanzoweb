import InputField from '@/shared-components/InputField';
import { Modal } from 'antd';
import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useForm, Control, FieldValues } from 'react-hook-form';
import { clientData } from '@/utils/dummy-data';
import { debounce } from 'lodash';
import { FilterIcon, SearchIcon } from '@/assets/icons/bussiness-panel-icons';
import ClientCard from '@/app/dashboard/components/ClientCard';
import CustomButton from '@/shared-components/CustomButton';

interface IFormData {
  search: string;
}

interface IClientModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

const ClientModal: React.FC<IClientModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const [users, setUsers] = useState(clientData);
  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: { search: '' },
  });

  const handleCard = () => {
    //eslint-disable-next-line no-console
    console.log('card is clicked');
  };

  const submitHandler = useCallback(
    (data: IFormData) => {
      const results = users.filter((item) =>
        item.name.toLowerCase().includes(data?.search?.toLowerCase())
      );
      setUsers(results);
    },
    //eslint-disable-next-line
    []
  );

  const debouncedSubmit = useMemo(
    () =>
      debounce((data) => {
        handleSubmit(submitHandler)(data);
      }, 1000),
    [handleSubmit, submitHandler]
  );

  useEffect(() => {
    return () => {
      debouncedSubmit.cancel(); // Debounce Cleanup on unmount
    };
  }, [debouncedSubmit]);

  return (
    <div>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div className='flex h-[80vh] flex-col'>
          {/* Fixed InputField */}
          <div className='flex items-center gap-2'>
            <div className='flex-1'>
              <InputField
                id='search'
                name='search'
                control={control as unknown as Control<FieldValues>}
                icon={<SearchIcon />}
                onCustomChange={(value) => debouncedSubmit({ search: value })}
              />
            </div>

            <div>
              <CustomButton
                className='border border-border-primary bg-primary-light py-2'
                icon={<FilterIcon />}
              />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className='custom-scrollbar h-full flex-1 overflow-y-auto pr-1'>
            {users.length > 0 ? (
              users.map((client) => (
                <ClientCard
                  key={client.id}
                  data={client}
                  onClick={handleCard}
                />
              ))
            ) : (
              <div className='text-small text-center font-bold capitalize text-primary-dark'>
                no user matched
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientModal;
