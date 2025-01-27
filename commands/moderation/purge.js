const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class PurgeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "purge",
      memberName: "purge",
      description: "Birçok mesajı temizler",
      group: "moderation",
      guildOnly: true,
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async run(message, args) {
    message.delete();
    const { channel } = message;

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Temizleme Komutu")
      .setFooter("Pvtlvtmv Botu V3", "https://imgur.com/RXp1s1h")
      .setDescription(
        "Hata! Geçerli bir sayı girin\n`.purge <sayı> | .purge 3`"
      )
      .setColor("#ff0000");
    if (!args || isNaN(parseFloat(args))) {
      channel.send(noNumEmbed);
      return;
    }

    let count = Math.round(parseFloat(args));
    let initialCount = count;

    if (count < 0) {
      channel.send("Negatif sayılar izin verilmez!" + noNumEmbed);
      return;
    }
    let toBeDeleted;
    if (count > 300) count = 300;

    while (count > 100) {
      await channel.messages.fetch({ limit: 100 }).then((m) => {
        toBeDeleted = m.filter((msg) => !msg.pinned);
      });

      channel
        .bulkDelete(toBeDeleted)
        .catch((err) =>
          console.error(err + "\npurge.js Satır:47'de hata oluştu")
        );
      count -= 100;
    }

    await channel.messages.fetch({ limit: 100 }).then((m) => {
      toBeDeleted = m.filter((msg) => !msg.pinned);
    });

    channel
      .bulkDelete(toBeDeleted)
      .catch((err) =>
        console.error(err + "\npurge.js Satır:60'da hata oluştu")
      );

    if (count <= 1) {
      channel.send(`Başarıyla ${initialCount} mesaj temizlendi`).then((m) => {
        setTimeout(() => {
          m.delete();
        }, 6500);
      });
    } else {
      channel.send(`Başarıyla ${initialCount} mesaj temizlendi`).then((m) => {
        setTimeout(() => {
          m.delete();
        }, 6500);
      });
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: purge`);
  }
};
