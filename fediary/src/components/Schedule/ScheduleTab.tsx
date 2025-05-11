import { ru } from "date-fns/locale";
import { format, isValid } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CurrentDate } from "../CurrentDate";
import ScheduleCard from "./ScheduleCard";


const scheduleData = {
  "2025-04-20": [
    {
      time: "8:30 - 10:00",
      subject: "Математический анализ",
      teacher: "Петров Иван Сергеевич",
      homework: "Решить задачи 1.2-1.5 из учебника",
    },
    {
      time: "10:10 - 11:40",
      subject: "Программирование",
      teacher: "Сидорова Анна Петровна",
      homework: "Выполнить лабораторную работу №3",
    },
  ],
  "2025-04-21": [
    {
      time: "8:30 - 10:00",
      subject: "Физика",
      teacher: "Иванова Мария Алексеевна",
      homework: "Подготовить доклад по теме 'Квантовая механика'",
    },
    {
      time: "10:10 - 11:40",
      subject: "Английский язык",
      teacher: "Смирнова Елена Викторовна",
      homework: "Выучить неправильные глаголы",
    },
    {
      time: "12:10 - 13:40",
      subject: "История",
      teacher: "Козлов Дмитрий Николаевич",
      homework: "Прочитать главу 5",
    },
  ],
  "2025-04-22": [
    {
      time: "8:30 - 10:00",
      subject: "Линейная алгебра",
      teacher: "Морозова Ольга Павловна",
      homework: "Решить систему уравнений",
    },
    {
      time: "10:10 - 11:40",
      subject: "Информационные технологии",
      teacher: "Волков Андрей Сергеевич",
      homework: "Подготовить презентацию",
    },
    {
      time: "12:10 - 13:40",
      subject: "Философия",
      teacher: "Соколов Василий Петрович",
      homework: "Написать эссе",
    },
    {
      time: "14:10 - 15:40",
      subject: "Экономика",
      teacher: "Новикова Татьяна Александровна",
      homework: "Решить задачи 3.1-3.4",
    },
    {
      time: "15:50 - 17:20",
      subject: "Право",
      teacher: "Кузнецов Михаил Иванович",
      homework: "Изучить главу 2 кодекса",
    },
  ],
};

const ScheduleTab = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  const safeDate = isValid(date) ? date : new Date();
  const currentDateStr = format(safeDate, "yyyy-MM-dd");
  const schedule = scheduleData[currentDateStr as keyof typeof scheduleData] || [];

  return (
    <main className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 h-[350px] flex flex-col justify-between">
          <CurrentDate />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 h-[350px]">
          <Calendar
            mode="single"
            selected={safeDate}
            onSelect={(d: Date | undefined) => {
              if (d && isValid(d)) {
                setDate(d);
              }
            }}
            className="pointer-events-auto"
            locale={ru}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <ScheduleCard schedule={schedule} />
      </div>
    </main>
  );
};

export default ScheduleTab;
