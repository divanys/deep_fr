import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

const ProtectedRoute = ({
  allowedRoles,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole")?.toLowerCase(); 
  const location = useLocation();

  // Если нет токена - перенаправляем на логин
  if (!token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Если указаны роли, но у пользователя нет нужной роли
  if (allowedRoles && !allowedRoles.some(r => r.toLowerCase() === userRole)) {
    console.error("Доступ запрещён. Роль:", userRole, "Ожидалось:", allowedRoles);
    return <Navigate to="/" replace />;
    // Или можно перенаправить на страницу "Доступ запрещён"
    // return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;