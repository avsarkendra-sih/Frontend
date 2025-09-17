export type FormStep = 'personal-information' | 'academic-details' | 'skills-projects-certifications' | 'uploads' | 'preferences-career-interests' | 'summary';
export type FormData = {
  personalInfo: {
    fullName: string;
    email: string;
    gender: string;
    dateOfBirth: Date | null;
    mobileNumber: string;
    altMobileNumber: string;
    linkedinUrl: string;
    githubUrl: string;
    permanentAddress: string;
    permanentPincode: string;
    currentAddress: string;
    currentPincode: string;
    sameAsPermanent: boolean;
    category: string;
    hasDisablity: boolean;
  };
  academicDetails: {
    tenth: {
      schoolName: string;
      board: string;
      yearOfPassing: string;
      percentage: string;
    };
    twelfth: {
      schoolName: string;
      board: string;
      yearOfPassing: string;
      percentage: string;
    };
    undergraduate: {
      collegeName: string;
      university: string;
      branch: string;
      currentYearSem: string;
      cgpaPercentage: string;
      backlogs: boolean;
    };
    postgraduate: {
      collegeName: string;
      branch: string;
      cgpaPercentage: string;
    };
    otherCourses: Array<{
      id: string;
      title: string;
      institution: string;
      duration: string;
    }>;
  };
  skillsProjectsCertifications: {
    skills: {
      technical: string[];
      softSkills: string[];
      languages: string[];
      tools: string[];
    };
    certifications: Array<{
      id: string;
      title: string;
      startDate: Date | null;
      endDate: Date | null;
      file: File | null;
    }>;
    projects: Array<{
      id: string;
      title: string;
      description: string;
      techStack: string[];
      duration: string;
    }>;
    achievements: Array<{
      id: string;
      description: string;
    }>;
  };
  uploads: {
    profilePhoto: File | null;
    signature: File | null;
    tenthMarksheet: File | null;
    twelfthMarksheet: File | null;
    collegeIdCard: File | null;
    collegeDegree: File | null;
  };
  preferencesCareerInterests: {
    internshipType: string;
    preferredLocation: string;
    sectorsOfInterest: string[];
    languagesKnown: string[];
    willingToRelocate: boolean;
  };
};