import { Footer, Header } from "components"
import { Outlet, useLocation } from "react-router-dom"

export const MainLayout = () => {
  const location = useLocation();
  const isHeaderFooter = location.pathname != "/attendance";

  return (
    <div>
      {
        isHeaderFooter && <Header />
      }
      <Outlet />
      {
        isHeaderFooter && <Footer />
      }
    </div>
    
  )
}

export default MainLayout