const { MessageActionRow } = require("discord.js");
const paginationEmbed = async (msg, pages, buttonList, timeout = 120000) => {
  if (!msg && !msg.channel) throw new Error("Channel is inaccessible.");
  if (!pages) throw new Error("Pages are not given.");
  if (!buttonList) throw new Error("Buttons are not given.");
  if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
    throw new Error(
      "Link buttons are not supported with discordjs-button-pagination"
    );
  if (buttonList.length !== 2) throw new Error("Need two buttons.");
  let page = 0;
  const row = new MessageActionRow().addComponents(buttonList);
  const curPage = await msg.channel.send({
    embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
    components: [row],
  });
  const filter = (i) =>
    i.customId === buttonList[0].customId ||
    i.customId === buttonList[1].customId;
  const collector = await curPage.createMessageComponentCollector(filter, {
    time: timeout,
  });
  collector.on("collect", async (i) => {
    switch (i.customId) {
      case buttonList[0].customId:
        page = page > 0 ? --page : pages.length - 1;
        await i.deferUpdate();
        await i.editReply({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [row],
        });
        break;
      case buttonList[1].customId:
        page = page + 1 < pages.length ? ++page : 0;
        await i.deferUpdate();
        await i.editReply({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [row],
        });
        break;
      default:
        break;
    }
  });
  collector.on("end", () => {
    if (!curPage.deleted) {
      const disabledRow = [
        buttonList[0].setDisabled(true),
        buttonList[1].setDisabled(true),
      ];
      curPage.edit({
        embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
        components: [disabledRow],
      });
    }
  });

  return curPage;
};
module.exports = paginationEmbed;
