# HTB HTTP

# HyperText Transfer Protocol (HTTP)

Today, the majority of the applications we use constantly interact with the internet, both web and mobile applications. Most internet communications are made with web requests through the HTTP protocol. HTTP is an application-level protocol used to access the World Wide Web resources. The term hypertext stands for text containing links to other resources and text that the readers can easily interpret.

**HTTP** communication consists of a client and a server, where the client requests the server for a resource. The server processes the requests and returns the requested resource. The default port for HTTP communication is port 80, though this can be changed to any other port, depending on the web server configuration. The same requests are utilized when we use the internet to visit different websites. We enter a Fully Qualified Domain Name (FQDN) as a Uniform Resource Locator (URL) to reach the desired website, like www.alexflux.com.

**URL**
Resources over HTTP are accessed via a URL, which offers many more specifications than simply specifying a website we want to visit. Let's look at the structure of a URL:

![url_structure](<./pictures/url_structure%20(1).webp>)

# URL Components Explained

| **Component**    | **Example**            | **Description**                                                                                                                                                                        |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scheme**       | `http://` / `https://` | This is used to identify the protocol being accessed by the client, and ends with a colon and a double slash (`://`).                                                                  |
| **User Info**    | `admin:password@`      | This is an optional component that contains the credentials (separated by a colon `:`) used to authenticate to the host, and is separated by `@`.                                      |
| **Host**         | `inlanefreight.com`    | The host signifies the resource location. This can be a hostname or an IP address.                                                                                                     |
| **Port**         | `:80`                  | The port is separated from the host by a colon (`:`). If no port is specified, HTTP schemes default to port `80` and HTTPS defaults to port `443`.                                     |
| **Path**         | `/dashboard.php`       | This points to the resource being accessed, which can be a file or a folder. If there is no path specified, the server returns the default (e.g., `index.html`).                       |
| **Query String** | `?login=true`          | The query string starts with a question mark (`?`) and consists of a parameter (e.g., `login`) and a value (e.g., `true`). Multiple parameters can be separated by an ampersand (`&`). |
| **Fragments**    | `#status`              | Fragments are processed by browsers on the client-side to locate sections within the primary resource (e.g., a header or section on the page).                                         |

Not all components are required to access a resource. The main mandatory fields are the scheme and the host, without which the request would have no resource to request.

![http flow](./pictures/HTTP_Flow.webp)

The diagram above presents the anatomy of an HTTP request at a very high level. The first time a user enters the URL (inlanefreight.com) into the browser, it sends a request to a DNS (Domain Name Resolution) server to resolve the domain and get its IP. The DNS server looks up the IP address for inlanefreight.com and returns it. All domain names need to be resolved this way, as a server can't communicate without an IP address.

Note: Our browsers usually first look up records in the local '/etc/hosts' file, and if the requested domain does not exist within it, then they would contact other DNS servers. We can use the '/etc/hosts' to manually add records to for DNS resolution, by adding the IP followed by the domain name.

Once the browser gets the IP address linked to the requested domain, it sends a GET request to the default HTTP port (e.g. 80), asking for the root / path. Then, the web server receives the request and processes it. By default, servers are configured to return an index file when a request for / is received.

In this case, the contents of index.html are read and returned by the web server as an HTTP response. The response also contains the status code (e.g. 200 OK), which indicates that the request was successfully processed. The web browser then renders the index.html contents and presents it to the user.

Note: This module is mainly focused on HTTP web requests. For more on HTML and web applications, you may refer to the Introduction to Web Applications module.

cURL
In this module, we will be sending web requests through two of the most important tools for any web penetration tester, a Web Browser, like Chrome or Firefox, and the cURL command line tool.

cURL (client URL) is a command-line tool and library that primarily supports HTTP along with many other protocols. This makes it a good candidate for scripts as well as automation, making it essential for sending various types of web requests from the command line, which is necessary for many types of web penetration tests.

We can send a basic HTTP request to any URL by using it as an argument for cURL, as follows:

HyperText Transfer Protocol (HTTP)
alexlux5858@htb[/htb]$ curl inlanefreight.com

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
...SNIP...
We see that cURL does not render the HTML/JavaScript/CSS code, unlike a web browser, but prints it in its raw format. However, as penetration testers, we are mainly interested in the request and response context, which usually becomes much faster and more convenient than a web browser.

