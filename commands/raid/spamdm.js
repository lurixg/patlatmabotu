const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SpamDMCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spamdm",
      memberName: "spamdm",
      group: "misc",
      description: "Bir üyeye DM spamı gönderir",
      guildOnly: true,
      argsType: "multiple",
    });
  }

  async run(message, args) {
    message.delete();
    const failEmbed = new Discord.MessageEmbed()
      .setAuthor("Spam DM Komutu")
      .setColor("#ff0000")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(
        "Geçersiz argümanlar sağlandı!\n`.spamdm <sayı> <@kullanıcı/kullanıcı ID>`"
      );

    if (!args[0] || !args[1]) {
      message.channel.send(failEmbed);
      return;
    }
    var count = args[1];
    var isNum = parseFloat(count);

    if (typeof isNum != "number") {
      message.channel.send(failEmbed);
      return;
    }
    count = Math.round(count);

    if (count > 40) {
      count = 40;
    }

    let target = message.mentions.users.first();
    let uid;

    if (!target) {
      uid = args[1];
      if (uid.length != 18) {
        message.channel.send("Geçerli bir UID girin!");
        return;
      }
    } else {
      uid = target.id;
    }
    let targetUser;
    try {
      targetUser = await message.guild.members.fetch(uid);
    } catch {
      message.channel.send("Kullanıcı sunucuda bulunamadı!");
      return;
    }

    let error = false;
    await targetUser.send("Patladınız!").catch(err => {
      console.error(err, "\n\nKullanıcının DM'leri kapalı | Bunun yerine .spamping <@Kullanıcı veya Kullanıcı ID> <sayı> kullanmayı deneyin!")
      error = true
    });

    if (error === true) return;

    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        targetUser.send("DM'lerin Tadını Çıkar LOL");
      }, 250);
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: spamdm`);
  }
};
