package com.sdp.dvaralbackendsecurity.repo;


import com.sdp.dvaralbackendsecurity.model.Halls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallRepository extends JpaRepository<Halls, Long> {
    List<Halls> findByUsers_Id(Long userId);
}
