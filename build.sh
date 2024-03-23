git pull
docker stop crm-back
docker rm --force crm-back
docker rmi crm-back-image
docker build . -t crm-back-image
docker run -d -p 4300:4300 --name crm-back crm-back-image
