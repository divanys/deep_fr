type ScheduleItem = {
    time: string;
    subject: string;
    teacher: string;
    homework: string;
  };
  
  const ScheduleCard = ({ schedule }: { schedule: ScheduleItem[] }) => {
    if (schedule.length === 0) {
      return <p className="text-center text-gray-500">Занятий нет</p>;
    }
  
    return (
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
          >
            <div className="text-sm text-gray-500">{item.time}</div>
            <div className="font-semibold text-lg">{item.subject}</div>
            <div className="text-sm text-gray-700">{item.teacher}</div>
            <div className="mt-2 text-sm text-gray-600">
              <strong>Домашнее задание:</strong> {item.homework}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ScheduleCard;
  