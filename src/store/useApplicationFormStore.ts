// src/store/useApplicationFormStore.ts
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type PersonalInfo = {
  fullName: string;
  email: string;
  gender: string;
  dateOfBirth: Date | null;
  mobileNumber: string;
  alternativeNumber: string;
  linkedinProfile: string;
  githubProfile: string;
  permanentAddress: string;
  permanentPincode: string;
  currentAddress: string;
  currentPincode: string;
  sameAsPermanent: boolean;
  category: string;
  disabilityStatus: boolean;
};
type TenthDetails = {
  schoolName: string;
  board: string;
  yearOfPassing: string;
  marksType: string;
  percentage?: string;
  cgpa?: string;
  grade?: string;
};

type TwelfthDetails = {
  schoolName: string;
  board: string;
  yearOfPassing: string;
  percentage: string;
};
type DiplomaDetails = {
  collegeName: string;
  stream: string;
  yearOfPassing: string;
  percentage: string;
};
type ITIDetails = {
  instituteName: string;
  trade: string;
  yearOfPassing: string;
  percentage: string;
};
type UndergraduateDetails = {
  status: string;
  collegeName: string;
  university: string;
  branch: string;
  yearOfPassing?: string;
  currentYear?: string;
  currentSem?: string;
  marksType?: string;
  percentage?: string;
  cgpa?: string;
  grade?: string;
  currentMarksType?: string;
  currentPercentage?: string;
  currentCgpa?: string;
  currentGrade?: string;
  backlogs: boolean;
};
type PostgraduateDetails = {
  collegeName: string;
  branch: string;
  cgpaPercentage: string;
};

type OtherCourse = {
  id: string;
  title: string;
  institution: string;
  duration: string;
};
type AcademicDetails = {
  nextQualification: string;
  tenth: TenthDetails;
  twelfth: TwelfthDetails;
  diploma: DiplomaDetails;
  iti: ITIDetails;
  undergraduate: UndergraduateDetails;
  postgraduate: PostgraduateDetails;
  otherCourses: OtherCourse[];
};


type SkillProject = {
  skills: string[];
  projects: { title: string; description: string }[];
  certifications?: { id: string; title: string; startDate: Date | null; endDate: Date | null; file: File | null }[];
  achievements?: string[];
};

type Documents = {
  resume: File | null;
  coverLetter: File | null;
};

type CityPreferences = {
  preferredCities: string[];
};

type ApplicationFormState = {
  personalInfo: PersonalInfo;
  academicDetails: AcademicDetails;
  skillsProjects: SkillProject;
  documents: Documents;
  cityPreferences: CityPreferences;

  // Actions
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setAcademicDetails: (aca: Partial<AcademicDetails>) => void;
  setSkillsProjects: (skills: Partial<SkillProject>) => void;
  setDocuments: (docs: Partial<Documents>) => void;
  setCityPreferences: (prefs: Partial<CityPreferences>) => void;

  //helper function use kiye hai
  setSameAsPermanent: (same: boolean) => void;
  
  addOtherCourse: () => void;
  removeOtherCourse: (id: string) => void;
  updateOtherCourse: (id: string, updates: Partial<OtherCourse>) => void;

  resetForm: () => void;
};

