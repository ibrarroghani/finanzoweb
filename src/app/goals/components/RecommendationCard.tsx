import React from 'react';
import Link from 'next/link';
import { CloseIcon, IdeaIcon } from '@/assets/icons/bussiness-panel-icons';

const RecommendationCard: React.FC = () => {
  return (
    <div className='flex gap-4 rounded-5 bg-primary-light'>
      <div className='pl-4 pt-5'>
        <IdeaIcon />
      </div>
      <div className='mt-3'>
        <p>Recommendation</p>
        <p>
          Increase monthly savings by <strong>$200</strong> to meet target date
        </p>
        <p className='my-3'>
          <Link href='#' className='my-2 text-success'>
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
