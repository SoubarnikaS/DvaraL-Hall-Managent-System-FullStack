package com.sdp.dvaralbackendsecurity.service;


import com.sdp.dvaralbackendsecurity.dto.StatusDto;
import com.sdp.dvaralbackendsecurity.enums.Role;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public User addUser(User user) {

        return userRepository.save(user);

    }

    public List<User> getAllUsers() {

        return userRepository.findByRole(Role.MANAGER);
    }

    public User getUser(Long userID) {
        return userRepository.findById(userID).get();
    }

    public Boolean updateAccountStatus(Long userID, StatusDto accountStatus) {

        Optional<User> userObj = userRepository.findById(userID);

        if(userObj.isEmpty()) {
            return false;
        }

        User user = userObj.get();


        if(accountStatus.getBookingStatus().equalsIgnoreCase("accept")) {

            user.setLocked(false);
            userRepository.save(user);

            return true;
        }
        log.info("Account not updated. Status: {}", accountStatus.getBookingStatus());
        return false;
    }

    public Long findUserIdByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        log.info(String.valueOf(user.get().getId()));
        return user.map(User::getId).orElse(null);
    }
}
