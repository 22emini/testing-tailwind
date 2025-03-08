"use client"
import React, { useState } from 'react';

interface TestResult {
  success: boolean;
  message: string;
  timestamp: string;
}

const TestConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      
      setTestResult({
        success: true,
        message: data.message || 'Connection successful!',
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Connection failed',
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">API Connection Test</h2>
      
      <button
        onClick={testConnection}
        disabled={isLoading}
        className={`w-full ${
          isLoading 
            ? 'bg-gray-400' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {isLoading ? 'Testing...' : 'Test Connection'}
      </button>

      {testResult && (
        <div className={`mt-4 p-4 rounded-md ${
          testResult.success ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className={`text-lg font-medium ${
            testResult.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {testResult.success ? 'Success!' : 'Error'}
          </div>
          <p className={`mt-1 ${
            testResult.success ? 'text-green-600' : 'text-red-600'
          }`}>
            {testResult.message}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tested at: {testResult.timestamp}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestConnection; 