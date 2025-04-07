import * as React from "react";

interface SmoothProgressProps {
  value: number;
  max?: number;
  height?: string;
  transitionSpeed?: number;
  className?: string;
  colorMode?: "default" | "timer" | "success";
}

/**
 * A progress bar component with smooth animations and built-in color states
 * 
 * @param value - Current progress value (0-100 or any range with max)
 * @param max - Maximum value (defaults to 100)
 * @param height - Height of the progress bar (defaults to "6px")
 * @param transitionSpeed - Transition duration in ms (defaults to 100ms)
 * @param className - Additional CSS classes
 * @param colorMode - Color theme to use: default, timer, or success (defaults to default)
 */
const SmoothProgress = ({
  value,
  max = 100,
  height = "6px",
  transitionSpeed = 100,
  className,
  colorMode = "default",
}: SmoothProgressProps) => {
  // Calculate progress percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Determine colors based on percentage and color mode
  const getColors = () => {
    if (colorMode === "timer") {
      const percentRemaining = (value / max) * 100;
      if (percentRemaining <= 30) {
        return {
          barColor: "rgb(239 68 68)", // red-500
          backgroundColor: "rgb(254 226 226)" // red-100
        };
      } else if (percentRemaining <= 50) {
        return {
          barColor: "rgb(234 179 8)", // yellow-500
          backgroundColor: "rgb(254 249 195)" // yellow-100
        };
      } else {
        return {
          barColor: "rgb(8 145 178)", // cyan-600
          backgroundColor: "rgb(207 250 254)" // cyan-100
        };
      }
    } else if (colorMode === "success") {
      if (percentage >= 100) {
        return {
          barColor: "rgb(22 163 74)", // green-600
          backgroundColor: "rgb(220 252 231)" // green-100
        };
      } else if (percentage >= 75) {
        return {
          barColor: "rgb(16 185 129)", // emerald-500
          backgroundColor: "rgb(209 250 229)" // emerald-100
        };
      } else if (percentage >= 50) {
        return {
          barColor: "rgb(14 165 233)", // sky-500
          backgroundColor: "rgb(224 242 254)" // sky-100
        };
      } else {
        return {
          barColor: "rgb(79 70 229)", // indigo-600
          backgroundColor: "rgb(224 231 255)" // indigo-100
        };
      }
    } else {
      // Default color scheme
      return {
        barColor: "rgb(8 145 178)", // cyan-600
        backgroundColor: "rgb(207 250 254)" // cyan-100
      };
    }
  };
  
  const { barColor, backgroundColor } = getColors();
  
  // Base styles for the progress bar container
  const progressBarStyle: React.CSSProperties = {
    height,
    borderRadius: "9999px",
    backgroundColor,
    overflow: "hidden",
    width: "100%",
    ...(className ? {} : { marginBottom: "0.5rem" }),
  };
  
  // Styles for the progress indicator
  const progressIndicatorStyle: React.CSSProperties = {
    height: "100%",
    width: `${percentage}%`,
    borderRadius: "9999px",
    backgroundColor: barColor,
    transition: `width ${transitionSpeed}ms linear`,
  };
  
  return (
    <div className={className} style={progressBarStyle}>
      <div style={progressIndicatorStyle}></div>
    </div>
  );
};

export { SmoothProgress }; 