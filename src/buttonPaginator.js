module.exports = {
  async function buttonPaginator(message, options = {}) {
    if (!message) {
      throw new Error('Discord.js Pagination Error: message argument wad not specified')
    }
    if (typeof message !== 'object') {
      throw new TypeError('Discord.js Pagination Error: message must be an object')
    }

    const { MessageButton, MessageActionRow } = require('discord.js')

    function getRandomString(length) {
      const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
        );
      }
      return result;
    }

    const nextId = options.nextButton.customId || getRandomString(20)
    const previousId = options.previousButton.customId || getRandomString(20)
    const homeId = options.homeButton.customId || getRandomString(20)

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

    let page = 0;
    let send;
    if (typeof message.author.username == 'string') {
      send = message.channel.send;
    } else if (typeof message.user.username == 'string') {
      if (message.deferred) {
        send = interaction.editReply;
      } else if (!message.deferred) {
        send = message.reply;
      }
    }
    options.components.forEach(Co => {
      const filter = (i) => {
        i.customId == nextId || i.customId == previousId || i.customId == homeId || i.customId == Co.customId
      }
    })

    const msg = send({ embeds: options.embeds[page], components: allComponents })
    const collector = await msg.createMessageComponentCollector({
      filter: filter,
      time: timeout,
    });

    collector.on('collect', async (i) => {
      switch (i.customId) {
        case nextId:
        page = page + 1 < options.embeds.length ? ++page : 0;
        break;
        case previousId:
        page = page > 0 ? --page : options.embeds.length - 1;
        break;
        case homeId:
        page = 0;
        default:
        break;
      }
      await i.deferUpdate();
      await i.update({
        embeds: options.embeds[page],
        components: allComponents,
      })
      collector.resetTimer();
    })

    collector.on('end', async () => {
      let edit;
      if (typeof message.author.username == 'string') {
        if (!msg.deleted) {
          edit = msg.edit;
        }
        if (message.deleted) {
          return;
        }
      }
      if (typeof message.user.username == 'string') {
        if (message.ephemeral) {
          return;
        }
        if (!message.ephemeral && !message.deleted) {
          if (message.defferred) {
            edit = message.editReply;
          }
          if (!message.defferred) {
            edit = message.editReply;
          }
        }
      }
      const newNext = nextButton.setDisabled(true)
      const newHome = homeButton.setDisabled(true)
      const newPrevious = previousButton.setDisabled(true)
      const row1D = new MessageActionRow().addComponents([newPrevious, newHome, newNext]
      const allComponentsD = [row1D]
      if (options.components.length > 0) {
        options.components,forEach(CoM => {
          allConponentsD.push(CoM)
        })
      }
      edit({embeds: options.embeds[page], components: allComponentsD})
    })
  }
}
