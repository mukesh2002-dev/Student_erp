export const syllabusOverview = { overall: 72, subjects: [
  { name: "Mathematics", progress: 72 }, { name: "Science", progress: 68 }, { name: "English", progress: 81 }, { name: "Hindi", progress: 76 }, { name: "Social Science", progress: 70 }, { name: "Computer Science", progress: 65 }
]};

export const mathematicsChapters = [
  { chapter: "Real Numbers", progress: 100, topics: [
    { name: "Euclid's Division Lemma", status: "Completed" },
    { name: "Fundamental Theorem of Arithmetic", status: "Completed" },
    { name: "Irrational Numbers", status: "Completed" },
    { name: "Decimal Expansions", status: "Completed" },
  ]},
  { chapter: "Polynomials", progress: 80, topics: [
    { name: "Zeroes of Polynomial", status: "Completed" },
    { name: "Relationship Between Zeroes", status: "Completed" },
    { name: "Division Algorithm", status: "In Progress" },
    { name: "Graphical Representation", status: "Not Started" },
  ]},
  { chapter: "Pair of Linear Equations", progress: 90, topics: [
    { name: "Graphical Method", status: "Completed" },
    { name: "Substitution Method", status: "Completed" },
    { name: "Elimination Method", status: "Completed" },
    { name: "Cross Multiplication", status: "In Progress" },
  ]},
  { chapter: "Quadratic Equations", progress: 60, topics: [
    { name: "Standard Form", status: "Completed" },
    { name: "Factorisation", status: "Completed" },
    { name: "Quadratic Formula", status: "In Progress" },
    { name: "Nature of Roots", status: "Not Started" },
    { name: "Word Problems", status: "Not Started" },
  ]},
  { chapter: "Triangles", progress: 40, topics: [
    { name: "Similarity", status: "Completed" },
    { name: "BPT Theorem", status: "In Progress" },
    { name: "Pythagoras Theorem", status: "Not Started" },
    { name: "Area of Similar Triangles", status: "Not Started" },
  ]},
];

export const allSyllabus = {
  Mathematics: mathematicsChapters,
  Science: [
    { chapter: "Chemical Reactions", progress: 100, topics: [{ name: "Types of Reactions", status: "Completed" }, { name: "Balancing Equations", status: "Completed" }]},
    { chapter: "Life Processes", progress: 70, topics: [{ name: "Nutrition", status: "Completed" }, { name: "Respiration", status: "In Progress" }, { name: "Circulation", status: "Not Started" }]},
  ],
  English: [
    { chapter: "First Flight", progress: 85, topics: [{ name: "Dust of Snow", status: "Completed" }, { name: "Fire and Ice", status: "Completed" }, { name: "A Tiger in the Zoo", status: "In Progress" }]},
  ]
};