We may also use cURL to download a page or a file and output the content into a file using the -O flag. If we want to specify the output file name, we can use the -o flag and specify the name. Otherwise, we can use -O and cURL will use the remote file name, as follows:

# HyperText Transfer Protocol (HTTP)

`alexlux5858@htb[/htb]$ curl -O inlanefreight.com/index.html`
`alexlux5858@htb[/htb]$ ls`
`index.html`
As we can see, the output was not printed this time but rather saved into index.html. We noticed that cURL still printed some status while processing the request. We can silent the status with the -s flag, as follows:

## HyperText Transfer Protocol (HTTP)

`alexlux5858@htb[/htb]$ curl -s -O inlanefreight.com/index.html`

This time, cURL did not print anything, as the output was saved into the index.html file. Finally, we may use the -h flag to see what other options we may use with cURL:

## HyperText Transfer Protocol (HTTP)

alexlux5858@htb[/htb]$ curl -h
Usage: curl [options...] <url>
-d, --data <data> HTTP POST data
-h, --help <category> Get help for commands
-i, --include Include protocol response headers in the output
-o, --output <file> Write to file instead of stdout
-O, --remote-name Write output to a file named as the remote file
-s, --silent Silent mode
-u, --user <user:password> Server user and password
-A, --user-agent <name> Send User-Agent <name> to server
-v, --verbose Make the operation more talkative

This is not the full help, this menu is stripped into categories.
Use "--help category" to get an overview of all categories.
Use the user manual `man curl` or the "--help all" flag for all options.
As the above message mentions, we may use --help all to print a more detailed help menu, or --help category (e.g. -h http) to print the detailed help of a specific flag. If we ever need to read more detailed documentation, we can use man curl to view the full cURL manual page.

Hypertext Transfer Protocol Secure (HTTPS)
In the previous section, we discussed how HTTP requests are sent and processed. However, one of the significant drawbacks of HTTP is that all data is transferred in clear-text. This means that anyone between the source and destination can perform a Man-in-the-middle (MiTM) attack to view the transferred data.

To counter this issue, the HTTPS (HTTP Secure) protocol was created, in which all communications are transferred in an encrypted format, so even if a third party does intercept the request, they would not be able to extract the data out of it. For this reason, HTTPS has become the mainstream scheme for websites on the internet, and HTTP is being phased out, and soon most web browsers will not allow visiting HTTP websites.

HTTPS Overview
If we examine an HTTP request, we can see the effect of not enforcing secure communications between a web browser and a web application. For example, the following is the content of an HTTP login request:

![https clear](./pictures/https_clear.webp)

We can see that the login credentials can be viewed in clear-text. This would make it easy for someone on the same network (such as a public wireless network) to capture the request and reuse the credentials for malicious purposes.

In contrast, when someone intercepts and analyzes traffic from an HTTPS request, they would see something like the following:

![https encrypted](./pictures/https_google_enc.webp)

As we can see, the data is transferred as a single encrypted stream, which makes it very difficult for anyone to capture information such as credentials or any other sensitive data.

Websites that enforce HTTPS can be identified through https:// in their URL (e.g. https://www.google.com), as well as the lock icon in the address bar of the web browser, to the left of the URL:

![https google](./pictures/https_google.webp)

So, if we visit a website that utilizes HTTPS, like Google, all traffic would be encrypted.

Note: Although the data transferred through the HTTPS protocol may be encrypted, the request may still reveal the visited URL if it contacted a clear-text DNS server. For this reason, it is recommended to utilize encrypted DNS servers (e.g. 8.8.8.8 or 1.1.1.1), or utilize a VPN service to ensure all traffic is properly encrypted.

## HTTPS Flow

Let's look at how HTTPS operates at a high level:

![https flow](./pictures/https_flow.webp)

If we type http:// instead of https:// to visit a website that enforces HTTPS, the browser attempts to resolve the domain and redirects the user to the webserver hosting the target website. A request is sent to port 80 first, which is the unencrypted HTTP protocol. The server detects this and redirects the client to secure HTTPS port 443 instead. This is done via the 301 Moved Permanently response code, which we will discuss in an upcoming section.

