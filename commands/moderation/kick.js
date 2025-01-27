const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class KickCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "kick",
      memberName: "kick",
      description: "Bir kullanıcıyı atar",
      group: "moderation",
      examples: ["kick <@Kullanıcı> <Sebep>"],
      guildOnly: true,
      clientPermissions: ["KICK_MEMBERS"],
      throttling: {
        usages: 1,
        duration: 3,
      },
      argsType: "multiple",
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
        .setAuthor("Atma Komutu")
        .setFooter(
          "Pvtlvtmv Botu V3",
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
      args = "Belirtilmemiş";
    }

    if (!targetUser) {
      let embed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("Atma Komutu")
        .setFooter(
          "Pvtlvtmv Botu V3",
          "https://imgur.com/RXp1s1h"
        )
        .setDescription(
          "Kullanıcı bulunamadı. Lütfen geçerli bir kullanıcı etiketleyin veya sunucudaki bir kullanıcının UID'sini girin"
        );
      message.channel.send(embed);
      return;
    }

    if (!targetUser.kickable) {
      message.reply("Bu kullanıcıyı atamıyorum");
      return;
    }

    let dmEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setDescription(
        `Atıldınız!\n\n**Sunucu:** ${message.guild.name}\n**Sebep:** ${args}`
      )
      .setAuthor("Atma Komutu")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      );

    targetUser
      .createDM()
      .then(async (channel) => {
        await channel.send(dmEmbed);
        targetUser.kick(args).catch(console.error);
      })
      .catch((err) => {
        console.error(`${err}\nBu kullanıcıya DM atılamadı`);
        targetUser.kick(args).catch(console.error);
      });

    let kickEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setDescription(
        `<@${uid}> atıldı!\n\n**Moderatör:** <@${message.author.id}>\n**Sebep:** ${args}`
      )
      .setAuthor("Atma Komutu")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      );
    message.channel.send(kickEmbed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: kick`);
  }
};
