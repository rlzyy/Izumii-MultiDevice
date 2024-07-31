/*
Created By @Irull2nd Don't Delete Wm!
*/

import "../../storage/config.js"
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import chalk from "chalk";

export const connectAuth = async() => {
  if (global.mongoAuth) {
    console.log(chalk.blue('Connecting To MongoDB Server...'));
  }
if (!global.mongoURL) {
    console.warn("Warning: No MongoDB link available.");
} else {
    global.client = new MongoClient(global.mongoURL);
    global.client.connect(err => {
        if (err) {
            console.warn("Warning: MongoDB link is invalid or cannot be connected.");
        } else {
            console.log(chalk.green('Successfully Connected To MongoDB Server'))
        }
    });
}
  await client.connect();
  const collection = client.db("irull2nd").collection("sessions")
  return collection;
};
