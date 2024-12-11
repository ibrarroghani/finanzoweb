import React from 'react';
import Link from 'next/link';
import { CloseIcon, IdeaIcon } from '@/assets/icons/bussiness-panel-icons';

const RecommendationCard: React.FC = () => {
  return (
    <div className='rounded-small flex gap-4 bg-primary-light'>
      <div className='pl-4 pt-5'>
        <IdeaIcon />
      </div>
      <div className='mt-3'>
        <p className='text-medium font-semibold text-primary-dark'>
          Recommendation
        </p>
        <p>
          Increase monthly savings by{' '}
          <span className='font-bold text-success'>$200</span> to meet target
          date
        </p>
        <p className='my-3'>
          <Link
            href='#'
            className='text-link-secondary text-small my-2 font-medium capitalize'
          >
            Learn More
          </Link>
        </p>
      </div>
      <div className='mr-6 mt-4 cursor-pointer'>
        <CloseIcon />
      </div>
    </div>
  );
};

export default RecommendationCard;
