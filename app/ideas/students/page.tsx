"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Home,
  User,
  Bell,
  Filter,
  MessageSquare,
  ChevronDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/navbar";

// Sample data for student project ideas
const studentProjects = [
  {
    id: 1,
    title: "AI-Powered Recycling Sorter",
    description:
      "Developing an AI system that can identify and sort recyclable materials. Looking for a teacher with expertise in machine learning and environmental science.",
    tags: ["AI", "Environment", "Engineering"],
    comments: 18,
    status: "Open",
    author: "Alex Johnson",
    postedDate: "3 days ago",
  },
  {
    id: 2,
    title: "Virtual Reality History Tour",
    description:
      "Creating a VR experience of historical events. Need a history teacher to ensure accuracy and provide educational context.",
    tags: ["VR", "History", "Technology"],
    comments: 24,
    status: "In Progress",
    author: "Maya Patel",
    postedDate: "1 week ago",
  },
  {
    id: 3,
    title: "Community Health Tracking App",
    description:
      "Building a mobile app to track community health metrics. Seeking a health sciences teacher to advise on relevant metrics and interpretation.",
    tags: ["Health", "Mobile", "Data Science"],
    comments: 9,
    status: "Open",
    author: "Carlos Rodriguez",
    postedDate: "2 days ago",
  },
  {
    id: 4,
    title: "Urban Garden Planning Tool",
    description:
      "Developing software to help urban communities plan efficient gardens. Looking for a biology teacher with expertise in plant science.",
    tags: ["Biology", "Software", "Community"],
    comments: 15,
    status: "In Progress",
    author: "Zoe Williams",
    postedDate: "5 days ago",
  },
  {
    id: 5,
    title: "Interactive Poetry Analysis Platform",
    description:
      "Creating an interactive platform for poetry analysis and discussion. Need a literature teacher to provide expert guidance.",
    tags: ["Literature", "Web Development", "Education"],
    comments: 21,
    status: "Completed",
    author: "Jamal Thompson",
    postedDate: "3 weeks ago",
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let variant: "outline" | "default" | "secondary" | "destructive" = "outline";

  switch (status) {
    case "Open":
      variant = "default";
      break;
    case "In Progress":
      variant = "secondary";
      break;
    case "Completed":
      variant = "outline";
      break;
  }

  return <Badge variant={variant}>{status}</Badge>;
}

export default function StudentIdeasPage() {
  const [filter, setFilter] = useState("Newest");

  // Filter ideas based on selected filter
  const filteredProjects = [...studentProjects].sort((a, b) => {
    if (filter === "Most Discussed") {
      return b.comments - a.comments;
    }
    // Default to Newest (by ID in this mock data)
    return b.id - a.id;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 p-6">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Student Projects</h1>
            <p className="text-muted-foreground">
              Browse project ideas submitted by students seeking teacher
              collaboration
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {filter}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("Newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Most Discussed")}>
                  Most Discussed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <span>New Project</span>
            </Button>
          </div>
        </header>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <StatusBadge status={project.status} />
                </div>
              </CardHeader>
              <CardContent className="pb-3 flex-grow">
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{project.comments} comments</span>
                </div>
                <div>
                  <span>{project.postedDate}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
