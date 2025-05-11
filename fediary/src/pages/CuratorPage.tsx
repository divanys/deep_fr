import { useState, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Calendar } from "../components/ui/calendar";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { GroupsList } from "../components/curator/GroupsList";
import { GroupSchedule } from "../components/curator/GroupSchedule";
import { CalendarIcon } from "lucide-react";
import CuratorHeader from "../components/Header/CuratorHeader";
import { useNavigate } from "react-router-dom";

const Curator = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedGroup, setSelectedGroup] = useState<string>("ИС-11");
  const [expandedGroup, setExpandedGroup] = useState<string | null>("ИС-11");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CuratorHeader navigate={navigate} />

      <div className="flex-grow bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Tabs defaultValue="dashboard" className="w-full space-y-6">
            
            {/* Стили вкладок — выровнено как у студентов */}
            <TabsList className="flex justify-end space-x-4 border-b pb-2">
              <TabsTrigger 
                value="dashboard" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Мои группы
              </TabsTrigger>
              <TabsTrigger 
                value="groups" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Успеваемость групп
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
              >
                Расписание групп
              </TabsTrigger>
            </TabsList>

            <Suspense fallback={<div>Загрузка...</div>}>
              <TabsContent value="dashboard">
                <div className="py-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Личный кабинет куратора</h1>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{format(date, "dd.MM.yyyy")}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Мои группы</h2>
                    <GroupsList 
                      expandedGroup={expandedGroup} 
                      setExpandedGroup={setExpandedGroup}
                      setSelectedGroup={setSelectedGroup}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="groups">
                <div className="py-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Мои группы</h1>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{format(date, "dd.MM.yyyy")}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">Успеваемость и посещаемость групп</h2>
                    <GroupsList 
                      expandedGroup={expandedGroup} 
                      setExpandedGroup={setExpandedGroup}
                      setSelectedGroup={setSelectedGroup}
                      showDetails={true}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <div className="py-8">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Расписание групп</h1>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{format(date, "dd.MM.yyyy")}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-4">Выберите группу</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["ИС-11", "ИС-15"].map((group) => (
                          <button 
                            key={group}
                            className={`px-4 py-2 rounded-lg text-sm ${
                              selectedGroup === group 
                                ? "bg-primary text-white" 
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedGroup(group)}
                          >
                            {group}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-4">Выберите дату</h2>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        className="pointer-events-auto"
                        locale={ru}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Расписание группы {selectedGroup} на {format(date, "dd.MM.yyyy")}
                    </h2>
                    <GroupSchedule 
                      date={date} 
                      selectedGroup={selectedGroup} 
                    />
                  </div>
                </div>
              </TabsContent>
            </Suspense>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Curator;
