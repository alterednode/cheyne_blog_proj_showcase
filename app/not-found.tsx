import SiteFooter from "./components/general-layout/SiteFooter";
import SiteHeader from "./components/general-layout/SiteHeader";
import NotFoundPageComponent from "@components/general-layout/NotFoundPage";
export default function NotFound() {
  return (
    // this is distinct from app/(site)/not-found.tsx to include header and footer
    // those are autmatically included in app/(site)/layout.tsx but not in app/layout.tsx
    // to enable pages like /dashboard (not real at the moment) to have their own layout without header/footer
    <div>
      <SiteHeader />
      <main>
        <NotFoundPageComponent />
      </main>
      <SiteFooter />
    </div>
  );
}