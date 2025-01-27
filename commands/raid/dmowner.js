const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class DMOwner extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "dmowner",
      group: "raid",
      memberName: "dmowner",
      description: "Sunucu sahibine DM spamı gönderir",
      guildOnly: true,
    });
  }

  async run(message, args) {
    message.delete();
    const failEmbed = new Discord.MessageEmbed()
      .setAuthor("DM Owner Komutu")
      .setColor("ff0000")
      .setDescription("Geçersiz argümanlar sağlandı!\n`.dmowner <sayı>`")
      .setFooter(
        "Pvtlvtmv Botu V3 by lurixgithub",
        "https://imgur.com/RXp1s1h"
      );
    if (!args) {
      message.channel.send(failEmbed);
      return;
    }
    let count = args;
    if (isNaN(parseFloat(count))) {
      message.channel.send(failEmbed);
      return;
    }
    count = Math.round(count) - 1;

    const owner = await message.guild.owner;
    let error = false;

    await owner.send("Patladınız! DM'leri seviyor musunuz? Tadını çıkarın!").catch((err) => {
      console.error(
        err,
        "\n\nSahibine DM gönderilemedi | Bunun yerine '.spamowner' kullanmayı deneyin!"
      );
      error = true;
    });

    if (error) return;

    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        owner.send("DM'leri seviyor musunuz? Tadını çıkarın!");
      }, 750);
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: dmowner`);
  }
};
