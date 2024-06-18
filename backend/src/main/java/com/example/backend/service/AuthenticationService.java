
package com.example.backend.service;

import com.example.backend.dto.AuthenticationResponseDTO;
import com.example.backend.dto.EmailVerifyRequestDTO;
import com.example.backend.dto.UserRequestDTO;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.modelmapper.ModelMapper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper modelMapper;
    private final PasswordResetService passwordResetService;
    private final JavaMailSender mailSender;
    private final String SECRET_KEY = "f40521044b8313c70afc868a8e0b9ff0524e3ff3ee60253b40b05816da484c5a";

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, ModelMapper modelMapper, PasswordResetService passwordResetService, JavaMailSender mailSender) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.modelMapper = modelMapper;
        this.passwordResetService = passwordResetService;
        this.mailSender = mailSender;
    }


    public AuthenticationResponseDTO register(UserRequestDTO userRequestDTO) {

        // check if user already exist. if exist than authenticate the user
        if(repository.findByEmail(userRequestDTO.getEmail()).isPresent()) {
            return new AuthenticationResponseDTO(null, "User already exist");
        }

        User user = modelMapper.map(userRequestDTO, User.class);

        user.setUsername(user.getUsername());
        user.setEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //user.setRole(request.getRole());
        //since this is only for one user -->put role as USER in default
        user.setRole(Role.USER);
        user.setVerified(false);

        user = repository.save(user);

        //here generating token at the registration in not needed.created token and pass it to the FE.
        //In FE it checks if there is a token return then it take registration is success it asks to verify email.
        String jwt = generateToken(user);
        sendEmailVerifyLinkEmail(user.getEmail(),jwt);
        return new AuthenticationResponseDTO(jwt,"User registered successfully.Please Verify your email");

    }


    public void sendEmailVerifyLinkEmail(String email,String token) {
        String emailVerifyLink = "http://localhost:3000/verify-email?token=" + token;
        sendEmail(email, emailVerifyLink);

    }

    private String generateToken(User user) {
        long expirationTime = 1000 * 60 * 60; // 1 hour
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    private void sendEmail(String to, String verifyLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(to);
            helper.setSubject("Email verification link - MyShow.lk") ;
            helper.setText("Click this link to verify your email: " + verifyLink, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
public AuthenticationResponseDTO emailVerify(EmailVerifyRequestDTO emailVerifyRequestDTO) {
    try {
        String email = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(emailVerifyRequestDTO.getToken())
                .getBody()
                .getSubject();

        Optional<User> userOptional = repository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return new AuthenticationResponseDTO(null, "User not found");
        }

        User user = userOptional.get();

        if (user.getVerified()) {
            return new AuthenticationResponseDTO(null, "Email is already verified. Please log in.");
        }

        user.setVerified(true);
        repository.save(user);
        return new AuthenticationResponseDTO(null, "Email verified successfully. You can now log in.");
    } catch (Exception e) {
        return new AuthenticationResponseDTO(null, "Verification link is expired. Please resend the verification email.");
    }
}


    public AuthenticationResponseDTO resendVerificationEmail(EmailVerifyRequestDTO emailVerifyRequestDTO) {
        String email = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(emailVerifyRequestDTO.getToken())
                .getBody()
                .getSubject();

        Optional<User> userOptional = repository.findByEmail(email);
        if (!userOptional.isPresent()) {
            return new AuthenticationResponseDTO(null, "User not found");
        }

        User user = userOptional.get();
        String jwt = generateToken(user);
        sendEmailVerifyLinkEmail(user.getEmail(), jwt);
        return new AuthenticationResponseDTO(jwt, "Verification email resent successfully");
    }

    public AuthenticationResponseDTO authenticate(UserRequestDTO userRequestDTO) {
        try {
            System.out.println("Attempting to authenticate user: " + userRequestDTO.getEmail());

            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userRequestDTO.getEmail(),
                            userRequestDTO.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Authentication successful for user: " + userRequestDTO.getEmail());

            // Find the user from the repository
            User authenticatedUser = repository.findByEmail(userRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println(authenticatedUser);

            // Check if the user's email is verified
            if (!authenticatedUser.getVerified()) {
                return new AuthenticationResponseDTO(null, "Email is not verified");
            }

            // Generate JWT token
            String token = jwtService.generateToken(authenticatedUser);
            return new AuthenticationResponseDTO(token, "User authenticated successfully");

        } catch (BadCredentialsException e) {
            System.err.println("Invalid username or password for user: " + userRequestDTO.getEmail());
            e.printStackTrace();
            return new AuthenticationResponseDTO(null, "Invalid username or password");
        } catch (Exception e) {
            System.err.println("An error occurred during authentication for user: " + userRequestDTO.getEmail());
            e.printStackTrace();
            return new AuthenticationResponseDTO(null, "An error occurred during authentication");
        }
    }


}