import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes, SidebarContants } from "@enums/index";
import { TeamName } from "@constants/index";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/" ? AppRoutes.DASHBOARD : AppRoutes.PRODUCTS;

  const sidebarBg = "#1E293B";
  const selectedBg = "#334155";
  const textColor = "#E0E7FF";

  const menuItems = [
    {
      key: AppRoutes.DASHBOARD,
      label: SidebarContants.DASHBOARD,
      icon: (
        <DashboardOutlined style={{ color: textColor, fontSize: "18px" }} />
      ),
      path: "/",
    },
    {
      key: AppRoutes.PRODUCTS,
      label: SidebarContants.Products,
      icon: <AppstoreOutlined style={{ color: textColor, fontSize: "18px" }} />,
      path: AppRoutes.PRODUCTS,
    },
  ];

  return (
    <Sider
      width={250}
      className="min-h-screen"
      style={{
        height: "100vh",
        backgroundColor: sidebarBg,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: "monospace",
      }}
    >
      <div className="text-white text-3xl text-center font-semibold">
        {TeamName}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          backgroundColor: sidebarBg,
          color: textColor,
          paddingTop: 30,
          fontFamily: "monospace",
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{
              backgroundColor:
                selectedKey === item.key ? selectedBg : sidebarBg,
              color: textColor,
            }}
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
