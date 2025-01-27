const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class HelpCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "help",
      group: "misc",
      memberName: "help",
      description: "Mevcut komutların listesini gönderir",
      guildOnly: true,
    });
  }

  async run(message) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#000001")
      .setAuthor("Yardım Komutu")
      .setDescription(
        "Mevcut komut sayısı: **19**\n" +
          "`- <> içindeki her şey bir değerle değiştirilmelidir!`\n" +
          '`- "[]" içindeki her şey opsiyonel bir argümandır`'
      )
      .setFooter(
        "Pvtlvtmv Botu V3",
        "https://imgur.com/RXp1s1h"
      )
      .addFields(
        {
          name: "`.add <Num1> <Num2> ...`",
          value: "Belirtilen sayıları toplar",
        },
        {
          name: "`.av/.avatar [<@Kullanıcı/Kullanıcı ID>]`",
          value:
            "Kullanıcının profil resminin büyütülmüş halini gönderir\nVarsayılan: Kendiniz",
        },
        {
          name: "`.ping`",
          value: "Botun ping bilgisini gönderir",
        },
        {
          name: "`.help`",
          value: "Mevcut komutların listesini gönderir",
        },
        {
          name: "`.serverinfo`",
          value: "Sunucu ile ilgili bazı temel bilgileri gönderir",
        },
        {
          name: "`.shutdown`",
          value: "Botu kapatır",
        },
        {
          name: "`.ban <@Kullanıcı/Kullanıcı ID> [<Sebep>]`",
          value: "Belirtilen kullanıcıyı yasaklar",
        },
        {
          name: "`.kick <@Kullanıcı/KullanıcıID> [<Sebep>]`",
          value: "Belirtilen kullanıcıyı atar",
        },
        {
          name: "`.clean <count>`",
          value: "Belirtilen sayıda mesajı temizler, sabitlenmiş mesajlar dahil | Maksimum Limit: 500",
        },
        {
          name: "`.purge <count>`",
          value:
            "Belirtilen sayıda mesajı temizler/siler, sabitlenmiş mesajlar hariç | Maksimum Limit: 300",
        },
        {
          name: "`.warn <@Kullanıcı/Kullanıcı ID> <Sebep>`",
          value: "Kullanıcıyı uyarır",
        },
        {
          name: "`.banall`",
          value:
            "Yasaklanabilecek tüm kişileri yasaklar\n" +
            "**`KULLANMAYIN! DISCORD TARAFINDAN RAPORLANABİLİRSİNİZ`**\n" +
            "**`Gereksinim:`** `SERVER MEMBERS INTENT` altında Priviliged Gateway Intents **aktif olmalı**! [Buraya tıklayın](https://i.imgur.com/aWlEXab.png)",
        },
        {
          name: "`.kickall`",
          value:
            "Atılabilecek tüm kişileri atar\n" +
            "**`KULLANMAYIN! DISCORD TARAFINDAN RAPORLANABİLİRSİNİZ`**\n" +
            "**`Gereksinim:`** `SERVER MEMBERS INTENT` altında Priviliged Gateway Intents **aktif olmalı**! [Buraya tıklayın](https://i.imgur.com/aWlEXab.png)",
        },
        {
          name: "`.delchannels`",
          value: "Sunucudaki tüm kanalları siler",
        },
        {
          name: "`.delroles`",
          value: "Sunucudaki tüm silinebilir rolleri siler",
        },
        {
          name: "`.dmowner <count>`",
          value: "Sahibe DM spamı yapar",
        },
        {
          name: "`.spam <count>`",
          value: "Metin kanalında bazı önceden belirlenmiş mesajları spamlar",
        },
        {
          name: "`.spamdm <@Kullanıcı/Kullanıcı ID> <count>`",
          value: "Belirtilen kullanıcıya DM spamı yapar",
        },
        {
          name: "`.spameveryone <count>`",
          value: "Herkese ping spamı yapar",
        },
        {
          name: "`.spamowner <count>`",
          value: "Sahibi metin kanalında spamlar",
        },
        {
          name: "`.spamroles <count>`",
          value:
            "`<count>` kadar rol yaratır [Not: Bu roller gökkuşağı renginde olacaktır 😉]",
        },
        {
          name: "`.spamtextchannels <count>`",
          value: "`<count>` kadar metin kanalı yaratır",
        }
      );
    message.channel.send(embed);

    const moment = require("moment");
    const time = moment().format("HH:mm:ss a");
    console.log(`${time} | Çalıştırılan Komut: help`);
  }
};
