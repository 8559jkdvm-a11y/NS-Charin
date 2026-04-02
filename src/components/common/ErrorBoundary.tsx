import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-red-100">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">문제가 발생했습니다</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              애플리케이션 실행 중 예기치 못한 오류가 발생했습니다. 
              {this.state.error?.name === 'QuotaExceededError' ? 
                '이미지 용량이 너무 커서 저장 공간이 부족할 수 있습니다.' : 
                '잠시 후 다시 시도해 주세요.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
            >
              <RefreshCcw size={20} />
              새로고침하여 다시 시작하기
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-left p-4 bg-gray-100 rounded-xl overflow-auto max-h-40 text-xs font-mono text-red-600">
                {this.state.error?.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