Next, the client (web browser) sends a "client hello" packet, giving information about itself. After this, the server replies with "server hello", followed by a key exchange to exchange SSL certificates. The client verifies the key/certificate and sends one of its own. After this, an encrypted handshake is initiated to confirm whether the encryption and transfer are working correctly.

Once the handshake completes successfully, normal HTTP communication is continued, which is encrypted after that. This is a very high-level overview of the key exchange, which is beyond this module's scope.

Note: Depending on the circumstances, an attacker may be able to perform an HTTP downgrade attack, which downgrades HTTPS communication to HTTP, making the data transferred in clear-text. This is done by setting up a Man-In-The-Middle (MITM) proxy to transfer all traffic through the attacker's host without the user's knowledge. However, most modern browsers, servers, and web applications protect against this attack.

cURL for HTTPS
cURL should automatically handle all HTTPS communication standards and perform a secure handshake and then encrypt and decrypt data automatically. However, if we ever contact a website with an invalid SSL certificate or an outdated one, then cURL by default would not proceed with the communication to protect against the earlier mentioned MITM attacks:

Hypertext Transfer Protocol Secure (HTTPS)
alexlux5858@htb[/htb]$ curl https://inlanefreight.com

curl: (60) SSL certificate problem: Invalid certificate chain
More details here: https://curl.haxx.se/docs/sslcerts.html
...SNIP...
Modern web browsers would do the same, warning the user against visiting a website with an invalid SSL certificate.

We may face such an issue when testing a local web application or with a web application hosted for practice purposes, as such web applications may not yet have implemented a valid SSL certificate. To skip the certificate check with cURL, we can use the -k flag:

Hypertext Transfer Protocol Secure (HTTPS)
alexlux5858@htb[/htb]$ curl -k https://inlanefreight.com

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
...SNIP...

# HTTP Requests and Responses

HTTP communications mainly consist of an HTTP request and an HTTP response. An HTTP request is made by the client (e.g. cURL/browser), and is processed by the server (e.g. web server). The requests contain all of the details we require from the server, including the resource (e.g. URL, path, parameters), any request data, headers or options we specify, and many other options we will discuss throughout this module.

Once the server receives the HTTP request, it processes it and responds by sending the HTTP response, which contains the response code, as discussed in a later section, and may contain the resource data if the requester has access to it.

## HTTP Request

Let's start by examining the following example HTTP request:

![http request](./pictures/raw_request.webp)

The image above shows an HTTP GET request to the URL:

http://inlanefreight.com/users/login.html
The first line of any HTTP request contains three main fields 'separated by spaces':

Field Example Description
Method GET The HTTP method or verb, which specifies the type of action to perform.
Path /users/login.html The path to the resource being accessed. This field can also be suffixed with a query string (e.g. ?username=user).
Version HTTP/1.1 The third and final field is used to denote the HTTP version.
The next set of lines contain HTTP header value pairs, like Host, User-Agent, Cookie, and many other possible headers. These headers are used to specify various attributes of a request. The headers are terminated with a new line, which is necessary for the server to validate the request. Finally, a request may end with the request body and data.

Note: HTTP version 1.X sends requests as clear-text, and uses a new-line character to separate different fields and different requests. HTTP version 2.X, on the other hand, sends requests as binary data in a dictionary form.

## HTTP Response

Once the server processes our request, it sends its response. The following is an example HTTP response:

![http response](./pictures/raw_response.webp)

The first line of an HTTP response contains two fields separated by spaces. The first being the HTTP version (e.g. HTTP/1.1), and the second denotes the HTTP response code (e.g. 200 OK).

Response codes are used to determine the request's status, as will be discussed in a later section. After the first line, the response lists its headers, similar to an HTTP request. Both request and response headers are discussed in the next section.

Finally, the response may end with a response body, which is separated by a new line after the headers. The response body is usually defined as HTML code. However, it can also respond with other code types such as JSON, website resources such as images, style sheets or scripts, or even a document such as a PDF document hosted on the webserver.

## cURL

In our earlier examples with cURL, we only specified the URL and got the response body in return. However, cURL also allows us to preview the full HTTP request and the full HTTP response, which can become very handy when performing web penetration tests or writing exploits. To view the full HTTP request and response, we can simply add the -v verbose flag to our earlier commands, and it should print both the request and response:

