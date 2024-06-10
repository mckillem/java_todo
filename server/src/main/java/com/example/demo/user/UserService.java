package com.example.demo.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
	private UserRepository userRepository;

	public List<User> getAllUsers() {

		return userRepository.findAll();
	}
}
