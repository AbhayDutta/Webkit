import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

export type MessageType = 'error' | 'warning' | 'success';

interface ErrorMessageProps {
  type: MessageType;
  message: string;
  details?: string[];
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorMessage({ 
  type, 
  message, 
  details, 
  onDismiss,
  className = '' 
}: ErrorMessageProps) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStyles()} ${className}`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {details && details.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm">
              {details.map((detail, index) => (
                <li key={index}>• {detail}</li>
              ))}
            </ul>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
