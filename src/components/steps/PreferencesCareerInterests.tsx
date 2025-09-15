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
import { Popover, PopoverTrigger, PopoverContent } from "../ui/f_popover";
import { Button } from "../ui/f_button";
import { Switch } from "../ui/f_switch";
import { Badge } from "../ui/f_badge";
import { X } from "lucide-react";
import { useApplicationFormStore } from "@/store/useApplicationFormStore";

// Sample data
const LOCATIONS = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Remote",
];
const SECTORS = [
  "IT & Software",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "E-commerce",
  "Manufacturing",
  "Agriculture",
  "Design & Creative",
  "Marketing & Advertising",
  "Consulting",
  "Telecommunications",
  "Media & Entertainment",
  "Travel & Tourism",
  "Automotive",
  "Energy & Utilities",
  "Real Estate",
  "Retail",
  "Logistics",
  "Food & Beverage",
  "Aerospace",
  "Pharmaceuticals",
  "Research & Development",
];
const LANGUAGES = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Urdu",
  "Sanskrit",
  "Odia",
  "Assamese",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Chinese",
  "Korean",
  "Russian",
  "Arabic",
];

export function PreferencesCareerInterests() {
  const { preferencesCareerInterests, setPreferencesCareerInterests } = useApplicationFormStore();
  
  const [locationQuery, setLocationQuery] = React.useState("");
  const [languageQuery, setLanguageQuery] = React.useState("");

  // Helper function to update preferences
  const updatePreferences = (updates: Partial<typeof preferencesCareerInterests>) => {
    setPreferencesCareerInterests(updates);
  };

  // Handle checkbox changes for internship type
  const handleInternshipTypeChange = (type: string, checked: boolean) => {
    const currentTypes = preferencesCareerInterests.internshipType || [];
    
    if (checked) {
      updatePreferences({ internshipType: [...currentTypes, type] });
    } else {
      updatePreferences({ 
        internshipType: currentTypes.filter(t => t !== type) 
      });
    }
  };

  // Handle location operations
  const addLocation = (loc: string) => {
    if (!loc) return;
    
    const selected = preferencesCareerInterests.preferredLocation || [];
    if (selected.includes(loc) || selected.length >= 3) return;
    
    updatePreferences({ 
      preferredLocation: [...selected, loc] 
    });
    setLocationQuery("");
  };

  const removeLocation = (loc: string) => {
    const selected = preferencesCareerInterests.preferredLocation || [];
    updatePreferences({ 
      preferredLocation: selected.filter(s => s !== loc) 
    });
  };

  // Handle sector operations
  const addSector = (sector: string) => {
    if (!sector) return;
    
    const selected = preferencesCareerInterests.sectorsOfInterest || [];
    if (selected.includes(sector)) return;
    
    updatePreferences({ 
      sectorsOfInterest: [...selected, sector] 
    });
  };

  const removeSector = (sector: string) => {
    const selected = preferencesCareerInterests.sectorsOfInterest || [];
    updatePreferences({ 
      sectorsOfInterest: selected.filter(s => s !== sector) 
    });
  };

  // Handle language operations
  const addLanguage = (language: string) => {
    if (!language) return;
    
    const selected = preferencesCareerInterests.languagesKnown || [];
    if (selected.includes(language)) return;
    
    updatePreferences({ 
      languagesKnown: [...selected, language] 
    });
    setLanguageQuery("");
  };

  const removeLanguage = (language: string) => {
    const selected = preferencesCareerInterests.languagesKnown || [];
    updatePreferences({ 
      languagesKnown: selected.filter(l => l !== language) 
    });
  };

  // Handle switch change
  const handleWillingToRelocateChange = (checked: boolean) => {
    updatePreferences({ willingToRelocate: checked });
  };

  const selectedLocations = preferencesCareerInterests.preferredLocation || [];
  const selectedSectors = preferencesCareerInterests.sectorsOfInterest || [];
  const selectedLanguages = preferencesCareerInterests.languagesKnown || [];
  const selectedInternshipTypes = preferencesCareerInterests.internshipType || [];

  const filteredLocations = locationQuery.trim()
    ? LOCATIONS.filter(
        loc => loc.toLowerCase().includes(locationQuery.toLowerCase()) &&
               !selectedLocations.includes(loc)
      )
    : [];

  const filteredLanguages = languageQuery.trim()
    ? LANGUAGES.filter(
        l => l.toLowerCase().includes(languageQuery.toLowerCase()) &&
             !selectedLanguages.includes(l)
      )
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preferences & Career Interests</h2>

      {/* Internship Type */}
      <FormItem className="space-y-3">
        <FormLabel className="flex items-center">
          Preferred Internship Type <span className="text-red-500"> *</span>
          <InfoTooltip text="Select one or more preferred modes of internship" />
        </FormLabel>

        <div className="flex flex-col space-y-2">
          {["onsite", "hybrid", "virtual"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={type}
                checked={selectedInternshipTypes.includes(type)}
                onChange={(e) => handleInternshipTypeChange(type, e.target.checked)}
              />
              <FormLabel
                htmlFor={type}
                className="font-normal cursor-pointer capitalize"
              >
                {type === "onsite"
                  ? "Onsite (Regular office attendance)"
                  : type === "hybrid"
                  ? "Hybrid (Mix of onsite and online work)"
                  : "Online (Work from Home)"}
              </FormLabel>
            </div>
          ))}
        </div>

        <FormMessage />
      </FormItem>

      {/* Preferred Locations */}
      <FormItem className="space-y-3 relative">
        <FormLabel className="flex items-center">
          Preferred Locations (Max 3){" "}
          <InfoTooltip text="Search, pick from suggestions or press Enter to add a custom location" />
        </FormLabel>

        <FormControl>
          <div className="relative">
            <Input
              placeholder={
                selectedLocations.length >= 3
                  ? "Maximum 3 locations selected"
                  : "Search or press Enter to add location"
              }
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = locationQuery.trim();
                  if (!value) return;
                  addLocation(value);
                }
              }}
              disabled={selectedLocations.length >= 3}
            />

            {locationQuery.trim().length > 0 && filteredLocations.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full max-h-40 overflow-y-auto rounded-md border bg-white dark:bg-neutral-900 shadow">
                {filteredLocations.map((loc) => (
                  <li
                    key={loc}
                    className="cursor-pointer px-3 py-2 hover:bg-muted"
                    onClick={() => addLocation(loc)}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormControl>

        <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
          {selectedLocations.length > 0 ? (
            selectedLocations.map((loc) => (
              <Badge key={loc} className="flex items-center gap-1">
                {loc}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeLocation(loc)}
                />
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No locations selected
            </span>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {selectedLocations.length}/3 selected
        </div>

        <FormMessage />
      </FormItem>

      {/* Sectors of Interest */}
      <FormItem className="space-y-3">
        <div className="flex items-center justify-between">
          <FormLabel className="flex items-center">
            Sectors of Interest{" "}
            <InfoTooltip text="Select industries you're interested in or add your own" />
          </FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Add Sector
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-96 overflow-y-auto space-y-2">
              <h4 className="font-medium">Select or Add Sectors</h4>

              <Input
                type="text"
                placeholder="Search or add custom sector"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    if (value) {
                      addSector(value);
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />

              <div className="flex flex-wrap gap-2">
                {SECTORS.map((sector) => (
                  <Badge
                    key={sector}
                    variant={
                      selectedSectors.includes(sector) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => addSector(sector)}
                  >
                    {sector}
                  </Badge>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
          {selectedSectors.length > 0 ? (
            selectedSectors.map((s) => (
              <Badge key={s} className="flex items-center gap-1">
                {s}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSector(s)}
                />
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No sectors selected
            </span>
          )}
        </div>

        <FormMessage />
      </FormItem>

      {/* Languages Known */}
      <FormItem className="space-y-3 relative">
        <FormLabel className="flex items-center">
          Languages Known{" "}
          <InfoTooltip text="Select languages you can communicate in or add your own" />
        </FormLabel>

        <FormControl>
          <div className="relative">
            <Input
              placeholder="Search or type to add language"
              value={languageQuery}
              onChange={(e) => setLanguageQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = languageQuery.trim();
                  if (!value) return;
                  addLanguage(value);
                }
              }}
            />

            {languageQuery.trim().length > 0 && filteredLanguages.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full max-h-40 overflow-y-auto rounded-md border bg-white dark:bg-neutral-900 shadow">
                {filteredLanguages.map((l) => (
                  <li
                    key={l}
                    className="cursor-pointer px-3 py-2 hover:bg-muted"
                    onClick={() => addLanguage(l)}
                  >
                    {l}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </FormControl>

        <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
          {selectedLanguages.length > 0 ? (
            selectedLanguages.map((l) => (
              <Badge key={l} className="flex items-center gap-1">
                {l}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeLanguage(l)}
                />
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              No languages selected
            </span>
          )}
        </div>

        <FormDescription>
          Search, pick from suggestions, or type your own language.
        </FormDescription>

        <FormMessage />
      </FormItem>

      {/* Willingness to Relocate */}
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base flex items-center">
            Willingness to Relocate{" "}
            <InfoTooltip text="Are you willing to relocate for the internship?" />
          </FormLabel>
          <FormDescription>
            Indicate if you're open to relocating for an internship opportunity
          </FormDescription>
        </div>
        <FormControl>
          <Switch 
            checked={preferencesCareerInterests.willingToRelocate || false} 
            onCheckedChange={handleWillingToRelocateChange} 
          />
        </FormControl>
      </FormItem>

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
    </div>
  );
}