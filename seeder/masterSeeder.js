import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedUsers } from "./userSeeder.js";
import { seedVideos } from "./videoSeeder.js";
import { seedChannels } from "./channelSeeder.js";
import Seeder from "../models/Seeder.js";
import ChannelsModel from "../models/Channels.model.js";

dotenv.config();

export const runAllSeeders = async () => {
  try {
    const existing = await Seeder.findOne();
    if (existing?.isSeeded) {
      console.log("Seeding completed");
      return;
    }

    console.log("Running seeders...");
    const users = await seedUsers();
     await seedChannels(users);
    const channels = await ChannelsModel.find();
    await seedVideos(users, channels);

    await Seeder.create({ isSeeded: true });

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};
