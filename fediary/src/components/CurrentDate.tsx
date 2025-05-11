import { ru } from "date-fns/locale";
import { format } from "date-fns";

export function CurrentDate() {
  const date = new Date();
  const isUpperWeek = Math.floor((date.getTime() / (7 * 24 * 60 * 60 * 1000))) % 2 === 0;

  return (
    <div className="space-y-4">
      <div className="text-4xl font-medium text-gray-800">
        {format(date, "d MMMM yyyy", { locale: ru })}
      </div>
      <div className="text-xl text-gray-600">
        {format(date, "EEEE", { locale: ru })}
      </div>
      <div className="text-lg text-primary">
        {isUpperWeek ? "Верхняя неделя" : "Нижняя неделя"}
      </div>
    </div>
  );
}