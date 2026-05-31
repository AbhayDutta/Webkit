import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AuditResult {
  category: string;
  status: 'pass' | 'warning' | 'error';
  title: string;
  description: string;
  details: string[];
  score: number;
}

interface AuditResultsProps {
  results: AuditResult[];
  overallScore?: number;
}

export default function AuditResults({ results, overallScore }: AuditResultsProps) {
  // Ensure we have valid data
  if (!results || !Array.isArray(results)) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No audit results available.</p>
      </div>
    );
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {overallScore !== undefined && (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-medium mb-2">Overall Score</h3>
          <div className={`text-4xl md:text-5xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}/100
          </div>
          <p className="text-gray-600 mt-2">
            {overallScore >= 80 ? 'Excellent' : 
             overallScore >= 60 ? 'Good' : 'Needs Improvement'}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`border rounded-lg p-4 md:p-6 ${getStatusColor(result.status)}`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                {getStatusIcon(result.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <h3 className="font-medium text-lg">{result.category}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </span>
                    {getStatusIcon(result.status)}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{result.description}</p>
                
                {result.details && Array.isArray(result.details) && result.details.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Details:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {result.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="break-words text-gray-700">
                            {typeof detail === 'string' ? detail : JSON.stringify(detail)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(!result.details || !Array.isArray(result.details) || result.details.length === 0) && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-blue-700">No additional details available for this check.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
