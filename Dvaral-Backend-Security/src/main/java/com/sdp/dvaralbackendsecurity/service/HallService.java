package com.sdp.dvaralbackendsecurity.service;


import com.sdp.dvaralbackendsecurity.model.Halls;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.HallRepository;
import com.sdp.dvaralbackendsecurity.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    @Autowired
    private UserRepo userRepository;

    public Halls addHallDetails(Halls halls, Long userID) {

        Optional<User> userObj = userRepository.findById(userID);

        userObj.ifPresent(halls::setUsers);

        return hallRepository.save(halls);
    }

    public List<Halls> getAllHallDetails() {
        return hallRepository.findAll();
    }

    public Optional<Halls> getHallDetailsBYID(Long hallID) {
        return hallRepository.findById(hallID);
    }

    public List<Halls> getHallDetailsByUser(Long userId) {
        return hallRepository.findByUsers_Id(userId);
    }

    public Optional<Halls> editHallDetails(Halls halls, Long hallID) {

        Halls existingHall = hallRepository.findById(hallID).orElse(null);

        if (existingHall != null) {

            existingHall.setHallOwner(halls.getHallOwner());
            existingHall.setHallName(halls.getHallName());
            existingHall.setHallType(halls.getHallType());
            existingHall.setHallLocation(halls.getHallLocation());
            existingHall.setHallDescription(halls.getHallDescription());
            existingHall.setHallStatus(halls.getHallStatus());
            existingHall.setHallAddress(halls.getHallAddress());
            existingHall.setHallContact(halls.getHallContact());
            existingHall.setCapacity(halls.getCapacity());
            existingHall.setHallPrice(halls.getHallPrice());
            existingHall.setHallAmenitiesList(halls.getHallAmenitiesList());


            Halls updatedHall = hallRepository.save(existingHall);


            return Optional.of(updatedHall);

        } else {

            return Optional.empty();
        }
    }


    public Boolean deleteHallDetails(Long hallID) {

        Halls halls = hallRepository.findById(hallID).orElse(null);

        if (halls != null) {

            hallRepository.deleteById(hallID);
            return true;
        }else{

            return false;
        }

    }


}
