"use client";

import { useEffect, useState } from "react";
import { ui, useLocale } from "@/app/lib/i18n";

interface SectionNavProps {
  items: Array<{ id: string; title: string }>;
}

export function SectionNav({ items }: SectionNavProps) {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={t(ui.nav.levelsLabel)}
      className="pointer-events-auto fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-1.5">
        {items.map((item, i) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  "group flex items-center gap-3 rounded-full px-2 py-1.5 transition-colors",
                  isActive ? "text-sky-200" : "text-slate-500 hover:text-sky-300",
                ].join(" ")}
              >
                <span
                  className={[
                    "block h-[2px] rounded-full transition-all duration-300",
                    isActive
                      ? "w-8 bg-sky-300"
                      : "w-4 bg-current/40 group-hover:w-6 group-hover:bg-sky-400/60",
                  ].join(" ")}
                />
                <span
                  className={[
                    "font-mono text-[10px] font-semibold tracking-wider tabular-nums",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-80",
                    "transition-opacity duration-200",
                  ].join(" ")}
                >
                  {String(i).padStart(2, "0")} · {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
