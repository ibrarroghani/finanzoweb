'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface IMenuItem {
  id: number;
  permission?: string[];
  title: string;
  icon?: string;
  url: string;
  showable: boolean;
}

interface IMenuItemProps {
  menu: IMenuItem;
}

const MenuItem = ({ menu }: IMenuItemProps) => {
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
      className={`flex cursor-pointer items-center rounded-md px-4 py-1 ${active ? 'bg-primary-dark' : 'hover:bg-primary-dark hover:text-primary-light'}`}
    >
      <span
        className={`text-small lg:text-medium ${active && 'text-primary-light'}`}
      >
        {title}
      </span>
    </div>
  );
};

export default MenuItem;
