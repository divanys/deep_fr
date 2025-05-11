import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Edit, Check, X } from "lucide-react";

interface GroupStudentsListProps {
  groupName: string;
  editable?: boolean;
}

interface StudentPerformance {
  id: number;
  name: string;
  attendance: number;
  performance: number;
}



export const GroupStudentsList = ({ groupName, editable = false }: GroupStudentsListProps) => {
  const [studentsData, setStudentsData] = useState<Record<string, StudentPerformance[]>>({
    "ИС-11": [
      { id: 1, name: "Студентов Студент Студентович", attendance: 75, performance: 54 },
      { id: 2, name: "Иванов Иван Иванович", attendance: 72, performance: 69 },
      { id: 3, name: "Петров Петр Петрович", attendance: 86, performance: 93 },
      { id: 4, name: "Сидоров Сидор Сидорович", attendance: 75, performance: 75 },
      { id: 5, name: "Козлов Константин Павлович", attendance: 76, performance: 53 },
      { id: 6, name: "Смирнова Анна Александровна", attendance: 87, performance: 68 },
      { id: 7, name: "Морозов Андрей Дмитриевич", attendance: 75, performance: 65 },
      { id: 8, name: "Васильева Екатерина Сергеевна", attendance: 80, performance: 92 },
      { id: 9, name: "Никитин Николай Николаевич", attendance: 98, performance: 76 },
      { id: 10, name: "Соколова Ольга Игоревна", attendance: 96, performance: 69 }
    ],
    "ИС-15": [
      { id: 1, name: "Кузнецов Михаил Александрович", attendance: 82, performance: 72 },
      { id: 2, name: "Андреева Мария Павловна", attendance: 79, performance: 85 },
      { id: 3, name: "Федоров Федор Федорович", attendance: 65, performance: 68 },
      { id: 4, name: "Белова Анастасия Игоревна", attendance: 93, performance: 91 },
      { id: 5, name: "Волков Дмитрий Сергеевич", attendance: 78, performance: 63 },
      { id: 6, name: "Лебедева Елена Андреевна", attendance: 81, performance: 78 }
    ]
  });

  const [editingStudent, setEditingStudent] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ attendance: number; performance: number }>({
    attendance: 0,
    performance: 0,
  });

  const students = studentsData[groupName] || [];
  
  const getAttendanceColor = (value: number) => {
    if (value >= 85) return "bg-green-500";
    if (value >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 85) return "bg-green-500";
    if (value >= 65) return "bg-yellow-500";
    return "bg-red-500";
  };

  const startEditing = (student: StudentPerformance) => {
    setEditingStudent(student.id);
    setEditValues({
      attendance: student.attendance,
      performance: student.performance,
    });
  };

  const saveChanges = (studentId: number) => {
    const newStudentsData = { ...studentsData };
    const studentIndex = newStudentsData[groupName].findIndex(s => s.id === studentId);
    
    if (studentIndex !== -1) {
      newStudentsData[groupName][studentIndex] = {
        ...newStudentsData[groupName][studentIndex],
        attendance: Math.min(100, Math.max(0, editValues.attendance)),
        performance: Math.min(100, Math.max(0, editValues.performance)),
      };
      
      setStudentsData(newStudentsData);
    }
    
    setEditingStudent(null);
  };

  const cancelEditing = () => {
    setEditingStudent(null);
  };

  const handleInputChange = (field: 'attendance' | 'performance', value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setEditValues({ ...editValues, [field]: numValue });
    }
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-12">№</TableHead>
            <TableHead>ФИО студента</TableHead>
            <TableHead className="w-[180px]">Посещаемость</TableHead>
            <TableHead className="w-[180px]">Успеваемость</TableHead>
            {editable && <TableHead className="w-[100px]">Действия</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover:bg-gray-100">
              <TableCell className="font-medium">{student.id}.</TableCell>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>
                {editingStudent === student.id ? (
                  <Input 
                    type="number"
                    min={0}
                    max={100}
                    value={editValues.attendance}
                    onChange={(e) => handleInputChange('attendance', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={student.attendance} 
                      className="h-3 flex-1 rounded-full overflow-hidden" 
                      indicatorClassName={getAttendanceColor(student.attendance)} 
                    />
                    <span className="text-xs font-semibold whitespace-nowrap">{student.attendance}%</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                {editingStudent === student.id ? (
                  <Input 
                    type="number"
                    min={0}
                    max={100}
                    value={editValues.performance}
                    onChange={(e) => handleInputChange('performance', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={student.performance} 
                      className="h-3 flex-1 rounded-full overflow-hidden" 
                      indicatorClassName={getPerformanceColor(student.performance)} 
                    />
                    <span className="text-xs font-semibold whitespace-nowrap">{student.performance}%</span>
                  </div>
                )}
              </TableCell>
              {editable && (
                <TableCell>
                  {editingStudent === student.id ? (
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => saveChanges(student.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={cancelEditing}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => startEditing(student)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};