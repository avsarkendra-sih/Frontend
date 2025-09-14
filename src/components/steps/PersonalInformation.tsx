import  { useEffect } from 'react';

import {  FormItem, FormLabel, FormControl, FormMessage } from '../ui/f_form';
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
import { useApplicationFormStore } from '@/store/useApplicationFormStore';
export function PersonalInformation() {
    const {
    personalInfo,
    setPersonalInfo,
    setSameAsPermanent,
  
  } = useApplicationFormStore();

  // Effect to handle address synchronization
 
  const handleInputChange = (field: keyof typeof personalInfo, value: any) => {
    setPersonalInfo({ [field]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setSameAsPermanent(checked);
  };

  return (
  <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <FormItem>
              <FormLabel className="flex items-center">
                Full Name{' '} <span className="text-red-500">*</span>
                <InfoTooltip text="Your full legal name as per records" />
              </FormLabel>
              <FormControl>
                <Input
                  value={personalInfo.fullName} 
                  disabled 
                  onChange={(e) => handleInputChange('fullName', e.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
        {/* Email - Prefilled, non-editable */}
         <FormItem>
          <FormLabel className="flex items-center">
            Email ID <span className="text-red-500">*</span>
            <InfoTooltip text="Your registered email address" />
          </FormLabel>
          <FormControl>
            <Input 
              value={personalInfo.email} 
              type="email" 
              disabled 
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </FormControl>
          <FormMessage />
         </FormItem>
          <FormItem>
          <FormLabel className="flex items-center">
            Gender <span className="text-red-500">*</span>
            <InfoTooltip text="Select your gender" />
          </FormLabel>
          <Select 
            value={personalInfo.gender} 
            onValueChange={(value) => handleInputChange('gender', value)}
          >
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
        </FormItem>

        {/* Date of Birth */}
        <FormItem className="flex flex-col">
          <FormLabel className="flex items-center">
            Date of Birth <span className="text-red-500">*</span>
            <InfoTooltip text="Your date of birth as per records" />
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button 
                  variant={'outline'} 
                  className={cn(
                    'w-full pl-3 text-left font-normal', 
                    !personalInfo.dateOfBirth && 'text-muted-foreground'
                  )}
                >
                  {personalInfo.dateOfBirth ? 
                    format(personalInfo.dateOfBirth, 'PPP') : 
                    <span>Pick a date</span>
                  }
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar 
                mode="single" 
                selected={personalInfo.dateOfBirth} 
                onSelect={(date) => handleInputChange('dateOfBirth', date)}
                disabled={date => date > new Date() || date < new Date('1900-01-01')} 
                initialFocus 
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>

        {/* Mobile Number */}
        <FormItem>
          <FormLabel className="flex items-center">
            Mobile Number <span className="text-red-500">*</span>
            <InfoTooltip text="Your primary contact number" />
          </FormLabel>
          <FormControl>
            <Input 
              value={personalInfo.mobileNumber} 
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              type="tel" 
              placeholder="Enter mobile number" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Alternative Contact */}
        <FormItem>
          <FormLabel className="flex items-center">
            Alternative Contact Number{' '}
            <InfoTooltip text="Optional secondary contact number" />
          </FormLabel>
          <FormControl>
            <Input 
              value={personalInfo.alternativeNumber} 
              onChange={(e) => handleInputChange('alternativeNumber', e.target.value)}
              type="tel" 
              placeholder="Enter alternative number (optional)" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* LinkedIn Profile */}
        <FormItem>
          <FormLabel className="flex items-center">
            LinkedIn Profile{' '}
            <InfoTooltip text="Paste your LinkedIn profile URL" />
          </FormLabel>
          <FormControl>
            <Input 
              value={personalInfo.linkedinProfile} 
              onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
              placeholder="https://linkedin.com/in/username" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* GitHub Profile */}
        <FormItem>
          <FormLabel className="flex items-center">
            GitHub Profile{' '}
            <InfoTooltip text="Paste your GitHub profile URL" />
          </FormLabel>
          <FormControl>
            <Input 
              value={personalInfo.githubProfile} 
              onChange={(e) => handleInputChange('githubProfile', e.target.value)}
              placeholder="https://github.com/username" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </div>

      {/* Permanent Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormItem className="col-span-2">
            <FormLabel className="flex items-center">
              Address <span className="text-red-500">*</span>
              <InfoTooltip text="Your permanent residential address" />
            </FormLabel>
            <FormControl>
              <Textarea 
                value={personalInfo.permanentAddress} 
                onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                placeholder="Enter your permanent address" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="flex items-center">
              Pincode <span className="text-red-500">*</span>
              <InfoTooltip text="Postal/ZIP code of your permanent address" />
            </FormLabel>
            <FormControl>
              <Input 
                value={personalInfo.permanentPincode} 
                onChange={(e) => handleInputChange('permanentPincode', e.target.value)}
                placeholder="Enter pincode" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </div>

      {/* Current Address */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Current Address</h3>
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox 
                checked={personalInfo.sameAsPermanent} 
                onCheckedChange={handleCheckboxChange} 
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Same as permanent address</FormLabel>
            </div>
          </FormItem>
        </div>

        {!personalInfo.sameAsPermanent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem className="col-span-2">
              <FormLabel className="flex items-center">
                Address <span className="text-red-500">*</span>
                <InfoTooltip text="Your current residential address" />
              </FormLabel>
              <FormControl>
                <Textarea 
                  value={personalInfo.currentAddress} 
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  placeholder="Enter your current address" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel className="flex items-center">
                Pincode <span className="text-red-500">*</span>
                <InfoTooltip text="Postal/ZIP code of your current address" />
              </FormLabel>
              <FormControl>
                <Input 
                  value={personalInfo.currentPincode} 
                  onChange={(e) => handleInputChange('currentPincode', e.target.value)}
                  placeholder="Enter pincode" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        )}
      </div>

      {/* Category & Disability Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel className="flex items-center">
            Category <span className="text-red-500">*</span>
            <InfoTooltip text="Select your social category" />
          </FormLabel>
          <Select 
            value={personalInfo.category} 
            onValueChange={(value) => handleInputChange('category', value)}
          >
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
        </FormItem>

        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base flex items-center">
              Disability Status <span className="text-red-500">*</span>
              <InfoTooltip text="Do you have any disability?" />
            </FormLabel>
          </div>
          <FormControl>
            <Switch 
              checked={personalInfo.disabilityStatus} 
              onCheckedChange={(checked) => handleInputChange('disabilityStatus', checked)}
            />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
}
