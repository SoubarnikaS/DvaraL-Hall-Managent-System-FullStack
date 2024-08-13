package com.sdp.dvaralbackendsecurity.service;



import com.sdp.dvaralbackendsecurity.dto.StatusDto;
import com.sdp.dvaralbackendsecurity.model.BookingDetails;
import com.sdp.dvaralbackendsecurity.model.Halls;
import com.sdp.dvaralbackendsecurity.model.User;
import com.sdp.dvaralbackendsecurity.repo.BookingDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingDetailsService {

    @Autowired
    private BookingDetailsRepository bookingDetailsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private HallService hallService;


    public BookingDetails addBookingDetails(BookingDetails bookingDetails, Long userID, Long hallID) {

        User userObj = userService.getUser(userID);
        Halls hallObj = hallService.getHallDetailsBYID(hallID).get();

        bookingDetails.setUsers(userObj);
        bookingDetails.setHalls(hallObj);

        return bookingDetailsRepository.save(bookingDetails);
    }

    public List<BookingDetails> getBookingDetailsForUser(Long userID) {

        return bookingDetailsRepository.findByUsers_Id(userID);
    }

    public Boolean updateHallStatus(Long bookingID, StatusDto hallStatus) {

        Optional<BookingDetails> hallObj = bookingDetailsRepository.findById(bookingID);

        if(hallObj.isEmpty())
            return false;

        BookingDetails hallObj1 = hallObj.get();
        hallObj1.setBookingStatus(hallStatus.getBookingStatus());
        bookingDetailsRepository.save(hallObj1);
        return true;

    }

    public List<BookingDetails> getBookedDetails(String status) {
        return bookingDetailsRepository.findAllByBookingStatus(status);
    }

    public Optional<BookingDetails> getAllBookingDetailsFor(Long bookingID) {
        return bookingDetailsRepository.findById(bookingID);
    }

    public List<BookingDetails> getBookingRequestsForOwner(Long userID) {
        List<Long> ownedHalls = hallService.getHallDetailsByUser(userID)
                .stream().map(Halls::getHallID).collect(Collectors.toList());
        List<BookingDetails> bookings= new ArrayList<>();
        for (Long hallID : ownedHalls) {
            List<BookingDetails> hallObj = bookingDetailsRepository.findByHalls_hallID(hallID);
            bookings.addAll(hallObj);
        }
        return bookings;
    }
}
