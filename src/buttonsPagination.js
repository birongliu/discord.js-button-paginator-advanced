module.exports = {
  async function buttonPaginator(message, options = {}) {
    if (!message) {
      throw new Error('Discord.js Pagination Error: message argument wad not specified')
    }
    if (typeof message !== 'object') {
      throw new TypeError('Discord.js Pagination Error: message must be an object')
    }
    const { MessageButton, MessageActionRow } = require('discord.js')
    let nextButton = options.nextButton || new MessageButton().setStyle('SUCCESS').setLabel('Next').setCustomId()
    let previousButton = options.previousButton || new MessageButton().setStyle('DANGER').setLabel('Previous').setCustomId()
    let homeButton = options.homeButton || new MessageButton().setStyle('SECONDARY').setLabel('home').setCustomId()
    options.components = []
    options.embeds = []
    
    const row1 = new MessageActionRow().addComponents([previousButton, homeButton, nextButton])
    const allComponents = [row1]

    if (options.components.length > 0) {
      options.components.forEach(C => {
        if (C.constructor.name !== 'MessageActionRow') {
          throw new TypeError('Discord.js Pagination Error: components argument must be a MessageActionRow')
        }

        if (options.components.length == 5 || options.components.length > 5) {
          throw new Error('Discord.js Pagination Error: components argument must be 4 of fewer')
        }
        if (options.components.length < 5) {
          allComponents.push(C)
        }
      })
    }
