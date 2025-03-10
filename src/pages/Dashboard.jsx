import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/customerSlice";
import {
  Moon,
  Sun,
  LogOut,
  User,
  ShoppingBag,
  MapPin,
  Heart,
  CreditCard,
  Gift,
  RotateCcw,
  MessageSquare,
  Settings,
} from "lucide-react";

const Sidebar = ({ toggleDarkMode, darkMode,setSidebarOpen }) => {
  const menuItems = [
    { name: "Update Profile", icon: <User size={20} />, path: "/dashboard/update-profile" },
    { name: "Orders", icon: <ShoppingBag size={20} />, path: "/dashboard/orders" },
    { name: "Update Address", icon: <MapPin size={20} />, path: "/dashboard/update-address" },
    { name: "Wishlist", icon: <Heart size={20} />, path: "/dashboard/wishlist" },
    { name: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/payments" },
    { name: "Coupons", icon: <Gift size={20} />, path: "/dashboard/coupons" },
    { name: "Returns", icon: <RotateCcw size={20} />, path: "/dashboard/returns" },
    { name: "Support", icon: <MessageSquare size={20} />, path: "/dashboard/support" },
  ];
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <aside >
      <div>
        <h2 className="text-heading-light dark:text-heading-dark text-2xl font-semibold mb-6">
          Dashboard
        </h2>
        <nav>
        {menuItems.map((item, index) => {
        const isActive = currentPath === item.path; 
        return (
          <Link
            onClick={()=>setSidebarOpen(false)}
            key={index}
            to={item.path}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 
              ${
                isActive
                  ? "bg-blue-500 text-white shadow-md scale-105" // Active state
                  : "hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
        </nav>
      </div>
      <div>
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-4 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />} Toggle Dark Mode
        </button>
        <button
          onClick={() => dispatch(logoutSuccess())}
          className="w-full flex items-center gap-4 p-4 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
    
    <div
        className={`fixed top-16 md:top-0 left-0 h-[100vh] w-64 bg-white dark:bg-gray-900 shadow-xl p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-60`}
      >
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Side bar button */}
      <button
  className="z-100 fixed bottom-0 md:hidden left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-t-lg shadow-lg"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
</button>

      <main className="flex-1 p-8 bg-gradient-to-b from-background-light to-gray-200 dark:from-background-dark dark:to-gray-900 min-h-screen shadow-lg rounded-lg">
        <Outlet /> {/* ✅ This ensures nested routes render here */}
      </main>
    </div>
  );
};

export default Dashboard;
