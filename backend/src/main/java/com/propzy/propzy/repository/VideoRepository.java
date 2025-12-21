package com.propzy.propzy.repository;

import com.propzy.propzy.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {

}
