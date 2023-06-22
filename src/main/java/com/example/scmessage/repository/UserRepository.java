package com.example.scmessage.repository;

import com.example.scmessage.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findUserByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

}
