package vn.fpt.edu.healthcare.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.fpt.edu.healthcare.model.Feedback;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    Page<Feedback> findByTitleContainingIgnoreCaseAndStatus(String title ,boolean status, Pageable pageable);
    @DeleteQuery
    List<Feedback> deleteFeedbackByFeedbackId(String feedbackId);
    Optional<Feedback> findFeedbackByFeedbackId(String feedbackId);
}
