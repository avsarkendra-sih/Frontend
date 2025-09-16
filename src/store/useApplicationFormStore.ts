// src/store/useApplicationFormStore.ts
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// Update your types to match what Summary component expects
type PersonalInfo = {
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
  hasDisability: boolean;
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
  marksType: string;
  percentage?: string;
  cgpa?: string;
  grade?: string;
};

type DiplomaDetails = {
  collegeName: string;
  stream: string;
  yearOfPassing: string;
  marksType: string;
  percentage?: string;
  cgpa?: string;
  grade?: string;
};

type ITIDetails = {
  instituteName: string;
  trade: string;
  yearOfPassing: string;
  marksType: string;
  percentage?: string;
  cgpa?: string;
  grade?: string;
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
  // Add field that Summary component expects
  currentYearSem?: string;
  cgpaPercentage?: string;
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

// Update SkillProject to match Summary component expectations
type SkillProject = {
  skills: {
    technical: string[];
    softSkills: string[];
    languages: string[];
    tools: string[];
  };
  projects: { 
    id: string;
    title: string; 
    description: string;
    techStack: string[];
    duration: string;
  }[];
  certifications: { 
    id: string; 
    title: string; 
    startDate: Date | null; 
    endDate: Date | null; 
    file: File | null;
    type?: string;
  }[];
  achievements: {
    id: string;
    description: string;
  }[];
};

// Update Documents to match Summary component expectations
type Uploads = {
  profilePhoto: File | null;
  signature: File | null;
  tenthMarksheet: File | null;
  twelfthMarksheet: File | null;
  collegeIdCard: File | null;
  collegeDegree: File | null;
};

// Add Preferences type that Summary component expects
type PreferencesCareerInterests = {
  internshipType: string[];
  preferredLocation: string[];
  sectorsOfInterest: string[];
  languagesKnown: string[];
  willingToRelocate: boolean;
};

type CityPreferences = {
  preferredCities: string[];
};

type ApplicationFormState = {
  personalInfo: PersonalInfo;
  academicDetails: AcademicDetails;
  skillsProjects: SkillProject;
  uploads: Uploads; // Changed from documents to uploads
  cityPreferences: CityPreferences;
  preferencesCareerInterests: PreferencesCareerInterests; // Added this

  // Actions
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setAcademicDetails: (aca: Partial<AcademicDetails>) => void;
  setSkillsProjects: (skills: Partial<SkillProject>) => void;
  setUploads: (uploads: Partial<Uploads>) => void; // Changed from setDocuments
  setCityPreferences: (prefs: Partial<CityPreferences>) => void;
  setPreferencesCareerInterests: (prefs: Partial<PreferencesCareerInterests>) => void; // Added this

  // Helper functions
  setSameAsPermanent: (same: boolean) => void;
  
  addOtherCourse: () => void;
  removeOtherCourse: (id: string) => void;
  updateOtherCourse: (id: string, updates: Partial<OtherCourse>) => void;

  resetForm: () => void;
};

export const useApplicationFormStore = create<ApplicationFormState>((set) => ({
  personalInfo: {
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: null,
    mobileNumber: "",
    altMobileNumber: "",
    linkedinUrl: "",
    githubUrl: "",
    permanentAddress: "",
    permanentPincode: "",
    currentAddress: "",
    currentPincode: "",
    sameAsPermanent: false,
    category: "",
    hasDisability: false,
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
      marksType: "",
      percentage: "",
      cgpa: "",
      grade: ""
    },
    diploma: {
      collegeName: "",
      stream: "",
      yearOfPassing: "",
      marksType: "",
      percentage: "",
      cgpa: "",
      grade: ""
    },
    iti: {
      instituteName: "",
      trade: "",
      yearOfPassing: "",
      marksType: "",
      percentage: "",
      cgpa: "",
      grade: ""
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
      backlogs: false,
      currentYearSem: "",
      cgpaPercentage: ""
    },
    postgraduate: {
      collegeName: "",
      branch: "",
      cgpaPercentage: ""
    },
    otherCourses: []
  },

  skillsProjects: {
    skills: {
      technical: [],
      softSkills: [],
      languages: [],
      tools: []
    },
    projects: [],
    certifications: [],
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

  cityPreferences: {
    preferredCities: []
  },

  preferencesCareerInterests: {
    internshipType: [],
    preferredLocation: [],
    sectorsOfInterest: [],
    languagesKnown: [],
    willingToRelocate: false
  },

  // Actions
  setPersonalInfo: (info) =>
    set((state) => {
      console.log("setPersonalInfo called with:", info);
      
      // Check if any values actually changed
      const changedKeys = Object.keys(info).filter(key => {
        const stateValue = state.personalInfo[key as keyof PersonalInfo];
        const newValue = info[key as keyof PersonalInfo];
        
        // Special handling for Date objects
        if (stateValue instanceof Date && newValue instanceof Date) {
          return stateValue.getTime() !== newValue.getTime();
        }
        
        return stateValue !== newValue;
      });
      
      if (changedKeys.length === 0) {
        console.log("No changes detected in personalInfo, skipping update");
        return state;
      }
      
      console.log("Updating personalInfo fields:", changedKeys);
      return { personalInfo: { ...state.personalInfo, ...info } };
    }),

  setSameAsPermanent: (same) =>
    set((state) => {
      console.log("setSameAsPermanent called with:", same);
      
      // Check if value actually changed
      if (state.personalInfo.sameAsPermanent === same) {
        console.log("sameAsPermanent value unchanged, skipping update");
        return state;
      }
      
      const updates: Partial<PersonalInfo> = { sameAsPermanent: same };
      
      // Only update addresses if setting to same AND addresses are different
      if (same) {
        if (state.personalInfo.currentAddress !== state.personalInfo.permanentAddress ||
            state.personalInfo.currentPincode !== state.personalInfo.permanentPincode) {
          updates.currentAddress = state.personalInfo.permanentAddress;
          updates.currentPincode = state.personalInfo.permanentPincode;
          console.log("Copying permanent address to current address");
        }
      }
      
      return { personalInfo: { ...state.personalInfo, ...updates } };
    }),

  setAcademicDetails: (academic) =>
    set((state) => {
      console.log("setAcademicDetails called with:", academic);
      
      // Check if any values actually changed
      const changedKeys = Object.keys(academic).filter(key => {
        const stateValue = state.academicDetails[key as keyof AcademicDetails];
        const newValue = academic[key as keyof AcademicDetails];
        
        // Handle nested objects and arrays
        if (typeof stateValue === 'object' && stateValue !== null && typeof newValue === 'object' && newValue !== null) {
          return JSON.stringify(stateValue) !== JSON.stringify(newValue);
        }
        
        return stateValue !== newValue;
      });
      
      if (changedKeys.length === 0) {
        console.log("No changes detected in academicDetails, skipping update");
        return state;
      }
      
      console.log("Updating academicDetails fields:", changedKeys);
      return { academicDetails: { ...state.academicDetails, ...academic } };
    }),

  setSkillsProjects: (skills) =>
    set((state) => {
      console.log("setSkillsProjects called with:", skills);
      
      // Check if any values actually changed
      const changedKeys = Object.keys(skills).filter(key => {
        const stateValue = state.skillsProjects[key as keyof SkillProject];
        const newValue = skills[key as keyof SkillProject];
        
        if (Array.isArray(stateValue) && Array.isArray(newValue)) {
          return JSON.stringify(stateValue) !== JSON.stringify(newValue);
        }
        
        if (typeof stateValue === 'object' && stateValue !== null && typeof newValue === 'object' && newValue !== null) {
          return JSON.stringify(stateValue) !== JSON.stringify(newValue);
        }
        
        return stateValue !== newValue;
      });
      
      if (changedKeys.length === 0) {
        console.log("No changes detected in skillsProjects, skipping update");
        return state;
      }
      
      console.log("Updating skillsProjects fields:", changedKeys);
      return { skillsProjects: { ...state.skillsProjects, ...skills } };
    }),

  setUploads: (uploads) =>
    set((state) => {
      console.log("setUploads called with:", uploads);
      
      // Check if any values actually changed
      const changedKeys = Object.keys(uploads).filter(key => {
        const stateValue = state.uploads[key as keyof Uploads];
        const newValue = uploads[key as keyof Uploads];
        return stateValue !== newValue;
      });
      
      if (changedKeys.length === 0) {
        console.log("No changes detected in uploads, skipping update");
        return state;
      }
      
      console.log("Updating uploads fields:", changedKeys);
      return { uploads: { ...state.uploads, ...uploads } };
    }),

  setCityPreferences: (prefs) =>
    set((state) => {
      console.log("setCityPreferences called with:", prefs);
      
      // Check if any values actually changed
      const changedKeys = Object.keys(prefs).filter(key => {
        const stateValue = state.cityPreferences[key as keyof CityPreferences];
        const newValue = prefs[key as keyof CityPreferences];
        
        if (Array.isArray(stateValue) && Array.isArray(newValue)) {
          return JSON.stringify(stateValue) !== JSON.stringify(newValue);
        }
        
        return stateValue !== newValue;
      });
      
      if (changedKeys.length === 0) {
        console.log("No changes detected in cityPreferences, skipping update");
        return state;
      }
      
      console.log("Updating cityPreferences fields:", changedKeys);
      return { cityPreferences: { ...state.cityPreferences, ...prefs } };
    }),

  setPreferencesCareerInterests: (prefs) =>
    set((state) => {
      console.log("setPreferencesCareerInterests called with:", prefs);
      
      // Check if any values actually changed
      const changedKeys = Object.keys(prefs).filter(key => {
        const stateValue = state.preferencesCareerInterests[key as keyof PreferencesCareerInterests];
        const newValue = prefs[key as keyof PreferencesCareerInterests];
        
        if (Array.isArray(stateValue) && Array.isArray(newValue)) {
          return JSON.stringify(stateValue) !== JSON.stringify(newValue);
        }
        
        return stateValue !== newValue;
      });
      
      if (changedKeys.length === 0) {
        console.log("No changes detected in preferencesCareerInterests, skipping update");
        return state;
      }
      
      console.log("Updating preferencesCareerInterests fields:", changedKeys);
      return { preferencesCareerInterests: { ...state.preferencesCareerInterests, ...prefs } };
    }),

  addOtherCourse: () =>
    set((state) => {
      console.log("addOtherCourse called");
      const newCourse = {
        id: uuidv4(),
        title: "",
        institution: "",
        duration: ""
      };
      
      return {
        academicDetails: {
          ...state.academicDetails,
          otherCourses: [...state.academicDetails.otherCourses, newCourse]
        }
      };
    }),

  removeOtherCourse: (id) =>
    set((state) => {
      console.log("removeOtherCourse called with id:", id);
      const newCourses = state.academicDetails.otherCourses.filter(course => course.id !== id);
      
      // Only update if something actually changed
      if (newCourses.length === state.academicDetails.otherCourses.length) {
        console.log("Course not found, skipping update");
        return state;
      }
      
      return {
        academicDetails: {
          ...state.academicDetails,
          otherCourses: newCourses
        }
      };
    }),

  updateOtherCourse: (id, updates) =>
    set((state) => {
      console.log("updateOtherCourse called with id:", id, "updates:", updates);
      
      const updatedCourses = state.academicDetails.otherCourses.map((course) => {
        if (course.id === id) {
          // Check if any values actually changed
          const hasChanges = Object.keys(updates).some(
            key => course[key as keyof OtherCourse] !== updates[key as keyof OtherCourse]
          );
          
          if (!hasChanges) return course;
          
          return { ...course, ...updates };
        }
        return course;
      });
      
      // Check if any course was actually updated
      if (JSON.stringify(updatedCourses) === JSON.stringify(state.academicDetails.otherCourses)) {
        console.log("No changes detected in otherCourses, skipping update");
        return state;
      }
      
      return {
        academicDetails: {
          ...state.academicDetails,
          otherCourses: updatedCourses
        }
      };
    }),

  resetForm: () =>
    set(() => {
      console.log("resetForm called");
      return {
        personalInfo: {
          fullName: "",
          email: "",
          gender: "",
          dateOfBirth: null,
          mobileNumber: "",
          altMobileNumber: "",
          linkedinUrl: "",
          githubUrl: "",
          permanentAddress: "",
          permanentPincode: "",
          currentAddress: "",
          currentPincode: "",
          sameAsPermanent: false,
          category: "",
          hasDisability: false,
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
            marksType: "",
            percentage: "",
            cgpa: "",
            grade: ""
          },
          diploma: {
            collegeName: "",
            stream: "",
            yearOfPassing: "",
            marksType: "",
            percentage: "",
            cgpa: "",
            grade: ""
          },
          iti: {
            instituteName: "",
            trade: "",
            yearOfPassing: "",
            marksType: "",
            percentage: "",
            cgpa: "",
            grade: ""
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
            backlogs: false,
            currentYearSem: "",
            cgpaPercentage: ""
          },
          postgraduate: {
            collegeName: "",
            branch: "",
            cgpaPercentage: ""
          },
          otherCourses: []
        },
        skillsProjects: {
          skills: {
            technical: [],
            softSkills: [],
            languages: [],
            tools: []
          },
          projects: [],
          certifications: [],
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
        cityPreferences:{
          preferredCities :[]
        },
        preferencesCareerInterests: {
        internshipType: [],
        preferredLocation: [],
        sectorsOfInterest: [],
        languagesKnown: [],
        willingToRelocate: false
        },

      };
    }),

}));      