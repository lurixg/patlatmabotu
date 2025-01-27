const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SpamEveryoneCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spameveryone",
      group: "raid",
      memberName: "spameveryone",
      description: "Sunucudaki herkese ping spamı yapar",
      guildOnly: true,
      clientPermissions: ["MENTION_EVERYONE"]
    });
  }

  async run(message, args) {
    message.delete();

    const failEmbed = new Discord.MessageEmbed()
      .setAuthor("Herkese Spam Komutu")
      .setColor("#ff0000")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription("Geçersiz argümanlar sağlandı!\n`.spameveryone <sayı>`");

    if (!args) {
      message.channel.send(failEmbed);
      return;
    }
    var count = args;
    if (isNaN(parseFloat(count))) {
      message.channel.send(failEmbed);
      return;
    }
    count = Math.round(count);

    if (count > 40) {
      count = 40;
    }

    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        message.channel.send("@everyone --> **luriXgithub**'u YouTube'da kontrol edin!");
      }, 500);
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: spameveryone`);
  }
};
