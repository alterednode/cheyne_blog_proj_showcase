import NotFoundPageComponent from "@components/general-layout/NotFoundPage";
export default function NotFound() {
  return (
    
    // this is distinct from app/not-found.tsx to exclude header and footer
    // those are autmatically included in app/(site)/layout.tsx but not in app/layout.tsx
    // to enable pages like /dashboard (not real at the moment) to have their own layout without header/footer
<NotFoundPageComponent />
  );
}