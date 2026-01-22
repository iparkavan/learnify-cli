import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Image, Video } from "lucide-react";

import {
  containerVariants,
  itemVariants,
} from "@/lms-pages/instructor/course-creation/create-course";
import { UseFormReturn } from "react-hook-form";
import { CourseFormData } from "@/schema/course-schema";

interface CourseLandingPageSectionProps {
  form: UseFormReturn<CourseFormData>;
  categories: string[];
  levels: string[];
  languages: string[];
}

const CourseLandingPageSection: React.FC<CourseLandingPageSectionProps> = ({
  form,
  categories,
  levels,
  languages,
}) => {
  return (
    <motion.div
      key="landing-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Course landing page
        </h2>
        <p className="text-muted-foreground">
          Your course landing page is crucial to your success. It's where
          students decide whether to enroll.
        </p>
      </motion.div>

      <Form {...form}>
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Course title
                  </FormLabel>
                  <FormDescription>
                    Your title should be a mix of attention-grabbing,
                    informative, and optimized for search.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Insert your course title"
                        className="bg-background border-border focus:border-primary pr-16"
                        maxLength={60}
                        {...field}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {field.value?.length || 0}/60
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Course subtitle
                  </FormLabel>
                  <FormDescription>
                    Use 1 or 2 related keywords, and mention 3-4 of the most
                    important areas that you've covered.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Insert your course subtitle"
                        className="bg-background border-border focus:border-primary pr-20"
                        maxLength={120}
                        {...field}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {field.value?.length || 0}/120
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Course description
                  </FormLabel>
                  <FormDescription>
                    Description should have minimum 200 words.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Insert your course description"
                      className="bg-background border-border focus:border-primary min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-6 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Level
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Language
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background border-border w-full sm:w-[200px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Thumbnail Upload */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Course image
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload your course image here. Important guidelines: 750x422
                pixels; .jpg, .jpeg, .gif, or .png.
              </p>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
              <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium">Upload Image</p>
              <p className="text-sm text-muted-foreground mt-1">
                No file selected
              </p>
            </div>
          </motion.div>

          {/* Promo Video */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Promotional video
              </h3>
              <p className="text-sm text-muted-foreground">
                Students who watch a well-made promo video are 5X more likely to
                enroll.
              </p>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30">
              <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium">Upload Video</p>
              <p className="text-sm text-muted-foreground mt-1">
                No file selected
              </p>
            </div>
          </motion.div>
        </div>
      </Form>
    </motion.div>
  );
};

export default CourseLandingPageSection;
