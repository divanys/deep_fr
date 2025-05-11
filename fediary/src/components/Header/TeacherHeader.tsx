// components/Header/TeacherHeader.tsx
import { useEffect, useState } from "react";
import { Settings, Info } from "lucide-react";

const TeacherHeader = ({ navigate }: { navigate: (path: string) => void }) => {
  const [teacher, setTeacher] = useState<{
    first_name: string;
    last_name: string;
    middle_name: string;
    disciplines: string[];
  } | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/users/teacher/info/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTeacher(data);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных преподавателя", err);
      }
    };

    fetchTeacher();
  }, []);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Левая часть: ФИО и дисциплины */}
        <div className="flex flex-col justify-center">
          <span className="text-xl font-semibold text-gray-900">
            {teacher
              ? `${teacher.last_name} ${teacher.first_name} ${teacher.middle_name}`
              : "Загрузка..."}
          </span>
          <span className="text-sm text-gray-500">
            {teacher ? `Дисциплины: ${teacher.disciplines?.join(', ')}` : ""}
          </span>
        </div>

        {/* Центр: Учебный год */}
        <div className="text-center">
          <span className="text-lg font-medium text-blue-600">2024/2025 учебный год</span>
        </div>

        {/* Правая часть: кнопки */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Настройки"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Информация"
          >
            <Info className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Выйти
          </button>
        </div>

      </div>
    </header>
  );
};

export default TeacherHeader;