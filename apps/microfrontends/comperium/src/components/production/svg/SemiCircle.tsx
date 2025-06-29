function SemiCircle() {
  return (
    <div className="absolute right-0 top-0 h-full lg:w-1/2 w-full overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="absolute -right-24 -top-24 h-[150%] w-[150%] max-w-none opacity-85 sm:-top-6 sm:-right-48 lg:opacity-100 lg:right-0 lg:top-0 lg:h-[100%] lg:w-full"
        aria-hidden="true"
      >
        <path
          fill="url(#heroGradient)"
          fillRule="evenodd"
          d="M200 150c0-55.228-44.772-100-100-100S0 94.772 0 150h200Z"
          clipRule="evenodd"
        />
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopOpacity="1" stopColor="rgba(105, 234, 203)" offset="0" />
            <stop stopOpacity="1" stopColor="rgba(234, 204, 248)" offset="0.48" />
            <stop stopOpacity="1" stopColor="rgba(102, 84, 241)" offset="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default SemiCircle;
