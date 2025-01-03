import { Header } from "@/components/organisms";
import { Layout as AntdLayout } from "antd";
import React from "react";

const Layout: React.FC<TLayoutProps> = ({
  children
}) => {
  return (
    <AntdLayout>
      <Header />
      <main className='flex flex-col w-full justify-center items-center min-h-[calc(100vh-64px)]'>
        <div className='flex flex-col gap-4 w-full md:w-1/2 grow justify-center p-2'>
          {children}
        </div>
      </main>
    </AntdLayout>
  );
};

export default Layout;