export interface TopicEntry {
  name: string;
}

export interface UnitEntry {
  name: string;
  topics: TopicEntry[];
}

export interface SubjectEntry {
  name: string;
  icon: string;
  units: UnitEntry[];
}

export const SUBJECTS: SubjectEntry[] = [
  {
    name: "Chemistry",
    icon: "FlaskConical",
    units: [
      {
        name: "1 – Atomic Structure",
        topics: [
          { name: "Atoms, Elements & Compounds" },
          { name: "Atomic Structure & the Periodic Table" },
          { name: "Electron Configuration" },
          { name: "Isotopes" },
          { name: "Mass Spectrometry" },
        ],
      },
      {
        name: "2 – Bonding & Structure",
        topics: [
          { name: "Ionic Bonding" },
          { name: "Covalent Bonding" },
          { name: "Metallic Bonding" },
          { name: "Intermolecular Forces" },
          { name: "Shapes of Molecules" },
        ],
      },
      {
        name: "3 – Quantitative Chemistry",
        topics: [
          { name: "Moles & Avogadro" },
          { name: "Empirical & Molecular Formulae" },
          { name: "Titration" },
          { name: "Concentration Calculations" },
          { name: "Percentage Yield & Atom Economy" },
        ],
      },
      {
        name: "4 – Energetics",
        topics: [
          { name: "Enthalpy Changes" },
          { name: "Hess's Law" },
          { name: "Bond Enthalpies" },
          { name: "Calorimetry" },
        ],
      },
      {
        name: "5 – Kinetics",
        topics: [
          { name: "Rates of Reaction" },
          { name: "Collision Theory" },
          { name: "Catalysts" },
          { name: "Maxwell-Boltzmann Distribution" },
        ],
      },
      {
        name: "6 – Equilibria",
        topics: [
          { name: "Dynamic Equilibrium" },
          { name: "Le Chatelier's Principle" },
          { name: "Equilibrium Constants Kc" },
          { name: "Equilibrium Constants Kp" },
        ],
      },
      {
        name: "7 – Redox",
        topics: [
          { name: "Oxidation & Reduction" },
          { name: "Oxidation States" },
          { name: "Redox Reactions" },
          { name: "Electrochemical Cells" },
        ],
      },
      {
        name: "8 – Organic Chemistry",
        topics: [
          { name: "Alkanes" },
          { name: "Alkenes" },
          { name: "Alcohols" },
          { name: "Halogenoalkanes" },
          { name: "Organic Analysis" },
          { name: "Polymers" },
          { name: "Carbonyl Compounds" },
          { name: "Carboxylic Acids" },
          { name: "Amines" },
          { name: "Aromatic Chemistry" },
        ],
      },
    ],
  },
  {
    name: "Physics",
    icon: "Atom",
    units: [
      {
        name: "1 – Mechanics",
        topics: [
          { name: "Scalars & Vectors" },
          { name: "Kinematics" },
          { name: "Forces & Newton's Laws" },
          { name: "Momentum" },
          { name: "Work, Energy & Power" },
        ],
      },
      {
        name: "2 – Waves",
        topics: [
          { name: "Wave Properties" },
          { name: "Electromagnetic Spectrum" },
          { name: "Refraction" },
          { name: "Diffraction" },
          { name: "Superposition & Interference" },
          { name: "Standing Waves" },
        ],
      },
      {
        name: "3 – Electricity",
        topics: [
          { name: "Current, Voltage & Resistance" },
          { name: "Ohm's Law" },
          { name: "Series & Parallel Circuits" },
          { name: "EMF & Internal Resistance" },
          { name: "Potential Dividers" },
        ],
      },
      {
        name: "4 – Further Mechanics",
        topics: [
          { name: "Circular Motion" },
          { name: "Simple Harmonic Motion" },
          { name: "Forced Oscillations & Resonance" },
        ],
      },
      {
        name: "5 – Fields",
        topics: [
          { name: "Gravitational Fields" },
          { name: "Electric Fields" },
          { name: "Magnetic Fields" },
          { name: "Electromagnetic Induction" },
        ],
      },
      {
        name: "6 – Nuclear & Particle Physics",
        topics: [
          { name: "Radioactivity" },
          { name: "Nuclear Fission & Fusion" },
          { name: "Particle Physics" },
          { name: "Photoelectric Effect" },
          { name: "Wave-Particle Duality" },
        ],
      },
    ],
  },
  {
    name: "Biology",
    icon: "Dna",
    units: [
      {
        name: "1 – Cell Biology",
        topics: [
          { name: "Cell Structure" },
          { name: "Cell Division" },
          { name: "Transport Across Membranes" },
          { name: "Enzymes" },
        ],
      },
      {
        name: "2 – Organisation",
        topics: [
          { name: "Digestive System" },
          { name: "Circulatory System" },
          { name: "Gas Exchange" },
          { name: "Plant Transport" },
        ],
      },
      {
        name: "3 – Genetics",
        topics: [
          { name: "DNA & RNA" },
          { name: "Protein Synthesis" },
          { name: "Inheritance" },
          { name: "Genetic Engineering" },
          { name: "Evolution & Natural Selection" },
        ],
      },
      {
        name: "4 – Ecology",
        topics: [
          { name: "Ecosystems" },
          { name: "Food Chains & Webs" },
          { name: "Biodiversity" },
          { name: "Human Impact on the Environment" },
        ],
      },
      {
        name: "5 – Homeostasis",
        topics: [
          { name: "Nervous System" },
          { name: "Hormonal Coordination" },
          { name: "Thermoregulation" },
          { name: "Osmoregulation" },
          { name: "Blood Glucose Regulation" },
        ],
      },
    ],
  },
  {
    name: "Mathematics",
    icon: "Calculator",
    units: [
      {
        name: "1 – Pure Mathematics",
        topics: [
          { name: "Algebra & Functions" },
          { name: "Quadratics" },
          { name: "Coordinate Geometry" },
          { name: "Sequences & Series" },
          { name: "Trigonometry" },
          { name: "Differentiation" },
          { name: "Integration" },
          { name: "Exponentials & Logarithms" },
        ],
      },
      {
        name: "2 – Statistics",
        topics: [
          { name: "Data Representation" },
          { name: "Probability" },
          { name: "Statistical Distributions" },
          { name: "Hypothesis Testing" },
        ],
      },
      {
        name: "3 – Mechanics",
        topics: [
          { name: "Kinematics" },
          { name: "Forces & Newton's Laws" },
          { name: "Moments" },
          { name: "Vectors" },
        ],
      },
    ],
  },
  {
    name: "Economics",
    icon: "TrendingUp",
    units: [
      {
        name: "1 – Microeconomics",
        topics: [
          { name: "Demand & Supply" },
          { name: "Elasticity" },
          { name: "Market Failure" },
          { name: "Government Intervention" },
        ],
      },
      {
        name: "2 – Macroeconomics",
        topics: [
          { name: "Aggregate Demand & Supply" },
          { name: "Fiscal Policy" },
          { name: "Monetary Policy" },
          { name: "International Trade" },
          { name: "Economic Growth" },
        ],
      },
    ],
  },
];
