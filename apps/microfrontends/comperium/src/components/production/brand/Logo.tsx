import { Snowflake } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <Snowflake
        className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white animate-spin-slow"
        aria-hidden="true"
      />
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold italic truncate">
        Congelados Tauro
      </h1>
    </div>
  );
}
