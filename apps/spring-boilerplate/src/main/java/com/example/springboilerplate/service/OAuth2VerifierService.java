package com.example.springboilerplate.service;

import com.example.springboilerplate.dto.OAuthUserInfo;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
// import com.google.api.client.json.jackson2.JacksonFactory; // Removed, using GsonFactory instead
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class OAuth2VerifierService {

    @Value("${google.redirect-uri}")
    private String googleRedirectUri;

    @Value("${google.client-id}")
    private String googleClientId;

    @Value("${google.client-secret}")
    private String googleClientSecret;

    private final RestTemplate restTemplate = new RestTemplate();
    private GoogleIdTokenVerifier googleVerifier;

    @PostConstruct
    public void init() throws Exception {
        this.googleVerifier = new GoogleIdTokenVerifier.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }

    public OAuthUserInfo exchangeCodeForUserInfo(String code) {
        try {
            System.out.println("🎯 Exchanging code for token with Google:");
            System.out.println("code = " + code);
            System.out.println("client_id = " + googleClientId);
            System.out.println("client_secret = " + googleClientSecret);
            System.out.println("redirect_uri = " + googleRedirectUri);

            GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance(),
                    "https://oauth2.googleapis.com/token",
                    googleClientId,
                    googleClientSecret,
                    code,
                    googleRedirectUri
            ).execute();

            return fetchUserInfoFromGoogle(tokenResponse.getAccessToken());

        } catch (Exception e) {
            System.out.println("❌ Google token exchange failed: " + e.getMessage());
            return null;
        }
    }

    private OAuthUserInfo fetchUserInfoFromGoogle(String accessToken) {
        try {
            String url = "https://www.googleapis.com/oauth2/v2/userinfo";
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);
            String body = response.getBody();
            JsonObject json = JsonParser.parseString(body).getAsJsonObject();

            return OAuthUserInfo.builder()
                    .provider("google")
                    .providerUserId(json.get("id").getAsString())
                    .email(json.get("email").getAsString())
                    .name(json.has("name") ? json.get("name").getAsString() : null)
                    .avatarUrl(json.has("picture") ? json.get("picture").getAsString() : null)
                    .rawJson(body)
                    .build();
        } catch (Exception e) {
            System.out.println("❌ Failed to fetch user info from Google: " + e.getMessage());
            return null;
        }
    }

    private OAuthUserInfo verifyGoogle(String idTokenString) throws Exception {
        GoogleIdToken idToken = googleVerifier.verify(idTokenString);
        if (idToken == null) return null;

        GoogleIdToken.Payload payload = idToken.getPayload();

        return OAuthUserInfo.builder()
                .provider("google")
                .providerUserId(payload.getSubject())
                .email(payload.getEmail())
                .name((String) payload.get("name"))
                .avatarUrl((String) payload.get("picture"))
                .rawJson(payload.toString())
                .build();
    }
}
