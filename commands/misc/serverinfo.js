const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class ServerInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      group: "misc",
      memberName: "serverinfo",
      description: "Sunucuya ait bazı temel bilgileri gönderir",
      guildOnly: true,
    });
  }

  async run(message) {
    if (!message.guild.available) return;
    message.delete();
    const { guild } = message;

    let roleCount;
    await guild.roles.fetch().then((roles) => {
      roleCount = roles.cache.size - 1;
    });

    const embed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor("Sunucu Bilgisi Komutu")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setDescription(`${guild.name} için sunucu bilgileri:`)
      .addFields(
        {
          name: "Sunucu Adı:",
          value: guild.name,
        },
        {
          name: "Sunucu Bölgesi:",
          value: guild.region,
        },
        {
          name: "Sunucu Sahibi:",
          value: `<@${guild.ownerID}>`,
        },
        {
          name: "AFK Kanalı:",
          value: `<#${guild.afkChannelID}>`,
        },
        {
          name: "AFK Zaman Aşımı:",
          value: guild.afkTimeout,
        },
        {
          name: "Oluşturulma Tarihi:",
          value: guild.createdAt,
        },
        {
          name: "Üye Sayısı:",
          value: guild.memberCount,
        },
        {
          name: "Boost Sayısı:",
          value: guild.premiumSubscriptionCount,
        },
        {
          name: "Toplam Rol Sayısı:",
          value: roleCount,
        },
        {
          name: "En Yüksek Rol:",
          value: `<@&${guild.roles.highest.id}>`,
        }
      )
      .setThumbnail(guild.iconURL({ dynamic: true }));
    message.channel.send(embed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: serverinfo`);
  }
};
