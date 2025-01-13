export class ThemePerformanceMonitor {
  private static instance: ThemePerformanceMonitor;
  private themeChanges: Array<{ timestamp: number, duration: number }> = [];

  private constructor() {}

  public static getInstance(): ThemePerformanceMonitor {
    if (!ThemePerformanceMonitor.instance) {
      ThemePerformanceMonitor.instance = new ThemePerformanceMonitor();
    }
    return ThemePerformanceMonitor.instance;
  }

  public startThemeChange(): () => void {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      this.themeChanges.push({
        timestamp: Date.now(),
        duration
      });

      this.logPerformance(duration);
    };
  }

  private logPerformance(duration: number) {
    if (duration > 50) {
      console.warn(`Theme change took ${duration.toFixed(2)}ms, which is longer than recommended`);
    }
  }

  public getThemeChangeStats() {
    if (this.themeChanges.length === 0) return null;

    const durations = this.themeChanges.map(change => change.duration);
    return {
      averageDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
      maxDuration: Math.max(...durations),
      minDuration: Math.min(...durations),
      totalChanges: this.themeChanges.length
    };
  }

  public resetStats() {
    this.themeChanges = [];
  }
}
