import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

/** Markdown aus Keystatic rendern: Absätze, Listen, Links, Fett. Keine Überschriften (die kommen aus den Feldern). */
export function Markdown({ text, className = 'prose' }: { text: string | null | undefined; className?: string }) {
  if (!text) return null;
  return (
    <div className={className}>
      <ReactMarkdown
        allowedElements={['p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br']}
        unwrapDisallowed
        components={{
          a: ({ href, children }) => {
            const h = href ?? '#';
            if (h.startsWith('/')) return <Link href={h}>{children}</Link>;
            const ext = /^https?:/.test(h);
            return (
              <a href={h} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>
                {children}
              </a>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
