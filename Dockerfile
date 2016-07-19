FROM node:6

ENV HOME=/code
ENV NPM_CONFIG_LOGLEVEL warn

COPY package.json $HOME/

WORKDIR $HOME
RUN npm install

ADD . $HOME

EXPOSE 8000

CMD ["npm", "start"]
