const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
    name: "trackloop",
    description: "Toggles the Track-Loop",
    run: async (client, interaction, args, prefix) => {
        if(!interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**Please join a Voice-Channel first!**"}).catch(() => null);
        const oldConnection = getVoiceConnection(interaction.guild.id);
        if(!oldConnection) return interaction.reply({ ephemeral: true, content: "**I'm not connected somewhere!**"}).catch(() => null);
        if(oldConnection && oldConnection.joinConfig.channelId != interaction.member.voice.channelId) return interaction.reply({ ephemeral: true, content: "**We are not in the same Voice-Channel**!"}).catch(() => null);
        
        const queue = client.queues.get(interaction.guild.id);
        if(!queue) { 
            return interaction.reply({ ephemeral: true, content: `**Nothing playing right now**`}).catch(() => null);
        }
        if(queue.queueloop) queue.queueloop = false
        queue.trackloop = !queue.trackloop        
        return interaction.reply({ ephemeral: false, content: `**Track-Loop is now \`${queue.trackloop ? "Enabled" : "Disabled"}\`**`}).catch(() => null);
    },
};