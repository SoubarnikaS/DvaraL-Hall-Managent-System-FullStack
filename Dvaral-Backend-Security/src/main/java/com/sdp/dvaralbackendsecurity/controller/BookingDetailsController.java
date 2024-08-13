package com.sdp.dvaralbackendsecurity.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sdp.dvaralbackendsecurity.dto.StatusDto;
import com.sdp.dvaralbackendsecurity.model.BookingDetails;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.UserRepo;
import com.sdp.dvaralbackendsecurity.service.BookingDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v2/hall")
@Slf4j
public class BookingDetailsController {

    @Autowired
    private BookingDetailsService bookingDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepo userRepository;



    @PostMapping("/add/booking-details/{hallID}")
    public ResponseEntity<?> addBookingDetails(@RequestBody BookingDetails bookingDetails, @PathVariable Long hallID) {

        try{

            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));


            BookingDetails bookedHalls = bookingDetailsService.addBookingDetails(bookingDetails, foundUser.getId(), hallID);

            return new ResponseEntity<>("Hall : " + hallID + " booked successfully", HttpStatus.CREATED);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getby/{bookingID}")
    public ResponseEntity<?> getBookingDetails(@PathVariable Long bookingID) {

        Optional<BookingDetails> bookingDetailsList = bookingDetailsService.getAllBookingDetailsFor(bookingID);
        return new ResponseEntity<>(bookingDetailsList, HttpStatus.OK);
    }


    @GetMapping("/fetch/booked-by-user")
    public ResponseEntity<?> fetchBookingDetails() {

        try{

            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<BookingDetails> bookedHallsForUser = bookingDetailsService.getBookingDetailsForUser(foundUser.getId());

            return new ResponseEntity<>(bookedHallsForUser, HttpStatus.OK);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/fetch/booking-requests")
    public ResponseEntity<?> fetchBookingRequests() {

        try{

            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<BookingDetails> bookingRequestsForOwner = bookingDetailsService.getBookingRequestsForOwner(foundUser.getId());
            return new ResponseEntity<>(bookingRequestsForOwner, HttpStatus.OK);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/fetch/booked-details/{status}")
    public ResponseEntity<?> fetchApprovedBookingDetails(@PathVariable String status) {

        try{

            List<BookingDetails> bookedDetails = bookingDetailsService.getBookedDetails(status);
            return new ResponseEntity<>(bookedDetails, HttpStatus.OK);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping( "/update-status/{bookingID}")
    public ResponseEntity<?> updateHallStatus(@PathVariable Long bookingID, @RequestBody StatusDto hallStatus) {

        try{

            Boolean response = bookingDetailsService.updateHallStatus(bookingID, hallStatus);

            if(response)
                return new ResponseEntity<>("Hall : " + bookingID + " updated successfully to status - " + hallStatus.getBookingStatus(), HttpStatus.OK);
            else
                return new ResponseEntity<>("Hall not found", HttpStatus.NOT_FOUND);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }




}
