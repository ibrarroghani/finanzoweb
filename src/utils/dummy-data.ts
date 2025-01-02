import { IClient } from '@/shared-components/layouts/sidebar/Sidebar';

export const goalData = [
  {
    id: 1,
    title: 'SIP Goals1',
    status: 'active',
    targetAmount: '$500',
    totalPaidAmount: '$400',
    lastPaidAmount: '$200',
    deadline: '23 May 2025',
  },
  {
    id: 2,
    title: 'SIP Goals2',
    status: 'active',
    targetAmount: '$500',
    totalPaidAmount: '$400',
    lastPaidAmount: '$200',
    deadline: '23 May 2025',
  },
  {
    id: 3,
    title: 'SIP Goals3',
    status: 'active',
    targetAmount: '$500',
    totalPaidAmount: '$400',
    lastPaidAmount: '$200',
    deadline: '23 May 2025',
  },
  {
    id: 4,
    title: 'SIP Goals4',
    status: 'active',
    targetAmount: '$500',
    totalPaidAmount: '$400',
    lastPaidAmount: '$200',
    deadline: '23 May 2025',
  },
];

export const bankData = [
  { id: 1, title: 'bank name', account: '1234567890', card: '123433332' },
  { id: 2, title: 'bank name', account: '1234567890', card: '123433332' },
  { id: 3, title: 'bank name', account: '1234567890', card: '123433332' },
  { id: 4, title: 'bank name', account: '1234567890', card: '123433332' },
];

export const balanceData = [
  { id: 1, title: 'balance', amount: '$12000', rate: '12.5%' },
  { id: 2, title: 'income', amount: '$12000', rate: '12.5%' },
  { id: 3, title: 'expense', amount: '$12000', rate: '12.5%' },
];

export const documentData = [
  { id: 1, title: 'Document Name' },
  { id: 2, title: 'Document Name' },
  { id: 3, title: 'Document Name' },
];

export const clientData: IClient[] = [
  {
    id: 6,
    name: 'yowix22401 SD',
    email: 'yowix22401@nozamas.com',
    password: null,
    user_type: 'client',
    is_email_verified: 0,
    is_banned: 0,
    is_active: 1,
    slug: 'user-503c99d6-a64a-11ef-878e-6045bd08fbb0-503c99da-a64a-11ef-878e-6045bd08fbb0',
    created_at: new Date('2021-01-01T00:00:00Z'),
    updated_at: new Date('2021-01-01T00:00:00Z'),
    user_id: 15,
    address: '2464 Junius Spur',
    phone_number: '(877) 221-9621 x2246',
    date_of_birth: new Date('2011-10-23'),
    profile_picture_url: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: 13,
    name: 'Yejin',
    email: 'yejin38701@world.com',
    password: null,
    user_type: 'client',
    is_email_verified: 0,
    is_banned: 0,
    is_active: 1,
    slug: 'user-b7793004-a5a3-11ef-878e-6045bd08fbb0-b7793008-a5a3-11ef-878e-6045bd08fbb0',
    created_at: new Date('2021-01-01T00:00:00Z'),
    updated_at: new Date('2021-01-01T00:00:00Z'),
    user_id: 12,
    address: '57618 Phyllis Crossing',
    phone_number: '724-735-6698 x226',
    date_of_birth: new Date('2006-12-12'),
    profile_picture_url: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

export const recommendationData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
