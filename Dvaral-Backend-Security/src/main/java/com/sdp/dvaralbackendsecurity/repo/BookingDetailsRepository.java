package com.sdp.dvaralbackendsecurity.repo;


import com.sdp.dvaralbackendsecurity.model.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface    BookingDetailsRepository extends JpaRepository<BookingDetails, Long> {

    List<BookingDetails> findByUsers_Id(Long userID);

    List<BookingDetails> findAllByBookingStatus(String status);

    List<BookingDetails> findByHalls_hallID(Long hallID);
}
