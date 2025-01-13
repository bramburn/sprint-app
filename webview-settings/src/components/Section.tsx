import React from 'react'

export interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  description, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`section ${className}`}>
      <h2 className="section-header">{title}</h2>
      {description && (
        <p className="section-description">{description}</p>
      )}
      <div className="section-content">
        {children}
      </div>
    </div>
  )
}

export default Section
