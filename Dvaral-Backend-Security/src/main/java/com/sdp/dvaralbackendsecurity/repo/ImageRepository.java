package com.sdp.dvaralbackendsecurity.repo;


import com.sdp.dvaralbackendsecurity.model.HallImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<HallImages, Long> {

    List<HallImages> findByHalls_HallID(Long hallID);}
