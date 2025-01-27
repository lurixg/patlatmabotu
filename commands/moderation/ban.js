const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class BanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "ban",
      memberName: "ban",
      group: "moderation",
      description: "Belirtilen kullanıcıyı banlar",
      argsType: "multiple",
      clientPermissions: ["BAN_MEMBERS"],
      examples: ["ban <@Kullanıcı> <Sebep>"],
      throttling: {
        usages: 1,
        duration: 3,
      },
      guildOnly: true,
    });
  }

  async run(message, args) {
    message.delete();
    let uid;
    let target = message.mentions.users.first();

    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("Ban Komutu")
        .setFooter(
          "Pvtlvtmv Botu V3.0.0 [BETA]",
          "https://imgur.com/RXp1s1h"
        )
        .setDescription(
          "Kullanıcı bulunamadı. Lütfen geçerli bir kullanıcı etiketleyin veya sunucudaki bir kullanıcının UID'sini girin"
        );
      message.channel.send(embed);
      return;
    }

    if (!target) {
      uid = args[0];
    } else {
      uid = target.id;
    }

    let targetUser = await message.guild.members.fetch(uid);
    args.shift();

    if (args[0]) {
      args = args.join(" ");
    } else {
      args = "Belirtilmedi";
    }

    if (!targetUser) {
      let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("Ban Komutu")
        .setFooter(
          "Pvtlvtmv Botu V3.0.0 [BETA]",
          "https://imgur.com/RXp1s1h"
        )
        .setDescription(
          "Kullanıcı bulunamadı. Lütfen geçerli bir kullanıcı etiketleyin veya sunucudaki bir kullanıcının UID'sini girin"
        );
      message.channel.send(embed);
      return;
    }

    if (!targetUser.bannable) {
      message.reply("Bu kullanıcıyı yasaklayamıyorum");
      return;
    }

    let dmEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setFooter(
        "Pvtlvtmv Botu V3.0.0 [BETA]",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(
        `Yasaklandınız!\n\n**Sunucu:** ${message.guild.name}\n**Sebep:** ${args}`
      )
      .setAuthor("Ban Komutu");
    targetUser
      .createDM()
      .then(async (channel) => {
        await channel.send(dmEmbed);
        targetUser.ban({ reason: args }).catch(console.error);
      })
      .catch((err) => {
        console.error(`${err}\nBu kullanıcıya DM gönderilemedi`);
        targetUser.ban({ reason: args }).catch(console.error);
      });

    let banEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor("Ban Komutu")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(
        `<@${uid}> yasaklandı!\n\n**Moderatör:** <@${message.author.id}>\n**Sebep:** ${args}`
      );
    message.channel.send(banEmbed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: ban`);
  }
};
