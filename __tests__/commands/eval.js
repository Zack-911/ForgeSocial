module.exports = {
  name: 'ev',
  type: 'messageCreate',
  code: `
    $eval[$message]
  `,
};
