package com.example.springboilerplate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class SpringBoilerplateApplication {
	public static void main(String[] args) {
		// Load .env file
		Dotenv dotenv = Dotenv.configure()
													.directory("./") // thư mục chứa .env
													.ignoreIfMalformed()
													.ignoreIfMissing()
													.load();

		// Gán vào System properties để @Value có thể đọc
		System.setProperty("google.client-id", dotenv.get("GOOGLE_CLIENT_ID"));
		System.setProperty("google.client-secret", dotenv.get("GOOGLE_CLIENT_SECRET"));
		System.setProperty("google.redirect-uri", dotenv.get("GOOGLE_REDIRECT_URI"));
		SpringApplication.run(SpringBoilerplateApplication.class, args);
	}
}
