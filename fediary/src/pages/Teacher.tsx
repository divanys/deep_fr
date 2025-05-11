// pages/TeacherPage.tsx
import { useState, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import  TeacherHeader  from "../components/Header/TeacherHeader";
import { useNavigate } from "react-router-dom";
import { TeacherSchedule } from "../components/teacher/TeacherSchedule";
import { TeacherDisciplines } from "../components/teacher/TeacherDisciplines";

const Teacher = () => {
  const [date] = useState<Date>(new Date());
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TeacherHeader navigate={navigate} />

      <div className="flex-grow bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Tabs defaultValue="schedule" className="w-full space-y-6">
            
            <TabsList className="flex justify-end space-x-4 border-b pb-2">
              <TabsTrigger 
                value="schedule" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Мое расписание
              </TabsTrigger>
              <TabsTrigger 
                value="disciplines" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Мои дисциплины
              </TabsTrigger>
            </TabsList>

            <Suspense fallback={<div>Загрузка...</div>}>
              <TabsContent value="schedule">
                <div className="py-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Расписание занятий</h1>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{format(date, "dd.MM.yyyy")}</span>
                    </div>
                  </div>

                  <TeacherSchedule date={date} />
                </div>
              </TabsContent>

              <TabsContent value="disciplines">
                <div className="py-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Мои дисциплины</h1>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{format(date, "MMMM yyyy", { locale: ru })}</span>
                    </div>
                  </div>

                  <TeacherDisciplines />
                </div>
              </TabsContent>
            </Suspense>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Teacher;