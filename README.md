# n8n-nodes-fortinet

## I will add some Fortinet Products as Node for [n8n](https://n8n.io/)

**FortiMail 6.4.0**
[REST API Reference](http://docs.fortinet.com/document/fortimail/6.4.0/rest-api-reference/768217/introduction)


Only Local user password-based authentication - supported at the moment


By default, this feature is disabled on FortiMail. To enable it, use the following CLI command:


```sh
config system global
 set rest-api enable
end
```



## License

[Apache 2.0 with Commons Clause](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/LICENSE.md)
