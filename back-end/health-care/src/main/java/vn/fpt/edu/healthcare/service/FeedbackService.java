package vn.fpt.edu.healthcare.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
import vn.fpt.edu.healthcare.model.Feedback;
import vn.fpt.edu.healthcare.model.User;
import vn.fpt.edu.healthcare.model.req.AddFeedbackReq;
import vn.fpt.edu.healthcare.model.req.DeleteFeedbackReq;
import vn.fpt.edu.healthcare.model.req.EditFeedbackReq;
import vn.fpt.edu.healthcare.repository.FeedbackRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class FeedbackService {
    FeedbackRepository feedbackRepository;
    ModelMapper modelMapper;
    private static final int pageSize = 5;
   /* public void saveFeedback() {
        feedbackRepository.save(Feedback.builder().title("hello2").content("content2").user(new User("1","user1","user1",)).status(true).createdDate(LocalDate.now()).build());
        feedbackRepository.save(Feedback.builder().title("hello1").content("content3").user(new User("2","user2","user2")).status(true).createdDate(LocalDate.now()).build());
        feedbackRepository.save(Feedback.builder().title("hello3").content("content3").user(new User("user3","user3")).status(true).createdDate(LocalDate.now()).build());
        feedbackRepository.save(Feedback.builder().title("hello4").content("content3").user(new User("user4","user4")).status(true).createdDate(LocalDate.now()).build());
    }*/

    public Feedback deleteFeedback(DeleteFeedbackReq deleteFeedback) {
        var feedbackOpt = feedbackRepository.findFeedbackByFeedbackId(deleteFeedback.getFeedbackId());
        feedbackOpt.ifPresent(feedback -> {
            feedback.setStatus(false);
            feedbackRepository.save(feedback);
        });
        return feedbackOpt.orElse(null);
    }

    public Feedback editFeedback(EditFeedbackReq editFeedbackReq) {
        var feedbackOpt = feedbackRepository.findFeedbackByFeedbackId(editFeedbackReq.getFeedbackId());
        feedbackOpt.ifPresent(feedback -> {
            feedback.setResponse(editFeedbackReq.getResponse());
            feedbackRepository.save(feedback);
        });
        return feedbackOpt.orElse(null);
    }
    public FeedbackDto addFeedback(AddFeedbackReq addFeedback) {
        Feedback feedback = null;
        if(Objects.nonNull(addFeedback.getFeedback())) {
            feedback = modelMapper.map(addFeedback.getFeedback(), Feedback.class);
            feedback.setCreatedDate(LocalDate.now());
            if (Objects.nonNull(addFeedback.getCreatedUser())) {
                feedback.setUser(modelMapper.map(addFeedback.getCreatedUser(), User.class));
            } else {
                feedback.setUser(null);
            }
            feedback.setTitle(feedback.getTitle()==null ? "":  feedback.getTitle());
            feedback.setStatus(true);
            feedbackRepository.save(feedback);
            log.info("save feedback {} success", feedback);
        }
        return modelMapper.map(feedback, FeedbackDto.class);
    }
    public HashMap<String, Object> getFeedbacks(String searchKey, int page) {
        Pageable paging = PageRequest.of(page, pageSize);
        var feedbacksPg = feedbackRepository
                .findByTitleContainingIgnoreCaseAndStatus(searchKey, true, paging);
        HashMap<String, Object> resp = new HashMap<>();
        resp.put("feedbacks",feedbacksPg.getContent()
                .stream().map(item -> modelMapper.map(item, FeedbackDto.class))
                .collect(Collectors.toList()));
        resp.put("totalPage", feedbacksPg.getTotalPages());
        return resp;
    }

}