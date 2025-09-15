import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/f_form";
import { Input } from "../ui/f_input";
import { InfoTooltip } from "../InfoTooltip";
import { Card, CardContent } from "../ui/f_card";
import { FileIcon, ImageIcon, FileTextIcon } from "lucide-react";
import { useApplicationFormStore } from "@/store/useApplicationFormStore";

export function Uploads() {
  const { uploads, setUploads, academicDetails } = useApplicationFormStore();
  const status = academicDetails.undergraduate.status;

  // Function to render file preview
  const renderFilePreview = (file: File | null) => {
    if (!file) return null;
    
    // Check if it's an image file
    if (file.type.startsWith("image/")) {
      return (
        <div className="mt-2 rounded-md overflow-hidden border border-border">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-h-32 object-contain mx-auto"
          />
        </div>
      );
    }
    
    // For PDF or other files
    return (
      <div className="mt-2 p-3 rounded-md border border-border flex items-center gap-2 text-sm">
        {file.type === "application/pdf" ? (
          <FileTextIcon className="h-5 w-5 text-red-500" />
        ) : (
          <FileIcon className="h-5 w-5 text-blue-500" />
        )}
        <span className="truncate">{file.name}</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {(file.size / 1024).toFixed(1)} KB
        </span>
      </div>
    );
  };

  const handleFileUpload = (field: keyof typeof uploads, file: File | null) => {
    setUploads({ [field]: file });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Document Uploads</h2>
      <FormDescription>
        Please upload clear, legible copies of the following documents. Accepted
        formats: PDF, JPG, PNG.
      </FormDescription>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Photo */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <FormItem>
              <FormLabel className="flex items-center">
                Profile Photo <span className="text-red-500">*</span>
                <InfoTooltip text="Upload a recent passport-sized photo with clear face visibility" />
              </FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 transition-colors hover:border-primary/50">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="max-w-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileUpload("profilePhoto", file);
                    }}
                  />
                </div>
              </FormControl>
              {renderFilePreview(uploads.profilePhoto)}
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>

        {/* Signature */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <FormItem>
              <FormLabel className="flex items-center">
                Signature <span className="text-red-500">*</span>
                <InfoTooltip text="Upload a clear image of your signature on white background" />
              </FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 transition-colors hover:border-primary/50">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="max-w-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileUpload("signature", file);
                    }}
                  />
                </div>
              </FormControl>
              {renderFilePreview(uploads.signature)}
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>

        {/* 10th Marksheet */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <FormItem>
              <FormLabel className="flex items-center">
                10th Marksheet <span className="text-red-500">*</span>
                <InfoTooltip text="Upload your 10th class final marksheet or certificate" />
              </FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 transition-colors hover:border-primary/50">
                  <FileTextIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    PDF or Image files only
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="max-w-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileUpload("tenthMarksheet", file);
                    }}
                  />
                </div>
              </FormControl>
              {renderFilePreview(uploads.tenthMarksheet)}
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>

        {/* ITI/Diploma/12th Marksheet */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <FormItem>
              <FormLabel className="flex items-center">
                ITI/Diploma/12th Marksheet{" "}
                <span className="text-red-500">*</span>
                <InfoTooltip text="Upload your 12th class final marksheet or certificate" />
              </FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 transition-colors hover:border-primary/50">
                  <FileTextIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    PDF or Image files only
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="max-w-xs"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleFileUpload("twelfthMarksheet", file);
                    }}
                  />
                </div>
              </FormControl>
              {renderFilePreview(uploads.twelfthMarksheet)}
              <FormMessage />
            </FormItem>
          </CardContent>
        </Card>

        {status === "pursuing" ? (
          <Card>
            <CardContent className="p-4 space-y-2">
              <FormItem>
                <FormLabel className="flex items-center">
                  UG College ID Card <span className="text-red-500">*</span>
                  <InfoTooltip text="Upload a clear image of your college ID card" />
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 transition-colors hover:border-primary/50">
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="max-w-xs"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleFileUpload("collegeIdCard", file);
                      }}
                    />
                  </div>
                </FormControl>
                {renderFilePreview(uploads.collegeIdCard)}
                <FormMessage />
              </FormItem>
            </CardContent>
          </Card>
        ) : status === "passed" ? (
          <Card>
            <CardContent className="p-4 space-y-2">
              <FormItem>
                <FormLabel className="flex items-center">
                  UG College Degree
                  <InfoTooltip text="Upload a clear image of your college Degree" />
                </FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-4 transition-colors hover:border-primary/50">
                    <FileTextIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="max-w-xs"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        handleFileUpload("collegeDegree", file);
                      }}
                    />
                  </div>
                </FormControl>
                {renderFilePreview(uploads.collegeDegree)}
                <FormMessage />
              </FormItem>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <div className="bg-muted/40 p-4 rounded-md text-sm">
        <p className="font-medium mb-2">Important Notes:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>All documents should be clearly visible and legible</li>
          <li>Maximum file size: 5MB per document</li>
          <li>Preferred formats: PDF for documents, JPG/PNG for images</li>
          <li>
            Ensure your name on all documents matches your application name
          </li>
          <li>
            Documents in languages other than English should include
            translations
          </li>
        </ul>
      </div>
    </div>
  );
}