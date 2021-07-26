<p align="center"><img width=100% src="Images/IMG_20210725_223113.png"></p>
<p align="center"><img width=12.5% src="https://icons-for-free.com/download-icon-code+collaboration+github+network+round+social+icon-1320086084536018107_512.png"></p>
<p align="center"> <a href="https://discord.com/channels/@me/864246861815349248">Evo Pro</p>
<p align="center"><img width=100% src="Images/IMG_20210725_223113.png"></p>

<div align="center">
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img src="https://img.shields.io/github/issues/Evo-Pro/discord.js-button-paginator-advanced" alt="Issues Badge"/></a>
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Evo-Pro/discord.js-button-paginator-advanced"></a>
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img src="https://img.shields.io/github/license/Evo-Pro/discord.js-button-paginator-advanced?logoColor=2b9348" alt="License Badge"/></a>
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img src="https://img.shields.io/github/stars/Evo-Pro/discord.js-button-paginator-advanced" alt="Stars Badge"/></a>
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img src="https://img.shields.io/github/forks/Evo-Pro/discord.js-button-paginator-advanced" alt="Forks Badge"/></a>
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img src="https://img.shields.io/github/issues-pr/Evo-Pro/discord.js-button-paginator-advanced" alt="Pull Requests Badge"/></a>
<a href="https://github.com/Evo-Pro/discord.js-button-paginator-advanced"><img src="https://img.shields.io/discord/868923664110878761?color=%235865f2&label=Join%20For%20Support" alt="Size Badge"/></a>
</div>

---
<h1 align="center">Button Paginator • discord.js</h1> 

> *Note: You have to read the complete guide below to make
it work perfectly, we recommend not to skip!* 
<br>
<br>

##   📚Requirements
You must atleast have the minimum of these requirements to
run button paginator without any errors or problems.
* Node.js: [^14.x](https://nodejs.org)<br />
* discord.js: [13.0.0 dev](https://github.com/discordjs/discord.js/)

<a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-%5E14.x-green" alt="Issues Badge"/></a>
<a href="https://github.com/discordjs/discord.js/"><img src="https://img.shields.io/badge/discord.js-13.0.0%20dev-5865F2" alt="Issues Badge"/></a>

## 💡Installation

###### Console Command
```
npm install discord.js-button-paginator
```

## 📝Usage
```js
// Import the discordjs-button-pagination package
const paginationEmbed = require('discordjs-button-pagination');

// Use MessageEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { MessageEmbed , MessageButton} = require('discord.js');
const embed1 = new MessageEmbed()
                .setTitle('First Page')
                .setDescription('This is the first page');

const embed2 = new MessageEmbed()
                .setTitle('Second Page')
                .setDescription('This is the second page');

const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Previous')
                .setStyle('DANGER');

const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Next')
                .setStyle('SUCCESS');
//timeout(ms)
var timeout = 12000;

// Create an array of embeds
pages = [
	embed1,
	embed2,
	//....
	//embedN
];

//create an array of buttons

buttonList = [
    button1,
    button2
]


// Call the paginationEmbed method, first three arguments are required
// timeout is the time till the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
paginationEmbed(message, pages, buttonList, timeout);
// There you go, now you have paged embeds
```
