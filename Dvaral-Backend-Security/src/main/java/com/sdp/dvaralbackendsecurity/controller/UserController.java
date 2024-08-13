package com.sdp.dvaralbackendsecurity.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sdp.dvaralbackendsecurity.dto.StatusDto;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.UserRepo;
import com.sdp.dvaralbackendsecurity.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v2/auth")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ObjectMapper objectMapper;



    @GetMapping("/fetch/allUser")
    public ResponseEntity<?> getAllUsers() {

        try{
            List<User> usersList = userService.getAllUsers();

            if (!usersList.isEmpty()) {
                return new ResponseEntity<>(usersList, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("No users found", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){

            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUserId")
    public ResponseEntity<String> getUserIdByEmail(@RequestParam String email) {
        Long userId = userService.findUserIdByEmail(email);

        if (userId != null) {
            User user = userRepo.findById(userId).get();
            return ResponseEntity.ok(user.getName());

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/v2/auth/getUserName")
    public ResponseEntity<String> getUserNameByEmail(String email) {
        try{

            Optional<User> user = userRepo.findByEmail(email);

            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return ResponseEntity.ok(foundUser.getName());

        }catch (Exception e){

            return ResponseEntity.notFound().build();
        }
    }


    @PatchMapping("/manager-account/{userID}")
    public ResponseEntity<?> updateUser(@PathVariable Long userID, @RequestBody StatusDto accountStatus) {
        try{
            Boolean response = userService.updateAccountStatus(userID, accountStatus);

            if(response)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
