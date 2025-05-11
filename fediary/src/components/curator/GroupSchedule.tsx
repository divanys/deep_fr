import { format } from "date-fns";

interface GroupScheduleProps {
  date: Date;
  selectedGroup: string;
  compact?: boolean;
}

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: string;
}

export const GroupSchedule = ({ 
  date, 
  selectedGroup,
  compact = false
}: GroupScheduleProps) => {
  const scheduleData: Record<string, Record<string, ScheduleItem[]>> = {
    "ИС-11": {
      "2025-04-20": [
        {
          time: "8:30 - 10:00",
          subject: "Математический анализ",
          teacher: "Петров Иван Сергеевич",
          room: "306",
          type: "Лекция"
        },
        {
          time: "10:10 - 11:40",
          subject: "Программирование",
          teacher: "Сидорова Анна Петровна",
          room: "215",
          type: "Лабораторная"
        }
      ],
      "2025-04-21": [
        {
          time: "8:30 - 10:00",
          subject: "Физика",
          teacher: "Иванова Мария Алексеевна",
          room: "412",
          type: "Лекция"
        },
        {
          time: "10:10 - 11:40",
          subject: "Английский язык",
          teacher: "Смирнова Елена Викторовна",
          room: "205",
          type: "Практика"
        },
        {
          time: "12:10 - 13:40",
          subject: "История",
          teacher: "Козлов Дмитрий Николаевич",
          room: "301",
          type: "Лекция"
        }
      ],
      "2025-04-22": [
        {
          time: "8:30 - 10:00",
          subject: "Линейная алгебра",
          teacher: "Морозова Ольга Павловна",
          room: "308",
          type: "Практика"
        },
        {
          time: "10:10 - 11:40",
          subject: "Информационные технологии",
          teacher: "Волков Андрей Сергеевич",
          room: "214",
          type: "Лабораторная"
        }
      ]
    },
    "ИС-15": {
      "2025-04-20": [
        {
          time: "10:10 - 11:40",
          subject: "Базы данных",
          teacher: "Волков Андрей Сергеевич",
          room: "215",
          type: "Лабораторная"
        },
        {
          time: "12:10 - 13:40",
          subject: "Дискретная математика",
          teacher: "Петров Иван Сергеевич",
          room: "306",
          type: "Лекция"
        }
      ],
      "2025-04-21": [
        {
          time: "8:30 - 10:00",
          subject: "Философия",
          teacher: "Соколов Василий Петрович",
          room: "212",
          type: "Лекция"
        },
        {
          time: "10:10 - 11:40",
          subject: "Английский язык",
          teacher: "Смирнова Елена Викторовна",
          room: "205",
          type: "Практика"
        }
      ],
      "2025-04-22": [
        {
          time: "12:10 - 13:40",
          subject: "Алгоритмы и структуры данных",
          teacher: "Петрова Мария Ивановна",
          room: "214",
          type: "Лекция"
        },
        {
          time: "14:10 - 15:40",
          subject: "Операционные системы",
          teacher: "Волков Андрей Сергеевич",
          room: "210",
          type: "Лабораторная"
        }
      ]
    }
  };

  const currentDateStr = format(date, "yyyy-MM-dd");
  const schedule = scheduleData[selectedGroup]?.[currentDateStr] || [];

  if (schedule.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Нет занятий на выбранную дату
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-3">
        {schedule.slice(0, 3).map((item, index) => (
          <div key={index} className="flex gap-4 p-3 border rounded-lg hover:bg-gray-50">
            <div className="min-w-[90px] text-sm text-gray-600">{item.time}</div>
            <div>
              <div className="font-medium">{item.subject}</div>
              <div className="text-sm text-gray-600">{item.type} • Ауд. {item.room}</div>
            </div>
          </div>
        ))}
        {schedule.length > 3 && (
          <div className="text-center text-sm text-blue-500">
            + еще {schedule.length - 3} занятий
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {schedule.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-6 border-b pb-4">
          <div className="space-y-2">
            <div className="text-gray-600 border-b pb-1">{item.time}</div>
            <div className="font-medium border-b pb-1">{item.subject}</div>
            <div className="text-gray-600 border-b pb-1">{item.teacher}</div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-600 border-b pb-1">Тип занятия</div>
            <div className="border-b pb-1">{item.type}</div>
            <div className="border-b pb-1">Аудитория: {item.room}</div>
          </div>
        </div>
      ))}
    </div>
  );
};