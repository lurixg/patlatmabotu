const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SpamRoles extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spamroles",
      description: "Birçok rol oluşturur",
      memberName: "spamroles",
      group: "raid",
      guildOnly: true,
      argsType: "multiple",
      clientPermissions: ["MANAGE_ROLES"],
      throttling: {
        usages: 1,
        duration: 5,
      },
    });
  }

  async run(message, args) {
    message.delete();

    const noNumEmbed = new Discord.MessageEmbed()
      .setAuthor("Spam Roles Komutu")
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

    let count = Math.round(args[0]);

    //Aşırı API kullanımını önlemek için
    if (count > 20) {
      count = 20;
    }

    //Gökkuşağı Renkleri :wink:
    let colors = [
      "#EE82EE",
      "#4B0082",
      "#0183fa",
      "#01d801",
      "#f7e501",
      "#fe8801",
      "#ff0000",
    ];
    let colorCount = 0;
    let msg1;
    await message.channel.send(`Toplam ${count} rol oluşturuluyor...`).then((m) => {
      msg1 = m;
    });

    //Rol oluşturma döngüsü
    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        message.guild.roles
          .create({
            data: {
              name: "💣LURİXGİTHUB💣",
              color: colors[colorCount],
            },
          })
          .catch(console.error);
        colorCount++;
        if (colorCount === 7) {
          colorCount = 0;
        }
      }, 1000);
    }

    await msg1.edit("Tamamlandı");
    setTimeout(() => {
      msg1.delete();
    }, 5000);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: spamroles`);
  }
};
