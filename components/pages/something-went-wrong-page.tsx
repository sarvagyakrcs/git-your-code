import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SomethingWentWrongPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <Alert variant="destructive" className="border-destructive/50">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Oops! Something went wrong</AlertTitle>
          <AlertDescription className="mt-2 text-sm text-muted-foreground">
            We encountered an unexpected error. Our team has been notified and is working to resolve the issue.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button
            variant="default"
            onClick={handleGoHome}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          If the problem persists, please contact our{' '}
          <a href="/support" className="font-medium underline underline-offset-4 hover:text-primary">
            support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default SomethingWentWrongPage;