package com.example.demo.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		List<User> all = userRepository.findAll();

		return all;
	}
}
