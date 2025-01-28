# Invest Arena 🏦

## Description du projet

Invest Arena est une application web interactive permettant de comparer différentes stratégies d'investissement sur le long terme. L'application utilise une approche Monte-Carlo pour modéliser et visualiser les performances de différentes stratégies d'investissement. Cette méthode permet d'analyser statistiquement les résultats possibles en tenant compte de la nature aléatoire des marchés financiers. Les stratégies comparables incluent notamment :

* Investissement en ETF (MSCI World, S&P 500, Nasdaq) via :
  * Versement unique (Lumpsum)
  * Versements mensuels réguliers (DCA - Dollar Cost Averaging)
* Investissement immobilier locatif (LMNP)

Pour chaque stratégie, l'application applique une approche Monte-Carlo avec 6000 itérations, permettant d'obtenir une distribution statistiquement significative des résultats possibles. Chaque itération prend en compte :
* Les rendements historiques moyens des actifs
* La volatilité mensuelle
* Les frais de transaction et de gestion
* Pour l'immobilier : les taux d'emprunt, l'assurance, le taux d'occupation, etc.

L'interface permet de visualiser et comparer les résultats via :
* Des graphiques d'évolution du capital
* Des distributions de probabilité des résultats
* Des métriques clés (capital final, plus-values, etc.)
* Un système de "combat" entre stratégies avec détermination du vainqueur

## Installation et lancement local

### Prérequis
* Node.js (version 16 ou supérieure)
* npm (généralement installé avec Node.js)

### Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_REPO]
cd invest-arena
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173` (ou un autre port si 5173 est déjà utilisé).

### Build pour la production

Pour créer une version optimisée pour la production :
```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## Guide de développement

### Configuration recommandée

#### Éditeur
Visual Studio Code (VSCode) est recommandé avec les extensions suivantes :
* Volar (Vue Language Features)
* ESLint
* Prettier
* Vue VSCode Snippets

#### Configuration VSCode recommandée

Ajouter ces paramètres dans votre `settings.json` :
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  }
}
```

### Structure du projet

```
invest-arena/
├── src/
│   ├── components/
│   │   ├── ChallengerPlaceholder.vue    # Composant de base pour les stratégies
│   │   ├── DCAStrategy.vue              # Stratégie d'investissement régulier
│   │   ├── LMNPStrategy.vue             # Stratégie immobilière
│   │   ├── LumpsumStrategy.vue          # Stratégie d'investissement unique
│   │   ├── ResultsView.vue              # Affichage des résultats
│   │   └── SimulationDetails.vue        # Détails des simulations
│   ├── simulator.js                      # Logique de simulation
│   └── InvestArena.vue                  # Composant principal
├── package.json
└── vite.config.js
```

### Principaux composants

* `InvestArena.vue` : Composant racine gérant l'interface principale
* `ChallengerPlaceholder.vue` : Conteneur pour les stratégies d'investissement
* Stratégies : 
  * `DCAStrategy.vue` : Investissement régulier en ETF
  * `LumpsumStrategy.vue` : Investissement unique en ETF
  * `LMNPStrategy.vue` : Investissement immobilier
* `ResultsView.vue` : Visualisation des résultats avec graphiques
* `simulator.js` : Moteur de simulation des différentes stratégies

### Technologies utilisées

* Vue 3 : Framework JavaScript front-end
* Chart.js : Visualisation des données financières
* Vite : Build tool et serveur de développement