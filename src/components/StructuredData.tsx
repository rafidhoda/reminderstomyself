interface StructuredDataProps {
  type: "WebSite" | "Article" | "CollectionPage";
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}

