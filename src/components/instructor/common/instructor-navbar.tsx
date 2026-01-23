import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const InstructorNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Instructor Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Instructor!
            </p>
          </div>
          <Link href="/instructor/create-course">
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default InstructorNavbar;
