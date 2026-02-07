(function () {
  "use strict";

  // Optional per-word overrides for K-2 / EAL mode.
  // Supports:
  // - root: { def_young, sentence_young } (English default)
  // - language-specific: { en: { def_young, sentence_young }, es: {...}, zh: {...}, tl: {...} }
  window.YOUNG_AUDIENCE_OVERRIDES = {
    cat: {
      def_young: "A small pet with whiskers that likes to nap and play.",
      sentence_young: "The cat sat by the window and watched a bird."
    },
    dog: {
      def_young: "A friendly pet that can guard the house and play fetch.",
      sentence_young: "The dog ran to the door when it heard the keys."
    },
    baby: {
      def_young: "A very young child who needs care and comfort.",
      sentence_young: "The baby held a spoon and laughed."
    },
    pig: {
      def_young: "A farm animal with a round nose.",
      sentence_young: "The pig rolled in the mud on the farm."
    },
    tax: {
      def_young: "Money people pay to help community services.",
      sentence_young: "Adults pay tax to support roads, schools, and parks."
    },
    web: {
      def_young: "A sticky net made by a spider.",
      sentence_young: "We saw a spider web shining in the morning light."
    },
    vet: {
      def_young: "A doctor who helps animals stay healthy.",
      sentence_young: "The vet checked the puppy and gave it a treat."
    },
    stress: {
      def_young: "A worried feeling in your mind or body.",
      sentence_young: "When I feel stress, I take a slow breath."
    },
    drill: {
      def_young: "A tool that can make holes in wood or walls.",
      sentence_young: "The worker used a drill to fix the shelf."
    },
    kin: {
      def_young: "Your family members and relatives.",
      sentence_young: "My kin came over for a family dinner."
    },
    jam: {
      def_young: "Sweet fruit spread for bread or toast.",
      sentence_young: "I spread jam on my toast for breakfast."
    },
    gap: {
      def_young: "An empty space between two things.",
      sentence_young: "There is a small gap between the boards."
    },
    van: {
      def_young: "A larger vehicle that can carry people or supplies.",
      sentence_young: "The class used a van to travel to the museum."
    },
    hem: {
      def_young: "The folded edge at the bottom of clothing.",
      sentence_young: "She stitched the hem so the dress fit well."
    },
    bug: {
      def_young: "A small insect.",
      sentence_young: "A tiny bug landed on the leaf."
    }
  };
})();
