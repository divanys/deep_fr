import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface DisciplineGroup {
  id: string;
  discipline: string;
  group: string;
  progress: number;
}

export const TeacherDisciplines = () => {
  const disciplines: DisciplineGroup[] = [
    { id: "1", discipline: "Русский язык", group: "ИС-11", progress: 50 },
    { id: "2", discipline: "Русский язык", group: "ИС-12", progress: 30 },
    { id: "3", discipline: "Литература", group: "ИКС-12", progress: 43 },
    { id: "4", discipline: "Литература", group: "ИКС-13", progress: 45 },
    { id: "5", discipline: "Литература", group: "СА-17", progress: 48 },
  ];

  // Group disciplines by name
  const disciplineGroups = disciplines.reduce((acc, discipline) => {
    if (!acc[discipline.discipline]) {
      acc[discipline.discipline] = [];
    }
    acc[discipline.discipline].push(discipline);
    return acc;
  }, {} as Record<string, DisciplineGroup[]>);

  const disciplineNames = Object.keys(disciplineGroups);
  const [currentDiscipline, setCurrentDiscipline] = useState(disciplineNames[0]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b">
        <Tabs 
          defaultValue={disciplineNames[0]}
          onValueChange={setCurrentDiscipline}
          className="w-full"
        >
          <div className="px-4 pt-4">
            <TabsList className="inline-flex h-9 bg-muted/40">
              {disciplineNames.map(discipline => (
                <TabsTrigger 
                  key={discipline}
                  value={discipline}
                  className="px-4 py-1.5 data-[state=active]:shadow-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  {discipline}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {disciplineNames.map(discipline => (
            <TabsContent key={discipline} value={discipline} className="mt-0 p-0">
              <div className="divide-y">
                {disciplineGroups[discipline].map(item => (
                  <div key={item.id} className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{item.group}</div>
                      <div className="flex items-center mt-1">
                        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{item.progress}%</span>
                      </div>
                    </div>
                      <Link to={`/journal/${item.discipline}/${item.group}`} className="whitespace-nowrap">
                        Электронный журнал
                      </Link>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
