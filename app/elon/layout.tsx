import SideNav from "@/components/sideNav/SideNav";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full max-w-5xl mx-auto py-2 gap-2">
      {children}
      <SideNav />
    </div>
  );
};

export default Layout;
