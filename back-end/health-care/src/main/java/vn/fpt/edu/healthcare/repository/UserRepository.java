package vn.fpt.edu.healthcare.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.fpt.edu.healthcare.model.User;



@Repository
public interface UserRepository extends MongoRepository<User, Long> {
    User findByEmail(String email);
    Page<User> findAll(Pageable page);
}