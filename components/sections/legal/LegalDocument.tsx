import type { ReactNode } from "react";
import SmartLink from "@/components/ui/SmartLink";
import { LEGAL_DOCS, type LegalBlock, type LegalDoc } from "@/lib/legal";

const pad = (n: number) => String(n).padStart(2, "0");

/* [label](href) and **bold** — the only markup the documents use. */
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1] !== undefined) {
      const href = m[2];
      out.push(
        // a mailto is not a page, so it must not open a blank tab the way SmartLink's externals do
        href.startsWith("mailto:") ? (
          <a key={at} href={href}>
            {m[1]}
          </a>
        ) : (
          <SmartLink key={at} href={href}>
            {m[1]}
          </SmartLink>
        ),
      );
    } else {
      out.push(<strong key={at}>{m[3]}</strong>);
    }
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "h3") return <h3>{block.text}</h3>;
  if (block.kind === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className={block.emphasis ? "db-legal__emphasis" : undefined}>
      <Inline text={block.text} />
    </p>
  );
}

/**
 * The body of a legal document: one reading column of sections, each opening
 * with its plain-English version. No script — every section keeps its id, so
 * links like /privacy#cookies still land on it.
 */
export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const other = LEGAL_DOCS.find((d) => d.path !== doc.path) ?? doc;

  return (
    <section className="db-legal bg-page" aria-label={doc.name}>
      <div className="db-shell">
        <article className="db-legal__doc">
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="db-legal__section">
              <header className="db-legal__head">
                <span className="db-legal__num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h2 id={`${s.id}-h`} className="db-legal__title">
                  {s.title}
                </h2>
              </header>

              <div className="db-legal__short">
                <p className="db-legal__short-label">In short</p>
                <p className="db-legal__short-text">{s.summary}</p>
              </div>

              <div className="db-legal__body">
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </div>
            </section>
          ))}

          <footer className="db-legal__end">
            <SmartLink href={other.path} className="db-legal__next">
              <span className="db-legal__next-label">Read next</span>
              <span className="db-legal__next-title">{other.name}</span>
              <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SmartLink>
            <a href="#top" className="db-legal__top">
              Back to top
            </a>
          </footer>
        </article>
      </div>
    </section>
  );
}
