const Commando = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class DeleteRolesCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "delroles",
      group: "raid",
      memberName: "delroles",
      description: "Tüm rolleri siler",
      guildOnly: true,
      clientPermissions: ["MANAGE_ROLES"],
    });
  }

  async run(message) {
    message.delete();
    message.channel.send("Silinebilen tüm **roller** siliniyor...");

    let roles = await message.guild.roles.cache.array();
    
    for (const role of roles) {
      if (role.name === "@everyone") continue;
      if (role.editable) {
        try {
          role.delete().then(delRole => console.log(`${delRole.name} silindi`));
        } catch (err) {
          console.warn(`${role.name} silinemedi`);
        }
      }
    }
  }
};
