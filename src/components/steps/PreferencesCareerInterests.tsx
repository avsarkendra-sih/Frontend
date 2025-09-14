import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '../ui/f_form';
import { Input } from '../ui/f_input';
import { InfoTooltip } from '../InfoTooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/f_select';
import { RadioGroup, RadioGroupItem } from '../ui/f_radio-group';
import { Switch } from '../ui/f_switch';
import { Badge } from '../ui/f_badge';
import { X } from 'lucide-react';

// Sample data
const LOCATIONS = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Kochi', 'Indore', 'Remote'];
const SECTORS = ['IT & Software', 'Finance & Banking', 'Healthcare', 'Education', 'E-commerce', 'Manufacturing', 'Agriculture', 'Design & Creative', 'Marketing & Advertising', 'Consulting', 'Telecommunications', 'Media & Entertainment', 'Travel & Tourism', 'Automotive', 'Energy & Utilities', 'Real Estate', 'Retail', 'Logistics', 'Food & Beverage', 'Aerospace', 'Pharmaceuticals', 'Research & Development'];
const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Urdu', 'Sanskrit', 'Odia', 'Assamese', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Korean', 'Russian', 'Arabic'];
export function PreferencesCareerInterests() {
  const {
    control,
    watch,
    setValue
  } = useFormContext();
  const sectorsOfInterest = watch('preferencesCareerInterests.sectorsOfInterest') || [];
  const languagesKnown = watch('preferencesCareerInterests.languagesKnown') || [];
  // Add sector of interest
  const addSector = (sector: string) => {
    if (!sectorsOfInterest.includes(sector)) {
      setValue('preferencesCareerInterests.sectorsOfInterest', [...sectorsOfInterest, sector]);
    }
  };
  // Remove sector of interest
  const removeSector = (sector: string) => {
    setValue('preferencesCareerInterests.sectorsOfInterest', sectorsOfInterest.filter(s => s !== sector));
  };
  // Add language
  const addLanguage = (language: string) => {
    if (!languagesKnown.includes(language)) {
      setValue('preferencesCareerInterests.languagesKnown', [...languagesKnown, language]);
    }
  };
  // Remove language
  const removeLanguage = (language: string) => {
    setValue('preferencesCareerInterests.languagesKnown', languagesKnown.filter(l => l !== language));
  };
  return <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preferences & Career Interests</h2>
      {/* Internship Type */}
      <FormField control={control} name="preferencesCareerInterests.internshipType" render={({
      field
    }) => <FormItem className="space-y-3">
            <FormLabel className="flex items-center">
              Preferred Internship Type{' '}
              <InfoTooltip text="Select your preferred mode of internship" />
            </FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="onsite" />
                  <FormLabel htmlFor="onsite" className="font-normal cursor-pointer">
                    Onsite (Regular office attendance)
                  </FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <FormLabel htmlFor="hybrid" className="font-normal cursor-pointer">
                    Hybrid (Mix of onsite and remote work)
                  </FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <FormLabel htmlFor="virtual" className="font-normal cursor-pointer">
                    Virtual (Fully remote)
                  </FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>} />
      {/* Preferred Location */}
      {/* <FormField control={control} name="preferencesCareerInterests.preferredLocation" render={({
      field
    }) => <FormItem>
            <FormLabel className="flex items-center">
              Preferred Location{' '}
              <InfoTooltip text="Select your preferred work location" />
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LOCATIONS.map(location => <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>} /> */}
          {/* Preferred Location */}
<FormField
  control={control}
  name="preferencesCareerInterests.preferredLocation"
  render={({ field }) => {
    const [query, setQuery] = React.useState(field.value || "");
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    const filteredLocations = LOCATIONS.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <FormItem>
        <FormLabel className="flex items-center">
          Preferred Location{" "}
          <InfoTooltip text="Search your preferred work location" />
        </FormLabel>

        <FormControl>
          <div className="relative">
            <Input
              placeholder="Search location..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />

            {showSuggestions && filteredLocations.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-md border bg-white dark:bg-neutral-900 shadow">
                {filteredLocations.map((location) => (
                  <li
                    key={location}
                    className="cursor-pointer px-3 py-2 hover:bg-muted"
                    onClick={() => {
                      field.onChange(location);
                      setQuery(location);
                      setShowSuggestions(false);
                    }}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormControl>

        <FormMessage />
      </FormItem>
    );
  }}
/>


          
      {/* Sectors of Interest */}
      <div className="space-y-3">
        <FormLabel className="flex items-center">
          Sectors of Interest{' '}
          <InfoTooltip text="Select industries you're interested in working in" />
        </FormLabel>
        <div className="flex flex-wrap gap-2 mb-2">
          {SECTORS.map(sector => <Badge key={sector} variant={sectorsOfInterest.includes(sector) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => sectorsOfInterest.includes(sector) ? removeSector(sector) : addSector(sector)}>
              {sector}
              {sectorsOfInterest.includes(sector) && <X className="ml-1 h-3 w-3" />}
            </Badge>)}
        </div>
        <FormDescription>
          Click on sectors to select or deselect them
        </FormDescription>
      </div>
      {/* Languages Known */}
      <div className="space-y-3">
        <FormLabel className="flex items-center">
          Languages Known{' '}
          <InfoTooltip text="Select languages you can communicate in" />
        </FormLabel>
        <div className="flex flex-wrap gap-2 mb-2">
          {LANGUAGES.map(language => <Badge key={language} variant={languagesKnown.includes(language) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => languagesKnown.includes(language) ? removeLanguage(language) : addLanguage(language)}>
              {language}
              {languagesKnown.includes(language) && <X className="ml-1 h-3 w-3" />}
            </Badge>)}
        </div>
        <FormDescription>
          Click on languages to select or deselect them
        </FormDescription>
      </div>
      {/* Willingness to Relocate */}
      <FormField control={control} name="preferencesCareerInterests.willingToRelocate" render={({
      field
    }) => <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base flex items-center">
                Willingness to Relocate{' '}
                <InfoTooltip text="Are you willing to relocate for the internship?" />
              </FormLabel>
              <FormDescription>
                Indicate if you're open to relocating for an internship
                opportunity
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>} />
      <div className="bg-muted/40 p-4 rounded-md">
        <h3 className="font-medium mb-2">
          Why are these preferences important?
        </h3>
        <p className="text-sm text-muted-foreground">
          Your preferences help us match you with the most suitable internship
          opportunities. Being flexible about location and internship type may
          increase your chances of placement, but we'll always prioritize your
          primary preferences when possible.
        </p>
      </div>
    </div>;
}