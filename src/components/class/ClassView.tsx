import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import { Card, CardContent } from "../common/Card";
import { Button } from "../common/Button";
import { TabButton } from "../common/TabButton";
import { Assignments } from "./Assignments";
import { ClassMaterials } from "./ClassMaterials";
import { ClassPeople } from "./ClassPeople";
import { useNavigate, useParams } from "react-router-dom";
import { ClassAnnouncements } from "./ClassAnnouncements";

type Tab = "stream" | "assignments" | "materials" | "people" | "video";

export const ClassView: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("stream");
  const navigate = useNavigate();

  if (!classId) return null;

  // In a real app, we would fetch this data based on the classId
  const classData = {
    id: classId,
    name: "Advanced Mathematics",
    subject: "Mathematics",
    tutor: "Dr. Jane Smith",
    description:
      "This course covers advanced mathematical concepts including calculus, linear algebra, and differential equations.",
    color: "#3B82F6",
    coverImage:
      "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    students: 24,
    nextClass: "Today, 2:00 PM",
    code: "math-adv-123",
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundColor: classData.color,
          backgroundImage: classData.coverImage
            ? `url(${classData.coverImage})`
            : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">{classData.name}</h1>
            <p className="text-white/90">
              {classData.subject} • {classData.tutor}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto">
          <TabButton
            active={activeTab === "stream"}
            onClick={() => setActiveTab("stream")}
            icon={<MessageSquare size={18} />}
            label="Stream"
          />
          <TabButton
            active={activeTab === "assignments"}
            onClick={() => setActiveTab("assignments")}
            icon={<FileText size={18} />}
            label="Assignments"
          />
          <TabButton
            active={activeTab === "materials"}
            onClick={() => setActiveTab("materials")}
            icon={<BookOpen size={18} />}
            label="Materials"
          />
          <TabButton
            active={activeTab === "people"}
            onClick={() => setActiveTab("people")}
            icon={<Users size={18} />}
            label="People"
          />
          <TabButton
            active={activeTab === "video"}
            onClick={() => setActiveTab("video")}
            icon={<Users size={18} />}
            label="Video"
          />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {activeTab === "stream" && <ClassAnnouncements classId={classId} />}
            {activeTab === "assignments" && <Assignments classId={classId} />}
            {activeTab === "materials" && <ClassMaterials classId={classId} />}
            {activeTab === "people" && <ClassPeople classId={classId} />}
            {activeTab === "video" && (
              <div className="h-full flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Video Stream
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join the live video session for this class.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden min-h-96">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/class/${classId}/stream`)}
                  >
                    Join Stream
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                  Class Code
                </h3>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-2 rounded-md">
                  <code className="text-sm text-gray-700 dark:text-gray-300">
                    {classData.code}
                  </code>
                  <Button variant="ghost" size="sm">
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Share this code with students to join the class
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Next Class
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {classData.nextClass}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Students
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {classData.students} enrolled
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
