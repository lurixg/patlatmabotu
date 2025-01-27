const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class GetAvatarCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: ["av"],
      group: "misc",
      memberName: "avatar",
      description: "Bir kullanıcının avatarının daha büyük bir görselini/gif'ini gönderir",
      guildOnly: true,
      argsType: "multiple",
    });
  }

  async run(message, args) {
    message.delete();

    const failEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setAuthor("Avatar Komutu")
      .setDescription(
        "Hata! Lütfen geçerli bir kullanıcı etiketleyin ve şu söz dizimini takip edin:\n`.avatar <@Kullanıcı/Kullanıcı ID>`"
      );

    let target = message.mentions.users.first();
    let uid;
    if (!target) {
      uid = args[0];
    } else {
      uid = target.id;
    }

    if (!args[0]) {
      uid = message.author.id;
    }

    let targetUser = await message.guild.members.fetch(uid);
    if (!targetUser) {
      message.channel.send(failEmbed);
      return;
    }

    const avatarEmbed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .setAuthor("Avatar Sahibi:")
      .setDescription(`<@${targetUser.id}>`)
      .setImage(
        targetUser.user.avatarURL({
          dynamic: true,
          size: 512,
        })
      );
    message.channel.send(avatarEmbed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: avatar/av`);
  }
};
