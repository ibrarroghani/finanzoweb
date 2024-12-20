import Spinner from '@/shared-components/Spinner';

interface IDataSectionProps {
  isLoading: boolean;
  //eslint-disable-next-line
  data: any;
  //eslint-disable-next-line
  renderItem: any;
  emptyMessage: string;
}

const DataSection: React.FC<IDataSectionProps> = ({
  isLoading,
  data,
  renderItem,
  emptyMessage,
}) => {
  if (isLoading) {
    return (
      <div className='mt-20 flex justify-center'>
        <Spinner />
      </div>
    );
  }
  if (data.length === 0) {
    return <div className='p-4'>{emptyMessage}</div>;
  }
  return data.map(renderItem);
};

export default DataSection;
