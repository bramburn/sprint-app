// Shared types for Sprint AI Settings

export interface DebugSettings {
  debugModeEnabled: boolean;
  verboseLogging: boolean;
}

export interface FieldFormSettings {
  defaultFieldType: 'text' | 'number' | 'date';
  validationRules: string;
}

export interface AccordionSettings {
  allowMultiple: boolean;
  defaultOpenPanels: string[];
}

export interface MessagingSettings {
  messagingEnabled: boolean;
  defaultTheme: 'light' | 'dark' | 'system';
}

export interface SprintAISettings {
  debug: DebugSettings;
  fieldForms: FieldFormSettings;
  accordion: AccordionSettings;
  messaging: MessagingSettings;
}
