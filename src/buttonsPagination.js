module.exports = {
  async function buttonPaginator(message, options = {}) {
    if (!message) {
      throw new Error('Discord.js Pagination Error: message argument wad not specified')
    }
    if (typeof message !== 'object') {
      throw new TypeError('Discord.js Pagination Error: message must be an object')
    }

    let nextButtonColor = 'SUCCESS';
    let previousButtonColor = 'DANGER';

    if (options.nextButtonColor) {
      if (typeof options.nextButtonColor !== 'string) {
        throw new TypeError('Discord.js Pagination Error: nextButtonColor argument must be a string')
      }
      const possibilities = ["DANGER", "SUCCESS", "PRIMARY", "SECONDARY"];
      if (!possibilities[options.nextButtonColor]) {
        throw new TypeError('Discord.js Pagination Error: nextButtonColor is not a valid style (avaible styles are SUCCESS, PRIMARY, SECONDARY and DANGER)')
      }
      if (possibilities[options.nextButtonColor]) {
        nextButtonColor = options.nextButtonColor;
      }
    }

    if (options.previousButtonColor) {
      if (typeof options.previousButtonColor !== 'string) {
        throw new TypeError('Discord.js Pagination Error: nextButtonColor argument must be a string')
      }
      const possibilities = ["DANGER", "SUCCESS", "PRIMARY", "SECONDARY"];
      if (!possibilities[options.previousButtonColor]) {
        throw new TypeError('Discord.js Pagination Error: nextButtonColor is not a valid style (avaible styles are SUCCESS, PRIMARY, SECONDARY and DANGER)')
      }
      if (possibilities[options.previousButtonColor]) {
        nextButtonColor = options.previousButtonColor;
      }
    }
