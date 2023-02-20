package com.survey.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "que_ans")
public class QueAns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "question")
    private String question;
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "answer", referencedColumnName = "id")
    private Answer answer;
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "category", referencedColumnName = "id")
    private Category category;
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public Answer getAnswer() {
        return answer;
    }
    public void setAnswer(Answer answer) {
        this.answer = answer;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
}