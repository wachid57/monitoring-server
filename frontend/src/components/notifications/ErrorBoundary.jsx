import React from 'react';
import { useNotify } from './NotificationProvider';

export class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(){
    return { hasError: true };
  }
  componentDidCatch(error, info){
    if(this.props.onError){
      this.props.onError(error, info);
    }
  }
  render(){
    if(this.state.hasError){
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Hook wrapper to inject notify
export const NotifyingErrorBoundary = ({ children, fallback }) => {
  const { notify } = useNotify();
  const handleError = (error) => {
    notify(`UI error: ${error.message}`, { severity:'error'});
  };
  return <ErrorBoundary onError={handleError} fallback={fallback}>{children}</ErrorBoundary>;
};
