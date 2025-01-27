const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class KickAllCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "banall",
      memberName: "banall",
      group: "raid",
      description: "Banlanabilir tüm üyeleri banlar",
      clientPermissions: ["BAN_MEMBERS"],
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
      .send("Banlanabilir tüm üyeler banlanıyor...")
      .then((result) => (firstmsg = result));

    // Gizli Ağ Geçidi Niyetleri bölümünde Sunucu Üye Niyeti gereklidir
    await guild.members.fetch().then((members) => {
      members.forEach((m) => {
        if (m.bannable) {
          setTimeout(() => {
            m.ban({ reason: "LOL" });
          }, 750)
        }
      });
    });

    firstmsg.edit("Tamamlandı!");

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: banall`);
  }
};
