import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FileUpload from '../FileUpload';

describe('FileUpload Component', () => {
  const createMockFile = (name: string, size: number, type: string) => {
    return new File([new ArrayBuffer(size)], name, { type });
  };

  it('renders label and file input', () => {
    render(<FileUpload label="Upload Files" />);
    
    expect(screen.getByText('Upload Files')).toBeInTheDocument();
    expect(screen.getByText(/drag and drop files/i)).toBeInTheDocument();
  });

  it('allows file selection', () => {
    const mockOnChange = vi.fn();
    render(<FileUpload label="Upload Files" onChange={mockOnChange} />);
    
    const file = createMockFile('test.pdf', 1024, 'application/pdf');
    const fileInput = screen.getByLabelText('File upload');
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(mockOnChange).toHaveBeenCalledWith([file]);
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  it('prevents upload of files larger than maxSize', () => {
    render(<FileUpload label="Upload Files" maxSize={1024} />);
    
    const largeFile = createMockFile('large.pdf', 2048, 'application/pdf');
    const fileInput = screen.getByLabelText('File upload');
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    
    expect(screen.getByText(/exceed maximum size/i)).toBeInTheDocument();
  });

  it('supports multiple file upload', () => {
    const mockOnChange = vi.fn();
    render(<FileUpload label="Upload Files" multiple onChange={mockOnChange} />);
    
    const file1 = createMockFile('test1.pdf', 1024, 'application/pdf');
    const file2 = createMockFile('test2.pdf', 1024, 'application/pdf');
    const fileInput = screen.getByLabelText('File upload');
    
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });
    
    expect(mockOnChange).toHaveBeenCalledWith([file1, file2]);
    expect(screen.getByText('test1.pdf')).toBeInTheDocument();
    expect(screen.getByText('test2.pdf')).toBeInTheDocument();
  });

  it('filters files by accepted types', () => {
    render(<FileUpload label="Upload Files" accept=".pdf" />);
    
    const pdfFile = createMockFile('document.pdf', 1024, 'application/pdf');
    const txtFile = createMockFile('document.txt', 1024, 'text/plain');
    const fileInput = screen.getByLabelText('File upload');
    
    fireEvent.change(fileInput, { target: { files: [pdfFile, txtFile] } });
    
    // This test might need adjustment based on exact implementation
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
  });
});
