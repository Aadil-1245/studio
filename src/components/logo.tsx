import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 206 52"
      className={cn("h-8", className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(210, 80%, 70%)", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M40.38 0.00H11.62C5.21 0.00 0 5.21 0 11.62V40.38C0 46.79 5.21 52.00 11.62 52.00H40.38C46.79 52.00 52 46.79 52 40.38V11.62C52 5.21 46.79 0.00 40.38 0.00ZM39.06 20.89C39.06 25.13 36.45 29.56 32.55 32.06C32.08 32.38 31.81 33.00 32.00 33.56L33.72 38.31C33.97 39.00 33.40 39.75 32.66 39.75H23.51C22.68 39.75 22.08 39.00 22.34 38.20L27.76 21.02C28.22 19.58 27.24 18.06 25.75 18.06H19.50V13.00H26.25C33.31 13.00 39.06 15.69 39.06 20.89Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M64.43,13.76h7.25v5.5h11.25v-5.5h7.25v26.75h-7.25v-11h-11.25v11h-7.25V13.76z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M112.43 13.76V19.01H100.93V24.51H111.43V29.76H100.93V35.01H112.93V40.51H93.68V13.76H112.43Z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M135.43 13.76h7.25v13.25h11.25V13.76h7.25v26.75h-7.25V27.01h-18.5V13.76z"
        fill="hsl(var(--primary))"
      />
       <path
        d="M168.18 40.51h-7.25V13.76h17.5c4.14,0,7.5,3.36,7.5,7.5v11.75c0,4.14-3.36,7.5-7.5,7.5h-10.25V40.51z M168.18 20.26v9.75h2.75c1.24,0,2.25-1.01,2.25-2.25V22.51c0-1.24-1.01-2.25-2.25-2.25H168.18z"
        fill="hsl(var(--primary))"
      />
      <path
        d="M192.18,13.76c6.9,0,12.5,5.6,12.5,12.5s-5.6,12.5-12.5,12.5s-12.5-5.6-12.5-12.5S185.28,13.76,192.18,13.76z M192.18,33.76c4.14,0,7.5-3.36,7.5-7.5s-3.36-7.5-7.5-7.5s-7.5,3.36-7.5,7.5S188.04,33.76,192.18,33.76z"
        fill="hsl(var(--primary))"
      />
    </svg>
  );
}
