// import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/f_form";
import { Input } from "../ui/f_input";
// import { Button } from "../ui/f_button";
import { InfoTooltip } from "../InfoTooltip";
// import { Card, CardContent } from "../ui/f_card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/f_select";
import { Switch } from "../ui/f_switch";
// import { PlusIcon, TrashIcon } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
export function AcademicDetails() {
  const { control, watch } = useFormContext();
  const nextQualification = watch("academicDetails.nextQualification");
  console.log(nextQualification)

  // const otherCourses = watch("academicDetails.otherCourses") || [];
  
  // const addOtherCourse = () => {
  //   const { setValue } = control._formState.context;
  //   setValue("academicDetails.otherCourses", [
  //     ...otherCourses,
  //     {
  //       id: uuidv4(),
  //       title: "",
  //       institution: "",
  //       duration: "",
  //     },
  //   ]);
  // };
  // const removeOtherCourse = (id: string) => {
  //   const { setValue } = control._formState.context;
  //   setValue(
  //     "academicDetails.otherCourses",
  //     otherCourses.filter((course) => course.id !== id)
  //   );
  // };

  const yearOptions = Array.from(
    {
      length: 30,
    },
    (_, i) => {
      const year = new Date().getFullYear() - i;
      return (
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      );
    }
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Academic Details</h2>
      {/* 10th Class */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">10th Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="academicDetails.tenth.schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  School Name <span className="text-red-500">*</span>
                  <InfoTooltip text="Enter the name of your 10th class school" />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter school name" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="academicDetails.tenth.board"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Board <span className="text-red-500">*</span>
                  <InfoTooltip text="Select your 10th class education board" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cbse">CBSE</SelectItem>
                    <SelectItem value="icse">ICSE</SelectItem>
                    <SelectItem value="state">State Board</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="academicDetails.tenth.yearOfPassing"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Year of Passing <span className="text-red-500">*</span>
                  <InfoTooltip text="Select the year you passed 10th class" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{yearOptions}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Marks Type Selector */}
          <FormField
            control={control}
            name="academicDetails.tenth.marksType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Marks Type <span className="text-red-500">*</span>
                  <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marks type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="cgpa">CGPA</SelectItem>
                    <SelectItem value="grade">Grade</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Conditionally show field based after selection of marks */}

          {watch("academicDetails.tenth.marksType") === "percentage" && (
            <FormField
              control={control}
              name="academicDetails.tenth.percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Percentage <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter percentage" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watch("academicDetails.tenth.marksType") === "cgpa" && (
            <FormField
              control={control}
              name="academicDetails.tenth.cgpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    CGPA <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter CGPA" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watch("academicDetails.tenth.marksType") === "grade" && (
            <FormField
              control={control}
              name="academicDetails.tenth.grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Grade <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter your Marks in Grade" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Grade (e.g. A, B+)"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

        </div>
      </div>

      <FormField
        control={control}
        name="academicDetails.nextQualification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Next Qualification <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iti">ITI</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="12th">12th</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 12th Section */}
      {watch("academicDetails.nextQualification") === "12th" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">12th Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="academicDetails.twelfth.schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    School/College Name <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your 12th class school" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter school/college name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.twelfth.board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Board <span className="text-red-500">*</span>
                    <InfoTooltip text="Select your 12th class education board" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select board" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cbse">CBSE</SelectItem>
                      <SelectItem value="icse">ISC</SelectItem>
                      <SelectItem value="state">State Board</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.twelfth.yearOfPassing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Year of Passing <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the year when you've completed your Undergraduation" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{yearOptions}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="academicDetails.twelfth.marksType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Marks Type <span className="text-red-500">*</span>
                    <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marks type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="cgpa">CGPA</SelectItem>
                      <SelectItem value="grade">Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watch("academicDetails.twelfth.marksType") === "percentage" && (
              <FormField
                control={control}
                name="academicDetails.twelfth.percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Percentage <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter percentage"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.twelfth.marksType") === "cgpa" && (
              <FormField
                control={control}
                name="academicDetails.twelfth.cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CGPA <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter CGPA" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.twelfth.marksType") === "grade" && (
              <FormField
                control={control}
                name="academicDetails.twelfth.grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Grade <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your Marks in Grade" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Grade (e.g. A, B+)"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      )}

      {/* Diploma Section */}
      {watch("academicDetails.nextQualification") === "diploma" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Diploma</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="academicDetails.diploma.collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Diploma College Name <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your Diploma College" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter diploma college name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.diploma.stream"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Diploma Stream <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your Diploma Stream" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter stream/trade"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.diploma.yearOfPassing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Year of Passing <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the year when you have completed your Diploma" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{yearOptions}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="academicDetails.diploma.marksType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Marks Type <span className="text-red-500">*</span>
                    <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marks type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="cgpa">CGPA</SelectItem>
                      <SelectItem value="grade">Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watch("academicDetails.diploma.marksType") === "percentage" && (
              <FormField
                control={control}
                name="academicDetails.diploma.percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Percentage <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter percentage"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.diploma.marksType") === "cgpa" && (
              <FormField
                control={control}
                name="academicDetails.diploma.cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CGPA <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter CGPA" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.diploma.marksType") === "grade" && (
              <FormField
                control={control}
                name="academicDetails.diploma.grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Grade <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your marks in Grade" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Grade (e.g. A, B+)"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      )}

      {/* ITI Section */}
      {watch("academicDetails.nextQualification") === "iti" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ITI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="academicDetails.iti.instituteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ITI Institute Name <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your ITI Institute" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter ITI institute name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.iti.trade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Trade <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your ITI Trade" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter trade name" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.iti.yearOfPassing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Year of Passing <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the year when you have completed your ITI" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{yearOptions}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           

            <FormField
              control={control}
              name="academicDetails.iti.marksType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Marks Type <span className="text-red-500">*</span>
                    <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marks type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="cgpa">CGPA</SelectItem>
                      <SelectItem value="grade">Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watch("academicDetails.iti.marksType") === "percentage" && (
              <FormField
                control={control}
                name="academicDetails.iti.percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Percentage <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter percentage"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.iti.marksType") === "cgpa" && (
              <FormField
                control={control}
                name="academicDetails.iti.cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CGPA <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter CGPA" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.iti.marksType") === "grade" && (
              <FormField
                control={control}
                name="academicDetails.iti.grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Grade <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your Marks in Grade" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Grade (e.g. A, B+)"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      )}

      {/* Undergraduate (UG) */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Undergraduate (UG)</h3>

        {/* Pursuing vs Passed Out */}
        <FormField
          control={control}
          name="academicDetails.undergraduate.status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Status <span className="text-red-500">*</span>
                <InfoTooltip text="Enter whether you're pursuing UG or Graduated" />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pursuing">Pursuing</SelectItem>
                  <SelectItem value="passed">Passed Out</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passed Out Fields */}
        {watch("academicDetails.undergraduate.status") === "passed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="academicDetails.undergraduate.collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    College Name <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your college from where you've done your Undergraduation" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter college name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.undergraduate.university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    University <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the name of your University from where you've done your Undergraduation" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter university name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.undergraduate.yearOfPassing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Year of Passing <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter the year when you've completed your Undergraduation" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{yearOptions}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marks Type Selector */}
            <FormField
              control={control}
              name="academicDetails.undergraduate.marksType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Marks Type <span className="text-red-500">*</span>
                    <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marks type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="cgpa">CGPA</SelectItem>
                      <SelectItem value="grade">Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Inputs */}
            {watch("academicDetails.undergraduate.marksType") ===
              "percentage" && (
              <FormField
                control={control}
                name="academicDetails.undergraduate.percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Percentage <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your marks in percentage" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter percentage"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.undergraduate.marksType") === "cgpa" && (
              <FormField
                control={control}
                name="academicDetails.undergraduate.cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      CGPA <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your marks in CGPA" />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter CGPA" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.undergraduate.marksType") === "grade" && (
              <FormField
                control={control}
                name="academicDetails.undergraduate.grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Grade <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your marks in Grade" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Grade (e.g. A, B+)"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

          </div>
        )}

        {/* Pursuing Fields */}
        {watch("academicDetails.undergraduate.status") === "pursuing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="academicDetails.undergraduate.collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name <span className="text-red-500"> *</span></FormLabel>
                  <InfoTooltip text="Enter your College Name in which you're studying" />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter college name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.undergraduate.university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    University <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter your University Name in which you're studying" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter university name"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.undergraduate.branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Branch <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter your Branch Name in which you're studying" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="E.g. Computer Science"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.undergraduate.currentYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current Year <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter your current College Year in which you're studying (e.g. - 3rd Year)" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E.g. 3rd Year" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="academicDetails.undergraduate.currentSem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current Semester <span className="text-red-500">*</span>
                    <InfoTooltip text="Enter your current College Semester in which you're studying (e.g. - 6th Semester)" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="E.g. 6th Semester"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Marks Type Selector */}
            <FormField
              control={control}
              name="academicDetails.undergraduate.currentMarksType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current Marks Type <span className="text-red-500">*</span>
                    <InfoTooltip text="Select your current marks (according to your Marksheet)" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marks type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="cgpa">CGPA</SelectItem>
                      <SelectItem value="grade">Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Input based on Marks Type */}
            {watch("academicDetails.undergraduate.currentMarksType") ===
              "percentage" && (
              <FormField
                control={control}
                name="academicDetails.undergraduate.currentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Percentage <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your current marks in Percentage" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter percentage"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.undergraduate.currentMarksType") ===
              "cgpa" && (
              <FormField
                control={control}
                name="academicDetails.undergraduate.currentCgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current CGPA <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your current marks in CGPA" />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter CGPA" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watch("academicDetails.undergraduate.currentMarksType") ===
              "grade" && (
              <FormField
                control={control}
                name="academicDetails.undergraduate.currentGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Grade <span className="text-red-500">*</span>
                      <InfoTooltip text="Enter your current marks in Grade" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Grade (e.g. A, B+)"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={control}
              name="academicDetails.undergraduate.backlogs"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel>Any Backlogs?
                    <InfoTooltip text="Switch it on if you've any backlogs, else keep it off" />
                  </FormLabel>
                 
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