HTTP Requests and Responses
alexlux5858@htb[/htb]$ curl inlanefreight.com -v

- Trying SERVER_IP:80...
- TCP_NODELAY set
- Connected to inlanefreight.com (SERVER_IP) port 80 (#0)
  > GET / HTTP/1.1
  > Host: inlanefreight.com
  > User-Agent: curl/7.65.3
  > Accept: _/_
  > Connection: close
- Mark bundle as not supporting multiuse
  < HTTP/1.1 401 Unauthorized
  < Date: Tue, 21 Jul 2020 05:20:15 GMT
  < Server: Apache/X.Y.ZZ (Ubuntu)
  < WWW-Authenticate: Basic realm="Restricted Content"
  < Content-Length: 464
  < Content-Type: text/html; charset=iso-8859-1
  <
  <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
  <html><head>

...SNIP...
As we can see, this time, we get the full HTTP request and response. The request simply sent GET / HTTP/1.1 along with the Host, User-Agent and Accept headers. In return, the HTTP response contained the HTTP/1.1 401 Unauthorized, which indicates that we do not have access over the requested resource, as we will see in an upcoming section. Similar to the request, the response also contained several headers sent by the server, including Date, Content-Length, and Content-Type. Finally, the response contained the response body in HTML, which is the same one we received earlier when using cURL without the -v flag.

Exercise: The -vvv flag shows an even more verbose output. Try to use this flag to see what extra request and response details get displayed with it.

## Browser DevTools

Most modern web browsers come with built-in developer tools (DevTools), which are mainly intended for developers to test their web applications. However, as web penetration testers, these tools can be a vital asset in any web assessment we perform, as a browser (and its DevTools) are among the assets we are most likely to have in every web assessment exercise. In this module, we will also discuss how to utilize some of the basic browser devtools to assess and monitor different types of web requests.

Whenever we visit any website or access any web application, our browser sends multiple web requests and handles multiple HTTP responses to render the final view we see in the browser window. To open the browser devtools in either Chrome or Firefox, we can click [CTRL+SHIFT+I] or simply click [F12]. The devtools contain multiple tabs, each of which has its own use. We will mostly be focusing on the Network tab in this module, as it is responsible for web requests.

If we click on the Network tab and refresh the page, we should be able to see the list of requests sent by the page:

![browser devtools](./pictures/devtools_network_requests.jpg)

As we can see, the devtools show us at a glance the response status (i.e. response code), the request method used (GET), the requested resource (i.e. URL/domain), along with the requested path. Furthermore, we can use Filter URLs to search for a specific request, in case the website loads too many to go through.

Exercise: Try clicking on any of the requests to view their details. You can then click on the Response tab to view the response body, and then click on the Raw button to view the raw (unrendered) source code of the response body.

# HTTP Headers

We have seen examples of HTTP requests and response headers in the previous section. Such HTTP headers pass information between the client and the server. Some headers are only used with either requests or responses, while some other general headers are common to both.

Headers can have one or multiple values, appended after the header name and separated by a colon. We can divide headers into the following categories:

General Headers
Entity Headers
Request Headers
Response Headers
Security Headers
Let's discuss each of these categories.

## General Headers

General headers are used in both HTTP requests and responses. They are contextual and are used to describe the message rather than its contents.

## Header Example Description

Date Date: Wed, 16 Feb 2022 10:38:44 GMT Holds the date and time at which the message originated. It's preferred to convert the time to the standard UTC time zone.
Connection Connection: close Dictates if the current network connection should stay alive after the request finishes. Two commonly used values for this header are close and keep-alive. The close value from either the client or server means that they would like to terminate the connection, while the keep-alive header indicates that the connection should remain open to receive more data and input.
Entity Headers
Similar to general headers, Entity Headers can be common to both the request and response. These headers are used to describe the content (entity) transferred by a message. They are usually found in responses and POST or PUT requests.

## Header Example Description

Content-Type Content-Type: text/html Used to describe the type of resource being transferred. The value is automatically added by the browsers on the client-side and returned in the server response. The charset field denotes the encoding standard, such as UTF-8.
Media-Type Media-Type: application/pdf The media-type is similar to Content-Type, and describes the data being transferred. This header can play a crucial role in making the server interpret our input. The charset field may also be used with this header.
Boundary boundary="b4e4fbd93540" Acts as a marker to separate content when there is more than one in the same message. For example, within a form data, this boundary gets used as --b4e4fbd93540 to separate different parts of the form.
Content-Length Content-Length: 385 Holds the size of the entity being passed. This header is necessary as the server uses it to read data from the message body, and is automatically generated by the browser and tools like cURL.
Content-Encoding Content-Encoding: gzip Data can undergo multiple transformations before being passed. For example, large amounts of data can be compressed to reduce the message size. The type of encoding being used should be specified using the Content-Encoding header.
Request Headers
The client sends Request Headers in an HTTP transaction. These headers are used in an HTTP request and do not relate to the content of the message. The following headers are commonly seen in HTTP requests.

## Header Example Description

Host Host: www.inlanefreight.com Used to specify the host being queried for the resource. This can be a domain name or an IP address. HTTP servers can be configured to host different websites, which are revealed based on the hostname. This makes the host header an important enumeration target, as it can indicate the existence of other hosts on the target server.
User-Agent User-Agent: curl/7.77.0 The User-Agent header is used to describe the client requesting resources. This header can reveal a lot about the client, such as the browser, its version, and the operating system.
Referer Referer: http://www.inlanefreight.com/ Denotes where the current request is coming from. For example, clicking a link from Google search results would make https://google.com the referer. Trusting this header can be dangerous as it can be easily manipulated, leading to unintended consequences.
Accept Accept: _/_ The Accept header describes which media types the client can understand. It can contain multiple media types separated by commas. The _/_ value signifies that all media types are accepted.
Cookie Cookie: PHPSESSID=b4e4fbd93540 Contains cookie-value pairs in the format name=value. A cookie is a piece of data stored on the client-side and on the server, which acts as an identifier. These are passed to the server per request, thus maintaining the client's access. Cookies can also serve other purposes, such as saving user preferences or session tracking. There can be multiple cookies in a single header separated by a semi-colon.
Authorization Authorization: BASIC cGFzc3dvcmQK Another method for the server to identify clients. After successful authentication, the server returns a token unique to the client. Unlike cookies, tokens are stored only on the client-side and retrieved by the server per request. There are multiple types of authentication types based on the webserver and application type used.
A complete list of request headers and their usage can be found here.

## Response Headers

Response Headers can be used in an HTTP response and do not relate to the content. Certain response headers such as Age, Location, and Server are used to provide more context about the response. The following headers are commonly seen in HTTP responses.

Header Example Description
Server Server: Apache/2.2.14 (Win32) Contains information about the HTTP server, which processed the request. It can be used to gain information about the server, such as its version, and enumerate it further.
Set-Cookie Set-Cookie: PHPSESSID=b4e4fbd93540 Contains the cookies needed for client identification. Browsers parse the cookies and store them for future requests. This header follows the same format as the Cookie request header.
WWW-Authenticate WWW-Authenticate: BASIC realm="localhost" Notifies the client about the type of authentication required to access the requested resource.
Security Headers
Finally, we have Security Headers. With the increase in the variety of browsers and web-based attacks, defining certain headers that enhanced security was necessary. HTTP Security headers are a class of response headers used to specify certain rules and policies to be followed by the browser while accessing the website.

Header Example Description
Content-Security-Policy Content-Security-Policy: script-src 'self' Dictates the website's policy towards externally injected resources. This could be JavaScript code as well as script resources. This header instructs the browser to accept resources only from certain trusted domains, hence preventing attacks such as Cross-site scripting (XSS).
Strict-Transport-Security Strict-Transport-Security: max-age=31536000 Prevents the browser from accessing the website over the plaintext HTTP protocol, and forces all communication to be carried over the secure HTTPS protocol. This prevents attackers from sniffing web traffic and accessing protected information such as passwords or other sensitive data.
Referrer-Policy Referrer-Policy: origin Dictates whether the browser should include the value specified via the Referer header or not. It can help in avoiding disclosing sensitive URLs and information while browsing the website.
Note: This section only mentions a small subset of commonly seen HTTP headers. There are many other contextual headers that can be used in HTTP communications. It's also possible for applications to define custom headers based on their requirements. A complete list of standard HTTP headers can be found here.

## cURL

In the previous section, we saw how using the -v flag with cURL shows us the full details of the HTTP request and response. If we were only interested in seeing the response headers, then we can use the -I flag to send a HEAD request and only display the response headers. Furthermore, we can use the -i flag to display both the headers and the response body (e.g. HTML code). The difference between the two is that -I sends a HEAD request (as will see in the next section), while -i sends any request we specify and prints the headers as well.

The following command shows an example output of using the -I flag:

## HTTP Headers

alexlux5858@htb[/htb]$ curl -I https://www.inlanefreight.com

Host: www.inlanefreight.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko)
Cookie: cookie1=298zf09hf012fh2; cookie2=u32t4o3tb3gg4
Accept: text/plain
Referer: https://www.inlanefreight.com/
Authorization: BASIC cGFzc3dvcmQK

