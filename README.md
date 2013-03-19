carbonn
=======

Carbonn server is a clean and elegant way to manage your application updates. It allows you to upload package information as JSON and it's built using Node JS.

## How does it work
You can install the carbonn server on your server and write your client application to query the server during boot/shutdown. The carbonn server will return information such as the latest version no, and from where it can be downloaded.

## What is the communication medium
The communication between a carbonn server and it's clients happen using REST URL calls and the response returned is JSON.

## Example client call

The client application needs to trigger a call to the server to get information about a latest version of the application compatible to the current installed version. The communication happens using REST where a get request should be made as shown below.

  $ http://localhost:3000/manage/version/:client/:application/:os/:bitVersion/:version

  ```
  * :client - Name of the client
  * :application - Name of the application
  * :os - Operating system
  * :bitVersion - 32 or 64 bit
  * :version - Current version of the client application
  ```

The server would return a response as follows
  
  {
      application:pos,
      version:0.0.2,
      _id:5147f7afb753e2070d000009,
      releaseDate:2013-03-19T05:29:19.067Z,
      downloadUrl:['http://cdn.application.com/0.0.2.tar.gz', 'http://cdn2.application.com/0.0.2.tar.gz']
  }

## Post package details

During a deployment of a new version to an application server, the carbonn server should be updated with the latest package information. The update should be done by making a POST request to the server and pass the package manifest as post parameters.

POST parameter details

    ```
    * client            = 'mbase';
    * application       = 'pos';
    * bitVersion        = 64;
    * version           = '0.0.3';
    * updateableRegions = ['India', 'USA'];
    * operatingSystems  = ['windows'];
    * updateableFrom    = ['0.0.1', '0.0.2'];
    * downloadUrl       = ['http://cdn.application.com/0.0.2.tar.gz', 'http://cdn2.application.com/0.0.2.tar.gz'];
    ```