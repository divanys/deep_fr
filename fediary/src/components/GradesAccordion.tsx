import { useState } from "react";

// Типы для месяцев и данных по предметам
type Grade = {
  day: number;
  value: string;
  isPresent: "present" | "absent" | "excused";
};

type Subject = {
  name: string;
  averageGrade: number;
  attendancePercentage: number;
  months: {
    [key: string]: Grade[];
  };
};

const GradesAccordion = () => {
  const [selectedMonth, setSelectedMonth] = useState<{ [key: string]: string }>({
    "Русский язык": "Сентябрь",
    Математика: "Сентябрь",
    Химия: "Сентябрь",
    Биология: "Сентябрь",
  });

  const [openSubject, setOpenSubject] = useState<string | null>(null);

  const subjects: Subject[] = [
    {
      name: "Русский язык",
      averageGrade: 5.00,
      attendancePercentage: 100,
      months: {
        "Сентябрь": [
          { day: 3, value: "3", isPresent: "absent" },
          { day: 21, value: "5", isPresent: "present" },
          { day: 24, value: "4", isPresent: "present" },
          { day: 28, value: "3", isPresent: "present" },
        ],
        "Октябрь": [
          { day: 2, value: "5", isPresent: "present" },
          { day: 5, value: "4", isPresent: "excused" },
          { day: 12, value: "5", isPresent: "present" },
          { day: 30, value: "5", isPresent: "present" },
        ],
        "Ноябрь": [
          { day: 15, value: "4", isPresent: "present" },
          { day: 22, value: "3", isPresent: "absent" },
        ],
      },
    },
    {
      name: "Математика",
      averageGrade: 4.30,
      attendancePercentage: 83,
      months: {
        "Сентябрь": [
          { day: 2, value: "4", isPresent: "present" },
          { day: 12, value: "5", isPresent: "present" },
          { day: 21, value: "4", isPresent: "excused" },
        ],
        "Октябрь": [
          { day: 4, value: "4", isPresent: "present" },
          { day: 30, value: "5", isPresent: "present" },
        ],
        "Ноябрь": [
          { day: 7, value: "4", isPresent: "present" },
          { day: 14, value: "5", isPresent: "present" },
        ],
      },
    },
    {
      name: "Химия",
      averageGrade: 3.55,
      attendancePercentage: 60,
      months: {
        "Сентябрь": [
          { day: 3, value: "4", isPresent: "absent" },
          { day: 21, value: "2", isPresent: "present" },
          { day: 24, value: "3", isPresent: "excused" },
        ],
        "Октябрь": [
          { day: 5, value: "3", isPresent: "present" },
          { day: 12, value: "4", isPresent: "present" },
        ],
        "Ноябрь": [
          { day: 2, value: "5", isPresent: "present" },
          { day: 8, value: "3", isPresent: "absent" },
        ],
      },
    },
    {
      name: "Биология",
      averageGrade: 4.58,
      attendancePercentage: 91,
      months: {
        "Сентябрь": [
          { day: 1, value: "5", isPresent: "present" },
          { day: 5, value: "4", isPresent: "present" },
        ],
        "Октябрь": [
          { day: 2, value: "4", isPresent: "excused" },
          { day: 10, value: "5", isPresent: "present" },
        ],
        "Ноябрь": [
          { day: 5, value: "3", isPresent: "present" },
          { day: 14, value: "4", isPresent: "present" },
        ],
      },
    },
  ];

  return (
    <div className="w-full">
      {subjects.map((subject) => (
        <div key={subject.name} className="mt-6">
          <div
            onClick={() => setOpenSubject(openSubject === subject.name ? null : subject.name)}
            className="cursor-pointer font-medium text-lg mb-2 p-4 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {subject.name}
          </div>

          {openSubject === subject.name && (
            <div className="p-4 bg-gray-100 rounded-b-lg">
              <div className="flex gap-8">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Средний балл</span>
                    <span className="text-sm">{subject.averageGrade}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Посещаемость</span>
                    <span className="text-sm">{subject.attendancePercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Кнопки для выбора месяца внутри блока предмета */}
              <div className="flex space-x-2 mt-4">
                {["Сентябрь", "Октябрь", "Ноябрь"].map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth({ ...selectedMonth, [subject.name]: month })}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedMonth[subject.name] === month
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>

              {/* Месячная сетка для выбранного месяца */}
              <div className="grid grid-cols-7 gap-2 mt-4">
                {subject.months[selectedMonth[subject.name]]?.map((grade, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded text-center ${
                      grade.isPresent === "present"
                        ? "bg-[#F2FCE2]"
                        : grade.isPresent === "absent"
                        ? "bg-red-50"
                        : "bg-[#FEF7CD]"
                    }`}
                  >
                    <div>{grade.day}</div>
                    <div className="font-bold">{grade.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GradesAccordion;
