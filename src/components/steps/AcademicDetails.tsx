import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/f_form";
import { Input } from "../ui/f_input";
import { InfoTooltip } from "../InfoTooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/f_select";
import { useApplicationFormStore } from "@/store/useApplicationFormStore";

export function AcademicDetails() {
  const { academicDetails, setAcademicDetails } = useApplicationFormStore();
  const nextQualification = academicDetails.nextQualification;

  const yearOptions = Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return year.toString();
  });

  // Simplified handler for direct properties
  const handleInputChange = (field: string, value: any) => {
    setAcademicDetails({
      [field]: value
    });
  };

  // Correct handler for nested properties (e.g., tenth.schoolName)
  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setAcademicDetails({
      [section]: {
        ...academicDetails[section as keyof typeof academicDetails],
        [field]: value
      }
    });
  };

  // Handler for deeply nested properties (e.g., undergraduate.status)
  const handleDeepNestedInputChange = (parentSection: string, subSection: string, field: string, value: any) => {
    setAcademicDetails({
      [parentSection]: {
        ...academicDetails[parentSection as keyof typeof academicDetails],
        [subSection]: {
          ...academicDetails[parentSection as keyof typeof academicDetails][subSection as keyof object],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Academic Details</h2>
      
      {/* 10th Class */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">10th Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormItem>
            <FormLabel className="flex items-center">
              School Name <span className="text-red-500">*</span>
              <InfoTooltip text="Enter the name of your 10th class school" />
            </FormLabel>
            <FormControl>
              <Input
                value={academicDetails.tenth.schoolName}
                onChange={(e) => handleNestedInputChange("tenth", "schoolName", e.target.value)}
                placeholder="Enter school name"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          
          <FormItem>
            <FormLabel className="flex items-center">
              Board <span className="text-red-500">*</span>
              <InfoTooltip text="Select your 10th class education board" />
            </FormLabel>
            <Select
              value={academicDetails.tenth.board}
              onValueChange={(value) => handleNestedInputChange("tenth", "board", value)}
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
          
          <FormItem>
            <FormLabel className="flex items-center">
              Year of Passing <span className="text-red-500">*</span>
              <InfoTooltip text="Select the year you passed 10th class" />
            </FormLabel>
            <Select
              value={academicDetails.tenth.yearOfPassing}
              onValueChange={(value) => handleNestedInputChange("tenth", "yearOfPassing", value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>

          {/* Marks Type Selector */}
          <FormItem>
            <FormLabel>
              Marks Type <span className="text-red-500">*</span>
              <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
            </FormLabel>
            <Select
              value={academicDetails.tenth.marksType}
              onValueChange={(value) => handleNestedInputChange("tenth", "marksType", value)}
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

          {/* Conditionally show field based on marks type selection */}
          {academicDetails.tenth.marksType === "percentage" && (
            <FormItem>
              <FormLabel>
                Percentage <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  value={academicDetails.tenth.percentage || ""}
                  onChange={(e) => handleNestedInputChange("tenth", "percentage", e.target.value)}
                  placeholder="Enter percentage"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

          {academicDetails.tenth.marksType === "cgpa" && (
            <FormItem>
              <FormLabel>
                CGPA <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  value={academicDetails.tenth.cgpa || ""}
                  onChange={(e) => handleNestedInputChange("tenth", "cgpa", e.target.value)}
                  placeholder="Enter CGPA"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

          {academicDetails.tenth.marksType === "grade" && (
            <FormItem>
              <FormLabel>
                Grade <span className="text-red-500">*</span>
                <InfoTooltip text="Enter your Marks in Grade" />
              </FormLabel>
              <FormControl>
                <Input
                  value={academicDetails.tenth.grade || ""}
                  onChange={(e) => handleNestedInputChange("tenth", "grade", e.target.value)}
                  placeholder="Enter Grade (e.g. A, B+)"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        </div>
      </div>

      {/* Next Qualification */}
      <FormItem>
        <FormLabel>
          Next Qualification <span className="text-red-500">*</span>
        </FormLabel>
        <Select
          value={academicDetails.nextQualification}
          onValueChange={(value) => handleInputChange("nextQualification", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iti">ITI</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
            <SelectItem value="12th">12th</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>

      {/* 12th Section */}
      {academicDetails.nextQualification === "12th" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">12th Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>
                School/College Name <span className="text-red-500">*</span>
                <InfoTooltip text="Enter the name of your 12th class school" />
              </FormLabel>
              <FormControl>
                <Input
                  value={academicDetails.twelfth.schoolName}
                  onChange={(e) => handleNestedInputChange("twelfth", "schoolName", e.target.value)}
                  placeholder="Enter school/college name"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
            <FormItem>
              <FormLabel>
                Board <span className="text-red-500">*</span>
                <InfoTooltip text="Select your 12th class education board" />
              </FormLabel>
              <Select
                value={academicDetails.twelfth.board}
                onValueChange={(value) => handleNestedInputChange("twelfth", "board", value)}
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
            
            <FormItem>
              <FormLabel>
                Year of Passing <span className="text-red-500">*</span>
                <InfoTooltip text="Enter the year when you've completed your 12th" />
              </FormLabel>
              <Select
                value={academicDetails.twelfth.yearOfPassing}
                onValueChange={(value) => handleNestedInputChange("twelfth", "yearOfPassing", value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>
                Marks Type <span className="text-red-500">*</span>
                <InfoTooltip text="Select the Marks Type (according to your marksheet)" />
              </FormLabel>
              <Select
                value={academicDetails.twelfth.marksType}
                onValueChange={(value) => handleNestedInputChange("twelfth", "marksType", value)}
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

            {academicDetails.twelfth.marksType === "percentage" && (
              <FormItem>
                <FormLabel>
                  Percentage <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    value={academicDetails.twelfth.percentage || ""}
                    onChange={(e) => handleNestedInputChange("twelfth", "percentage", e.target.value)}
                    placeholder="Enter percentage"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

            {academicDetails.twelfth.marksType === "cgpa" && (
              <FormItem>
                <FormLabel>
                  CGPA <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    value={academicDetails.twelfth.cgpa || ""}
                    onChange={(e) => handleNestedInputChange("twelfth", "cgpa", e.target.value)}
                    placeholder="Enter CGPA"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}

            {academicDetails.twelfth.marksType === "grade" && (
              <FormItem>
                <FormLabel>
                  Grade <span className="text-red-500">*</span>
                  <InfoTooltip text="Enter your Marks in Grade" />
                </FormLabel>
                <FormControl>
                  <Input
                    value={academicDetails.twelfth.grade || ""}
                    onChange={(e) => handleNestedInputChange("twelfth", "grade", e.target.value)}
                    placeholder="Enter Grade (e.g. A, B+)"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          </div>
        </div>
      )}

      {/* Undergraduate (UG) Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Undergraduate (UG)</h3>

        {/* Pursuing vs Passed Out */}
        <FormItem>
          <FormLabel>
            Status <span className="text-red-500">*</span>
            <InfoTooltip text="Enter whether you're pursuing UG or Graduated" />
          </FormLabel>
          <Select
            value={academicDetails.undergraduate.status}
            onValueChange={(value) => handleDeepNestedInputChange("undergraduate", "undergraduate", "status", value)}
          >
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

        {/* Add more undergraduate fields here following the same pattern */}
      </div>
    </div>
  );
}