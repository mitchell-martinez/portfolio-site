import { serializeStructuredData } from './structuredData';

describe('serializeStructuredData', () => {
  it('escapes characters that can terminate or disrupt an inline script', () => {
    const result = serializeStructuredData({ value: '</script>\u2028next\u2029' });

    expect(result).not.toContain('</script>');
    expect(result).toContain('\\u003c/script>');
    expect(result).toContain('\\u2028');
    expect(result).toContain('\\u2029');
  });
});
