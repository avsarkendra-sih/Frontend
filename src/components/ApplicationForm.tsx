import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/f_card';
import { Button } from './ui/f_button';
import { ThemeToggle } from './ThemeToggle';
import { Stepper } from './Stepper';
import { FormStep, FormData } from '../lib/types';
import { PersonalInformation } from './steps/PersonalInformation';
import { AcademicDetails } from './steps/AcademicDetails';
import { SkillsProjectsCertifications } from './steps/SkillsProjectsCertifications';
import { Uploads } from './steps/Uploads';
import { PreferencesCareerInterests } from './steps/PreferencesCareerInterests';
import { Summary } from './steps/Summary';
import { SaveIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Path } from "react-hook-form";
const STEPS = [{
  id: 'personal-information' as FormStep,
  label: 'Personal Info'
}, {
  id: 'academic-details' as FormStep,
  label: 'Academic Details'
}, {
  id: 'skills-projects-certifications' as FormStep,
  label: 'Skills & Projects'
}, {
  id: 'uploads' as FormStep,
  label: 'Uploads'
}, {
  id: 'preferences-career-interests' as FormStep,
  label: 'Preferences'
}, {
  id: 'summary' as FormStep,
  label: 'Summary'
}];
const DEFAULT_FORM_DATA: FormData = {
  personalInfo: {
    profilePhoto: null,
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    gender: '',
    dateOfBirth: null,
    mobileNumber: '',
    alternativeNumber: '',
    linkedinProfile: '',
    githubProfile: '',
    permanentAddress: '',
    permanentPincode: '',
    currentAddress: '',
    currentPincode: '',
    sameAsPermanent: false,
    category: '',
    disabilityStatus: false
  },
  academicDetails: {
    tenth: {
      schoolName: '',
      board: '',
      yearOfPassing: '',
      percentage: ''
    },
    twelfth: {
      schoolName: '',
      board: '',
      yearOfPassing: '',
      percentage: ''
    },
    undergraduate: {
      collegeName: '',
      university: '',
      branch: '',
      currentYearSem: '',
      cgpaPercentage: '',
      backlogs: false
    },
    postgraduate: {
      collegeName: '',
      branch: '',
      cgpaPercentage: ''
    },
    otherCourses: []
  },
  skillsProjectsCertifications: {
    skills: {
      technical: [],
      softSkills: [],
      languages: [],
      tools: []
    },
    certifications: [],
    projects: [],
    achievements: []
  },
  uploads: {
    profilePhoto: null,
    signature: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    collegeIdCard: null,
    collegeDegree: null
  },
  preferencesCareerInterests: {
    internshipType: '',
    preferredLocation: '',
    sectorsOfInterest: [],
    languagesKnown: [],
    willingToRelocate: false
  }
};
export function ApplicationForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('internship-application-data');
    return savedData ? JSON.parse(savedData) : DEFAULT_FORM_DATA;
  });
  const methods = useForm<FormData>({
    defaultValues: formData,
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const currentStep = STEPS[currentStepIndex].id;
  const saveProgress = () => {
    const currentFormData = methods.getValues();
    localStorage.setItem('internship-application-data', JSON.stringify(currentFormData));
    setFormData(currentFormData);
    // Show toast or notification
    alert('Your progress has been saved. You can continue later.');
  };
  const handleNext = async () => {
  let fieldsToValidate: Path<FormData>[] = [];

  if (currentStep === "personal-information") {
    fieldsToValidate = [
      "personalInfo.fullName",
      "personalInfo.mobileNumber",
      "personalInfo.gender",
      "personalInfo.dateOfBirth",
      "personalInfo.permanentAddress",
      "personalInfo.permanentPincode",
      "personalInfo.category",
      "personalInfo.disabilityStatus"
    ];
//   } else if (currentStep === "academic-details") {
//     fieldsToValidate = [
//       "academicDetails.tenth.schoolName",
//       "academicDetails.tenth.board",
//       "academicDetails.tenth.yearOfPassing",
//       "academicDetails.tenth.percentage"
//     ];
//   }
//   else if (currentStep === "preferences-career-interests") {
//   fieldsToValidate = [
//     "preferencesCareerInterests.careerGoal",
//     "preferencesCareerInterests.preferredLocation",
//     "preferencesCareerInterests.languagesKnown.0", // array fields ke liye example
//   ];
// } else if (currentStep === "skills-projects-certifications") {
//   fieldsToValidate = [
//     "skillsProjectsCertifications.technicalSkills.0",
//     "skillsProjectsCertifications.softSkills.0",
//     "skillsProjectsCertifications.projects.0.title",
//     "skillsProjectsCertifications.projects.0.description",
//   ];
// } else if (currentStep === "uploads") {
//   fieldsToValidate = [
//     "uploads.resume",
//     "uploads.profilePhoto"
//   ];
}

  const isValid = await methods.trigger(fieldsToValidate);
  if (isValid) {
    const updatedData = methods.getValues();
    setFormData(updatedData);
    localStorage.setItem("internship-application-data", JSON.stringify(updatedData));
    setCurrentStepIndex(prev => Math.min(prev + 1, STEPS.length - 1));
  }
};

  const handlePrevious = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  };
  const handleSubmit = () => {
    const finalData = methods.getValues();
    console.log('Form submitted:', finalData);
    // Here you would typically send the data to your backend
    alert('Application submitted successfully!');
    // Clear form data after submission
    localStorage.removeItem('internship-application-data');
    setFormData(DEFAULT_FORM_DATA);
    methods.reset(DEFAULT_FORM_DATA);
    setCurrentStepIndex(0);
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal-information':
        return <PersonalInformation />;
      case 'academic-details':
        return <AcademicDetails />;
      case 'skills-projects-certifications':
        return <SkillsProjectsCertifications />;
      case 'uploads':
        return <Uploads />;
      case 'preferences-career-interests':
        return <PreferencesCareerInterests />;
      case 'summary':
        return <Summary formData={formData} />;
      default:
        return null;
    }
  };
  return <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Internship Application Portal</h1>
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
          <CardDescription>
            Please complete all sections to submit your internship application
          </CardDescription>
          <Stepper currentStep={currentStepIndex} steps={STEPS} />
        </CardHeader>
        <FormProvider {...methods}>
          <form>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: -20
              }} transition={{
                duration: 0.3
              }} className="min-h-[400px]">
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStepIndex === 0}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="button" variant="outline" onClick={saveProgress}>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save & Continue Later
                </Button>
              </div>
              {currentStepIndex === STEPS.length - 1 ? <Button type="button" onClick={handleSubmit}>
                  Submit Application
                </Button> : <Button type="button" onClick={handleNext}>
                  Next
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>}
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>;
}