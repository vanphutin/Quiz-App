// ScreenAdmin.js
import React from "react";
import { useSearchParams } from "react-router-dom";
import SideNavBar from "../components/Administrator/Screen/Sidebar/SideNavBar";
import Dashboard from "../components/Administrator/Tab/TabDashboard/TabDashboard";
import TabQuiz from "../components/Administrator/Tab/TabQuiz/TabQuiz";
import NotFoundPage from "./NotFoundPage";

const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const renderTabContent = () => {
    switch (tab) {
      case "dashboard":
        return <Dashboard />;
      case "quiz":
        return <TabQuiz />;
      // Thêm các tab khác ở đây nếu cần
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div
      className="mt-3 container-fluid"
      style={{ display: "flex", height: "90vh" }}
    >
      <SideNavBar />
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
        }}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;
