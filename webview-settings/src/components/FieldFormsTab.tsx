import React, { useState } from 'react'
import TextField from './forms/TextField'
import SelectField from './forms/SelectField'
import FileUpload from './forms/FileUpload'
import './FieldFormsTab.css'

const FieldFormsTab: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    files: [] as File[]
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) ? null : 'Invalid email format'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Implement form submission logic
  }

  return (
    <div className="field-forms-container">
      <h2>Field Forms</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          required
          placeholder="Enter your full name"
        />
        
        <TextField
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
          validation={validateEmail}
        />
        
        <SelectField
          label="Department"
          options={['Engineering', 'Marketing', 'Sales', 'Support']}
          required
          placeholder="Select your department"
        />
        
        <FileUpload
          label="Upload Documents"
          multiple
          accept=".pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024}
        />
        
        <button type="submit" className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  )
}

export default FieldFormsTab
