"use client";

import React from "react";
import { Box, Card, Text } from "@radix-ui/themes";
import Wakatime from "@/components/Bento/Cards/Wakatime";
import SteamGames from "@/components/Bento/SteamGames";
import TwitchSchedule from "@/components/Bento/TwitchSchedule";

function Bento() {
  return (
    <section className="h-screen p-4">
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid h-full w-full gap-4 p-2 grid-cols-4 grid-rows-4 rounded-lg shadow-md">
          <Box className="col-span-2 row-span-1 shadow-md flex items-center justify-center">
            <Card className="w-full h-full" asChild style={{ height: "100%" }}>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Quick start
                </Text>
                <Text as="div" color="gray" size="2">
                  Start building your next project in minutes
                </Text>
              </a>
            </Card>
          </Box>

          <Box className="col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center">
            <Card className="w-full h-full" asChild style={{ height: "100%" }}>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Quick start
                </Text>
                <Text as="div" color="gray" size="2">
                  Start building your next project in minutes
                </Text>
              </a>
            </Card>
          </Box>

          <Box className="col-span-1 row-span-4 rounded-lg shadow-md flex items-center justify-center">
            <Card className="w-full h-full" style={{ height: "100%" }}>
              <TwitchSchedule />
            </Card>
          </Box>

          <Box className="col-span-2 row-span-2 rounded-lg shadow-md flex items-center justify-center">
            <Card className="w-full h-full" style={{ height: "100%" }}>
              <Wakatime />
            </Card>
          </Box>

          <Box className="col-span-1 row-span-2 rounded-lg shadow-md flex items-center justify-center">
            <Card className="w-full h-full" style={{ height: "100%" }}>
              <SteamGames />
            </Card>
          </Box>

          <Box className="col-span-3 row-span-2 rounded-lg shadow-md flex items-center justify-center">
            <Card className="w-full h-full" asChild style={{ height: "100%" }}>
              <a href="#">
                <Text as="div" size="2" weight="bold">
                  Quick start
                </Text>
                <Text as="div" color="gray" size="2">
                  Start building your next project in minutes
                </Text>
              </a>
            </Card>
          </Box>
        </div>
      </div>
    </section>
  );
}

export default Bento;
