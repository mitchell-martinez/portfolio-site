import
    {
        formatContactEmail,
        parseContactFormData,
        parsePackageInterest,
    } from './contactForm';

function validFormData() {
  const formData = new FormData();
  formData.set('name', 'Alex Example');
  formData.set('email', 'alex@example.com');
  formData.set('organisation', 'Example Studio');
  formData.set('projectType', 'website-redesign');
  formData.set('packageInterest', 'grow');
  formData.set('budget', '5000-7500');
  formData.set('launchWindow', '1-3-months');
  formData.set('currentWebsite', 'https://example.com');
  formData.set('referralSource', 'ai-assistant');
  formData.set('message', 'We need a clearer website that generates qualified enquiries.');
  formData.set('sendCopy', 'yes');
  return formData;
}

describe('contact form utilities', () => {
  it('accepts known package query values and rejects arbitrary values', () => {
    expect(parsePackageInterest('launch')).toBe('launch');
    expect(parsePackageInterest('care')).toBe('care');
    expect(parsePackageInterest('enterprise')).toBeNull();
    expect(parsePackageInterest(null)).toBeNull();
  });

  it('parses and validates a complete qualification form', () => {
    const result = parseContactFormData(validFormData());

    expect(result.fieldErrors).toEqual({});
    expect(result.values).toMatchObject({
      projectType: 'website-redesign',
      packageInterest: 'grow',
      sendCopy: true,
    });
  });

  it('rejects missing required fields, arbitrary option values, and unsafe URLs', () => {
    const formData = validFormData();
    formData.set('name', '');
    formData.set('projectType', 'anything');
    formData.set('packageInterest', 'premium');
    formData.set('budget', 'free');
    formData.set('launchWindow', 'tomorrow');
    formData.set('currentWebsite', 'javascript:alert(1)');

    const result = parseContactFormData(formData);

    expect(result.fieldErrors).toMatchObject({
      name: 'Name is required.',
      projectType: 'Select a valid project type.',
      packageInterest: 'Select a valid package preference.',
      budget: 'Select a valid budget range.',
      launchWindow: 'Select a valid launch window.',
      currentWebsite: 'Enter a full website URL beginning with http:// or https://.',
    });
  });

  it('formats all qualification fields with human-readable option labels', () => {
    const { values } = parseContactFormData(validFormData());
    const result = formatContactEmail(values);

    expect(result).toContain('Project type: Website redesign');
    expect(result).toContain('Package interest: Grow — from A$5,000');
    expect(result).toContain('Budget: A$5,000–A$7,500');
    expect(result).toContain('How they found me: An AI assistant such as ChatGPT');
    expect(result).toContain('We need a clearer website that generates qualified enquiries.');
  });
});
