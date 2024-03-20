export const getOutput = async (code, stdin, lang_id) => {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.JUDGE0_API,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: {
      language_id: lang_id,
      source_code: code,
      stdin: stdin,
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 8000));
      return await getOutput(code, stdin, lang_id);
    }
    const result = response.message;
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBatchedOutput = async (token) => {
  const url =
    `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${token}&base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.JUDGE0_API,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); 
    if (result && result.submissions && result.submissions.length > 0) {
      const submission = result.submissions[0]; 
      const expectedOutput = submission.expected_output;
      return expectedOutput
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    throw new Error(error)
  }
};
