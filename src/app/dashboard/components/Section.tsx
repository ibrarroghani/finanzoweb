import React from 'react';

interface ISectionProps {
  title?: string | null;
  children: React.ReactNode;
  //eslint-disable-next-line
  data?: any[];
  className?: string;
  icon?: React.ReactNode;
  available?: string;
}

interface IScrollableProps {
  children: React.ReactNode;
  height?: string;
}

interface IItemProps {
  children: React.ReactNode;
}

const Section: React.FC<ISectionProps> & {
  Scrollable: React.FC<IScrollableProps>;
  Item: React.FC<IItemProps>;
} = ({ title, children, className, icon, available }) => (
  <div
    className={`${title ? 'rounded-extra-small bg-primary-light p-2' : ''} ${className}`}
  >
    {(title || icon || available) && (
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {icon && <span className='ml-2'>{icon}</span>}
          {title && <p className='px-2 py-1 font-semibold'>{title}</p>}
        </div>
        {available && (
          <span className='card-subtitle text-right'>Total: {available}</span>
        )}
      </div>
    )}
    {children}
    {/* {data && data.length > 0 ? (
      <>{children}</>
    ) : (
      <p className='p-4 text-center text-gray-500'>No Data Available</p>
    )} */}
  </div>
);

Section.Scrollable = ({ children, height }) => (
  <div
    className='custom-scrollbar w-full overflow-y-auto px-3'
    style={{ height: height ? height : '100%' }}
  >
    {children}
  </div>
);

Section.Item = ({ children }) => <div className='pb-4'>{children}</div>;

// Set display names for sub-components
Section.displayName = 'Section';
Section.Scrollable.displayName = 'Section.Scrollable';
Section.Item.displayName = 'Section.Item';

export default Section;
