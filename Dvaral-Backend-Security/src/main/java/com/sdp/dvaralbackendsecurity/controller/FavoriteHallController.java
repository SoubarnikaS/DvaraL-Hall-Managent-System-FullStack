package com.sdp.dvaralbackendsecurity.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sdp.dvaralbackendsecurity.model.FavoriteHalls;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.UserRepo;
import com.sdp.dvaralbackendsecurity.service.FavouriteHallService;
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
public class FavoriteHallController {

    @Autowired
    private FavouriteHallService favouriteHallService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepo userRepository;


    @PostMapping("/add-to-fav/{hallID}")
    public ResponseEntity<?> addHallToFav(@PathVariable Long hallID) {

        try{

            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));

            FavoriteHalls favHalls = favouriteHallService.addHallToFav(foundUser.getId(), hallID);
            return new ResponseEntity<>("Hall : " + hallID + " added to favorites for user : " + foundUser.getId(), HttpStatus.OK);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get-favourite")
    public ResponseEntity<?> getFavourite() {
        try{

            objectMapper.registerModule(new JavaTimeModule());

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            Optional<User> user = userRepository.findByEmail(email);
            User foundUser = user.orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<FavoriteHalls> favHallList = favouriteHallService.getFavouriteForUser(foundUser.getId());

            return new ResponseEntity<>(favHallList, HttpStatus.OK);
        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @DeleteMapping("/remove-favourites")
    public ResponseEntity<?> removeFavourite(@RequestBody FavoriteHalls favoriteHalls) {
        try{

            favouriteHallService.deleteFavorite(favoriteHalls);
            return new ResponseEntity<>( "Removed from favorites",HttpStatus.OK);

        }catch (Exception e){

            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
