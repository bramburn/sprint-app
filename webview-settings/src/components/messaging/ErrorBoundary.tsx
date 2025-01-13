import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ThemedWrapper } from '../../theme/components/ThemedWrapper';
import { ThemedButton } from '../../theme/components/ThemedButton';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemedWrapper 
          className="error-boundary"
          style={{ 
            padding: '20px', 
            textAlign: 'center' 
          }}
        >
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <ThemedButton 
            variant="secondary"
            onClick={this.handleReset}
          >
            Try Again
          </ThemedButton>
        </ThemedWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
