const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class SpamOwnerCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spamowner",
      aliases: ["sowner"],
      memberName: "spamowner",
      group: "raid",
      description: "Sunucu sahibine spam ping atar",
      argsType: "multiple",
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  async run(message, args) {
    message.delete();
    if (!args[0]) {
      message.channel.send(
        "Geçersiz format! Lütfen şu formatı kullanın:\n`spamowner <sayı> <metin>`"
      );
    }
    let i = 1;
    let count = args.shift();
    if (isNaN(parseFloat(count))) {
      message.channel.send("Geçersiz sayı");
      return;
    }
    let text;
    if (!args[0]) {
      text = `||<@${message.guild.owner.id}>||\nLXG FEDAİSİ EBENİ SİKTİ... $#%@!!!`;
    } else {
      let temptxt = args.join(" ");
      text = `||<@${message.guild.owner.id}>||\n${temptxt}`;
    }
    while (i <= count) {
      message.channel.send(text);
      i += 1;
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: spamowner`);
  }
};
