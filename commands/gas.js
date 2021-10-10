

module.exports = {
    name: "gas",
    aliases: ["ngegas", "marah"],

    execute (message){
        const gas = [
            "anjing", "kontol", "bangsat", "goblok",
            "ngentot", "lu setan"
          ];
          const randomGas = Math.floor(Math.random() * gas.length);
        message.channel.send(gas[randomGas])
    }
}