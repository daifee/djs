# HTTP

## 术语

- connection: 两个程序通过传输层建立的“虚拟电路”，用于交流
- message: 两个程序相互传递信息的最小单元
- request: 请求 message
- response: 响应 message
- resource: 可以通过 URI 标识的网络数据对象或服务
- entity: 实体，属于message的一部分；其中又分为entity header, entity body
- client: 一个程序代码，可以建立连接，发送 requests
- user agent 一个可以启动 request 的程序
- server: 一个程序代码，可以建立连接，接收请求，并发送 response
- origin server: 存放资源或创建资源的服务
- proxy: server与client中间的程序。代表client向server发送requests，并可以修改requests内容。
- gateway: server与client的中间程序。与proxy不同，gameway接收requests，并被认为是origin server。
- tunnel: server与client的中间程序。透明传输两个连接之间的信息。
- cache: 缓存程序，可以在客户端或服务端使用，但不能在tunnel中使用。

> proxy, gateway, tunnel, cache都是client与server通讯的中间产物（程序），各有不同的需求、功能

- proxy: 代替client发送request message
  - forward proxy
  - reverse proxy
- gateway: 与server之间存在协议（鉴权、报文编码等等）
- load balance: 对接多个server，将request message分发给其中适合的server
- cache: 缓存response message

## 未理解

- Character Sets: 字符集
- Content Codings: 压缩算法
- Media Types
