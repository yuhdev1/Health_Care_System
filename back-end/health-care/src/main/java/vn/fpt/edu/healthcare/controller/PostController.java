package vn.fpt.edu.healthcare.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.fpt.edu.healthcare.dto.FeedbackDto;
import vn.fpt.edu.healthcare.dto.PostDto;
import vn.fpt.edu.healthcare.model.req.AddPostReq;
import vn.fpt.edu.healthcare.model.req.DeleteFeedbackReq;
import vn.fpt.edu.healthcare.model.req.DeletePostReq;
import vn.fpt.edu.healthcare.service.PostService;

import java.util.HashMap;

@RestController
@Slf4j
@RequestMapping("v1/post")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class PostController {
    private PostService postService;
    private ModelMapper modelMapper;
    @PostMapping("/add")
    public ResponseEntity<PostDto> addPost(@RequestBody AddPostReq addPostReq){
        var added = postService.addPost(addPostReq);
        log.info("Added success : {} ", addPostReq.getPostDto());
        return new ResponseEntity<>(added, HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<HashMap<String, Object>> getFeedBack(@RequestParam(required = false) String searchKey,
                                                               @RequestParam(defaultValue = "0") int page) {
        log.info("call get post, page {}, search title {}", page,searchKey);
        searchKey = StringUtils.isEmpty(searchKey) ? "" : searchKey;
        return new ResponseEntity<>(postService.getPosts(searchKey, page), HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<PostDto> deletePost(@RequestBody DeletePostReq deletePostReq) {
        log.info("call delete post, id {}", deletePostReq.getPostId());
        var deleted = postService.deletePost(deletePostReq);
        log.info("Delete success, id: {} ", deleted.getPostId());
        return new ResponseEntity<>(modelMapper.map(deleted, PostDto.class), HttpStatus.OK);
    }
}
