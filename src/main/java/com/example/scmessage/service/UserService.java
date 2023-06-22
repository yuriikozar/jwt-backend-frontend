package com.example.scmessage.service;

import com.example.scmessage.model.User;
import com.example.scmessage.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User getUserById(Long id) {
    Optional<User> userOptional = userRepository.findById(id);
    return userOptional.orElse(null);
  }

  public Optional<User> getByUsername(String username) {
    return userRepository.findUserByUsername(username);
  }

  public Boolean hasUserWithUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  public Boolean hasUserWithEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public User updateUser(User user) {
    return userRepository.save(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
