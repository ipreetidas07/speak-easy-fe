import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes, Paths, SidebarContants, SidebarKeys } from "@enums/index";
import { TeamName } from "@constants/index";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/" ? AppRoutes.DASHBOARD : location.pathname;

  const sidebarBg = "#1E293B";
  const selectedBg = "#334155";
  const textColor = "#E0E7FF";

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
      }}
    >
      <div className="text-white text-2xl text-center font-semibold">
        {TeamName}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          backgroundColor: sidebarBg,
          color: textColor,
          paddingTop: 30,
        }}
      >
        <Menu.Item
          key={SidebarKeys.DASHBOARD}
          icon={<DashboardOutlined style={{ color: textColor }} />}
          style={{
            backgroundColor:
              selectedKey === AppRoutes.DASHBOARD ? selectedBg : sidebarBg,
            color: textColor,
          }}
        >
          <Link to="/">{SidebarContants.DASHBOARD}</Link>
        </Menu.Item>

        <Menu.SubMenu
          key={SidebarKeys.PRODUCTS}
          icon={<AppstoreOutlined style={{ color: textColor }} />}
          title={<span>{SidebarContants.Products}</span>}
          style={{
            backgroundColor: sidebarBg,
            color: textColor,
          }}
        >
          {[
            { name: SidebarContants.TILICHO, path: Paths.TILICHO },
            { name: SidebarContants.EDU_TECH, path: Paths.EDU_TECH },
            { name: SidebarContants.HOTEL_BOOKING, path: Paths.HOTEL_BOOKING },
          ].map((product) => (
            <Menu.Item
              key={product.path}
              style={{
                backgroundColor:
                  selectedKey === product.path ? selectedBg : sidebarBg,
                color: textColor,
              }}
            >
              <Link to={product.path}>{product.name}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
