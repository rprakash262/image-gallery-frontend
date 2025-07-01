interface ProgressBarProps {
  progress: string;
  style?: any;
}

function ProgressBar({ progress, style }: ProgressBarProps) {
  return (
    <div style={{ ...style }}>
      <progress
        value={progress}
        max="100"
        style={{ color: "var(--primary-color)", width: "100%" }}
      >
        {progress}
      </progress>
    </div>
  );
}

export default ProgressBar;
