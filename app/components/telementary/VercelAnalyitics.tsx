import Script from 'next/script';

export function VercelAnalytics() {
  return (
    <>
      <Script id="vercel-analytics-init">
        {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
      </Script>
      <Script
        async
        src="/va/script.js" 
        data-endpoint="/va" 
      />
    </>
  );
}
