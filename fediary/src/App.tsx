import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import LoginPage from "./pages/login";
import StudentPage from "./pages/StudentPage";
import Curator from "./pages/CuratorPage";
import Teacher from "./pages/Teacher";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        
        {/* Защищённые маршруты для студентов */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentPage />} />
          {/* <Route path="/student/grades" element={<StudentGradesPage />} /> */}
        </Route>
        
        {/* Защищённые маршруты для кураторойвв */}
        <Route element={<ProtectedRoute allowedRoles={["curator"]} />}>
          <Route path="/curator" element={<Curator />} />
          {/* <Route path="/teacher/dashboard" element={<TeacherDashboard />} /> */}
        </Route>

        {/* Защищённые маршруты для предметников */}
        <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
          <Route path="/teacher" element={<Teacher />} />
          {/* <Route path="/teacher/dashboard" element={<TeacherDashboard />} /> */}
        </Route>
        
        
        {/* Админ-панель (только для админов) */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          {/* <Route path="/admin" element={<AdminPanel />} /> */}
        </Route>
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;