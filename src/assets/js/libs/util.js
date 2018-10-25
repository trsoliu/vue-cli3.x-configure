import Vue from "vue";
import { JSEncrypt } from "jsencrypt";
let je = new JSEncrypt();

const util = {};
util.title = function(title) {
  title = title ? title : "智能客服管理系统";
  window.document.title = title;
};

// 设置密钥
je.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxX7qhFZrnI4g4s1MjDFlSJ4ze
4dQJRr+R72zY3m75iOqZVchoCpVslR2IWMz9Wplw7B87E3pR3R1GpF2fXZ6KUiZj
udbN/sgT2it2QUduXLqfXjYlMkBOwyW3m3s5Zfor3OW1WsT0jJgoJ1UvkKoKIiaR
AGSrSY02Ym1q+6Rl4QIDAQAB
-----END PUBLIC KEY-----`);
je.setPrivateKey(`-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALFfuqEVmucjiDiz
UyMMWVInjN7h1AlGv5HvbNjebvmI6plVyGgKlWyVHYhYzP1amXDsHzsTelHdHUak
XZ9dnopSJmO51s3+yBPaK3ZBR25cup9eNiUyQE7DJbebezll+ivc5bVaxPSMmCgn
VS+QqgoiJpEAZKtJjTZibWr7pGXhAgMBAAECgYEAqmkCcQjEzhSBJ5iB40ZV+mwt
F2V3xYHHQ3n35VOu4ub8HV0hMXQZozyQJxLJvw9wI+F3D9biygvZuKjpmdbkHP24
DvyQQ1vjj8L+zeBjCloE58i6CcZWzWrSniSkcBaNDzOj1Q2jbEpVoSbrhJrULgpm
Jagi/v6R3evOaF0kVtECQQDlz/nBxoAwP+hgCV4ZN1KYbTxZOhEYSFkH7Gtczb4M
gHNQGi8z4j7Qa6/KjxAE+DSwQyk5Amk9KDtRUJGzJE1PAkEAxZYIb4liXOenIe1V
MiBLqGXGPCiUtbQHe/Wnrg3jMc4BmgmIdI6Wphi+suKaJRYohf0qidMg6e3ZsBWx
Nl0tzwJBANHPi81O5c+nOQcc5k0NRholeLhZnCvYOXhTbz2eFQmi6CRUk43B2+k6
t5auAEkZNjlKR8NloSEVrvoxHaQ4218CQFCJVAzqic5mmghJLdXNtikAuumgfOUH
aZmMSvm2LWoKlzqLMjSYPi2bnndZyAzf2EqtI56kESFo0rdkUCRhnJ8CQBn5Sl43
iFCuhHfjWU0mp/WiTpqIKqi8SsjcZO+CvmbkfywaF4ykhPPi15t8ft8Ew7BM+Jc6
kL56pl6aWmqC+jo=
-----END PRIVATE KEY-----`);

util.setCookie = function(c_name, c_value, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = c_name + "=" + je.encrypt(escape(c_value)) + "; " + expires;
};
util.getCookie = function(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(je.decrypt(document.cookie.substring(c_start, c_end)));
    }
  }
  return "";
};
util.delCookie = function(c_name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = this.getCookie(c_name);
  if (cval != null) {
    document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
  }
};

/**
 * 缓存数据localStorage
 * @params name:缓存区名称
 * @params data:要缓存的数据
 */
util.setLocData = function(name, jsondata) {
  window.localStorage.setItem(name, JSON.stringify(jsondata));
};

/**
 * 取出缓存数据localStorage
 * @params name:缓存区名称
 */
util.getLocData = function(name) {
  return JSON.parse(window.localStorage.getItem(name));
};

export default util;
