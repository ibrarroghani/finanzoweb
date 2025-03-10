import Spinner from '@/shared-components/Spinner';

interface IDataSectionProps<T> {
  isLoading: boolean;
  data: T[];
  //eslint-disable-next-line
  renderItem: (goal: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

const DataSection = <T,>({
  isLoading,
  data,
  renderItem,
  emptyMessage,
}: IDataSectionProps<T>) => {
  if (isLoading) {
    return (
      <div className='mt-20 flex justify-center'>
        <Spinner />
      </div>
    );
  }
  if (data.length === 0 && emptyMessage) {
    return <div className='p-4'>{emptyMessage}</div>;
  }
  return data.map(renderItem);
};

export default DataSection;
