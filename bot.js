//in bot.js

const { ask } = require("./ai.js"); //import the "ask" function from the "ai.js" file
const { Client, Events, GatewayIntentBits, ActivityType, Message} = require('discord.js'); //v14.6.0
const token = process.env.token;

// Create a new client instance
const client = new Client({
  
  intents:
    [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});
client.on('ready' , () =>{
  console.log('Bot Online');
  client.user.setStatus('online');
  console.log('bot status', client.user.presence.status);
  client.user.setActivity(` on ${client.guilds.cache.size} servers. Prefix : ask?`, { type: ActivityType.Watching });

 });
  // client.user is now defined

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on(Events.MessageCreate, async message => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});
client.on(Events.MessageCreate, async message => {
  if (message.content === "ask?Kamu suka siapa?") {
    message.reply("aku suka <@997641782173126676>");
  }
});
client.on(Events.MessageCreate, async message => {
  if (message.content === "halo") {
    message.reply("ID : Hello aku Hanekawa-bot, tanyakan saja padaku! \nEN : Hi, I'm Hanekawa-bot, ask me everything! \nPrefix : ask?");
  }
});

client.on(Events.MessageCreate, async message => {
  if (message.content.substring(0, 4) === "ask?") {
    const prompt = message.content.substring(4);
    const answer = await ask(prompt);
    message.reply(answer);
  }
});

// Log in to Discord with your client's token
client.login(token);
