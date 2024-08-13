package com.sdp.dvaralbackendsecurity.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingID;
    private String userName;
    private String userEmail;
    private String userPhone;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date requestedDate;
    private String requestedTime;
    private int noOfGuest;
    private String eventType;
    private String specialRequests;
    private String bookingStatus;


//    @JsonManagedReference("bookingUserReference")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User users;

//    @JsonManagedReference("bookingHallReference")
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Halls halls;
}
