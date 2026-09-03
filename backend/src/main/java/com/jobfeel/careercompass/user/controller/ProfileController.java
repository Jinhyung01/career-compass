package com.jobfeel.careercompass.user.controller;

import com.jobfeel.careercompass.common.auth.MockCurrentUserProvider;
import com.jobfeel.careercompass.user.dto.ProfileResponse;
import com.jobfeel.careercompass.user.dto.ProfileUpsertRequest;
import com.jobfeel.careercompass.user.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/me/profile")
public class ProfileController {

    private final MockCurrentUserProvider mockCurrentUserProvider;
    private final ProfileService profileService;

    public ProfileController(MockCurrentUserProvider mockCurrentUserProvider,
                             ProfileService profileService) {
        this.mockCurrentUserProvider = mockCurrentUserProvider;
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse getProfile(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        long userId = mockCurrentUserProvider.getCurrentUserId(authorization);
        return profileService.getProfile(userId);
    }

    @PutMapping
    public ProfileResponse updateProfile(
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @Valid @RequestBody ProfileUpsertRequest request) {
        long userId = mockCurrentUserProvider.getCurrentUserId(authorization);
        return profileService.saveProfile(userId, request);
    }
}
