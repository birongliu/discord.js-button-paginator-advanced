module.exports = {
  async function buttonPaginator(message, options = {}) {
    if (!message) {
      throw new Error('Discord.js Pagination Error: message argument wad not specified')
    }
    if (typeof message !== 'object') {
      throw new TypeError('Discord.js Pagination Error: message must be an object')
    }
    let nextButton = new MessageButton().setStyle('SUCCESS').setLabel('Next').setCustomId()
    let previousButton = new MessageButton().setStyle('DANGER').setLabel('Previous').setCustomId()
    options.buttons = []
    options.embeds = []
