
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";

interface TeacherScheduleProps {
  date: Date;
}

interface ScheduleItem {
  time: string;
  subject: string;
  group: string;
  task: string;
}

export const TeacherSchedule = ({ date }: TeacherScheduleProps) => {
  // Sample schedule data - would come from backend in production
  const scheduleData: ScheduleItem[] = [
    {
      time: "08:00-09:30",
      subject: "Русский язык",
      group: "ИС-11",
      task: "Домашняя работа: Упражнения 1-5, стр. 45"
    },
    {
      time: "09:40-11:10",
      subject: "Литература",
      group: "ИС-11",
      task: "Домашняя работа: Читать главы 5-6"
    },
    {
      time: "11:30-13:00",
      subject: "Русский язык",
      group: "ИС-14",
      task: "Домашняя работа: Эссе на тему 'Современный язык'"
    },
    {
      time: "13:05-14:05",
      subject: "Классный час",
      group: "",
      task: ""
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">
                Расписание на {format(date, "d MMMM", { locale: ru })}
              </h2>
            </div>
            <Table>
              <TableBody>
                {scheduleData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium w-36">{item.time}</TableCell>
                    <TableCell>
                      <div className="font-medium">{item.subject}</div>
                      {item.group && <div className="text-sm text-gray-500">{item.group}</div>}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.task && <div className="text-sm">{item.task}</div>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">Календарь</h2>
            <Calendar
              mode="single"
              selected={date}
              locale={ru}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};