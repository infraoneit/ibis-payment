import { Markdown } from './Markdown';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqJsonLd } from '@/lib/seo';

export function Faq({ items, jsonLd = true }: { items: readonly { frage: string; antwort: string }[]; jsonLd?: boolean }) {
  if (!items.length) return null;
  return (
    <>
      {jsonLd && <JsonLd data={faqJsonLd([...items])} />}
      <div className="faq">
        {items.map((f) => (
          <details key={f.frage}>
            <summary>{f.frage}</summary>
            <Markdown text={f.antwort} className="a" />
          </details>
        ))}
      </div>
    </>
  );
}
