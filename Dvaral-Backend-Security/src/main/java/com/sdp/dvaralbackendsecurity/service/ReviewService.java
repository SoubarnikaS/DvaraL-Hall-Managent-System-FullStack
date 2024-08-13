package com.sdp.dvaralbackendsecurity.service;

import com.sdp.dvaralbackendsecurity.model.Reviews;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    public Reviews addReview(Reviews reviews, Long userID) {

        User user = userService.getUser(userID);
        reviews.setUsers(user);
        return reviewRepository.save(reviews);

    }

    public List<Reviews> getAllReview() {
        return reviewRepository.findAll();
    }
}
