package com.hSenid.demo.payload.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {

	private String token;
	private int id;
	private String username;
	private String email;
	private List<String> roles;

	public JwtResponse(String token, int id, String username, String email, List<String> roles) {
		this.token = token;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}
}
