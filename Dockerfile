#Add Node
FROM node:lts
#run Build
COPY ./client /client
RUN cd /client
WORKDIR /client
RUN npm i
RUN npm run build
RUN cd ../
#run server
COPY ./server /server
RUN cd /server
WORKDIR /server
RUN npm i
#start server
CMD [ "npm","start" ]