Date: Sun, 06 Aug 2020 08:49:37 GMT
Connection: keep-alive
Content-Length: 26012
Content-Type: text/html; charset=ISO-8859-4
Content-Encoding: gzip
Server: Apache/2.2.14 (Win32)
Set-Cookie: name1=value1,name2=value2; Expires=Wed, 09 Jun 2021 10:18:14 GMT
WWW-Authenticate: BASIC realm="localhost"
Content-Security-Policy: script-src 'self'
Strict-Transport-Security: max-age=31536000
Referrer-Policy: origin
Exercise: Try to go through all of the above headers, and see whether you can recall the usage for each of them.

In addition to viewing headers, cURL also allows us to set request headers with the -H flag, as we will see in a later section. Some headers, like the User-Agent or Cookie headers, have their own flags. For example, we can use the -A to set our User-Agent, as follows:

HTTP Headers
alexlux5858@htb[/htb]$ curl https://www.inlanefreight.com -A 'Mozilla/5.0'

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
...SNIP...
Exercise: Try to use the -I or the -v flags with the above example, to ensure that we did change our User-Agent with the -A flag.

Browser DevTools
Finally, let's see how we can preview the HTTP headers using the browser devtools. Just as we did in the previous section, we can go to the Network tab to view the different requests made by the page. We can click on any of the requests to view its details:

