import { isPackageSlug, type PackageSlug } from '~/data/freelanceServices';

export const projectTypeOptions = [
  { value: 'new-website', label: 'New business website' },
  { value: 'website-redesign', label: 'Website redesign' },
  { value: 'cms', label: 'WordPress or CMS development' },
  { value: 'web-app', label: 'Web application or SaaS' },
  { value: 'agency-support', label: 'Agency development support' },
  { value: 'care', label: 'Ongoing website care' },
  { value: 'other', label: 'Other enquiry' },
] as const;

export const packageInterestOptions = [
  { value: 'launch', label: 'Launch — from A$3,000' },
  { value: 'grow', label: 'Grow — from A$5,000' },
  { value: 'custom', label: 'Custom — from A$7,500' },
  { value: 'care', label: 'Care — from A$99/month' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const budgetOptions = [
  { value: 'under-3000', label: 'Under A$3,000' },
  { value: '3000-5000', label: 'A$3,000–A$5,000' },
  { value: '5000-7500', label: 'A$5,000–A$7,500' },
  { value: '7500-15000', label: 'A$7,500–A$15,000' },
  { value: '15000-plus', label: 'A$15,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const launchWindowOptions = [
  { value: 'within-1-month', label: 'Within one month' },
  { value: '1-3-months', label: 'In 1–3 months' },
  { value: '3-6-months', label: 'In 3–6 months' },
  { value: '6-plus-months', label: 'More than 6 months away' },
  { value: 'flexible', label: 'Flexible or not sure' },
] as const;

export const referralSourceOptions = [
  { value: 'search', label: 'Google or another search engine' },
  { value: 'ai-assistant', label: 'An AI assistant such as ChatGPT' },
  { value: 'referral', label: 'A personal referral' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'existing-client', label: 'Existing client or collaborator' },
  { value: 'other', label: 'Other' },
] as const;

type OptionValue<T extends readonly { value: string }[]> = T[number]['value'];

export type ProjectType = OptionValue<typeof projectTypeOptions>;
export type PackageInterest = OptionValue<typeof packageInterestOptions>;
export type ProjectBudget = OptionValue<typeof budgetOptions>;
export type LaunchWindow = OptionValue<typeof launchWindowOptions>;
export type ReferralSource = OptionValue<typeof referralSourceOptions>;

export interface ContactFormValues {
  name: string;
  email: string;
  organisation: string;
  projectType: string;
  packageInterest: string;
  budget: string;
  launchWindow: string;
  currentWebsite: string;
  referralSource: string;
  message: string;
  sendCopy: boolean;
}

export interface ContactValidationResult {
  values: ContactFormValues;
  fieldErrors: Record<string, string>;
}

function hasOption<T extends readonly { value: string }[]>(options: T, value: string) {
  return options.some((option) => option.value === value);
}

function validateHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function parsePackageInterest(value: string | null): PackageSlug | null {
  return value && isPackageSlug(value) ? value : null;
}

export function parseContactFormData(formData: FormData): ContactValidationResult {
  const values: ContactFormValues = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    organisation: String(formData.get('organisation') ?? '').trim(),
    projectType: String(formData.get('projectType') ?? '').trim(),
    packageInterest: String(formData.get('packageInterest') ?? '').trim(),
    budget: String(formData.get('budget') ?? '').trim(),
    launchWindow: String(formData.get('launchWindow') ?? '').trim(),
    currentWebsite: String(formData.get('currentWebsite') ?? '').trim(),
    referralSource: String(formData.get('referralSource') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    sendCopy: formData.get('sendCopy') === 'yes',
  };
  const fieldErrors: Record<string, string> = {};

  if (!values.name) fieldErrors.name = 'Name is required.';
  else if (values.name.length > 120) fieldErrors.name = 'Name must be under 120 characters.';

  if (!values.email) fieldErrors.email = 'Email is required.';
  else if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email = 'Enter a valid email address.';
  }

  if (values.organisation.length > 120) {
    fieldErrors.organisation = 'Organisation must be under 120 characters.';
  }

  if (!values.projectType) fieldErrors.projectType = 'Select a project type.';
  else if (!hasOption(projectTypeOptions, values.projectType)) {
    fieldErrors.projectType = 'Select a valid project type.';
  }

  if (!values.packageInterest) fieldErrors.packageInterest = 'Select a package preference.';
  else if (!hasOption(packageInterestOptions, values.packageInterest)) {
    fieldErrors.packageInterest = 'Select a valid package preference.';
  }

  if (!values.budget) fieldErrors.budget = 'Select a budget range.';
  else if (!hasOption(budgetOptions, values.budget)) {
    fieldErrors.budget = 'Select a valid budget range.';
  }

  if (!values.launchWindow) fieldErrors.launchWindow = 'Select a desired launch window.';
  else if (!hasOption(launchWindowOptions, values.launchWindow)) {
    fieldErrors.launchWindow = 'Select a valid launch window.';
  }

  if (values.currentWebsite.length > 500) {
    fieldErrors.currentWebsite = 'Website URL must be under 500 characters.';
  } else if (values.currentWebsite && !validateHttpUrl(values.currentWebsite)) {
    fieldErrors.currentWebsite = 'Enter a full website URL beginning with http:// or https://.';
  }

  if (values.referralSource && !hasOption(referralSourceOptions, values.referralSource)) {
    fieldErrors.referralSource = 'Select a valid referral source.';
  }

  if (!values.message) fieldErrors.message = 'Project details are required.';
  else if (values.message.length > 5000) {
    fieldErrors.message = 'Project details must be under 5,000 characters.';
  }

  return { values, fieldErrors };
}

function optionLabel<T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string
): string {
  return options.find((option) => option.value === value)?.label ?? 'Not specified';
}

export function formatContactEmail(values: ContactFormValues): string {
  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organisation: ${values.organisation || 'Not specified'}`,
    `Project type: ${optionLabel(projectTypeOptions, values.projectType)}`,
    `Package interest: ${optionLabel(packageInterestOptions, values.packageInterest)}`,
    `Budget: ${optionLabel(budgetOptions, values.budget)}`,
    `Desired launch: ${optionLabel(launchWindowOptions, values.launchWindow)}`,
    `Current website: ${values.currentWebsite || 'Not specified'}`,
    `How they found me: ${optionLabel(referralSourceOptions, values.referralSource)}`,
    '',
    'Project goals and details:',
    values.message,
  ].join('\n');
}

export function getProjectTypeLabel(value: string): string {
  return optionLabel(projectTypeOptions, value);
}
