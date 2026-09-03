package com.jobfeel.careercompass.user.controller;

import com.jobfeel.careercompass.common.auth.CurrentUserProvider;
import com.jobfeel.careercompass.user.dto.ProfileResponse;
import com.jobfeel.careercompass.user.dto.ProfileUpsertRequest;
import com.jobfeel.careercompass.user.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/me/profile")
public class ProfileController {

    private final CurrentUserProvider currentUserProvider;
    private final ProfileService profileService;

    public ProfileController(CurrentUserProvider currentUserProvider,
                             ProfileService profileService) {
        this.currentUserProvider = currentUserProvider;
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getProfile(
            Authentication authentication) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        return profileService.getProfile(userId);
    }

    @PutMapping
    public ProfileResponse updateProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileUpsertRequest request) {
        long userId = currentUserProvider.getCurrentUserId(authentication);
        return profileService.saveProfile(userId, request);
    }
}
