import React from 'react';

interface ISectionProps {
  title?: string | null;
  children: React.ReactNode;
  //eslint-disable-next-line
  data?: any[];
  className?: string;
}

interface IScrollableProps {
  children: React.ReactNode;
}

interface IItemProps {
  children: React.ReactNode;
}

const Section: React.FC<ISectionProps> & {
  Scrollable: React.FC<IScrollableProps>;
  Item: React.FC<IItemProps>;
} = ({ title, children, className }) => (
  <div
    className={`${title ? 'rounded-extra-small bg-primary-light p-2' : ''} ${className}`}
  >
    {title && <p className='px-2 py-1 font-semibold'>{title}</p>}
    {children}
    {/* {data && data.length > 0 ? (
      <>{children}</>
    ) : (
      <p className='p-4 text-center text-gray-500'>No Data Available</p>
    )} */}
  </div>
);

Section.Scrollable = ({ children }) => (
  <div className='custom-scrollbar h-[300px] w-full overflow-y-auto px-3'>
    {children}
  </div>
);

Section.Item = ({ children }) => <div className='pb-4'>{children}</div>;

// Set display names for sub-components
Section.displayName = 'Section';
Section.Scrollable.displayName = 'Section.Scrollable';
Section.Item.displayName = 'Section.Item';

export default Section;
