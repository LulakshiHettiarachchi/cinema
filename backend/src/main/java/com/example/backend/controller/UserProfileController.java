package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.model.User;
import com.example.backend.service.UserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")

public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }


    @PostMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile() {

            UserProfileDTO userProfileDTO = userProfileService.getUserProfile();

        return ResponseEntity.ok(userProfileDTO);
    }

    @PutMapping ("/profile_update")
    public ResponseEntity<String> updateUserProfile(@RequestBody UserProfileDTO userProfileDTO ) {

            return ResponseEntity.ok(userProfileService.updateUserProfile(userProfileDTO));

    }

}
