export function calculateContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    
    const [rr, gg, bb] = [r, g, b].map(c => {
      c /= 255;
      return c <= 0.03928 
        ? c / 12.92 
        : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAGContrast(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = calculateContrastRatio(color1, color2);
  
  // WCAG contrast ratio requirements
  const thresholds = {
    'AA': {
      normal: 4.5,
      large: 3
    },
    'AAA': {
      normal: 7,
      large: 4.5
    }
  };
  
  // Consider text size (normal vs large)
  return ratio >= thresholds[level].normal;
}

export function getAccessibleColor(backgroundColor: string, textColor: string): string {
  const colors = ['#000000', '#FFFFFF'];
  
  const contrastScores = colors.map(color => 
    calculateContrastRatio(backgroundColor, color)
  );
  
  return contrastScores[0] > contrastScores[1] 
    ? colors[0] 
    : colors[1];
}
