package com.survey.backend.controller;

import com.survey.backend.model.Answer;
import com.survey.backend.model.Category;
import com.survey.backend.model.QueAns;
import com.survey.backend.service.QueAnsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class QueAnsController {
    @Autowired
    private QueAnsService queAnsService;
    @GetMapping("/getOptions")
    public List<Answer> getAllAnswers() { return queAnsService.getAllAnswers(); }
    @GetMapping("/getCategories")
    public List<Category> getAllCategory() { return queAnsService.getAllCategory(); }
    @GetMapping("/getQueAns")
    public List<QueAns> getAllQueAns() { return queAnsService.getAllQueAns(); }
    @PostMapping("/saveAnswer")
    public void saveAnswer(@RequestBody List<QueAns> queAns) { queAnsService.saveAnswer(queAns); }
    @GetMapping("/getResult")
    public int[] getResult() { return queAnsService.getResult(); }
}