import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isAllowed, redirectTo = "/landing", children }) => {
    console.log(isAllowed)
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}