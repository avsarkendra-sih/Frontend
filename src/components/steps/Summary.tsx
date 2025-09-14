import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/f_card';
import { Badge } from '../ui/f_badge';
import { FormData } from '../../lib/types';
interface SummaryProps {
  formData: FormData;
}
export function Summary({
  formData
}: SummaryProps) {
  const {
    personalInfo,
    academicDetails,
    skillsProjectsCertifications,
    uploads,
    preferencesCareerInterests
  } = formData;
  // Helper function to format dates
  const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified';
    return format(new Date(date), 'MMM dd, yyyy');
  };
  // Helper function to display file names
  const getFileName = (file: File | null) => {
    if (!file) return 'Not uploaded';
    return file.name;
  };
  return <div className="space-y-6">
      <div className="bg-primary/10 p-4 rounded-md text-center">
        <h2 className="text-xl font-semibold">Application Summary</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please review all information before final submission
        </p>
      </div>
      {/* Personal Information */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Full Name</p>
              <p>{personalInfo.fullName}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Email</p>
              <p>{personalInfo.email}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Gender</p>
              <p className="capitalize">
                {personalInfo.gender || 'Not specified'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Date of Birth</p>
              <p>{formatDate(personalInfo.dateOfBirth)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Mobile Number</p>
              <p>{personalInfo.mobileNumber || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Alternative Contact</p>
              <p>{personalInfo.alternativeNumber || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">LinkedIn</p>
              <p>{personalInfo.linkedinProfile || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">GitHub</p>
              <p>{personalInfo.githubProfile || 'Not specified'}</p>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="font-medium">Permanent Address</p>
              <p>
                {personalInfo.permanentAddress}, {personalInfo.permanentPincode}
              </p>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="font-medium">Current Address</p>
              <p>
                {personalInfo.sameAsPermanent ? 'Same as permanent address' : `${personalInfo.currentAddress}, ${personalInfo.currentPincode}`}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Category</p>
              <p className="capitalize">
                {personalInfo.category || 'Not specified'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Disability Status</p>
              <p>{personalInfo.disabilityStatus ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Academic Details */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Academic Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">10th Class</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">School Name</p>
                  <p>{academicDetails.tenth.schoolName || 'Not specified'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Board</p>
                  <p className="uppercase">
                    {academicDetails.tenth.board || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Year of Passing</p>
                  <p>
                    {academicDetails.tenth.yearOfPassing || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Percentage/CGPA</p>
                  <p>{academicDetails.tenth.percentage || 'Not specified'}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">12th Class / Diploma</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">School/College Name</p>
                  <p>{academicDetails.twelfth.schoolName || 'Not specified'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Board</p>
                  <p className="uppercase">
                    {academicDetails.twelfth.board || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Year of Passing</p>
                  <p>
                    {academicDetails.twelfth.yearOfPassing || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Percentage/CGPA</p>
                  <p>{academicDetails.twelfth.percentage || 'Not specified'}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Undergraduate (UG)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">College Name</p>
                  <p>
                    {academicDetails.undergraduate.collegeName || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">University</p>
                  <p>
                    {academicDetails.undergraduate.university || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Branch</p>
                  <p>
                    {academicDetails.undergraduate.branch || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Current Year/Semester</p>
                  <p>
                    {academicDetails.undergraduate.currentYearSem || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">CGPA/Percentage</p>
                  <p>
                    {academicDetails.undergraduate.cgpaPercentage || 'Not specified'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Backlogs</p>
                  <p>{academicDetails.undergraduate.backlogs ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            {academicDetails.postgraduate.collegeName && <div>
                <h3 className="font-medium mb-2">Postgraduate (PG)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">College Name</p>
                    <p>{academicDetails.postgraduate.collegeName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Branch</p>
                    <p>
                      {academicDetails.postgraduate.branch || 'Not specified'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">CGPA/Percentage</p>
                    <p>
                      {academicDetails.postgraduate.cgpaPercentage || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>}
            {academicDetails.otherCourses.length > 0 && <div>
                <h3 className="font-medium mb-2">Other Courses / Trainings</h3>
                <div className="space-y-2 text-sm">
                  {academicDetails.otherCourses.map((course, index) => <div key={course.id} className="p-2 border rounded-md">
                      <p className="font-medium">{course.title}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                        <p>Institution: {course.institution}</p>
                        <p>Duration: {course.duration}</p>
                      </div>
                    </div>)}
                </div>
              </div>}
          </div>
        </CardContent>
      </Card>
      {/* Skills & Projects */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">
            Skills, Projects & Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Skills</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Technical Skills
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillsProjectsCertifications.skills.technical?.map(skill => <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>)}
                    {!skillsProjectsCertifications.skills.technical?.length && <span className="text-sm text-muted-foreground">
                        None specified
                      </span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Soft Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillsProjectsCertifications.skills.softSkills?.map(skill => <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>)}
                    {!skillsProjectsCertifications.skills.softSkills?.length && <span className="text-sm text-muted-foreground">
                        None specified
                      </span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillsProjectsCertifications.skills.languages?.map(lang => <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>)}
                    {!skillsProjectsCertifications.skills.languages?.length && <span className="text-sm text-muted-foreground">
                        None specified
                      </span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tools</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillsProjectsCertifications.skills.tools?.map(tool => <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>)}
                    {!skillsProjectsCertifications.skills.tools?.length && <span className="text-sm text-muted-foreground">
                        None specified
                      </span>}
                  </div>
                </div>
              </div>
            </div>
            {skillsProjectsCertifications.certifications.length > 0 && <div>
                <h3 className="font-medium mb-2">Certifications</h3>
                <div className="space-y-2 text-sm">
                  {skillsProjectsCertifications.certifications.map((cert, index) => <div key={cert.id} className="p-2 border rounded-md">
                        <p className="font-medium">{cert.title}</p>
                        <div className="text-muted-foreground">
                          Duration:{' '}
                          {cert.startDate ? formatDate(cert.startDate) : 'Not specified'}{' '}
                          -{' '}
                          {cert.endDate ? formatDate(cert.endDate) : 'Not specified'}
                        </div>
                        <div className="text-muted-foreground">
                          File: {cert.file ? cert.file.name : 'Not uploaded'}
                        </div>
                      </div>)}
                </div>
              </div>}
            {skillsProjectsCertifications.projects.length > 0 && <div>
                <h3 className="font-medium mb-2">Projects</h3>
                <div className="space-y-2 text-sm">
                  {skillsProjectsCertifications.projects.map((project, index) => <div key={project.id} className="p-2 border rounded-md">
                        <p className="font-medium">{project.title}</p>
                        <p className="mt-1">{project.description}</p>
                        <div className="mt-2">
                          <p className="text-muted-foreground">Tech Stack:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.techStack?.map(tech => <Badge key={tech} variant="outline">
                                {tech}
                              </Badge>)}
                          </div>
                        </div>
                        <p className="mt-2 text-muted-foreground">
                          Duration: {project.duration}
                        </p>
                      </div>)}
                </div>
              </div>}
            {skillsProjectsCertifications.achievements.length > 0 && <div>
                <h3 className="font-medium mb-2">Achievements</h3>
                <div className="space-y-2 text-sm">
                  {skillsProjectsCertifications.achievements.map((achievement, index) => <div key={achievement.id} className="p-2 border rounded-md">
                        <p>{achievement.description}</p>
                      </div>)}
                </div>
              </div>}
          </div>
        </CardContent>
      </Card>
      {/* Uploads */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">Document Uploads</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Profile Photo</p>
              <p>{getFileName(uploads.profilePhoto)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Signature</p>
              <p>{getFileName(uploads.signature)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">10th Marksheet</p>
              <p>{getFileName(uploads.tenthMarksheet)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">12th Marksheet</p>
              <p>{getFileName(uploads.twelfthMarksheet)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">College ID Card</p>
              <p>{getFileName(uploads.collegeIdCard)}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">College Degree</p>
              <p>{getFileName(uploads.collegeDegree)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Preferences */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">
            Preferences & Career Interests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Preferred Internship Type</p>
              <p className="capitalize">
                {preferencesCareerInterests.internshipType || 'Not specified'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Preferred Location</p>
              <p className="capitalize">
                {preferencesCareerInterests.preferredLocation || 'Not specified'}
              </p>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="font-medium">Sectors of Interest</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {preferencesCareerInterests.sectorsOfInterest?.map(sector => <Badge key={sector}>{sector}</Badge>)}
                {!preferencesCareerInterests.sectorsOfInterest?.length && <span className="text-muted-foreground">None specified</span>}
              </div>
            </div>
            <div className="col-span-2 space-y-1">
              <p className="font-medium">Languages Known</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {preferencesCareerInterests.languagesKnown?.map(language => <Badge key={language}>{language}</Badge>)}
                {!preferencesCareerInterests.languagesKnown?.length && <span className="text-muted-foreground">None specified</span>}
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Willing to Relocate</p>
              <p>
                {preferencesCareerInterests.willingToRelocate ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="bg-muted/40 p-4 rounded-md text-center">
        <p className="text-sm font-medium">
          Please review all information carefully before submitting your
          application.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          By submitting this application, you confirm that all information
          provided is accurate and complete.
        </p>
      </div>
    </div>;
}