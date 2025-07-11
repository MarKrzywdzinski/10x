<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorNotificationProps {
  message: string;
}

export function ErrorNotification({ message }: ErrorNotificationProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
