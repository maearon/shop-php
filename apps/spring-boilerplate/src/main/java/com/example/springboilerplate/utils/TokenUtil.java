package com.example.springboilerplate.utils;

import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.security.crypto.bcrypt.BCrypt;

public class TokenUtil {

    // Tạo token ngẫu nhiên để gửi cho user
    public static String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[24]; // 24 bytes = 32-character base64
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    // Hash token để lưu vào DB (gọi là "digest")
    public static String generateDigest(String token) {
        return BCrypt.hashpw(token, BCrypt.gensalt());
    }

    // So sánh token người dùng gửi lại với digest lưu trong DB
    public static boolean matches(String token, String digest) {
        if (token == null || digest == null) return false;
        return BCrypt.checkpw(token, digest);
    }
}
