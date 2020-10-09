export default {
  id: 'demo',
  slug: 'demo',
  version: '1.0.0',
  questions: [
    {
      id: '10',
      version: '1.0.0',
      type: 'essay',
      text: `# What happens if we run this code?
      \n Is this code valid? Why or why not?
      \n <pre>
let numberOfTentacles = 10;
numberOfTentacles = 'eight';
console.log(typeof(numberOfTentacles));</pre>`,
      explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '20',
      version: '1.0.0',
      type: 'multiple-choice',
      text: 'How long have you been programming?',
      choices: [
        {value: '0-2', text: '0–2 years'},
        {value: '2-5', text: '2–5 years'},
        {value: '5-10', text: '5–10 years'},
        {value: '10-more', text: 'more than 10 years'},
      ],
      // correctAnswer: 'first',
      // explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '30',
      version: '1.0.0',
      type: 'multiple-image-choice',
      text: `# Which one of these diagrams best matches your sketch and our mental model after that code runs?`,
      choices: [
        {
          value: 'a',
          text: 'A',
          image:
            'https://images.typeform.com/images/MyEfFAET2Bc5/image/default',
        },
        {
          value: 'b',
          text: 'B',
          image:
            'https://images.typeform.com/images/RhyMWGtGYKfc/image/default',
        },
        {
          value: 'c',
          text: 'C',
          image:
            'https://images.typeform.com/images/Tz2tC94NSSEp/image/default',
        },
        {
          value: 'd',
          text: 'D',
          image:
            'https://images.typeform.com/images/gDeJqjnHP9aP/image/default',
        },
      ],
      correctAnswer: 'a',
      explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '40',
      version: '1.0.0',
      type: 'theater',
      text: 'Lorem ipsum dolor sit amet?',
      explanation: 'Explanation lorem ipsum dolor sit amet.',
    },
    {
      id: '50',
      version: '1.0.0',
      type: 'sketch',
      text: 'Sketch a diagram of your JavaScript Universe.',
    },
  ],
}
