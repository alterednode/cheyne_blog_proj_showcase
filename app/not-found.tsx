import SiteFooter from "./components/general-layout/SiteFooter";
import SiteHeader from "./components/general-layout/SiteHeader";
export default function NotFound() {
  return (
    <div>
      <SiteHeader />
      <div className="min-h-dvh flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-neutral-500 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
      <SiteFooter />
    </div>
  );
}