<template>
  <div class="container">
    <nav>
      <h1>Market Kombat</h1>
    </nav>

    <div class="explanation">
      <button class="explanation-toggle" @click="isExplanationVisible = !isExplanationVisible">
        <h2>⚙️ Comment ça marche ?</h2>
        <span class="toggle-icon" :class="{ 'rotated': isExplanationVisible }">▼</span>
      </button>
      <div class="explanation-content" :class="{ 'visible': isExplanationVisible }">
        <p>Pour chaque stratégie, nous simulons 6000 scénarios différents, mois par mois sur toute la période, en
          utilisant :</p>
        <ul>
          <li>Les rendements historiques moyens des actifs sélectionnés</li>
          <li>Leur volatilité observée sur une base mensuelle</li>
          <li>Les frais de transaction et de gestion</li>
        </ul>
        <p>Pour déterminer le vainqueur, nous comparons :</p>
        <ul>
          <li>La distribution des capitaux finaux entre les deux stratégies</li>
          <li>Le ratio de victoire : pourcentage des scénarios où une stratégie surperforme l'autre</li>
          <li>Une marge d'erreur de 5% est appliquée pour éviter les victoires non significatives</li>
        </ul>
      </div>
    </div>

    <div class="disclaimer">
      <p>
        Avis de non-responsabilité: Cet outil de simulation n'est fourni qu'à titre éducatif
        et informatif. Les résultats présentés reposent sur des hypothèses simplifiées et des données historiques qui ne
        reflètent pas nécessairement la complexité des marchés financiers. Les rendements simulés ne prennent pas en
        compte tous les frais, taxes et coûts de transaction potentiels. Les auteurs ne fournissent aucun conseil en
        investissement et ne peuvent être tenus responsables des décisions d'investissement prises sur la base de ces
        simulations. Les performances passées ne préjugent pas des performances futures, et les résultats réels peuvent
        différer significativement des projections présentées. Nous vous recommandons de consulter un conseiller
        financier qualifié avant toute décision d'investissement.
      </p>
    </div>

    <div class="time-horizon">
      <label for="timeHorizon">Horizon temporel (années)</label>
      <input type="number" id="timeHorizon" v-model="selectedTimeHorizon" min="5" max="30" />
    </div>

    <!-- Combat Arena -->
    <div class="combat-arena">
      <ChallengerPlaceholder ref="challenger1" title="Challenger 1" placeholder-text="Placeholder Gauche" variant="blue"
        :timeHorizon="parseInt(selectedTimeHorizon)" />

      <div class="versus">VS</div>

      <ChallengerPlaceholder ref="challenger2" title="Challenger 2" placeholder-text="Placeholder Droite" variant="red"
        :timeHorizon="parseInt(selectedTimeHorizon)" />
    </div>

    <div class="button-container">
      <button @click="runSimulation" :disabled="isLoading" class="fight-button">
        <span class="lucide-swords"></span>
        <span>
          {{ isLoading ? 'FIGHTING...' : '⚔️ READY? FIGHT! ⚔️' }}
        </span>
        <span class="lucide-swords"></span>

        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </button>
    </div>

    <ResultsView ref="resultsSection" v-if="resultsAvailable" :challenger1="challenger1Results"
      :challenger2="challenger2Results" />

    <SimulationDetails v-if="resultsAvailable" :challenger1Results="challenger1Results"
      :challenger2Results="challenger2Results" :timeHorizon="parseInt(selectedTimeHorizon)" />
  </div>
</template>

<script>
import ChallengerPlaceholder from './ChallengerPlaceholder.vue'
import ResultsView from './ResultsView.vue'
import SimulationDetails from './SimulationDetails.vue';

export default {
  name: 'InvestmentSimulator',
  components: {
    ChallengerPlaceholder,
    ResultsView,
    SimulationDetails
  },
  data() {
    return {
      selectedTimeHorizon: '10',
      resultsAvailable: false,
      isLoading: false,
      challenger1Results: null,
      challenger2Results: null,
      isExplanationVisible: false,
    }
  },
  methods: {
    async runSimulation() {
      this.isLoading = true
      this.resultsAvailable = false

      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(100); // 0.1 second delay

      // Get results from both challengers
      const [results1, results2] = await Promise.all([
        this.$refs.challenger1.computeResults(),
        this.$refs.challenger2.computeResults()
      ]);

      // Update results
      this.challenger1Results = {
        name: 'Challenger 1',
        ...results1,
      }

      this.challenger2Results = {
        name: 'Challenger 2',
        ...results2
      }

      this.resultsAvailable = true
      this.isLoading = false

      await this.$nextTick();
      if (this.$refs.resultsSection) {
        this.$refs.resultsSection.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
  }
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #0f172a;
}

.container {
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  background-color: #0f172a;
}

nav {
  margin: -1rem -1rem 1.5rem -1rem;
  padding: 1rem 1.5rem;
  background-color: #1e293b;
  border-bottom: 2px solid #fbbf24;
  box-shadow: 0 4px 6px -1px rgb(251 191 36 / 0.2);
}

nav h1 {
  font-size: 1.875rem;
  font-weight: bold;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transform: skewX(-6deg);
}

.disclaimer {
  border-left: 4px solid #ef4444;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: rgba(239, 68, 68, 0.1);
  transform: skewX(-3deg);
}

.disclaimer p {
  color: #f87171;
  font-weight: bold;
}

.time-horizon {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-horizon label {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.time-horizon input {
  width: 12rem;
  padding: 0.5rem;
  border: 2px solid #fbbf24;
  border-radius: 0.375rem;
  background-color: #1e293b;
  color: #fbbf24;
}

.time-horizon input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.5);
}

.combat-arena {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  min-height: fit-content;
}

.versus {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 2.25rem;
  font-weight: bold;
}

.fight-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem 3rem;
  background: linear-gradient(to right, #f59e0b, #ef4444);
  border-radius: 0.5rem;
  border: 4px solid #fcd34d;
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fight-button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #fbbf24, #f87171);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.fight-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.corner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 4px solid #fcd34d;
}

.corner-tl {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
}

.corner-tr {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
}

.corner-bl {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
}

.corner-br {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fade-in-down 0.5s ease-out;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
}

.explanation {
  margin-bottom: 2rem;
  background-color: #1e293b;
  border-radius: 0.5rem;
  border-left: 4px solid #fbbf24;
}

.explanation-toggle {
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.explanation-toggle:hover {
  background-color: rgba(251, 191, 36, 0.1);
}

.explanation h2 {
  color: #fbbf24;
  font-size: 1.125rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.toggle-icon {
  color: #fbbf24;
  transition: transform 0.3s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.explanation-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  color: #e2e8f0;
  padding: 0 1.5rem;
}

.explanation-content.visible {
  max-height: 500px;
  /* Adjust this value based on your content */
  padding-bottom: 1.5rem;
}

.explanation-content p {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.explanation-content ul {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
}

.explanation-content li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.explanation-content li::marker {
  color: #fbbf24;
}
</style>