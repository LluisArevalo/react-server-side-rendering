import React from "react";
import express from "express";
import { readFileSync } from "fs";
import { renderToString } from "react-dom/server";

import { App } from "../client/App";
import { handleModifyAnswerVotes } from "../shared/utility";

const data = {
  questions: [
    {
      questionId: "Q1",
      content: "Should we use jQuery or Fetch for Ajax?",
    },
    {
      questionId: "Q2",
      content: "What is better for the future of React?",
    },
  ],
  answers: [
    {
      answerId: "A1",
      questionId: "Q1",
      upvotes: 2,
      content: "jQuery",
    },
    {
      answerId: "A2",
      questionId: "Q1",
      upvotes: 1,
      content: "Fetch",
    },
    {
      answerId: "A3",
      questionId: "Q2",
      upvotes: 1,
      content: "Performance",
    },
    {
      answerId: "A4",
      questionId: "Q2",
      upvotes: 0,
      content: "Ease of use",
    },
  ],
};

const app = new express();
const PORT = process.env.PORT || 7777;

app.use(express.static("dist"));

app.get("/data", async (_req, res) => {
  res.json(data);
});
app.get("/vote/:answerId", (req, res) => {
  const { query, params } = req;
  data.answers = handleModifyAnswerVotes(
    data.answers,
    params.answerId,
    +query.increment
  );
  res.send("ok");
});
app.get("/", async (_req, res) => {
  const index = readFileSync(`public/index.html`, `utf8`);
  const rendered = renderToString(<App {...data} />);
  res.send(index.replace("{{rendered}}", rendered));
});

app.listen(PORT);
console.info(`Server is listening in port ${PORT}`);
