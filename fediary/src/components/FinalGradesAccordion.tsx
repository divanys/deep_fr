import { useState } from "react";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { Progress } from "../components/ui/progress";
interface Subject {
  name: string;
  grades: {
    semester: string;
    calculatedGrade: number;
    teacherGrade: number;
    averageGrade: number;
    attendancePercentage: number;
  }[];
}

export const FinalGradesAccordion = () => {
  const subjects: Subject[] = [
    {
      name: "Математический анализ",
      grades: [
        {
          semester: "Осенний семестр 2024/2025",
          calculatedGrade: 4.2,
          teacherGrade: 4,
          averageGrade: 4.1,
          attendancePercentage: 85,
        },
        {
          semester: "Весенний семестр 2023/2024",
          calculatedGrade: 4.5,
          teacherGrade: 5,
          averageGrade: 4.7,
          attendancePercentage: 92,
        },
      ],
    },
    {
      name: "Физика",
      grades: [
        {
          semester: "Осенний семестр 2024/2025",
          calculatedGrade: 3.8,
          teacherGrade: 4,
          averageGrade: 3.9,
          attendancePercentage: 80,
        },
        {
          semester: "Весенний семестр 2023/2024",
          calculatedGrade: 4.0,
          teacherGrade: 4,
          averageGrade: 4.0,
          attendancePercentage: 88,
        },
      ],
    },
  ];

  // Explicit type for selectedSemesters
  const [selectedSemesters, setSelectedSemesters] = useState<Record<string, string>>(
    () =>
      subjects.reduce((acc, subj) => {
        acc[subj.name] = subj.grades[0].semester; // Default to the first semester
        return acc;
      }, {} as Record<string, string>)
  );

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {subjects.map((subject) => {
        const selectedGrade = subject.grades.find(
          (grade) => grade.semester === selectedSemesters[subject.name]
        ) ?? subject.grades[0];

        return (
          <AccordionItem
            key={subject.name}
            value={subject.name}
            className="bg-white rounded-lg shadow-sm"
          >
            <AccordionTrigger className="px-4">
              <div className="flex flex-col items-start w-full">
                <div className="font-medium text-lg mb-4">{subject.name}</div>
                <div className="flex items-center gap-8 w-full">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Средний балл</span>
                      <span className="text-sm">{selectedGrade.averageGrade}</span>
                    </div>
                    <Progress value={selectedGrade.averageGrade * 20} className="h-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Посещаемость</span>
                      <span className="text-sm">{selectedGrade.attendancePercentage}%</span>
                    </div>
                    <Progress value={selectedGrade.attendancePercentage} className="h-2" />
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-6">
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Семестр:</p>
                  <select
                    className="border rounded px-2 py-1"
                    value={selectedSemesters[subject.name]}
                    onChange={(e) =>
                      setSelectedSemesters((prev) => ({
                        ...prev,
                        [subject.name]: e.target.value,
                      }))
                    }
                  >
                    {subject.grades.map((grade, idx) => (
                      <option key={idx} value={grade.semester}>
                        {grade.semester}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-gray-600 mb-2">
                      Расчетная оценка
                    </div>
                    <div className="text-2xl font-medium">
                      {selectedGrade.calculatedGrade}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-gray-600 mb-2">
                      Оценка преподавателя
                    </div>
                    <div className="text-2xl font-medium">
                      {selectedGrade.teacherGrade}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
