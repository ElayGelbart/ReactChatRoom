#Add Node
FROM node:lts
#run Build
ADD ./client /client
RUN cd /client
WORKDIR /client
RUN npm i
RUN npm run build
RUN cd ../
#run server
ADD ./server /server
RUN cd /server
WORKDIR /server
RUN npm i
#start server
CMD [ "npm","start" ]