export const useApplicationFormStore = create<ApplicationFormState>((set,get) => ({
   personalInfo: {
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: null,
    mobileNumber: "",
    alternativeNumber: "",
    linkedinProfile: "",
    githubProfile: "",
    permanentAddress: "",
    permanentPincode: "",
    currentAddress: "",
    currentPincode: "",
    sameAsPermanent: false,
    category: "",
    disabilityStatus: false,
  },
   academicDetails: {
    nextQualification: "",
    tenth: {
      schoolName: "",
      board: "",
      yearOfPassing: "",
      marksType: "",
      percentage: "",
      cgpa: "",
      grade: ""
    },
    twelfth: {
      schoolName: "",
      board: "",
      yearOfPassing: "",
      percentage: ""
    },
    diploma: {
      collegeName: "",
      stream: "",
      yearOfPassing: "",
      percentage: ""
    },
    iti: {
      instituteName: "",
      trade: "",
      yearOfPassing: "",
      percentage: ""
    },
    undergraduate: {
      status: "",
      collegeName: "",
      university: "",
      branch: "",
      yearOfPassing: "",
      currentYear: "",
      currentSem: "",
      marksType: "",
      percentage: "",
      cgpa: "",
      grade: "",
      currentMarksType: "",
      currentPercentage: "",
      currentCgpa: "",
      currentGrade: "",
      backlogs: false
    },
    postgraduate: {
      collegeName: "",
      branch: "",
      cgpaPercentage: ""
    },
    otherCourses: []
  },

  skillsProjects: {
    skills: [],
    projects: [],
    certifications:[],
    achievements:[],
  },
  documents: {
    resume: null,
    coverLetter: null,
  },
  cityPreferences: {
    preferredCities: [],
  },

  // Actions
  setPersonalInfo: (info) =>
    set((state) => ({ personalInfo: { ...state.personalInfo, ...info } })),

  setSameAsPermanent: (same) =>
    set((state) => ({ 
      personalInfo: { 
        ...state.personalInfo, 
        sameAsPermanent: same,
        // If setting to same, copy permanent address to current address
        ...(same && {
          currentAddress: state.personalInfo.permanentAddress,
          currentPincode: state.personalInfo.permanentPincode
        })
    }
      })),
    
    
    setAcademicDetails: (academic) =>
    set((state) => ({ 
      academicDetails: { ...state.academicDetails, ...academic } 
    })),

  setSkillsProjects: (skills) =>
    set((state) => ({ skillsProjects: { ...state.skillsProjects, ...skills } })),

  setDocuments: (docs) =>
    set((state) => ({ documents: { ...state.documents, ...docs } })),

  setCityPreferences: (prefs) =>
    set((state) => ({
      cityPreferences: { ...state.cityPreferences, ...prefs },
    })),

    addOtherCourse: () =>
    set((state) => ({
      academicDetails: {
        ...state.academicDetails,
        otherCourses: [
          ...state.academicDetails.otherCourses,
          {
            id: uuidv4(),
            title: "",
            institution: "",
            duration: ""
          }
        ]
      }
    })),

  removeOtherCourse: (id) =>
    set((state) => ({
      academicDetails: {
        ...state.academicDetails,
        otherCourses: state.academicDetails.otherCourses.filter(
          (course) => course.id !== id
        )
      }
    })),

  updateOtherCourse: (id, updates) =>
    set((state) => ({
      academicDetails: {
        ...state.academicDetails,
        otherCourses: state.academicDetails.otherCourses.map((course) =>
          course.id === id ? { ...course, ...updates } : course
        )
      }
    })),

  resetForm: () =>
    set({
      personalInfo: {
     
        fullName: "",
        email: "",
        gender: "",
        dateOfBirth: null,
        mobileNumber: "",
        alternativeNumber: "",
        linkedinProfile: "",
        githubProfile: "",
        permanentAddress: "",
        permanentPincode: "",
        currentAddress: "",
        currentPincode: "",
        sameAsPermanent: false,
        category: "",
        disabilityStatus: false,

        },
      academicDetails: {
            nextQualification: "",
            tenth: {
            schoolName: "",
            board: "",
            yearOfPassing: "",
            marksType: "",
            percentage: "",
            cgpa: "",
            grade: ""
            },
            twelfth: {
            schoolName: "",
            board: "",
            yearOfPassing: "",
            percentage: ""
            },
            diploma: {
            collegeName: "",
            stream: "",
            yearOfPassing: "",
            percentage: ""
            },
            iti: {
            instituteName: "",
            trade: "",
            yearOfPassing: "",
            percentage: ""
            },
            undergraduate: {
            status: "",
            collegeName: "",
            university: "",
            branch: "",
            yearOfPassing: "",
            currentYear: "",
            currentSem: "",
            marksType: "",
            percentage: "",
            cgpa: "",
            grade: "",
            currentMarksType: "",
            currentPercentage: "",
            currentCgpa: "",
            currentGrade: "",
            backlogs: false
            },
            postgraduate: {
            collegeName: "",
            branch: "",
            cgpaPercentage: ""
            },
            otherCourses: []
        },
        
   
        
      skillsProjects: { skills: [], projects: [],achievements: [],certifications: [] },
      documents: { resume: null, coverLetter: null },
      cityPreferences: { preferredCities: [] },
    }),
}));