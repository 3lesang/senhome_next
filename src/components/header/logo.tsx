import Link from "next/link";

export default function HeaderLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">S</span>
      </div>
      <Link href="/" className="font-bold text-xl hidden sm:block">
        SenHome
      </Link>
    </div>
  );
}
