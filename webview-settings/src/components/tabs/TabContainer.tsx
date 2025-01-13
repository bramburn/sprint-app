import React, { useState } from 'react'
import './TabContainer.css'

export interface TabItem {
  label: string
  content: React.ReactNode
  subTabs?: TabItem[]
}

export interface TabContainerProps {
  tabs: TabItem[]
}

const TabContainer: React.FC<TabContainerProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [activeSubTabIndex, setActiveSubTabIndex] = useState<number | null>(null)

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index)
    // Reset subtab when main tab changes
    setActiveSubTabIndex(null)
  }

  const handleSubTabChange = (index: number) => {
    setActiveSubTabIndex(index)
  }

  const activeTab = tabs[activeTabIndex]
  const activeSubTabs = activeTab.subTabs

  return (
    <div className="tab-container">
      <div className="tab-navigation">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTabIndex === index ? 'active' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTabs && (
        <div className="subtab-navigation">
          {activeSubTabs.map((subTab, index) => (
            <button
              key={index}
              className={`subtab-button ${activeSubTabIndex === index ? 'active' : ''}`}
              onClick={() => handleSubTabChange(index)}
            >
              {subTab.label}
            </button>
          ))}
        </div>
      )}

      <div className="tab-content">
        {activeSubTabs && activeSubTabIndex !== null 
          ? activeSubTabs[activeSubTabIndex].content
          : activeTab.content
        }
      </div>
    </div>
  )
}

export default TabContainer
