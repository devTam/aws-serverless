import React, { Component } from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
    hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };
  public static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
  }

  public render() {
    return (
      <div>
        {this.state.hasError ? (
          <h1>Something went wrong.</h1>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
