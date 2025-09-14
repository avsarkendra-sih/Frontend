import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/f_form";
import { Input } from "../ui/f_input";
import { Button } from "../ui/f_button";
import { Textarea } from "../ui/f_textarea";
import { Card, CardContent } from "../ui/f_card";
import { InfoTooltip } from "../InfoTooltip";
import { Badge } from "../ui/f_badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/f_popover";
import { Calendar } from "../ui/f_calendar";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon, TrashIcon, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { v4 as uuidv4 } from "uuid";
import { useApplicationFormStore } from '../../store/useApplicationFormStore';

// Sample skill options
const SKILL_OPTIONS = {
  technical: [
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "CI/CD",
    "TDD",
    "REST API",
    "GraphQL",
  ],
  softSkills: [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Leadership",
    "Adaptability",
    "Critical Thinking",
    "Creativity",
    "Emotional Intelligence",
    "Conflict Resolution",
    "Negotiation",
    "Presentation Skills",
  ],
  languages: [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Arabic",
    "Portuguese",
    "Italian",
  ],
  tools: [
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "VS Code",
    "IntelliJ",
    "Eclipse",
    "Jira",
    "Trello",
    "Slack",
    "Microsoft Office",
    "Google Workspace",
    "Notion",
    "Confluence",
  ],
};
export function SkillsProjectsCertifications() {
  const { control } = useFormContext();

  const { skillsProjects, setSkillsProjects } = useApplicationFormStore((state) => ({
    skillsProjects: state.skillsProjects,
    setSkillsProjects: state.setSkillsProjects,
  }));


  const { skills, certifications, projects, achievements } = skillsProjects;

  // ---- Helpers ----
  const addCertification = () => {
    setSkillsProjects({
      certifications: [
        ...certifications,
        { id: uuidv4(), title: "", startDate: null, endDate: null, file: null },
      ],
    });
  };

  const removeCertification = (id: string) => {
    setSkillsProjects({
      certifications: certifications.filter((c) => c.id !== id),
    });
  };

  const addProject = () => {
    setSkillsProjects({
      projects: [
        ...projects,
        { id: uuidv4(), title: "", description: "", techStack: [], duration: "" },
      ],
    });
  };

  const removeProject = (id: string) => {
    setSkillsProjects({
      projects: projects.filter((p) => p.id !== id),
    });
  };

  const addAchievement = () => {
    setSkillsProjects({
      achievements: [...achievements, { id: uuidv4(), description: "" }],
    });
  };

  const removeAchievement = (id: string) => {
    setSkillsProjects({
      achievements: achievements.filter((a) => a.id !== id),
    });
  };

  const addSkill = (category: keyof typeof skills, skill: string) => {
    if (!skills[category].includes(skill)) {
      setSkillsProjects({
        skills: { ...skills, [category]: [...skills[category], skill] },
      });
    }
  };

  const removeSkill = (category: keyof typeof skills, skill: string) => {
    setSkillsProjects({
      skills: {
        ...skills,
        [category]: skills[category].filter((s) => s !== skill),
      },
    });
  };

  const addTechStackItem = (index: number, item: string) => {
    const updated = [...projects];
    updated[index].techStack.push(item);
    setSkillsProjects({ projects: updated });
  };

  const removeTechStackItem = (index: number, item: string) => {
    const updated = [...projects];
    updated[index].techStack = updated[index].techStack.filter((t) => t !== item);
    setSkillsProjects({ projects: updated });
  };
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Skills, Projects & Certifications
      </h2>
      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skills</h3>
        {/* Technical Skills */}
        {/* <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel className="flex items-center">
              Technical Skills{' '} <span className="text-red-500">*</span>
              <InfoTooltip text="Select your technical programming skills" />
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Skill
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium">Select Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.technical.map(skill => <Badge key={skill} variant={skills.technical?.includes(skill) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => addSkill('technical', skill)}>
                        {skill}
                      </Badge>)}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
            {skills.technical?.map(skill: string[] => <Badge key={skill} className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill('technical', skill)} />
              </Badge>)}
            {!skills.technical?.length && <span className="text-sm text-muted-foreground">
                No technical skills selected
              </span>}
          </div>
        </div> */}

        {/* Soft Skills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel className="flex items-center">
              Soft Skills <span className="text-red-500">*</span>
              <InfoTooltip text="Select your soft skills" />
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Skill
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium">Select Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.softSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={
                          skills.softSkills?.includes(skill)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => addSkill("softSkills", skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
            {skills.softSkills?.map((skill) => (
              <Badge key={skill} className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSkill("softSkills", skill)}
                />
              </Badge>
            ))}
            {!skills.softSkills?.length && (
              <span className="text-sm text-muted-foreground">
                No soft skills selected
              </span>
            )}
          </div>
        </div>
        {/* Languages */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel className="flex items-center">
              Languages <span className="text-red-500">*</span>
              <InfoTooltip text="Select languages you know" />
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Language
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium">Select Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant={
                          skills.languages?.includes(lang)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => addSkill("languages", lang)}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
            {skills.languages?.map((lang) => (
              <Badge key={lang} className="flex items-center gap-1">
                {lang}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSkill("languages", lang)}
                />
              </Badge>
            ))}
            {!skills.languages?.length && (
              <span className="text-sm text-muted-foreground">
                No languages selected
              </span>
            )}
          </div>
        </div>
        {/* Tools */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel className="flex items-center">
              Tools <span className="text-red-500">*</span>
              <InfoTooltip text="Select tools you are proficient with" />
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Add Tool
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-80 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="font-medium">Select Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant={
                          skills.tools?.includes(tool) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => addSkill("tools", tool)}
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
            {skills.tools?.map((tool) => (
              <Badge key={tool} className="flex items-center gap-1">
                {tool}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSkill("tools", tool)}
                />
              </Badge>
            ))}
            {!skills.tools?.length && (
              <span className="text-sm text-muted-foreground">
                No tools selected
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Certifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Certifications</h3>
          <Button
            type="button"
            onClick={addCertification}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Certification
          </Button>
        </div>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={cert.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Certification #{index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeCertification(cert.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Certificate Type */}
                  <FormField
                    control={control}
                    name={`skillsProjectsCertifications.certifications.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {/* <option value="">Select Type</option> */}
                            <option value="Hackathon">Hackathon</option>
                            <option value="Internship">Internship</option>
                            <option value="Course">Course</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`skillsProjectsCertifications.certifications.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Certification title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={control}
                      name={`skillsProjectsCertifications.certifications.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`skillsProjectsCertifications.certifications.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
                    name={`skillsProjectsCertifications.certifications.${index}.file`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Upload Certificate (PDF/JPG)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              field.onChange(file);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {certifications.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-md text-muted-foreground">
              No certifications added yet. Click "Add Certification" to include
              your credentials.
            </div>
          )}
        </div>
      </div>
      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Projects (Optional)</h3>
          <Button
            type="button"
            onClick={addProject}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card key={project.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Project #{index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={control}
                    name={`skillsProjectsCertifications.projects.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter project title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`skillsProjectsCertifications.projects.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Briefly describe your project"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Tech Stack</FormLabel>
                      <Input
                        type="text"
                        placeholder="Type and press Enter"
                        className="w-48"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.currentTarget;
                            const value = input.value.trim();
                            if (value) {
                              addTechStackItem(index, value);
                              input.value = "";
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
                      {project.techStack?.map((tech) => (
                        <Badge key={tech} className="flex items-center gap-1">
                          {tech}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTechStackItem(index, tech)}
                          />
                        </Badge>
                      ))}
                      {!project.techStack?.length && (
                        <span className="text-sm text-muted-foreground">
                          No technologies added
                        </span>
                      )}
                    </div>
                  </div>
                  <FormField
                    control={control}
                    name={`skillsProjectsCertifications.projects.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="E.g., 2 months, Jan-Mar 2023"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {projects.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-md text-muted-foreground">
              No projects added yet. Click "Add Project" to showcase your work.
            </div>
          )}
        </div>
      </div>
      {/* Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Achievements (Optional)</h3>
          <Button
            type="button"
            onClick={addAchievement}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" /> Add Achievement
          </Button>
        </div>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <Card key={achievement.id} className="border border-border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Achievement #{index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeAchievement(achievement.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                <FormField
                  control={control}
                  name={`skillsProjectsCertifications.achievements.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your achievement (e.g., Hackathons, Scholarships, Competitions)"
                          className="min-h-24"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
          {achievements.length === 0 && (
            <div className="text-center p-6 border border-dashed rounded-md text-muted-foreground">
              No achievements added yet. Click "Add Achievement" to highlight
              your accomplishments.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
