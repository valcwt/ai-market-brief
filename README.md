# ⚡ AI Market Brief

Dashboard de veille financière alimenté par l'IA. Génère un brief marché quotidien à partir de news financières en temps réel.

## Stack
- **Frontend + Backend** : Next.js 14 (App Router)
- **IA** : OpenRouter (modèles gratuits : DeepSeek, Llama, Mistral)
- **Hébergement** : Vercel (gratuit)
- **Sources news** : Yahoo Finance RSS, Reuters RSS

---

## 🚀 Démarrage rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer l'API key OpenRouter
```bash
cp .env.local.example .env.local
```
Éditez `.env.local` et remplacez `your_openrouter_api_key_here` par votre clé.

**Obtenir une clé gratuite :**
1. Créez un compte sur [openrouter.ai](https://openrouter.ai)
2. Allez dans Settings → API Keys → Create Key
3. Les modèles `*:free` ne nécessitent pas de crédits

### 3. Lancer en développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 📦 Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ajouter la variable d'environnement
vercel env add OPENROUTER_API_KEY
```

Ou via l'interface Vercel :
1. Importez le repo GitHub
2. Ajoutez `OPENROUTER_API_KEY` dans Settings → Environment Variables
3. Redéployez

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/brief/route.ts   # API endpoint backend
│   ├── layout.tsx
│   ├── page.tsx             # Dashboard principal
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── GenerateButton.tsx
│   ├── BriefCard.tsx        # Affichage du brief IA
│   ├── SourcesList.tsx      # Headlines sources
│   └── StatusBar.tsx
└── lib/
    ├── fetchNews.ts         # Récupération RSS feeds
    └── openrouter.ts        # Client OpenRouter
```

---

## 🗺️ Roadmap

### V1 (actuel)
- [x] Dashboard dark mode
- [x] Bouton Generate
- [x] Fetch news RSS (Yahoo Finance, Reuters)
- [x] Analyse IA via OpenRouter
- [x] Sentiment (bullish/bearish/neutral)
- [x] Key points structurés
- [x] Déploiement Vercel

### V2
- [ ] Historique des briefs
- [ ] Supabase pour le stockage
- [ ] Refresh automatique

### V3
- [ ] Notifications Telegram
- [ ] Génération automatique à 8h
- [ ] Watchlist ES/NQ
- [ ] Score de sentiment

---

## ⚠️ Disclaimer
Cet outil est fourni à titre informatif uniquement. Ce n'est pas un conseil financier.
