const Discord = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class SpamTextEveryone extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "spam",
      group: "raid",
      memberName: "spam",
      description: "Bir metni spamlar",
      argsType: "multiple",
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
    });
  }

  async run(message, args) {
    await message.delete();
    if (!args[0]) {
      message.reply(
        "Geçersiz Format! Lütfen şu formatı takip edin:\n`spam <sayı> <metin>`"
      );
      return;
    }
    let count = args.shift();
    if (isNaN(parseFloat(count))) {
      message.channel.send("Geçersiz sayı");
      return;
    }
    let content = "LOL! Senin PP: 8==D";
    if (args[0]) {
      content = args.join(" ");
    }
    let i = 1;
    while (i <= count) {
      message.channel.send(content);
      i += 1;
    }

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: spam`);
  }
};