---

## General Headers

[General headers](https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html) are used in both HTTP requests and responses. They are contextual and are used to `describe the message rather than its contents`.

| Header       | Example                               | Description                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Date`       | `Date: Wed, 16 Feb 2022 10:38:44 GMT` | Holds the date and time at which the message originated. It's preferred to convert the time to the standard [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) time zone.                                                                                                                                                                                                    |
| `Connection` | `Connection: close`                   | Dictates if the current network connection should stay alive after the request finishes. Two commonly used values for this header are `close` and `keep-alive`. The `close` value from either the client or server means that they would like to terminate the connection, while the `keep-alive` header indicates that the connection should remain open to receive more data and input. |

## Entity Headers

Similar to general headers, [Entity Headers](https://www.w3.org/Protocols/rfc2616/rfc2616-sec7.html) can be `common to both the request and response`. These headers are used to `describe the content` (entity) transferred by a message. They are usually found in responses and POST or PUT requests.

| Header             | Example                       | Description                                                                                                                                                                                                                                                                |
| ------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Type`     | `Content-Type: text/html`     | Used to describe the type of resource being transferred. The value is automatically added by the browsers on the client-side and returned in the server response. The `charset` field denotes the encoding standard, such as [UTF-8](https://en.wikipedia.org/wiki/UTF-8). |
| `Media-Type`       | `Media-Type: application/pdf` | The `media-type` is similar to `Content-Type`, and describes the data being transferred. This header can play a crucial role in making the server interpret our input. The `charset` field may also be used with this header.                                              |
| `Boundary`         | `boundary="b4e4fbd93540"`     | Acts as a marker to separate content when there is more than one in the same message. For example, within a form data, this boundary gets used as `--b4e4fbd93540` to separate different parts of the form.                                                                |
| `Content-Length`   | `Content-Length: 385`         | Holds the size of the entity being passed. This header is necessary as the server uses it to read data from the message body, and is automatically generated by the browser and tools like cURL.                                                                           |
| `Content-Encoding` | `Content-Encoding: gzip`      | Data can undergo multiple transformations before being passed. For example, large amounts of data can be compressed to reduce the message size. The type of encoding being used should be specified using the `Content-Encoding` header.                                   |
