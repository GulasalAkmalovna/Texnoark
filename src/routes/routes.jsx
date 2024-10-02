import { FiSettings } from "react-icons/fi";
import { AiOutlineStock } from "react-icons/ai";
import { BiSpreadsheet } from "react-icons/bi";
import { TbBrand4Chan } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


export const adminRoutes = [
    { path: '/admin-layout', label: "Products", icon: <MdOutlineAdminPanelSettings /> },
    { path: '/admin-layout/category', label: "Category", icon: <BiCategoryAlt /> },
    { path: '/admin-layout/brand', label: "Brand", icon: <TbBrand4Chan /> },
    { path: '/admin-layout/brand-category', label: "Brand Category", icon: <TbBrand4Chan /> },
    { path: '/admin-layout/ads', label: "Ads", icon: <BiSpreadsheet /> },
    { path: '/admin-layout/stock', label: "Stock", icon: <AiOutlineStock /> },
    { path: '/admin-layout/settings', label: "Settings", icon: <FiSettings /> },
] 