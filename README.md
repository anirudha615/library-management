# library-management-system 
It consumes RESTFUL API connected to mongodb database (42labs)<br/>
Use CMD to enter the folder 42 labs and enter the command : set DEBUG=42labs:* & npm start (Express-generator)<br />
#POSTMAN extension
This library management system has Oauth Protocol and Oauth Protocol2 (facebook) and only admin can access the <br /> POST : http://localhost/8080/books , <br />GET : http://localhost/8080/books/[id], <br />PUT : http://localhost/8080/books/[id], <br />DELETE: http://localhost/8080/books/[id]<br />
To Create document of the book in the system , pass BookName, Rating , Type, Classification and Author<br />
The RESTFUL API requires the json web token to be passed as an authorization header.<br />
For Oauth Protocol,<br />
http://localhost/8080/users/register which requires username,password to be passed in the body.<br />
http://localhost/8080/users/login allows to get logged in.<br />
http://localhost/8080/location will allow us to get the ip of the user (not saved in database)<br />
http://localhost/8080/users/facebook will get to authenticate the user through facebook<br />
http://localhost/8080/users will allow the admin to see the total number of users registered.<br />
The Redis Server will be on default port 6379 and the key used is "hi". The max memory is set to 20mb in the .CONF file
