export default function NotFoundPageComponent() {
    return (

        <div className="bg-background text-foreground">
            <div className="min-h-dvh flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    Go Back Home
                </a>
            </div>
        </div>);
}