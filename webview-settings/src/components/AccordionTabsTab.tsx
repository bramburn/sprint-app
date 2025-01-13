import React from 'react'
import Accordion from './accordion/Accordion'
import TabContainer from './tabs/TabContainer'
import './AccordionTabsTab.css'

const AccordionTabsTab: React.FC = () => {
  const accordionItems = [
    {
      title: 'Getting Started',
      content: (
        <div>
          <p>Welcome to our application! Here are some initial steps to get you started:</p>
          <ul>
            <li>Create an account</li>
            <li>Configure your settings</li>
            <li>Explore features</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Advanced Configuration',
      content: (
        <div>
          <p>Customize your experience with these advanced settings:</p>
          <ul>
            <li>Performance optimization</li>
            <li>Integration settings</li>
            <li>Security preferences</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Troubleshooting',
      content: (
        <div>
          <p>Common issues and their solutions:</p>
          <ul>
            <li>Connection problems</li>
            <li>Performance bottlenecks</li>
            <li>Error handling</li>
          </ul>
        </div>
      )
    }
  ]

  const tabItems = [
    {
      label: 'Product Overview',
      content: (
        <div>
          <h3>Our Product</h3>
          <p>A comprehensive solution for modern workflow management.</p>
        </div>
      ),
      subTabs: [
        {
          label: 'Features',
          content: (
            <div>
              <h4>Key Features</h4>
              <ul>
                <li>Real-time collaboration</li>
                <li>Advanced reporting</li>
                <li>Seamless integrations</li>
              </ul>
            </div>
          )
        },
        {
          label: 'Pricing',
          content: (
            <div>
              <h4>Pricing Plans</h4>
              <ul>
                <li>Basic: Free</li>
                <li>Pro: $9.99/month</li>
                <li>Enterprise: Custom pricing</li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      label: 'Support',
      content: (
        <div>
          <h3>Customer Support</h3>
          <p>We're here to help you every step of the way.</p>
        </div>
      )
    }
  ]

  return (
    <div className="accordion-tabs-container">
      <section>
        <h2>Accordion Section</h2>
        <Accordion items={accordionItems} />
      </section>

      <section>
        <h2>Tabs Section</h2>
        <TabContainer tabs={tabItems} />
      </section>
    </div>
  )
}

export default AccordionTabsTab
