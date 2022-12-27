async function loadCommands(client) {
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Events", "Status");
  const fs = require("fs")

  let commandsArray = [];

  const commandsFolder = fs.readdirSync('../commands');
  for (const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(`../commands/${folder}`).filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
          const commandFile = require(`../commands/${folder}/${file}`);
          client.commands.set(commandFile.data.name, commandFile);

          commandsArray.push(commandFile.data.toJSON());

          table.addRow(file, "Loaded");
          continue;
      }
  }

  client.application.commands.set(commandsArray);
  return console.log(table.toString(), "\nLoaded Commands!")
}

module.exports = { loadCommands };