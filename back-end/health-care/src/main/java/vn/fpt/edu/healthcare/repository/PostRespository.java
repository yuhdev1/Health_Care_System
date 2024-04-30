package vn.fpt.edu.healthcare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import vn.fpt.edu.healthcare.model.Feedback;
import vn.fpt.edu.healthcare.model.Post;

import java.util.Optional;

public interface PostRespository extends MongoRepository<Post,String> {
    Page<Post> findByTitleContainingIgnoreCaseAndStatus(String title , int status, Pageable pageable);

    Optional<Post> findPostByPostId(String feedbackId);

}
