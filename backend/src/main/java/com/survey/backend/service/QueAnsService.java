package com.survey.backend.service;

import com.survey.backend.model.Answer;
import com.survey.backend.model.Category;
import com.survey.backend.model.QueAns;
import com.survey.backend.repository.AnswerRepository;
import com.survey.backend.repository.CategoryRepository;
import com.survey.backend.repository.QueAnsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QueAnsService {
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private QueAnsRepository queAnsRepository;

    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public List<QueAns> getAllQueAns() { return queAnsRepository.findAll(); }

    public void saveAnswer(List<QueAns> queAns) {
        List<QueAns> oldQueAns = queAnsRepository.findAll();
        for (int i=0; i<oldQueAns.size(); i++) {
            oldQueAns.get(i).setAnswer(queAns.get(i).getAnswer());
            queAnsRepository.save(oldQueAns.get(i));
        }
    }

    public int[] getResult() {
        List<QueAns> queAns = queAnsRepository.findAll();
        int totalCategoryCount = categoryRepository.findAll().size();
        int[] category = new int[totalCategoryCount];
        int c1 = 0, c2 = 0, c3 = 0;
        for (int i = 0; i < queAns.size(); i++) {
            if (queAns.get(i).getCategory().getId() == 1) {
                category[0] += queAns.get(i).getAnswer().getId();
                c1++;
            } else if (queAns.get(i).getCategory().getId() == 2) {
                category[1] += queAns.get(i).getAnswer().getId();
                c2++;
            } else if (queAns.get(i).getCategory().getId() == 3) {
                category[2] += queAns.get(i).getAnswer().getId();
                c3++;
            } else {
                System.out.println("Invalid Step");
            }
        }
        category[0] = Math.round(category[0]*100/(c1*5));
        category[1] = Math.round(category[1]*100/(c2*5));
        category[2] = Math.round(category[2]*100/(c3*5));
        return category;
    }
}