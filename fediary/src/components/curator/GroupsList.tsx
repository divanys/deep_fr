import { ChevronDown, ChevronUp, Users, Edit } from "lucide-react";
import { Progress } from "../ui/progress";
import { GroupStudentsList } from "./GroupStudentsList";
import { Card, CardContent } from "../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import { Button } from "../ui/button";

interface GroupsListProps {
  expandedGroup: string | null;
  setExpandedGroup: (group: string | null) => void;
  setSelectedGroup: (group: string) => void;
  showDetails?: boolean;
}

interface Group {
  id: string;
  name: string;
  studentsCount: number;
  averageAttendance: number;
  averagePerformance: number;
}

export const GroupsList = ({ 
  expandedGroup, 
  setExpandedGroup, 
  setSelectedGroup,
  showDetails = false
}: GroupsListProps) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const groups: Group[] = [
    {
      id: "is-11",
      name: "ИС-11",
      studentsCount: 30,
      averageAttendance: 84,
      averagePerformance: 78,
    },
    {
      id: "is-15",
      name: "ИС-15",
      studentsCount: 18,
      averageAttendance: 76,
      averagePerformance: 72,
    }
  ];

  const toggleGroup = (group: string) => {
    if (expandedGroup === group) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(group);
      setSelectedGroup(group);
    }
  };

  const toggleEditMode = (e: React.MouseEvent, group: string) => {
    e.stopPropagation();
    setEditMode(editMode === group ? null : group);
    if (expandedGroup !== group) {
      setExpandedGroup(group);
      setSelectedGroup(group);
    }
  };

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

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <Card key={group.id} className="overflow-hidden">
          <Collapsible 
            open={expandedGroup === group.name} 
            onOpenChange={() => toggleGroup(group.name)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-gray-600">{group.studentsCount} студентов</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={editMode === group.name ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => toggleEditMode(e, group.name)}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {editMode === group.name ? "Сохранить" : "Редактировать"}
                  </Button>
                  {expandedGroup === group.name ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {showDetails && (
                <CardContent className="pt-4">
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Средняя посещаемость</span>
                        <span className="text-sm font-medium">{group.averageAttendance}%</span>
                      </div>
                      <Progress 
                        value={group.averageAttendance} 
                        className="h-2" 
                        indicatorClassName={getAttendanceColor(group.averageAttendance)} 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Средняя успеваемость</span>
                        <span className="text-sm font-medium">{group.averagePerformance}%</span>
                      </div>
                      <Progress 
                        value={group.averagePerformance} 
                        className="h-2" 
                        indicatorClassName={getPerformanceColor(group.averagePerformance)} 
                      />
                    </div>
                  </div>
                </CardContent>
              )}
              
              <div className="border-t bg-gray-50 p-4">
                <GroupStudentsList 
                  groupName={group.name} 
                  editable={editMode === group.name} 
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
};
