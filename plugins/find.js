const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');

const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');

const FIND_DESC = "Finds the Song"

Asena.addCommand({pattern: 'search', fromMe: false, desc: FIND_DESC }, (async (message, match) => {
    if (message.reply_message === false) return await message.client.sendMessage(message.jid, '𝚈𝚘𝚞 𝚖𝚞𝚜𝚝 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊𝚗 𝚖𝚙𝟹 !!', MessageType.text);
    var filePath = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });
    var form = new FormData();
    ffmpeg(filePath).format('mp3').save('music.mp3').on('end', async () => {
        form.append('api_token', 'e82dc40aa20d55262bbc2289432c5957');
        form.append('file', fs.createReadStream('./music.mp3'));
        form.append('return', 'apple_music, spotify');
        var configs = {
            headers: {
                ...form.getHeaders()
            }
        }
        await axios.post('https://api.audd.io/', form, configs).then(async (response) => {
            var res = response.data
            if (res === 'success') {
                await message.client.sendMessage(message.jid, `Title: ${res.title}\nArtist: ${res.artist}`, MessageType.text);
            } else {
                await message.client.sendMessage(message.jid, '𝙽𝙾 𝚁𝙴𝚂𝚄𝙻𝚃 𝙵𝙾𝚄𝙽𝙳 ', MessageType.text);
            }
        }).catch((error) =>  {
            console.log(error);
        });
    });

}));
