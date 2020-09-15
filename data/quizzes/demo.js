export default {
  id: 'demo',
  slug: 'demo',
  version: '1.0.0',
  questions: [
    {
      id: '1',
      version: '1.0.0',
      type: 'essay',
      text: 'What do you think about this?',
      explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '2',
      version: '1.0.0',
      type: 'multiple-choice',
      text:
        'This quizzing system supports 4 different question types. It can also validate them. Pick one:',
      choices: [
        {value: 'first', text: 'Open Ended'},
        {value: 'second', text: 'Multiple Choice'},
        {value: 'third', text: 'Sketch'},
        {value: 'fourth', text: 'Theater of Mind'},
      ],
      correctAnswer: 'first',
      explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '3',
      version: '1.0.0',
      type: 'theater',
      text: 'Lorem ipsum dolor sit amet?',
      explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '8',
      version: '1.0.0',
      type: 'sketch',
      text: 'Sketch a diagram of your JavaScript Universe.',
    },
  ],
}
