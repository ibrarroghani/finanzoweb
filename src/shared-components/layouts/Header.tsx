'use client';
import {
  BellIcon,
  FinanzoLogo,
  UserIcon,
} from '@/assets/icons/BussinessPanelIcons';
import { MENU_ITEM_ROUTE } from '@/config/route-config';
import { AppDispatch } from '@/store';
import { logout } from '@/store/slices/auth-slice';
import { useMsal } from '@azure/msal-react';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Header = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(logout(instance));

  const items = [
    {
      label: <Link href='#'>Logout</Link>,
      key: '1',
      onClick: handleLogout,
    },
  ];

  const handleHomeClick = () => {
    //eslint-disable-next-line no-console
    console.log('home is clicked');
  };

  return (
    <>
      <nav className='fixed start-0 top-0 z-20 h-20 w-full border-b pt-4'>
        <div className='mx-auto flex items-center justify-between px-4'>
          <div className='flex justify-center'>
            <button onClick={handleHomeClick}>
              <FinanzoLogo />
            </button>
          </div>

          <div>
            <ul className='flex gap-4'>
              {MENU_ITEM_ROUTE.map((menu) => (
                <li key={menu.id}>
                  <SidebarItem menu={menu} />
                </li>
              ))}
            </ul>
          </div>

          <div className='flex justify-center space-x-3'>
            <Dropdown menu={{ items }} trigger={['click']}>
              <div className='flex cursor-pointer items-center rounded-md p-2 pr-4 text-sm font-medium'>
                <div className='flex gap-4'>
                  <div className='relative flex h-9 w-9 items-center justify-center rounded-full bg-[#191F4B08]'>
                    <span className='absolute'>
                      <BellIcon />
                    </span>
                  </div>
                  <span>
                    <UserIcon />
                  </span>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

//eslint-disable-next-line
const SidebarItem = ({ menu }: any) => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { title, url, showable } = menu;
  useEffect(() => {
    if (url === pathname || pathname.startsWith(url)) {
      setActive(true);
    }
  }, [url, pathname]);

  const onSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (showable) router.push(url);
  };

  return (
    <div
      onClick={onSideClick}
      className={`flex cursor-pointer items-center rounded-md px-4 py-1 ${active ? 'bg-black' : 'hover:bg-blue-300'}`}
    >
      <span className={`${active && 'text-blue-300'}`}>{title}</span>
    </div>
  );
};
