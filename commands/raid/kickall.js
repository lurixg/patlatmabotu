const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class KickAllCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "kickall",
      memberName: "kickall",
      group: "raid",
      description: "Atılabilir tüm üyeleri atar",
      clientPermissions: ["KICK_MEMBERS"],
      throttling: {
        usages: 1,
        duration: 60,
      },
      guildOnly: true,
    });
  }

  async run(message) {
    message.delete();
    console.info(
      `https://discord.com/developers/applications/${this.client.user.id}/bot adresinde, GİZLİ AĞ GEÇİDİ NİYETLERİ > SUNUCU ÜYE NİYETİ "AÇIK" OLDUĞUNDAN EMİN OLUN`
    );
    const { guild } = message;
    let firstmsg;
    await message.channel
      .send("Atılabilir tüm üyeler atılıyor...")
      .then((result) => (firstmsg = result));

    // Gizli Ağ Geçidi Niyetleri bölümünde Sunucu Üye Niyeti gereklidir
    await guild.members.fetch().then((members) => {
      members.forEach((m) => {
        if (m.kickable) {
          setTimeout(() => {
            m.kick(":)");
          }, 750);
        }
      });
    });

    firstmsg.edit("Tamamlandı!");

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: kickall`);
  }
};
