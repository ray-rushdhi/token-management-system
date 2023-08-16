package com.hSenid.demo.controllers;

import java.net.http.HttpResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.hSenid.demo.models.User;
import com.hSenid.demo.models.UserState;
import com.hSenid.demo.payload.request.PassChangeRequest;
import com.hSenid.demo.payload.request.SignupRequest;
import com.hSenid.demo.payload.response.MessageResponse;
import com.hSenid.demo.repository.RoleRepository;
import com.hSenid.demo.security.jwt.JwtUtils;
import com.hSenid.demo.services.SequenceGeneratorService;
import com.hSenid.demo.services.UserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hSenid.demo.models.ERole;
import com.hSenid.demo.models.Role;
import com.hSenid.demo.payload.request.LoginRequest;
import com.hSenid.demo.payload.response.JwtResponse;
import com.hSenid.demo.repository.UserRepository;
import com.hSenid.demo.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private SequenceGeneratorService service;

	@Autowired
	private UserService userService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		logger.info("The /signin endpoint has been reached");
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);

			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream()
					.map(item -> item.getAuthority())
					.collect(Collectors.toList());

			logger.info("User {} has successfully logged in", loginRequest.getUsername());
			logger.info("Token successfully generated");
			return ResponseEntity.ok(new JwtResponse(jwt,
					userDetails.getId(),
					userDetails.getUsername(),
					userDetails.getEmail(),
					roles));
		} catch (BadCredentialsException e) {
			// Handle invalid credentials (password doesn't match)
			logger.warn("Passwords don't match");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new MessageResponse("Invalid username or password"));
		} catch (UsernameNotFoundException e) {
			// Handle user not found
			logger.warn("User not found");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new MessageResponse("User not found"));
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		logger.info("The /signup endpoint has been reached");
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			logger.error("Username is already taken");
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}


		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			logger.error("Email is already in use");
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User();
		user.setFirstName(signUpRequest.getFirstName());
		user.setLastName(signUpRequest.getLastName());
		user.setGender(signUpRequest.getGender());
		user.setDob(signUpRequest.getDob());
		user.setContactNum(signUpRequest.getContactNum());
		user.setUsername(signUpRequest.getUsername());
		user.setEmail(signUpRequest.getEmail());
		user.setPassword(encoder.encode(signUpRequest.getPassword()));
		user.setState(UserState.ACTIVE);

		logger.info("Password has been encoded");

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> {
						logger.error("Role is not found");
						return new RuntimeException("Error: Role is not found.");
					});
			logger.info("The user has been assigned the role of ROLE_USER");
			roles.add(userRole);

		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> {
								logger.error("Role is not found");
								return new RuntimeException("Error: Role is not found.");
							});
					logger.info("The user has been assigned the role of ADMIN");
					roles.add(adminRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> {
								logger.error("Role is not found");
								return new RuntimeException("Error: Role is not found.");
							});
					logger.info("The user has been assigned the role of ROLE_USER");
					roles.add(userRole);
				}
			});
		}

		user.setId(service.getSequenceNumber(User.SEQUENCE_NAME));
		user.setRoles(roles);
		logger.info("All roles have been assigned to the user");
		userRepository.save(user);
		logger.info("User successfully saved to the database");
		logger.info("User registered successfully!");

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody PassChangeRequest passChangeRequest) {

		logger.info("Change password endpoint accessed");
		ResponseEntity<String> response = userService.changePassword(passChangeRequest);
		return response;
	}
}
