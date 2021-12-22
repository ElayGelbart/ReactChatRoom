#Add Node
FROM node:lts
#run Build
ADD ./client /client
RUN cd /client
WORKDIR /client
RUN npm i
RUN npm run build
RUN cd ../
ADD ./server /server
RUN cd /server
WORKDIR /server
RUN npm i
CMD [ "npm","start" ]