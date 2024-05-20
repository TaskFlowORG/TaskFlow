import React, { Component } from "react";
import { If } from "../If";
import { Page404 } from "./Page404";
import { Page403 } from "./Page403";
import { OtherError } from "./OtherError";

interface Props {
  children: React.ReactNode;
  t: any;
}

interface State {
  hasError: boolean;
  status: number;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      status: 0
    };
  }

  static getDerivedStateFromError() {
    
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (!error.response) {
      this.setState({
        hasError: this.state.hasError,
        status: 0
      });
      return;
    }
    const status = error.response.status;
   
    this.setState({
      hasError: this.state.hasError,
      status: status
    });
  }

  render() {
    if (this.state.hasError) {
      return (
            <If condition={this.state.status === 404}>
              <Page404 t={this.props.t} />
              <If condition={this.state.status === 403}>
                <Page403 t={this.props.t}  />
                <OtherError t={this.props.t}  />
              </If>
            </If>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
