#!/bin/sh

# Run the MySQL container, with a database named 'poi' and credentials
echo "Starting DB..."  
sudo docker run --name db -d \
-e MYSQL_ROOT_PASSWORD=123 \
-e MYSQL_DATABASE=pois \
-p 3306:3306 \
mysql:latest

# Wait for the database service to start up.
echo "Waiting for DB to start up..."  
sudo docker exec db mysqladmin --silent --wait=30 -ulist_service -p123 ping || exit 1

# Run the setup script.
echo "Setting up initial data..."  
sudo docker exec -i db mysql -ulist_service -p123 pois < setup.sql  