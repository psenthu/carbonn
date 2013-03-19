carbonn
=======

Carbonn server is a clean and elegant way to manage your application updates. It allows you to upload package information as JSON and it's built using Node JS.

## How does it work
You can install the carbonn server on your server and write your client application to query the server during boot/shutdown.

## Example client call

  $ http://localhost:3000/manage/version/:client/:application/:os/:bitVersion/:version

  * :client - Name of the client
  * :application - Name of the application
  * :os - Operating system
  * :bitVersion - Whether 32 or 64 bit
  * :version - Current version of the client application

Server response
  
  {
    "application":"pos",
    "version":"0.0.2",
    "_id":"5147f7afb753e2070d000009",
    "releaseDate":"2013-03-19T05:29:19.067Z",
    "downloadUrl":["http://cdn.application.com/0.0.2.tar.gz","http://cdn2.application.com/0.0.2.tar.gz"]
  }

## Post package details
