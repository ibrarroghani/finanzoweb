'use client';
import {
  BellIcon,
  FinanzoLogo,
  MenuIcon,
  UserActiveIcon,
} from '@/assets/icons/bussiness-panel-icons';
import { MENU_ITEM_ROUTE } from '@/config/route-config';
import { Dropdown, MenuProps } from 'antd';
import Link from 'next/link';
import MenuItem from './MenuItem';

const Header = () => {
  const handleLogout = () => {
    //eslint-disable-next-line no-console
    console.log('Logout Button is clicked');
  };

  const items = [
    {
      label: <Link href='/login'>Logout</Link>,
      key: '1',
      onClick: handleLogout,
    },
  ];

  const handleHomeClick = () => {
    window.location.reload();
  };

  const menuItems: MenuProps['items'] = [
    { key: '1', label: <Link href='/dashboard'>Dashboard</Link> },
    { key: '2', label: <Link href='/clients'>Clients</Link> },
    { key: '3', label: <Link href='/goals'>goals</Link> },
    {
      key: '4',
      label: <Link href='/transection-wizard'>Transection Wizard</Link>,
    },
    { key: '5', label: <Link href='/reports'>Reports</Link> },
    { key: '6', label: <Link href='/settings'>Setting</Link> },
    { key: '7', label: <Link href='#'>Logout</Link>, onClick: handleLogout },
  ];

  return (
    <>
      <nav className='min-h-20 w-full border-b pt-4'>
        <div className='flex items-center justify-between px-6'>
          <div className='flex justify-center'>
            <button onClick={handleHomeClick}>
              <FinanzoLogo />
            </button>
          </div>

          <div className='hidden md:flex'>
            <ul className='flex gap-4'>
              {MENU_ITEM_ROUTE.map((menu) => (
                <li key={menu.id}>
                  <MenuItem menu={menu} />
                </li>
              ))}
            </ul>
          </div>

          <div className='flex justify-center'>
            <div className='flex cursor-pointer items-center rounded-md'>
              <div className='flex gap-4'>
                <div className='relative flex h-9 w-9 items-center justify-center rounded-full bg-[#191F4B08]'>
                  <span className='absolute'>
                    <BellIcon />
                  </span>
                </div>
                <div className='hidden md:flex'>
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <span>
                      <UserActiveIcon />
                    </span>
                  </Dropdown>
                </div>
                <div className='md:hidden'>
                  <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                    <span>
                      <MenuIcon />
                    </span>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
