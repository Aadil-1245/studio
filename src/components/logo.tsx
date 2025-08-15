import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      className={cn("h-8 w-auto", className)}
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="18"
        fontWeight="bold"
        className={cn("fill-primary", className?.includes("fill") && className)}
      >
        Refro
      </text>
    </svg>
  );
}
