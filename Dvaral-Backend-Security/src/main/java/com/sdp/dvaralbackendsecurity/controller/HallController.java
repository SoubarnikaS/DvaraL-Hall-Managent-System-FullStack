package com.sdp.dvaralbackendsecurity.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sdp.dvaralbackendsecurity.model.Halls;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.UserRepo;
import com.sdp.dvaralbackendsecurity.service.HallService;
import com.sdp.dvaralbackendsecurity.service.ImageService;
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
@RequestMapping("api/v2/halls")
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class HallController {

    @Autowired
    private HallService hallService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepo userRepository;


    @PostMapping("/add-halls")
    public ResponseEntity<String> addHallDetails(@RequestBody Halls halls){
        try{

            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));


            Halls hallObj = hallService.addHallDetails(halls, foundUser.getId());


            return new ResponseEntity<>("Hall details added successfully with ID : " + hallObj.getHallID(), HttpStatus.CREATED);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/fetch/all-halls")
    public ResponseEntity< List<Halls> > fetchAllHalls(){
        try{

            List<Halls> hallDetailsList = hallService.getAllHallDetails();
//            log.info("fetching details");

            return new ResponseEntity<>(hallDetailsList, HttpStatus.OK);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/fetch/{hallID}")
    public ResponseEntity<?> fetchHallDetails(@PathVariable Long hallID){
        try{

            Optional<Halls> hallObj = hallService.getHallDetailsBYID(hallID);

            return hallObj.map(halls -> new ResponseEntity<>(halls, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

        } catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/fetch/by/manager")
    public ResponseEntity<?> fetchHallsByManager(){
        try{
            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<Halls> hallsList = hallService.getHallDetailsByUser(foundUser.getId());
            return new ResponseEntity<>(hallsList, HttpStatus.OK);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/edit/hall/{hallID}")
    public ResponseEntity<?> editHallDetails(@RequestBody Halls halls, @PathVariable Long hallID){
        try{

            Optional<Halls> hallObj = hallService.editHallDetails(halls, hallID);
            return new ResponseEntity<>(hallObj.get(), HttpStatus.OK);
        } catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>("Not found", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/hall/{hallID}")
    public ResponseEntity<String> deleteHallDetails(@PathVariable Long hallID){

        try{

            Boolean response = hallService.deleteHallDetails(hallID);

            if(response)
                return new ResponseEntity<>("Hall details deleted successfully", HttpStatus.OK);
            else
                return new ResponseEntity<>("Hall details not deleted successfully", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
