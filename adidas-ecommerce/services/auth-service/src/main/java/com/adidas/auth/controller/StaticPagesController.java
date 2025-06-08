package com.adidas.auth.controller;

import com.adidas.auth.dto.MicropostResponseDto;
import com.adidas.auth.model.Micropost;
import com.adidas.auth.security.UserPrincipal;
import com.adidas.auth.service.MicropostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class StaticPagesController {

    private final MicropostService micropostService;

    @GetMapping("/")
    public String home(@AuthenticationPrincipal UserPrincipal currentUser, Model model) {
        if (currentUser != null) {
            model.addAttribute("micropost", new Micropost());
            int safePage = Math.max(0, 1 - 1);
            Page<MicropostResponseDto> feed = micropostService.getFeed(currentUser.getId(), PageRequest.of(0, 5));
            model.addAttribute("feed", feed);
            return "home/home_with_feed";
        }
        return "home/home";
    }

    @GetMapping("/help")
    public String help() {
        return "static_pages/help";
    }

    @GetMapping("/about")
    public String about() {
        return "static_pages/about";
    }

    @GetMapping("/contact")
    public String contact() {
        return "static_pages/contact";
    }
}
