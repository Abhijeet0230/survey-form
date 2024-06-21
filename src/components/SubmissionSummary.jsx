import React from "react";

const SubmissionSummary = ({ data }) => {
  const relevantData = { ...data };

  if (data.surveyTopic !== "Technology") {
    delete relevantData.favoriteProgrammingLanguage;
    delete relevantData.yearsOfExperience;
  }

  if (data.surveyTopic !== "Health") {
    delete relevantData.exerciseFrequency;
    delete relevantData.dietPreference;
  }

  if (data.surveyTopic !== "Education") {
    delete relevantData.highestQualification;
    delete relevantData.fieldOfStudy;
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Submission Summary</h2>
      <div>
        <p>
          <strong>Full Name:</strong> {relevantData.fullName}
        </p>
        <p>
          <strong>Email:</strong> {relevantData.email}
        </p>
        <p>
          <strong>Survey Topic:</strong> {relevantData.surveyTopic}
        </p>

        {relevantData.surveyTopic === "Technology" && (
          <>
            <p>
              <strong>Favorite Programming Language:</strong>{" "}
              {relevantData.favoriteProgrammingLanguage}
            </p>
            <p>
              <strong>Years of Experience:</strong>{" "}
              {relevantData.yearsOfExperience}
            </p>
          </>
        )}

        {relevantData.surveyTopic === "Health" && (
          <>
            <p>
              <strong>Exercise Frequency:</strong>{" "}
              {relevantData.exerciseFrequency}
            </p>
            <p>
              <strong>Diet Preference:</strong> {relevantData.dietPreference}
            </p>
          </>
        )}

        {relevantData.surveyTopic === "Education" && (
          <>
            <p>
              <strong>Highest Qualification:</strong>{" "}
              {relevantData.highestQualification}
            </p>
            <p>
              <strong>Field of Study:</strong> {relevantData.fieldOfStudy}
            </p>
          </>
        )}
        {relevantData.additionalQuestions.length > 0 && (
          <>
            <div className="mt-2">
              {relevantData.additionalQuestions.map((question, index) => (
                <p key={index}>
                  <strong>{question.label}:</strong>{" "}
                  {relevantData[`additionalQuestion${index}`]}
                </p>
              ))}
            </div>
          </>
        )}
        <p className="mt-2">
          <strong>Feedback:</strong> {relevantData.feedback}
        </p>
      </div>
    </div>
  );
};

export default SubmissionSummary;
