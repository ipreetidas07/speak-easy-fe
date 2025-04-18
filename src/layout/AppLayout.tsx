import React from "react";
import { Layout } from "antd";
import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AppLayout: React.FC = () => (
  <Layout>
    <Sidebar />
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default AppLayout;
