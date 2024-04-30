package vn.fpt.edu.healthcare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.fpt.edu.healthcare.model.Role;
import vn.fpt.edu.healthcare.model.User;
import vn.fpt.edu.healthcare.repository.UserRepository;

@SpringBootApplication
public class HealthCareApplication implements CommandLineRunner {
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(HealthCareApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User user = new User();
		user.setUserId("1");
		user.setEmail("user123");
		user.setPassword(passwordEncoder.encode("user123"));
		user.setRole(new Role("1","user"));
		userRepository.save(user);
	}
}
