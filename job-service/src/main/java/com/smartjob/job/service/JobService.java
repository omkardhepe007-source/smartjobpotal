package com.smartjob.job.service;

import com.smartjob.job.entity.Job;
import com.smartjob.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setTitle(jobDetails.getTitle());
        job.setCompany(jobDetails.getCompany());
        job.setDescription(jobDetails.getDescription());
        job.setLocation(jobDetails.getLocation());
        job.setSalary(jobDetails.getSalary());
        job.setExperience(jobDetails.getExperience());
        job.setCategory(jobDetails.getCategory());
        job.setJobType(jobDetails.getJobType());
        job.setLastDate(jobDetails.getLastDate());
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public List<Job> getAllJobs(String keyword, String category, String location, String experience) {
        Specification<Job> spec = Specification.where(null);
        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%"));
        }
        if (category != null && !category.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("category")), category.toLowerCase()));
        }
        if (location != null && !location.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("location")), location.toLowerCase()));
        }
        if (experience != null && !experience.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("experience")), experience.toLowerCase()));
        }
        return jobRepository.findAll(spec);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
    }
}
