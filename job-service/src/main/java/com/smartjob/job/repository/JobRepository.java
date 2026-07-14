package com.smartjob.job.repository;

import com.smartjob.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByCategoryIgnoreCase(String category);
    List<Job> findByLocationIgnoreCase(String location);
    List<Job> findByExperienceIgnoreCase(String experience);
}
