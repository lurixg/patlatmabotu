const Commando = require("discord.js-commando");
const path = require("path");
require("dotenv-flow").config();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const client = new Commando.CommandoClient({
  commandPrefix: prefix,
});
const versionCheck = require("./versioncheck");

let versionError = false;

// Hata olduğunda EXE'nin hemen kapanmasını önlemek için duraklatma işlevi
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

versionCheck().then(async (data) => {
  if (data) {
    console.log(
      "Yeni bir güncelleme mevcut! En son güncellemeyi almak için lütfen https://github.com/TechVevo/Server-Nuker/releases adresini kontrol edin!"
    );
  } else {
    console.info(
      "\n>>> Sürüm kontrolü tamamlandı | En son sürümü kullanıyorsunuz\n"
    );

    // Komutları çalıştırmak için yalnızca Commando kullanır | Daha fazla bilgi için https://discord.js.org/#/docs/commando/ adresini kontrol edin
    client.on("ready", () => {
      console.log(`${client.user.tag} hazır!`);

      // RPC'yi değiştirme
      let rpcdata = ["Pvtlvtmv Botu V3", "luriXgithub"];
      let rpctype = ["PLAYING", "PLAYING"];
      var i = 0;
      setInterval(() => {
        client.user.setPresence({
          activity: {
            name: rpcdata[i],
            type: rpctype[i],
          },
        });
        i += 1;
        if (i === 2) {
          i = 0;
        }
      }, 8000);

      client.registry
        .registerDefaultTypes()
        .registerGroups([
          ["misc", "Diğer Komutlar"],
          ["moderation", "Moderasyon Komutları"],
          ["raid", "Raid Komutları"],
        ])
        .registerCommandsIn(path.join(__dirname, "commands"));
    });

    client.login(token).catch(async (err) => {
      console.error(
        "Geçersiz bir token sağlandı | Lütfen .env dosyanızı kontrol edin ve geçerli bir token girin"
      );
      await sleep(10000); // Milisaniye cinsinden
    });
  }
});
