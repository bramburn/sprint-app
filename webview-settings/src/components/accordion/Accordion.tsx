import React, { useState } from 'react'
import './Accordion.css'

export interface AccordionItemProps {
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItemProps[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
        >
          <button 
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
          >
            {item.title}
            <span className="accordion-icon">
              {activeIndex === index ? '−' : '+'}
            </span>
          </button>
          {activeIndex === index && (
            <div className="accordion-content">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Accordion
