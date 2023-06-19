package com.example.scmessage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration;

@SpringBootApplication
public class ScmessageApplication {

  public static void main(String[] args) {
    SpringApplication.run(ScmessageApplication.class, args);
  }

}
