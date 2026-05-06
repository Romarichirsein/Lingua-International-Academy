export const MOCK_COURSES = [
  {
    id: "project-management-trello",
    title: "Project Management with Trello",
    description: "Apprenez à gérer vos projets de manière agile et efficace avec Trello. De la configuration de base aux automatisations avancées.\n\nCe cours est conçu pour vous aider à maîtriser l'organisation visuelle de vos projets. Vous apprendrez à créer des tableaux, des listes et des cartes, ainsi qu'à collaborer avec votre équipe en temps réel.",
    instructor: "Sarah Jenkins",
    duration: "4 semaines",
    level: "Débutant",
    price: 150000,
    youtubeId: "vBvPzE2x-4o",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    category: "Business",
    objectives: [
      "Configurer un espace de travail Trello",
      "Utiliser les méthodologies Kanban et Agile",
      "Automatiser les tâches récurrentes",
      "Intégrer Trello avec d'autres outils (Slack, Google Drive)"
    ],
    prerequisites: [
      "Aucun pré-requis technique",
      "Un compte Trello gratuit"
    ],
    curriculum: [
      {
        module_title: "Module 1: Introduction à Trello",
        lessons: [
          { title: "Présentation de l'interface", duration: "10:30", type: "video" },
          { title: "Création de votre premier tableau", duration: "15:45", type: "video" },
          { title: "Les raccourcis clavier essentiels", duration: "5 min", type: "text" },
        ]
      },
      {
        module_title: "Module 2: Gestion Agile",
        lessons: [
          { title: "Le système Kanban", duration: "20:00", type: "video" },
          { title: "Gérer les sprints et backlogs", duration: "25:15", type: "video" },
          { title: "Quiz de fin de module", duration: "10 min", type: "exam" },
        ]
      },
      {
        module_title: "Module 3: Automatisations (Butler)",
        lessons: [
          { title: "Introduction à Butler", duration: "18:20", type: "video" },
          { title: "Créer des règles d'automatisation", duration: "22:10", type: "video" },
        ]
      },
      {
        module_title: "Examen Final",
        lessons: [
          { title: "Validation des compétences", duration: "30 min", type: "exam" }
        ]
      }
    ]
  },
  {
    id: "financial-analyst-course",
    title: "Complete Financial Analyst Course",
    description: "Le cours complet pour devenir un analyste financier performant. Modélisation, Excel avancé, et analyse de données.\n\nCe programme intensif couvre tout ce dont vous avez besoin pour travailler en finance d'entreprise, banque d'investissement ou conseil.",
    instructor: "Michael Chen",
    duration: "8 semaines",
    level: "Intermédiaire",
    price: 350000,
    youtubeId: "9o4v0GjE49o",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Finance",
    objectives: [
      "Maîtriser Excel pour la modélisation financière",
      "Analyser des états financiers complexes",
      "Valoriser une entreprise (DCF, Multiples)",
      "Préparer des présentations de niveau direction"
    ],
    prerequisites: [
      "Bases en comptabilité",
      "Connaissance basique d'Excel"
    ],
    curriculum: [
      {
        module_title: "Module 1: Excel Avancé",
        lessons: [
          { title: "Raccourcis sans souris", duration: "12:00", type: "video" },
          { title: "Fonctions financières", duration: "28:30", type: "video" },
          { title: "Exercice pratique: Nettoyage de données", duration: "30 min", type: "text" },
        ]
      },
      {
        module_title: "Module 2: Modélisation DCF",
        lessons: [
          { title: "Concept de la valeur temps", duration: "15:45", type: "video" },
          { title: "Construire un modèle DCF de A à Z", duration: "45:00", type: "video" },
          { title: "Quiz sur la valorisation", duration: "15 min", type: "exam" },
        ]
      }
    ]
  },
  {
    id: "sales-training",
    title: "Sales Training: Master the Art of Selling",
    description: "Techniques de vente B2B et B2C, négociation, et psychologie de l'acheteur pour exploser vos quotas.",
    instructor: "David Rodriguez",
    duration: "6 semaines",
    level: "Avancé",
    price: 250000,
    youtubeId: "4bZJ_a6w23M",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
    category: "Vente",
    objectives: [
      "Mener des appels de prospection efficaces",
      "Gérer les objections avec confiance",
      "Appliquer les principes de psychologie de vente"
    ],
    prerequisites: ["Aucun pré-requis particulier"],
    curriculum: [
      {
        module_title: "Module 1: Les bases de la vente",
        lessons: [
          { title: "Psychologie de l'acheteur", duration: "20:00", type: "video" },
          { title: "Scripts d'appels à froid", duration: "10 min", type: "text" }
        ]
      }
    ]
  },
  {
    id: "blender-creator",
    title: "Complete Blender Creator",
    description: "Créez des modèles 3D époustouflants, des animations et des rendus photoréalistes avec Blender 4.0.",
    instructor: "Elena Rostova",
    duration: "12 semaines",
    level: "Débutant à Avancé",
    price: 280000,
    youtubeId: "TPrnSACiTJ4",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    category: "Design 3D",
    objectives: [
      "Modéliser des objets 3D complexes",
      "Créer des textures et matériaux réalistes",
      "Animer des scènes 3D",
      "Rendre avec Cycles et Eevee"
    ],
    prerequisites: ["Un ordinateur capable de faire tourner Blender 4.0"],
    curriculum: [
      {
        module_title: "Module 1: Les bases de Blender",
        lessons: [
          { title: "Navigation dans l'interface", duration: "15:00", type: "video" },
          { title: "Modéliser une tasse à café", duration: "35:00", type: "video" },
          { title: "Exercice: Rendu de la tasse", duration: "20 min", type: "text" }
        ]
      }
    ]
  }
];

export const CATEGORIES = ["Tous", "Business", "Finance", "Vente", "Design 3D", "Langues", "Développement"];
