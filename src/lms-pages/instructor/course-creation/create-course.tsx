"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CourseFormData, courseSchema } from "@/schema/course-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BookOpen,
  DollarSign,
  Eye,
  Image,
  Megaphone,
  MessageSquare,
  Plus,
  Save,
  Target,
} from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import IntendedLeanersSection from "./intended-learners";
import CourseMessageSection from "./course-message";
import CurriculumSection from "./curriculum";

export interface Lecture {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "coding" | "assignment";
  duration: string;
  isExpanded: boolean;
}

export interface Section {
  id: string;
  title: string;
  objective: string;
  Lectures: Lecture[];
}

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Design",
];

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Portuguese",
];

const generateId = () => Math.random().toString(36).substr(2, 9);

// type ActiveSection =
//   | "intended-learners"
//   | "course-messages"
//   | "curriculum"
//   | "landing-page"
//   | "pricing"
//   | "promotions";

export const ACTIVE_SECTIONS = {
  INTENDED_LEARNERS: "intended-learners",
  COURSE_MESSAGES: "course-messages",
  CURRICULUM: "curriculum",
  LANDING_PAGE: "landing-page",
  PRICING: "pricing",
  PROMOTIONS: "promotions",
} as const;

export type ActiveSection =
  (typeof ACTIVE_SECTIONS)[keyof typeof ACTIVE_SECTIONS];

const sidebarNavigation = [
  {
    group: "Plan your course",
    items: [
      {
        id: ACTIVE_SECTIONS.INTENDED_LEARNERS,
        label: "Intended Learners",
        icon: Target,
      },
      {
        id: ACTIVE_SECTIONS.COURSE_MESSAGES,
        label: "Course Messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    group: "Create your content",
    items: [
      { id: ACTIVE_SECTIONS.CURRICULUM, label: "Curriculum", icon: BookOpen },
    ],
  },
  {
    group: "Publish your course",
    items: [
      {
        id: ACTIVE_SECTIONS.LANDING_PAGE,
        label: "Course landing page",
        icon: Image,
      },
      { id: ACTIVE_SECTIONS.PRICING, label: "Pricing", icon: DollarSign },
      { id: ACTIVE_SECTIONS.PROMOTIONS, label: "Promotions", icon: Megaphone },
    ],
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildern: 0.05,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const CreateCourse = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "",
      objective: "",
      Lectures: [
        {
          id: "generateId()",
          title: "",
          type: "video",
          duration: "",
          isExpanded: false,
        },
      ],
    },
  ]);
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("intended-learners");
  const [learningObjectives, setLearningObjectives] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);
  const [targetAudience, setTargetAudience] = useState<string[]>([""]);

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      subcategory: "",
      level: "",
      language: "English",
      price: "",
      thumbnail: "",
      promoVideo: "",
      welcomeMessage: "",
      congratsMessage: "",
    },
  });

  const onLearningObjectivesHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setLearningObjectives((prev) =>
      prev.map((obj, i) => (i === index ? e.target.value : obj)),
    );
  };

  const onAddSectionHandler = () => {
    setSections((prev) => [
      ...prev,
      { id: generateId(), title: "", objective: "", Lectures: [] },
    ]);
  };

  const onAddLecture = (sectionId: string, type: Lecture["type"] = "video") => {
    setSections((prevSec) =>
      prevSec.map((sec, index) =>
        sec.id === sectionId
          ? {
              ...sec,
              Lectures: [
                ...sec.Lectures,
                {
                  id: generateId(),
                  title: "",
                  type,
                  duration: "",
                  isExpanded: true,
                },
              ],
            }
          : sec,
      ),
    );
  };

  const onSubmit = (data: CourseFormData) => {
    console.log("Course data:", {
      ...data,
      sections,
      learningObjectives,
      prerequisites,
      targetAudience,
    });
  };

  // console.log(learningObjectives);
  const renderContent = () => {
    switch (activeSection) {
      case ACTIVE_SECTIONS.INTENDED_LEARNERS:
        return (
          <IntendedLeanersSection
            learningObjectives={learningObjectives}
            onLearningObjectivesHandler={onLearningObjectivesHandler}
            setLearningObjectives={setLearningObjectives}
            prerequisites={prerequisites}
            targetAudience={targetAudience}
            setPrerequisites={setPrerequisites}
            setTargetAudience={setTargetAudience}
          />
        );
      case ACTIVE_SECTIONS.COURSE_MESSAGES:
        return <CourseMessageSection form={form} />;
      case ACTIVE_SECTIONS.CURRICULUM:
        return (
          <CurriculumSection
            sections={sections}
            onAddSectionHandler={onAddSectionHandler}
            onAddLecture={onAddLecture}
          />
        );
      case ACTIVE_SECTIONS.LANDING_PAGE:
        return <div>Landing Page Content</div>;
      case ACTIVE_SECTIONS.PRICING:
        return <div>Pricing Content</div>;
      case ACTIVE_SECTIONS.PROMOTIONS:
        return <div>Promotions Content</div>;
      case ACTIVE_SECTIONS.INTENDED_LEARNERS:
        return <div>Intended Learners Content</div>;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-4 border-b border-border">
            <Link
              href="/instructor"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to courses</span>
            </Link>
          </SidebarHeader>

          <SidebarContent className="p-2">
            {sidebarNavigation.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  {group.group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(item.id)}
                          isActive={activeSection === item.id}
                          className="w-full justify-start"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          {/* Progress in footer */}
          <div className="mt-auto p-4 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-medium text-foreground">
                  {/* {calculateProgress()} */}
                  92%
                </span>
              </div>
              <Progress
                // value={calculateProgress()}
                value={92}
                className="h-2"
              />
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
              <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:text-white" />
                    <div>
                      <h1 className="text-lg font-bold text-foreground">
                        {form.watch("title") || "Untitled Course"}
                      </h1>
                      <Badge variant="secondary" className="mt-1">
                        Draft
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-border">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>

                    {/* ✅ NOW THIS WORKS */}
                    <Button type="submit" variant="outline">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button className="bg-primary hover:opacity-90">
                      Submit for Review
                    </Button>
                  </div>
                </div>
              </header>
              {/* Content Area */}
              <main className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto px-6 py-8">
                  <AnimatePresence mode="wait">
                    {renderContent()}
                  </AnimatePresence>
                </div>
              </main>
            </form>
          </Form>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CreateCourse;
