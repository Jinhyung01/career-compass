package com.jobfeel.careercompass.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

@Entity
@Table(name = "profile_content")
public class ProfileContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long contentId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "category")
    private String category;

    @Column(name = "content")
    private String content;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    protected ProfileContent() {
    }

    public ProfileContent(Long userId, String category, String content, OffsetDateTime createdAt) {
        this.userId = userId;
        this.category = category;
        this.content = content;
        this.createdAt = createdAt;
    }

    public Long getContentId() {
        return contentId;
    }

    public Long getUserId() {
        return userId;
    }

    public String getCategory() {
        return category;
    }

    public String getContent() {
        return content;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}
