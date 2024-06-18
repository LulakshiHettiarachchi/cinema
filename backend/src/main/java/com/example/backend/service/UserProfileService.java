package com.example.backend.service;
import com.example.backend.dto.UserProfileDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserProfileRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final ModelMapper modelMapper;

    public UserProfileService(UserProfileRepository userProfileRepository, ModelMapper modelMapper) {
        this.userProfileRepository = userProfileRepository;
        this.modelMapper = modelMapper;
    }

    public UserProfileDTO getUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = ((User) authentication.getPrincipal()).getEmail();
            Optional<User> userOptional = userProfileRepository.findByEmail(email);
            System.out.println(userOptional);
            if (userOptional.isPresent()) {
                UserProfileDTO userProfileDTO = new UserProfileDTO();
                userProfileDTO.setEmail(userOptional.get().getEmail());
                userProfileDTO.setUsername(userOptional.get().getUsername());
                userProfileDTO.setPhoneNumber(userOptional.get().getPhoneNumber());
                return userProfileDTO;
            } else {
                throw new Exception("User with email " + email + " not found");
            }
        } catch (Exception e) {
            // Log the exception and rethrow it or handle it accordingly
            System.err.println("Error occurred while fetching user profile: " + e.getMessage());
            throw new RuntimeException("Failed to fetch user profile", e);
        }
    }

public String updateUserProfile(UserProfileDTO userProfileDTO) {
    try {
        User user = modelMapper.map(userProfileDTO, User.class);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((User) authentication.getPrincipal()).getEmail();
        Optional<User> userOld = userProfileRepository.findByEmail(email);
        System.out.println(user);
        if (userOld.isPresent()) {

            // Update only the fields that are provided
            if (user.getUsername() != null) {
                userOld.get().setUsername(user.getUsername());
            }
            if (user.getPhoneNumber() != null) {
                userOld.get().setPhoneNumber(user.getPhoneNumber());
            }

            userProfileRepository.save(userOld.get());

            return "User updated successfully";
        } else {
            throw new Exception("User with email " + user.getEmail() + " not found");
        }
    } catch (Exception e) {
        // Log the exception and rethrow it or handle it accordingly
        System.err.println("Error occurred while fetching user profile: " + e.getMessage());
        throw new RuntimeException("Failed to fetch user profile", e);
    }
}
}
