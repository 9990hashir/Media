FROM fusuf/whatsasena:latest

RUN git clone https://github.com/9990hashir/Media /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit
RUN git clone https://github.com/Mikhaiel/Media

CMD ["node", "bot.js"]
