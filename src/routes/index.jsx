import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from '../App.jsx'
import {
    SignIn, SignUp, Admin, Brand, Ads, BrandCategory, Category, Product, Stock, Settings, SubCategory
} from "@pages";

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route index element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />

                <Route path="admin-layout" element={<Admin />}>
                    <Route index element={<Product />} />
                    <Route path="category" element={<Category />} />
                    <Route path="category/:id" element={<SubCategory />} />
                    <Route path="brand" element={<Brand />} />
                    <Route path="brand-category" element={<BrandCategory />} />
                    <Route path="ads" element={<Ads />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}

export default Index