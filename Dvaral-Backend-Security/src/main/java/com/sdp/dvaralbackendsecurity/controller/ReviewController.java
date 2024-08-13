package com.sdp.dvaralbackendsecurity.controller;


import com.sdp.dvaralbackendsecurity.model.Reviews;
import com.sdp.dvaralbackendsecurity.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v2/review")
@Slf4j
public class ReviewController {


    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add/{userID}")
    public ResponseEntity<?> addReviews(@RequestBody Reviews reviews, @PathVariable Long userID) {

        try{

            Reviews review = reviewService.addReview(reviews, userID);
            return new ResponseEntity<>("Review : " + review.getReviewID() +" added successfully by user : " + userID, HttpStatus.OK);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get/all-reviews")
    public ResponseEntity<?> getAllReviews() {

        try{

            List<Reviews> reviewsList = reviewService.getAllReview();
            return new ResponseEntity<>(reviewsList, HttpStatus.OK);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
