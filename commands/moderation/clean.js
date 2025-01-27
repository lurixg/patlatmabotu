const Discord = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class CleanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "clean",
      memberName: "clean",
      group: "moderation",
      description: "Kanaldaki mesajları ve sabitlenmiş mesajları temizler",
      guildOnly: true,
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async run(message, args) {
    message.delete();

    const { channel } = message;

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Temizleme Komutu")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(
        "Hata! Geçerli bir sayı girin\n`.spamroles <sayı> | .spamroles 3`"
      )
      .setColor("#ff0000");

    if (!args || isNaN(parseFloat(args))) {
      channel.send(noNumEmbed);
      return;
    }

    let count = Math.round(parseFloat(args));
    let initialCount = count;

    if (count > 500) {
      count = 500;
      initialCount = 500;
    }

    while (count > 100) {
      await channel
        .bulkDelete(100)
        .catch((err) => console.error(err + "\n API Hatası yakalandı!"));
      count -= 100;
    }

    if (count > 0) {
      await channel
        .bulkDelete(count)
        .catch((err) => console.error(err + "\n API Hatası yakalandı!"));
    }

    if (initialCount == 1) {
      channel.send(`Başarıyla 1 mesaj silindi`).then((m) =>
        setTimeout(() => {
          m.delete();
        }, 6000)
      );
    } else if (initialCount > 1) {
      channel.send(`Başarıyla ${initialCount} mesaj silindi`).then((m) =>
        setTimeout(() => {
          m.delete();
        }, 6000)
      );
    } else {
      channel.send(`**00** mesaj silindi!`).then((m) =>
        setTimeout(() => {
          m.delete();
        }, 6000)
      );
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: purge`);
  }
};
