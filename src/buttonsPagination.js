module.exports = {
  async function buttonPaginator(message, options = {}) {
    if (!message) {
      throw new Error('Discord.js Pagination Error: message argument wad not specified')
    }
    if (typeof message !== 'object') {
      throw new TypeError('Discord.js Pagination Error: message must be an object')
    }

    const { MessageButton, MessageActionRow } = require('discord.js')

    const nextId = 
    const previousId = 
    const homeId = 

    let nextButton = options.nextButton || new MessageButton().setStyle('SUCCESS').setLabel('Next').setCustomId(nextId)
    let previousButton = options.previousButton || new MessageButton().setStyle('DANGER').setLabel('Previous').setCustomId(previousId)
    let homeButton = options.homeButton || new MessageButton().setStyle('SECONDARY').setLabel('home').setCustomId(homeId)
    let timeout = options.paginationTimeout || 120000;
    options.components = []
    options.embeds = []

    if (options.embeds.length == 0) {
      throw new Error('Discord.js Pagination Error: No embeds was provided')
    }
    if (options.embeds.length > 10) {
      throw new Error('Discord.js Pagination Error: embeds must be 10 or fewer')
    }
    
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

    let send;
    if (typeof message.author.username == 'string') {
      send = message.channel.send;
    } else if (typeof message.user.username == 'string') {
      if (message.deferred == true) {
        send = interaction.editReply;
      } else if (messsage.deferred == false) {
        send = message.reply;
      }
    }

    const msg = send({ embeds: options.embeds, components: allComponents })
