import { useEffect } from "react";
import "./index.css";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextareaField from "./components/TextareaField";
import SubmissionSummary from "./components/SubmissionSummary";
import useForm from "./hooks/useForm";
import validate from "./utils/validation";
const initialFormState = {
  fullName: "",
  email: "",
  surveyTopic: "",
  favoriteProgrammingLanguage: "",
  yearsOfExperience: "",
  exerciseFrequency: "",
  dietPreference: "",
  highestQualification: "",
  fieldOfStudy: "",
  feedback: "",
  additionalQuestions: [],
};

const fetchAdditionalQuestions = async (topic) => {
  const response = await fetch(
    `https://survey-api.vercel.app/questions/${topic}`
  );
  const data = await response.json();
  console.log(data);

  return data;
};

const SurveyForm = () => {
  const {
    formData,
    errors,
    handleChange,
    handleDropdownChange,
    handleSubmit,
    setFormData,
    submittedData,
  } = useForm(initialFormState, validate);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (formData.surveyTopic) {
        const questionsResponse = await fetchAdditionalQuestions(
          formData.surveyTopic
        );

        // Map over the questions response and transform them into the format expected by the form
        const additionalQuestions = questionsResponse.map(
          (question, index) => ({
            label: question.label,
            type: question.type,
            name: `additionalQuestion${index}`, // Generate a unique name for each question
            value: "", // Initialize the value to an empty string
          })
        );

        setFormData((prevState) => ({
          ...prevState,
          additionalQuestions: additionalQuestions,
        }));
      }
    };

    fetchQuestions();
  }, [formData.surveyTopic, setFormData]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen px-4">
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl py-6 px-4 md:px-6 lg:px-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Survey Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <DropdownField
            label="Survey Topic"
            name="surveyTopic"
            value={formData.surveyTopic}
            options={["Technology", "Health", "Education"]}
            onChange={handleDropdownChange}
            error={errors.surveyTopic}
          />
          {formData.surveyTopic === "Technology" && (
            <>
              <DropdownField
                label="Favorite Programming Language"
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                options={["JavaScript", "Python", "Java", "C#"]}
                onChange={handleDropdownChange}
                error={errors.favoriteProgrammingLanguage}
              />
              <InputField
                label="Years of Experience"
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                error={errors.yearsOfExperience}
              />
            </>
          )}
          {formData.surveyTopic === "Health" && (
            <>
              <DropdownField
                label="Exercise Frequency"
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                options={["Daily", "Weekly", "Monthly", "Rarely"]}
                onChange={handleDropdownChange}
                error={errors.exerciseFrequency}
              />
              <DropdownField
                label="Diet Preference"
                name="dietPreference"
                value={formData.dietPreference}
                options={["Vegetarian", "Vegan", "Non-Vegetarian"]}
                onChange={handleDropdownChange}
                error={errors.dietPreference}
              />
            </>
          )}
          {formData.surveyTopic === "Education" && (
            <>
              <DropdownField
                label="Highest Qualification"
                name="highestQualification"
                value={formData.highestQualification}
                options={["High School", "Bachelor's", "Master's", "PhD"]}
                onChange={handleDropdownChange}
                error={errors.highestQualification}
              />
              <InputField
                label="Field of Study"
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                error={errors.fieldOfStudy}
              />
            </>
          )}

          {formData.additionalQuestions.map((question, index) => (
            <InputField
              key={index}
              label={question.label}
              type={question.type}
              name={`additionalQuestion${index}`}
              value={formData[`additionalQuestion${index}`] || ""}
              onChange={handleChange}
              error={errors[`additionalQuestion${index}`]}
            />
          ))}
          <TextareaField
            label="Feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            error={errors.feedback}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded "
          >
            Submit
          </button>
        </form>
        {submittedData && <SubmissionSummary data={submittedData} />}
      </div>
    </div>
  );
};

export default SurveyForm;
