import React from 'react';
import Link from 'next/link';

import menuList from 'src/shared/menu-list';
import Carbon from '@/components/Carbon';
import HomeHeader from '@/components/HomeHeader';

export function HomeHeading({ children }) {
  return (
    <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">
      {children}
    </h2>
  );
}
export default function Home() {
  return (
    <>
      <HomeHeader />
      <div className="flex items-center justify-center bg-primary py-5">
        <Carbon />
      </div>
    </>
  );
}
