import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";
import Sidebar from "./Sidebar";

export default function PageContainer({ title, description, eyebrow, actions, sidebar = false, children, className }) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className={cn("flex gap-10", sidebar && "items-start")}>
        {sidebar ? <Sidebar /> : null}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("min-w-0 flex-1", className)}
        >
          {title ? (
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                {eyebrow ? (
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
                ) : null}
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
                {description ? (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
                ) : null}
              </div>
              {actions}
            </header>
          ) : null}
          {children}
        </motion.main>
      </div>
    </div>
  );
}
