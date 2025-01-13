import React, { useState } from 'react';
import { useTheme } from '../theme/hooks/useTheme';
import { ThemedWrapper } from '../theme/components/ThemedWrapper';
import { ThemedInput } from '../theme/components/ThemedInput';
import { ThemedButton } from '../theme/components/ThemedButton';
import { ThemedSelect } from '../theme/components/ThemedSelect';
import './FieldFormsTab.css';

const FieldFormsTab: React.FC = () => {
  const { theme } = useTheme();
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
    <ThemedWrapper 
      className="field-forms-container"
      style={{
        backgroundColor: theme.colors.editorBackground,
        color: theme.colors.editorForeground
      }}
    >
      <h2>Field Forms</h2>
      <form onSubmit={handleSubmit} className="field-form">
        <ThemedInput 
          type="text"
          required={true}
          placeholder="Enter your name"
          variant="outlined"
          name="name"
        />
        
        <ThemedInput 
          type="email"
          required={true}
          placeholder="Enter your email"
          validation={(email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email) ? null : "Invalid email format";
          }}
          variant="outlined"
          name="email"
        />
        
        <ThemedSelect 
          options={['Engineering', 'Sales', 'Marketing', 'Support']}
          required={true}
          placeholder="Select Department"
          name="department"
        >
          {['Engineering', 'Sales', 'Marketing', 'Support'].map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </ThemedSelect>
        
        <ThemedInput 
          type="file"
          multiple={true}
          accept=".pdf,.doc,.docx"
          maxSize={5 * 1024 * 1024} // 5MB
          variant="outlined"
          name="attachments"
        />
        
        <ThemedButton 
          variant="primary"
          type="submit"
        >
          Submit Form
        </ThemedButton>
      </form>
    </ThemedWrapper>
  )
}

export default FieldFormsTab
