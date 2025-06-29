type ProgressBarProps = {
  progress: number;
};

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="absolute bottom-28 lg:bottom-6 left-1/2 z-20 w-24 -translate-x-1/2 overflow-hidden rounded-full bg-blue-100 h-1">
      <div
        className="h-full bg-blue-600 transition-all duration-50"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      />
    </div>
  );
}

export default ProgressBar;
