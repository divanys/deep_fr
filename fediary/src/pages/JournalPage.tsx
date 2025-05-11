import { useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { 
  CalendarIcon, 
  Info, 
  LogOut, 
  Settings,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Upload
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "../components/ui/context-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";

interface Student {
  id: number;
  name: string;
}

interface AttendanceRecord {
  studentId: number;
  date: string;
  attendance: "present" | "absent" | null;
  grade: 2 | 3 | 4 | 5 | null;
  lastModified?: string;
}

const JournalPage = () => {
  const { discipline, group } = useParams();
  const [date, setDate] = useState<Date>(new Date());
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCell, setSelectedCell] = useState<{ studentId: number, date: string } | null>(null);
  const [homework, setHomework] = useState("");
  const [comment, setComment] = useState("");

  // Sample data - would be fetched from backend in production
  const students: Student[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Студентов Студент Студентович`
  }));

  // Generate class dates (for the header) - in production would come from backend
  const classDates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(2025, 1, i + 1);
    return {
      date: format(date, "yyyy-MM-dd"),
      display: `${format(date, "dd")}/${format(date, "MM")}`
    };
  });

  // Sample attendance and grades data
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { studentId: 3, date: "2025-02-05", attendance: "absent", grade: null, lastModified: "10.02.2025" },
    { studentId: 5, date: "2025-02-07", attendance: "present", grade: null, lastModified: "10.02.2025" },
    { studentId: 10, date: "2025-02-10", attendance: null, grade: 2, lastModified: "10.02.2025" },
    { studentId: 12, date: "2025-02-10", attendance: null, grade: 3, lastModified: "10.02.2025" },
    { studentId: 13, date: "2025-02-10", attendance: null, grade: 4, lastModified: "10.02.2025" },
    { studentId: 14, date: "2025-02-10", attendance: null, grade: 5, lastModified: "10.02.2025" },
  ]);

  const getRecord = (studentId: number, date: string) => {
    return records.find(r => r.studentId === studentId && r.date === date) || null;
  };

  const handleSetAttendance = (studentId: number, date: string, status: "present" | "absent") => {
    const existingRecordIndex = records.findIndex(
      r => r.studentId === studentId && r.date === date
    );
    
    const newRecord: AttendanceRecord = {
      studentId,
      date,
      attendance: status,
      grade: existingRecordIndex >= 0 ? records[existingRecordIndex].grade : null,
      lastModified: format(new Date(), "dd.MM.yyyy")
    };
    
    if (existingRecordIndex >= 0) {
      const updatedRecords = [...records];
      updatedRecords[existingRecordIndex] = newRecord;
      setRecords(updatedRecords);
    } else {
      setRecords([...records, newRecord]);
    }
    setSelectedCell(null);
  };

  const handleSetGrade = (studentId: number, date: string, grade: 2 | 3 | 4 | 5) => {
    const existingRecordIndex = records.findIndex(
      r => r.studentId === studentId && r.date === date
    );
    
    const newRecord: AttendanceRecord = {
      studentId,
      date,
      attendance: existingRecordIndex >= 0 ? records[existingRecordIndex].attendance : null,
      grade,
      lastModified: format(new Date(), "dd.MM.yyyy")
    };
    
    if (existingRecordIndex >= 0) {
      const updatedRecords = [...records];
      updatedRecords[existingRecordIndex] = newRecord;
      setRecords(updatedRecords);
    } else {
      setRecords([...records, newRecord]);
    }
    setSelectedCell(null);
  };

  const getGradeColorClass = (grade: 2 | 3 | 4 | 5 | null) => {
    if (grade === null) return "";
    if (grade === 5) return "bg-green-500 text-white";
    if (grade === 4) return "bg-lime-400 text-white";
    if (grade === 3) return "bg-amber-400 text-white";
    return "bg-red-500 text-white";
  };

  const getAttendanceColorClass = (status: "present" | "absent" | null) => {
    if (status === "present") return "bg-green-500 text-white";
    if (status === "absent") return "bg-red-500 text-white";
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-100 px-6 py-4 border-b">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="space-y-1">
            <div className="text-lg font-medium">Иванова Татьяна Ивановна</div>
            <div className="text-sm text-gray-600">Преподаватель-предметник</div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Info className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-medium">Семестр 1</h1>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {format(date, "d MMMM", { locale: ru })}
            {", "}
            {format(date, "EEEE", { locale: ru })}
          </span>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex gap-4">
          <div className="flex-1 overflow-x-auto bg-white rounded-lg shadow-sm">
            <Table>
              <TableHeader className="sticky top-0 bg-white">
                <TableRow>
                  <TableHead className="w-10 bg-gray-100 sticky left-0 z-10">#</TableHead>
                  <TableHead className="bg-gray-100 sticky left-10 z-10 min-w-[250px]">ФИО студента</TableHead>
                  {classDates.map(date => (
                    <TableHead key={date.date} className="text-center min-w-[60px]">
                      {date.display}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium bg-gray-100 sticky left-0 z-10">
                      {student.id}
                    </TableCell>
                    <TableCell className="bg-gray-100 sticky left-10 z-10">
                      {student.name}
                    </TableCell>
                    
                    {classDates.map(date => {
                      const record = getRecord(student.id, date.date);
                      return (
                        <TableCell key={`${student.id}-${date.date}`} className="p-0 text-center">
                          <ContextMenu>
                            <ContextMenuTrigger asChild>
                              <button 
                                className={`w-full h-full p-2 ${
                                  record?.attendance ? getAttendanceColorClass(record.attendance) : 
                                  record?.grade ? getGradeColorClass(record.grade) : 
                                  "hover:bg-gray-100"
                                } transition-colors`}
                                onClick={() => setSelectedCell({ studentId: student.id, date: date.date })}
                              >
                                {record?.attendance === "present" && "Был"}
                                {record?.attendance === "absent" && "Н/Б"}
                                {record?.grade && record.grade}
                              </button>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                              <div className="p-2">
                                <div className="text-sm font-semibold mb-2">Посещаемость студента</div>
                                <div className="flex gap-2 mb-4">
                                  <Button 
                                    size="sm"
                                    variant="outline" 
                                    className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                    onClick={() => handleSetAttendance(student.id, date.date, "present")}
                                  >
                                    <Check className="mr-1 h-4 w-4" />
                                    Был
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="outline" 
                                    className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                                    onClick={() => handleSetAttendance(student.id, date.date, "absent")}
                                  >
                                    <X className="mr-1 h-4 w-4" />
                                    Н/Б
                                  </Button>
                                </div>

                                <div className="text-sm font-semibold mb-2">Оценка студента</div>
                                <div className="grid grid-cols-2 gap-2">
                                  <Button 
                                    size="sm"
                                    variant="outline" 
                                    className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                                    onClick={() => handleSetGrade(student.id, date.date, 2)}
                                  >
                                    2
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="outline" 
                                    className="bg-amber-400 text-white hover:bg-amber-500 hover:text-white"
                                    onClick={() => handleSetGrade(student.id, date.date, 3)}
                                  >
                                    3
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="outline" 
                                    className="bg-lime-400 text-white hover:bg-lime-500 hover:text-white"
                                    onClick={() => handleSetGrade(student.id, date.date, 4)}
                                  >
                                    4
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="outline" 
                                    className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                                    onClick={() => handleSetGrade(student.id, date.date, 5)}
                                  >
                                    5
                                  </Button>
                                </div>

                                {record?.lastModified && (
                                  <>
                                    <ContextMenuSeparator className="my-2" />
                                    <div className="text-xs text-gray-500">
                                      Последнее изменение: {record.lastModified}
                                    </div>
                                  </>
                                )}
                              </div>
                            </ContextMenuContent>
                          </ContextMenu>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {showSidebar && (
            <div className="w-80 bg-white rounded-lg shadow-sm p-4 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Сведения для пары</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSidebar(false)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Предмет:</div>
                  <div>{discipline}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Преподаватель:</div>
                  <div>Иванов Иван Иванович</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Группа:</div>
                  <div>{group}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">Домашнее задание:</div>
                <Textarea
                  value={homework}
                  onChange={(e) => setHomework(e.target.value)}
                  placeholder="Введите домашнее задание..."
                  className="mb-2"
                />
                <Button variant="outline" size="sm" className="w-full">
                  <Upload className="h-4 w-4 mr-1" />
                  Выбрать файл
                </Button>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">Комментарий к паре:</div>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Введите комментарий..."
                />
              </div>
            </div>
          )}
          
          {!showSidebar && (
            <Button
              variant="outline"
              className="h-10 w-10 p-0"
              onClick={() => setShowSidebar(true)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
