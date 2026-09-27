"use client";
import React from "react";

/** Catches unexpected render crashes and shows a friendly fallback. */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3 px-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-2xl">
            ⚠️
          </div>
          <h2 className="font-bold text-lg">Something crashed</h2>
          <p className="text-sm text-slate-500 max-w-md">
            {this.state.error?.message || "An unexpected error occurred in this section."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
