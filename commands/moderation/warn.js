const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class WarnCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "warn",
      group: "moderation",
      memberName: "warn",
      description: "Bir üyeyi uyarır",
      guildOnly: true,
      argsType: "multiple",
    });
  }

  async run(message, args) {
    message.delete();

    const failEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor("Uyarı Komutu")
      .setDescription(
        "Hata, Kullanıcıya uyarı yapılamadı | Lütfen geçerli bir kullanıcı girin ve şu söz dizimini takip ettiğinizden emin olun:\n`.warn <@Kullanıcı/Kullanıcı ID> <Sebep>`"
      )
      .setFooter(
        "Pvtlvtmv Botu V3.0.0 [BETA]",
        "https://imgur.com/RXp1s1h"
      );
    if (!args[0]) {
      message.channel.send(failEmbed);
      return;
    }

    const target = message.mentions.users.first();
    let uid;

    if (!target) {
      uid = args[0];
    } else {
      uid = target.id;
    }

    let targetUser = await message.guild.members.fetch(uid);
    args.shift();

    if (!targetUser) {
      message.channel.send(failEmbed);
      return;
    }

    let reason = args.join(" ");
    if (!reason) {
      reason = "Sebep belirtilmemiş";
    }

    let dmEmbed = new Discord.MessageEmbed()
      .setAuthor("Uyarı Komutu")
      .setColor("#000001")
      .setFooter(
        "Pvtlvtmv Botu V3.0.0 [BETA]",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(
        `Sen ${message.guild.name} sunucusunda uyarıldın!\nSebep: \`${reason}\``
      );

    // Çünkü bu açık kaynak bir bot, sunucu tarafında bir uyarı alıcısı ayarlamayacağım
    // Bu komut sadece kullanıcıya DM gönderecek!

    let error = false;

    targetUser.send(dmEmbed).catch((err) => {
      console.error(err + "\n\nBu kullanıcıya DM gönderilemedi!");
      error = true;
    });

    if (error === false) {
      const embed = new Discord.MessageEmbed()
        .setColor("#00fd00")
        .setFooter(
          "Pvtlvtmv Botu V3",
          "https://imgur.com/RXp1s1h"
        )
        .setAuthor("Uyarı Komutu")
        .setDescription(`<@${targetUser.id}> başarıyla uyarıldı!`);
      message.channel.send(embed);
    } else {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(
          "Pvtlvtmv Botu V3",
          "https://imgur.com/RXp1s1h"
        )
        .setAuthor("Uyarı Komutu")
        .setDescription(
          "`DiscordAPI Hatası | Lütfen daha fazla bilgi için konsolunuza bakın!`"
        );
      message.channel.send(errorEmbed);
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: warn`);
  }
};
