package com.hSenid.demo.controllers;

import java.net.http.HttpResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.hSenid.demo.models.User;
import com.hSenid.demo.payload.request.PassChangeRequest;
import com.hSenid.demo.payload.request.SignupRequest;
import com.hSenid.demo.payload.response.MessageResponse;
import com.hSenid.demo.repository.RoleRepository;
import com.hSenid.demo.security.jwt.JwtUtils;
import com.hSenid.demo.services.SequenceGeneratorService;
import com.hSenid.demo.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		logger.info("User {} has successfully logged in", loginRequest.getUsername());
		return ResponseEntity.ok(new JwtResponse(jwt,
				userDetails.getId(),
				userDetails.getUsername(),
				userDetails.getEmail(),
				roles));

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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
		User user = new User(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getGender(),
				signUpRequest.getDob(), signUpRequest.getContactNum(),signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));
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

//	@PostMapping("/signout")
//	public void signout(HttpServletResponse response) {
//		// Invalidate JWT token by clearing it from the client-side (browser)
//		Cookie jwtCookie = new Cookie("jwtToken", null);
//		jwtCookie.setMaxAge(0); // Set cookie expiration to 0 to immediately remove it
//		jwtCookie.setPath("/"); // Set cookie path to ensure it's removed for all paths
//		response.addCookie(jwtCookie);
//
//		// Optionally, you can also clear other cookies or local storage data related to authentication
//
//		// Redirect to a specific page after logout (optional)
//		// For Angular, you can use window.location.href to reload the entire application after logout
//		response.setHeader("Location", "/api/auth/signin"); // Redirect to the login page
//		response.setStatus(302); // Set the status code to 302 for redirect
//	}
}
