export interface PersonalVoiceModel {
  key: string;
  name: string;
  enabled: boolean;
  profile: {
    jobTitle: string;
    geographicalFocus: string;
    skillsAndExpertise: string[];
  };
  toneOfVoice: {
    writingSample: string;
    toneOfVoiceAttributes: string[];
  };
  audience: {
    audienceDemographics: string[];
  };
  fineTuning: {
    temperature: number;
    engagementStyle: string;
    useEmojis: boolean;
    translate: boolean;
    translateTo: string;
  };
}

export interface PersonalVoiceWithId extends PersonalVoiceModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Using type aliases instead of empty interfaces
export type CreatePersonalVoiceDto = PersonalVoiceModel;
export type UpdatePersonalVoiceDto = Partial<PersonalVoiceModel>; 