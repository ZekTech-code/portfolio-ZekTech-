
import { Suspense, useEffect, useRef, useState } from "react";

function SectionSkeleton() {
  return (
    <div className="flex min-h-75 items-center justify-center py-20">
      <div className="space-y-4 text-center">
        <div className="skeleton-pulse mx-auto h-10 w-48 rounded-full bg-border/40" />
        <div className="skeleton-pulse mx-auto h-4 w-72 rounded-full bg-border/30" />
        <div className="skeleton-pulse mx-auto h-4 w-56 rounded-full bg-border/20" />
      </div>
    </div>
  );
}

export default function LazySection({ children, rootMargin = "800px" }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(
    () => !("IntersectionObserver" in window),
  );

  useEffect(() => {
    if (shouldRender) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  if (!shouldRender) {
    return (
      <div ref={ref} className="min-h-75">
        <SectionSkeleton />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Suspense fallback={<SectionSkeleton />}>
        {children}
      </Suspense>
    </div>
  );
}
