import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { useNavigate } from "react-router-dom";
import { Suspense } from 'react';

const StudentHeader = React.lazy(() => import("../components/Header/StudentHeader"));
const ScheduleTab = React.lazy(() => import("../components/Schedule/ScheduleTab"));
const GradesTab = React.lazy(() => import("../components/Grades/GradesTab"));
const FinalGradesTab = React.lazy(() => import("../components/FinalGrades/FinalGradesTab"));

const StudentPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(new Date());
  const safeDate = isNaN(date.getTime()) ? new Date() : date;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Suspense fallback={<div>Loading header...</div>}>
        <StudentHeader navigate={navigate} />
      </Suspense>

      <div className="flex-grow bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Tabs defaultValue="schedule" className="w-full space-y-6">
            
            <TabsList className="flex justify-end space-x-4 border-b pb-2">
              <TabsTrigger 
                value="schedule" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Расписание
              </TabsTrigger>
              <TabsTrigger 
                value="grades" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Успеваемость
              </TabsTrigger>
              <TabsTrigger 
                value="final-grades" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Итоговые
              </TabsTrigger>
            </TabsList>

            <Suspense fallback={<div>Loading tab content...</div>}>
              <TabsContent value="schedule">
                <ScheduleTab date={safeDate} setDate={setDate} />
              </TabsContent>
              <TabsContent value="grades">
                <GradesTab />
              </TabsContent>
              <TabsContent value="final-grades">
                <FinalGradesTab />
              </TabsContent>
            </Suspense>

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;