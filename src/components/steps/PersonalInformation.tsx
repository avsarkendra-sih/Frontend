import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/f_form';
import { Input } from '../ui/f_input';
// import { Label } from '../ui/f_label';
import { InfoTooltip } from '../InfoTooltip';
import { Checkbox } from '../ui/f_checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/f_select';
import { Textarea } from '../ui/f_textarea';
import { Switch } from '../ui/f_switch';
import { Calendar } from '../ui/f_calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/f_popover';
import { Button } from '../ui/f_button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
export function PersonalInformation() {
  const {
    control,
    watch,
    setValue
  } = useFormContext();
  const sameAsPermanent = watch('personalInfo.sameAsPermanent');
  const permanentAddress = watch('personalInfo.permanentAddress');
  const permanentPincode = watch('personalInfo.permanentPincode');
  useEffect(() => {
    if (sameAsPermanent) {
      setValue('personalInfo.currentAddress', permanentAddress);
      setValue('personalInfo.currentPincode', permanentPincode);
    }
  }, [sameAsPermanent, permanentAddress, permanentPincode, setValue]);
  return <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Full Name - Prefilled, non-editable */}
        <FormField control={control} name="personalInfo.fullName" render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                Full Name{' '} <span className="text-red-500">*</span>
                <InfoTooltip text="Your full legal name as per records" />
              </FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        {/* Email - Prefilled, non-editable */}
        <FormField control={control} name="personalInfo.email" render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                Email ID <span className="text-red-500">*</span>
                <InfoTooltip text="Your registered email address" />
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        {/* Gender */}
        <FormField control={control} name="personalInfo.gender" 
        rules={{ required: "Please select your gender" }}
        render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                Gender <span className="text-red-500">*</span>
                <InfoTooltip text="Select your gender" />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />
        {/* Date of Birth */}
        <FormField control={control} 
        name="personalInfo.dateOfBirth" render={({
        field
      }) => <FormItem className="flex flex-col">
              <FormLabel className="flex items-center">
                Date of Birth{' '} <span className="text-red-500">*</span>
                <InfoTooltip text="Your date of birth as per records" />
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={date => date > new Date() || date < new Date('1900-01-01')} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>} />
        {/* Mobile Number */}
        <FormField control={control} name="personalInfo.mobileNumber" 
        rules={{ 
    required: "Please enter your mobile number", 
    pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" } 
  }}
  render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                Mobile Number <span className="text-red-500">*</span>
                <InfoTooltip text="Your primary contact number" />
              </FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="Enter mobile number" />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        {/* Alternative Contact */}
        <FormField control={control} name="personalInfo.alternativeNumber" render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                Alternative Contact Number{' '}
                <InfoTooltip text="Optional secondary contact number" />
              </FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="Enter alternative number (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        {/* LinkedIn Profile */}
        <FormField control={control} name="personalInfo.linkedinProfile" render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                LinkedIn Profile{' '}
                <InfoTooltip text="Paste your LinkedIn profile URL" />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://linkedin.com/in/username" />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        {/* GitHub Profile */}
        <FormField control={control} name="personalInfo.githubProfile" render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                GitHub Profile{' '}
                <InfoTooltip text="Paste your GitHub profile URL" />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://github.com/username" />
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
      {/* Permanent Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={control} name="personalInfo.permanentAddress" 
          rules={{ required: "Please enter your Permanent Address" }}
          render={({
          field
        }) => <FormItem className="col-span-2">
                <FormLabel className="flex items-center">
                  Address{' '} <span className="text-red-500">*</span>
                  <InfoTooltip text="Your permanent residential address" />
                </FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter your permanent address" />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          <FormField control={control} name="personalInfo.permanentPincode" 
          rules={{ required: "Please enter your GitHub profile URL" }}
          render={({
          field
        }) => <FormItem>
                <FormLabel className="flex items-center">
                  Pincode{' '} <span className="text-red-500">*</span>
                  <InfoTooltip text="Postal/ZIP code of your permanent address" />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter pincode" />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
      </div>
      {/* Current Address */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Current Address</h3>
          <FormField control={control} name="personalInfo.sameAsPermanent" render={({
          field
        }) => <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Same as permanent address</FormLabel>
                </div>
              </FormItem>} />
        </div>
        {!sameAsPermanent && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={control} name="personalInfo.currentAddress" render={({
          field
        }) => <FormItem className="col-span-2">
                  <FormLabel className="flex items-center">
                    Address{' '} <span className="text-red-500">*</span>
                    <InfoTooltip text="Your current residential address" />
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter your current address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={control} name="personalInfo.currentPincode" render={({
          field
        }) => <FormItem>
                  <FormLabel className="flex items-center">
                    Pincode{' '} <span className="text-red-500">*</span>
                    <InfoTooltip text="Postal/ZIP code of your current address" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter pincode" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>}
      </div>
      {/* Category & Disability Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={control} name="personalInfo.category" 
        rules={{ required: "Please select your category" }}
        render={({
        field
      }) => <FormItem>
              <FormLabel className="flex items-center">
                Category <span className="text-red-500">*</span>
                <InfoTooltip text="Select your social category" />
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />
        <FormField control={control} name="personalInfo.disabilityStatus" render={({
        field
      }) => <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base flex items-center">
                  Disability Status{' '}
                  <InfoTooltip text="Do you have any disability?" />
                </FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>} />
      </div>
    </div>;
}