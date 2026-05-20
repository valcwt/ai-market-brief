// src/lib/fetchNews.ts
// Fetches financial news from free public RSS feeds (no API key needed)

export interface NewsItem {
  title: string;
  source: string;
  pubDate: string;
}

const RSS_FEEDS = [
  {
    url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=SPY,QQQ,ES=F,NQ=F&region=US&lang=en-US",
    source: "Yahoo Finance",
  },
  {
    url: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best",
    source: "Reuters",
  },
];

async function parseRSS(xml: string, source: string): Promise<NewsItem[]> {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/;
  const dateRegex = /<pubDate>(.*?)<\/pubDate>/;

  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const titleMatch = titleRegex.exec(block);
    const dateMatch = dateRegex.exec(block);

    if (titleMatch) {
      const title = (titleMatch[1] || titleMatch[2] || "").trim();
      if (title && title.length > 10) {
        items.push({
          title,
          source,
          pubDate: dateMatch ? dateMatch[1] : new Date().toUTCString(),
        });
      }
    }
  }
  return items.slice(0, 8);
}

export async function fetchFinancialNews(): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const res = await fetch(feed.url, {
        next: { revalidate: 300 }, // cache 5 min
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MarketBrief/1.0)" },
      });
      if (res.ok) {
        const xml = await res.text();
        const items = await parseRSS(xml, feed.source);
        allNews.push(...items);
      }
    } catch {
      // Feed unavailable — continue
    }
  }

  // Fallback curated headlines if feeds are unavailable (for demo / Vercel cold start)
  if (allNews.length === 0) {
    return getFallbackNews();
  }

  return allNews.slice(0, 15);
}

function getFallbackNews(): NewsItem[] {
  const now = new Date().toUTCString();
  return [
    { title: "Fed signals caution on rate cuts amid sticky inflation data", source: "Demo", pubDate: now },
    { title: "S&P 500 futures edge higher as tech earnings beat estimates", source: "Demo", pubDate: now },
    { title: "Dollar strengthens against euro on diverging central bank paths", source: "Demo", pubDate: now },
    { title: "Nasdaq 100 holds key support level ahead of PCE data release", source: "Demo", pubDate: now },
    { title: "Oil prices dip on surprise inventory build, demand concerns persist", source: "Demo", pubDate: now },
    { title: "Treasury yields rise as bond market prices in higher-for-longer rates", source: "Demo", pubDate: now },
    { title: "Gold retreats from record highs as real yields tick up", source: "Demo", pubDate: now },
    { title: "VIX options market signals traders bracing for volatility spike", source: "Demo", pubDate: now },
  ];
}
