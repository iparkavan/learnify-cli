import { motion, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  Lecture,
  Section,
} from "./create-course";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code,
  FileText,
  GripVertical,
  HelpCircle,
  Play,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CurriculumSectionProps {
  sections: Section[];
  onAddSectionHandler: () => void;
  onAddLecture: (sectionId: string, type: Lecture["type"]) => void;
}

const getLectureIcon = (type: Lecture["type"]) => {
  switch (type) {
    case "video":
      return <Play className="h-4 w-4" />;
    case "text":
      return <FileText className="h-4 w-4" />;
    case "quiz":
      return <HelpCircle className="h-4 w-4" />;
    case "coding":
      return <Code className="h-4 w-4" />;
    case "assignment":
      return <BookOpen className="h-4 w-4" />;
  }
};

const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  sections,
  onAddSectionHandler,
  onAddLecture,
}) => {
  return (
    <motion.div
      key="curriculum"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-start justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Curriculum
          </h2>
          <p className="text-muted-foreground">
            Start putting together your course by creating sections, lectures
            and practice activities.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{sections.length} sections</span>
          <span>•</span>
          {/* <span>{totalLessons} lectures</span> */}
        </div>
      </motion.div>

      {/* Sections */}
      <motion.div variants={itemVariants} className="space-y-4">
        <AnimatePresence mode="popLayout">
          <Accordion
            type="multiple"
            // collapsible
            // className="w-full"
            className="space-y-4"
            // defaultValue="item-1"
          >
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <AccordionItem value={section.id}>
                  <AccordionTrigger
                    className="bg-muted/50 p-4 border-b border-border flex items-center"
                    // onClick={(e) => e.preventDefault()}
                  >
                    {/* Section Header */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                        <span className="font-semibold text-foreground">
                          Section {sectionIndex + 1}:
                        </span>
                        <Input
                          value={section.title}
                          //   onChange={(e) =>
                          //     updateSection(section.id, { title: e.target.value })
                          //   }
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Enter section title"
                          className="flex-1 bg-background border-border h-9"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          //   onClick={() => deleteSection(section.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-3 pl-8">
                        <Input
                          value={section.objective}
                          onClick={(e) => e.stopPropagation()}
                          //   onChange={(e) =>
                          //     updateSection(section.id, {
                          //       objective: e.target.value,
                          //     })
                          //   }
                          placeholder="What will students be able to do at the end of this section?"
                          className="bg-background border-border text-sm"
                        />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex p-4 flex-col gap-4 text-balance">
                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout">
                        {section.Lectures.map((lesson, lessonIndex) => (
                          <motion.div
                            key={lesson.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="border border-border rounded-lg bg-background"
                          >
                            <div className="p-2 flex items-center gap-3">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              <div className="flex items-center gap-2 text-muted-foreground">
                                {getLectureIcon(lesson.type)}
                                <span className="text-xs capitalize">
                                  {lesson.type}
                                </span>
                              </div>
                              <Input
                                value={lesson.title}
                                // onChange={(e) =>
                                //   updateLesson(section.id, lesson.id, {
                                //     title: e.target.value,
                                //   })
                                // }
                                placeholder="Enter lecture title"
                                className="flex-1 bg-transparent border p-2 h-auto focus-visible:ring-0"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary hover:text-white"
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Content
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                // onClick={() =>
                                //   deleteLesson(section.id, lesson.id)
                                // }
                                className="text-muted-foreground hover:text-destructive h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Add Curriculum Item */}
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddLecture(section.id, "video")}
                          className="border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Lecture
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddLecture(section.id, "quiz")}
                          className="border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Quiz
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddLecture(section.id, "coding")}
                          className="border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Coding Exercise
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddLecture(section.id, "assignment")}
                          className="border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Assignment
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AnimatePresence>

        {/* Add Section Button */}
        <Button
          variant="outline"
          onClick={onAddSectionHandler}
          className="w-full border-dashed h-12"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Section
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CurriculumSection;
