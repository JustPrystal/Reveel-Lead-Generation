import { Outlet } from "react-router-dom";

export default function globalLayout() {


  return (
    <div className="layout">
      <span className="circle-1" />
      <span className="circle-2" />
      <Outlet />
    </div>
  );
}
