package vn.fpt.edu.healthcare.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
import vn.fpt.edu.healthcare.dto.PostDto;
import vn.fpt.edu.healthcare.model.Feedback;
import vn.fpt.edu.healthcare.model.Post;
import vn.fpt.edu.healthcare.model.User;
import vn.fpt.edu.healthcare.model.req.AddPostReq;
import vn.fpt.edu.healthcare.model.req.DeleteFeedbackReq;
import vn.fpt.edu.healthcare.model.req.DeletePostReq;
import vn.fpt.edu.healthcare.repository.PostRespository;

import java.util.HashMap;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PostService {
    PostRespository postRespository;
    private static final int pageSize = 5;
    ModelMapper modelMapper;
    public PostDto addPost(AddPostReq addPostReq){
        Post post = null;
        if(Objects.nonNull(addPostReq.getPostDto())){
            post = modelMapper.map(addPostReq.getPostDto(),Post.class);
            if (Objects.nonNull(addPostReq.getAuthor())) {
                post.setAuthor(modelMapper.map(addPostReq.getAuthor(), User.class));
            } else {
                post.setAuthor(null);
            }
            post.setThumbnail("");
            post.setCategory(post.getCategory());
            post.setFeature(post.getFeature());
            post.setTitle(post.getTitle() == null?"" : post.getTitle());
            post.setStatus(0);
            postRespository.save(post);
            log.info("save post {} success", post);
        }
        return modelMapper.map(post,PostDto.class);
    }

    public HashMap<String, Object> getPosts(String searchKey, int page) {
        Pageable paging = PageRequest.of(page, pageSize);
        var postPg = postRespository
                .findByTitleContainingIgnoreCaseAndStatus(searchKey, 0, paging);
        HashMap<String, Object> resp = new HashMap<>();
        resp.put("posts",postPg.getContent()
                .stream().map(item -> modelMapper.map(item, PostDto.class))
                .collect(Collectors.toList()));
        resp.put("totalPage", postPg.getTotalPages());
        return resp;
    }

    public Post deletePost(DeletePostReq deletePost) {
        var feedbackOpt = postRespository.findPostByPostId(deletePost.getPostId());
        feedbackOpt.ifPresent(feedback -> {
            feedback.setStatus(1);
            postRespository.save(feedback);
        });
        return feedbackOpt.orElse(null);
    }
}
