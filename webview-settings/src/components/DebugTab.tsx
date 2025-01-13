import React, { useState, useEffect } from 'react'

interface DebugInfo {
  userAgent: string
  screenResolution: string
  browserLanguage: string
  colorScheme: string
  performanceEntries: Array<{
    name: string
    duration: number
    startTime: number
  }>
}

const DebugTab: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width} x ${window.screen.height}`,
    browserLanguage: navigator.language,
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light',
    performanceEntries: []
  })

  const [performanceMetrics, setPerformanceMetrics] = useState<{
    pageLoadTime: number
    domContentLoadedTime: number
  }>({
    pageLoadTime: 0,
    domContentLoadedTime: 0
  })

  useEffect(() => {
    // Capture performance metrics
    const pageLoadTime = performance.now()
    const domContentLoadedTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart

    // Collect performance entries
    const performanceEntries = performance.getEntriesByType('measure')
      .map(entry => ({
        name: entry.name,
        duration: entry.duration,
        startTime: entry.startTime
      }))

    setPerformanceMetrics({
      pageLoadTime,
      domContentLoadedTime
    })

    setDebugInfo(prev => ({
      ...prev,
      performanceEntries
    }))

    // Add a custom performance mark
    performance.mark('debug-tab-loaded')
  }, [])

  const renderDebugSection = (title: string, content: React.ReactNode) => (
    <div className="section">
      <h3 className="section-header">{title}</h3>
      <div className="debug-content">
        {content}
      </div>
    </div>
  )

  return (
    <div>
      {renderDebugSection('Browser Information', (
        <div>
          {Object.entries(debugInfo).filter(([key]) => key !== 'performanceEntries').map(([key, value]) => (
            <div key={key} className="debug-item">
              <strong>{key}:</strong> {value.toString()}
            </div>
          ))}
        </div>
      ))}

      {renderDebugSection('Performance Metrics', (
        <div>
          <div className="debug-item">
            <strong>Page Load Time:</strong> {performanceMetrics.pageLoadTime.toFixed(2)} ms
          </div>
          <div className="debug-item">
            <strong>DOM Content Loaded Time:</strong> {performanceMetrics.domContentLoadedTime} ms
          </div>
          {debugInfo.performanceEntries.length > 0 && (
            <div>
              <strong>Performance Entries:</strong>
              {debugInfo.performanceEntries.map((entry, index) => (
                <div key={index} className="performance-entry">
                  <div>Name: {entry.name}</div>
                  <div>Duration: {entry.duration.toFixed(2)} ms</div>
                  <div>Start Time: {entry.startTime.toFixed(2)} ms</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {renderDebugSection('Typography Samples', (
        <div className="typography-samples">
          <h1>Heading 1 (2.5rem)</h1>
          <h2>Heading 2 (2rem)</h2>
          <h3>Heading 3 (1.75rem)</h3>
          <h4>Heading 4 (1.5rem)</h4>
          <h5>Heading 5 (1.25rem)</h5>
          <p>Paragraph text (1rem) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <code>Inline code sample</code>
        </div>
      ))}
    </div>
  )
}

export default DebugTab
