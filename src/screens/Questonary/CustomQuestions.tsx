import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { View } from "react-native";

import { CustomRadioInput, CustomSelect } from "@/src/components";
import { Question, QUESTION_TYPE } from "@/src/types/player/Question";
import { REQUIRED_LABEL } from "@/src/utils/customValidator";
import { styles } from "./Questonary.styles";

interface CustomQuestionsProps {
  questions: Question[];
  control: Control<any>;
  errors?: any;
}

const CustomQuestions: React.FC<CustomQuestionsProps> = ({
  questions,
  control,
  errors,
}) => {
  useFieldArray({
    control,
    name: "dynamicQuestions",
  });

  const renderQuestion = (question: Question, index: number) => {
    const questionId = `dynamicQuestions.${index}.value`;
    const fieldError = errors?.dynamicQuestions?.[index]?.value?.message;

    switch (question.type.code) {
      case QUESTION_TYPE.SELECT:
        return (
          <Controller
            key={question.id}
            control={control}
            name={questionId}
            rules={{ required: REQUIRED_LABEL }}
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                label={question.label}
                labelProps={{ bold: true, type: "h4" }}
                data={question.answers}
                keyExtractor={(answer) => answer.id.toString()}
                labelExtractor={(answer) => answer.label}
                value={value}
                onSelect={onChange}
                placeholder={`Seleccioná una opción`}
                error={fieldError}
              />
            )}
          />
        );

      case QUESTION_TYPE.RADIO:
        return (
          <Controller
            key={question.id}
            control={control}
            name={questionId}
            rules={{ required: REQUIRED_LABEL }}
            render={({ field: { onChange, value } }) => (
              <CustomRadioInput
                label={question.label}
                labelProps={{ bold: true }}
                options={question.answers}
                value={value}
                onSelect={onChange}
                error={fieldError}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.questionsContainer}>
      {questions.map((question, index) => renderQuestion(question, index))}
    </View>
  );
};

export default CustomQuestions;
