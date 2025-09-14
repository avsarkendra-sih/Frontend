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
  const { control, watch, setValue } = useFormContext();
  const skills = watch("skillsProjectsCertifications.skills") || {
    technical: [],
    softSkills: [],
    tools: [],
  };
  const certifications =
    watch("skillsProjectsCertifications.certifications") || [];
  const projects = watch("skillsProjectsCertifications.projects") || [];
  const achievements = watch("skillsProjectsCertifications.achievements") || [];
  // Add new items
  const addCertification = () => {
    setValue("skillsProjectsCertifications.certifications", [
      ...certifications,
      {
        id: uuidv4(),
        title: "",
        startDate: null,
        endDate: null,
        file: null,
      },
    ]);
  };
  const addProject = () => {
    setValue("skillsProjectsCertifications.projects", [
      ...projects,
      {
        id: uuidv4(),
        title: "",
        description: "",
        techStack: [],
        duration: "",
      },
    ]);
  };
  const addAchievement = () => {
    setValue("skillsProjectsCertifications.achievements", [
      ...achievements,
      {
        id: uuidv4(),
        description: "",
      },
    ]);
  };
  // Remove items
  const removeCertification = (id: string) => {
    setValue(
      "skillsProjectsCertifications.certifications",
      certifications.filter((cert) => cert.id !== id)
    );
  };
  const removeProject = (id: string) => {
    setValue(
      "skillsProjectsCertifications.projects",
      projects.filter((project) => project.id !== id)
    );
  };
  const removeAchievement = (id: string) => {
    setValue(
      "skillsProjectsCertifications.achievements",
      achievements.filter((achievement) => achievement.id !== id)
    );
  };
  // Add skill
  const addSkill = (category: string, skill: string) => {
    const currentSkills = skills[category as keyof typeof skills] || [];
    if (!currentSkills.includes(skill)) {
      setValue(`skillsProjectsCertifications.skills.${category}`, [
        ...currentSkills,
        skill,
      ]);
    }
  };
  // Remove skill
  const removeSkill = (category: string, skill: string) => {
    const currentSkills = skills[category as keyof typeof skills] || [];
    setValue(
      `skillsProjectsCertifications.skills.${category}`,
      currentSkills.filter((s) => s !== skill)
    );
  };
  // Add tech stack item
  const addTechStackItem = (index: number, item: string) => {
    const project = projects[index];
    if (project && item && !project.techStack.includes(item)) {
      const updatedTechStack = [...project.techStack, item];
      setValue(
        `skillsProjectsCertifications.projects.${index}.techStack`,
        updatedTechStack
      );
    }
  };
  // Remove tech stack item
  const removeTechStackItem = (index: number, item: string) => {
    const project = projects[index];
    if (project) {
      const updatedTechStack = project.techStack.filter(
        (tech) => tech !== item
      );
      setValue(
        `skillsProjectsCertifications.projects.${index}.techStack`,
        updatedTechStack
      );
    }
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
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <FormLabel className="flex items-center">
      Technical Skills <span className="text-red-500">*</span>
      <InfoTooltip text="Select your technical programming skills" />
    </FormLabel>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Add Skill
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto space-y-2">
        <h4 className="font-medium">Select or Add Technical Skills</h4>
        
        {/* Search / Custom Input */}
        <Input
          type="text"
          placeholder="Search or add custom skill"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.currentTarget.value.trim();
              if (value) {
                addSkill("technical", value);
                e.currentTarget.value = "";
              }
            }
          }}
        />

        {/* Existing Options */}
        <div className="flex flex-wrap gap-2">
          {SKILL_OPTIONS.technical.map((skill) => (
            <Badge
              key={skill}
              variant={
                skills.technical?.includes(skill) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => addSkill("technical", skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </div>

  {/* Selected Skills */}
  <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
    {skills.technical?.map((skill) => (
      <Badge key={skill} className="flex items-center gap-1">
        {skill}
        <X
          className="h-3 w-3 cursor-pointer"
          onClick={() => removeSkill("technical", skill)}
        />
      </Badge>
    ))}
    {!skills.technical?.length && (
      <span className="text-sm text-muted-foreground">
        No technical skills selected
      </span>
    )}
  </div>
</div>


{/* Soft Skills */}
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <FormLabel className="flex items-center">
      Soft Skills <span className="text-red-500">*</span>
      <InfoTooltip text="Select your soft skills" />
    </FormLabel>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">Add Skill</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto space-y-2">
        <h4 className="font-medium">Select or Add Soft Skills</h4>

        {/* Search / Custom Input */}
        <Input
          type="text"
          placeholder="Search or add custom skill"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.currentTarget.value.trim();
              if (value) {
                addSkill("softSkills", value);
                e.currentTarget.value = "";
              }
            }
          }}
        />

        {/* Existing Options */}
        <div className="flex flex-wrap gap-2">
          {SKILL_OPTIONS.softSkills.map((skill) => (
            <Badge
              key={skill}
              variant={skills.softSkills?.includes(skill) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => addSkill("softSkills", skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </div>

  {/* Selected Skills */}
  <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
    {skills.softSkills?.map((skill) => (
      <Badge key={skill} className="flex items-center gap-1">
        {skill}
        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("softSkills", skill)} />
      </Badge>
    ))}
    {!skills.softSkills?.length && (
      <span className="text-sm text-muted-foreground">No soft skills selected</span>
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
        <Button variant="outline" size="sm">Add Tool</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto space-y-2">
        <h4 className="font-medium">Select or Add Tools</h4>

        {/* Search / Custom Input */}
        <Input
          type="text"
          placeholder="Search or add custom tool"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const value = e.currentTarget.value.trim();
              if (value) {
                addSkill("tools", value);
                e.currentTarget.value = "";
              }
            }
          }}
        />

        {/* Existing Options */}
        <div className="flex flex-wrap gap-2">
          {SKILL_OPTIONS.tools.map((tool) => (
            <Badge
              key={tool}
              variant={skills.tools?.includes(tool) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => addSkill("tools", tool)}
            >
              {tool}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  </div>

  {/* Selected Tools */}
  <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
    {skills.tools?.map((tool) => (
      <Badge key={tool} className="flex items-center gap-1">
        {tool}
        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("tools", tool)} />
      </Badge>
    ))}
    {!skills.tools?.length && (
      <span className="text-sm text-muted-foreground">No tools selected</span>
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
            
                    <FormField
                    control={control}
                    name={`skillsProjectsCertifications.certifications.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Briefly describe your Certification"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
  
                  <div className="grid grid-cols-2 gap-2"></div>
                  
                  
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
                      <FormLabel>Technologies Used</FormLabel>
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

{/* Live Link */}
<FormField
  control={control}
  name={`skillsProjectsCertifications.projects.${index}.liveLink`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Live Link</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Enter project live link (if available)" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* GitHub Link */}
<FormField
  control={control}
  name={`skillsProjectsCertifications.projects.${index}.githubLink`}
  render={({ field }) => (
    <FormItem>
      <FormLabel>GitHub Link</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Enter GitHub repo link" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Start Date */}
<FormField
  control={control}
  name={`skillsProjectsCertifications.projects.${index}.startDate`}
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Start Date</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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

{/* End Date */}
<FormField
  control={control}
  name={`skillsProjectsCertifications.projects.${index}.endDate`}
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>End Date</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <FormField
              control={control}
              name={`skillsProjectsCertifications.achievements.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Achievement title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={control}
              name={`skillsProjectsCertifications.achievements.${index}.date`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
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
                          {field.value
                            ? format(field.value, "PPP")
                            : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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

            {/* Description */}
            <FormField
              control={control}
              name={`skillsProjectsCertifications.achievements.${index}.description`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your achievement (optional)"
                      className="min-h-24"
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
