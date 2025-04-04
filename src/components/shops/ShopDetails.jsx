import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {fetchProductsSuccess} from "../../redux/shopsSlice"
import { LucideMenu, LucideX, LucideMapPin, LucidePhone, LucideUser } from "lucide-react"; // Modern Icons
//import { fetchShopProducts } from "../../redux/shopsSlice"; // Import the new action
import ItemCategorySidebar from "./ItemCategorySidebar";
import ItemList from "./ItemList";
import useAPI from "../../hooks/useAPI";
import CardSkeleton from "../common/CardSkeleton";
import EmptyState from "../../pages/EmptyState";

const ShopDetails = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  // console.log(shopId)
  // console.log(typeof shopId)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Get shop details from Redux store
  const shop = useSelector((state) => {
    return Object.values(state.shops.shopsByCategory).flat().find((shop) => shop._id === shopId);
  });
  // console.log(shop)

  const productsByCategory = useSelector((state) => state.shops.productsByShop || {});
   console.log(productsByCategory);
  
  const [selectedCategory, setSelectedCategory] = useState("All");

console.log((productsByCategory[shopId]))
 if(!productsByCategory[shopId]){
  return <EmptyState/>
 }

  return (
    <div className="flex pl-4 min-h-screen bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-700

 text-white">
      {/* Sidebar for Categories */}
      <div
  className={`fixed top-16 md:top-0 overflow-y-auto pb-20 -left-4 h-[100vh] w-64 bg-background-light dark:bg-background-dark shadow-xl transition-transform transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 md:w-60 z-100 scrollbar-hide`}
>
  <ItemCategorySidebar
    categories={shop?.itemCategories}
    selectedCategory={selectedCategory}
    onSelectCategory={setSelectedCategory}
    setSideBarOpen={setSidebarOpen}
  />
</div>


      <button
        className="z-100 fixed left-0 md:hidden  top-1/2  transform  -translate-x-14 rotate-90 bg-gradient-to-r from-blue-500 to-purple-500 
 text-white px-4 py-2 rounded-t-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Categories" : "Open Categories"}
      </button>

     
        {/* Shop Information */}
        <div className="flex-1 p-6 ">
        {/* Shop Information with Glassmorphism Effect */}
        <div className="bg-white/80  dark:bg-gray-800/80  p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-[22px] sml:text-2xl md:text-3xl font-heading text-center font-extrabold text-blue-600 dark:text-blue-400">{shop?.shopName}</h2>

          <div className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <LucideUser size={20} className="text-blue-500 dark:text-blue-400" />
              <span>Owner: {shop?.ownerName}</span>
            </p>
            <p className="flex items-center gap-2">
              <LucideMapPin size={20} className="text-red-500 dark:text-red-400" />
              <span>Address: {shop?.shopAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <LucidePhone size={20} className="text-green-500 dark:text-green-400" />
              <span>Contact: {shop?.mobileNumber}</span>
            </p>
          </div>
        </div>
        {/* Items List */}
        <ItemList items={productsByCategory[shopId][selectedCategory] || []} category={selectedCategory} shop={shop} />
      </div>
    </div>
  );
};

export default ShopDetails;
