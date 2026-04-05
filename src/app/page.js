"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Card,
  FieldError,
  Form,
  Label,
  Modal,
  NumberField,
  ScrollShadow,
} from "@heroui/react";
import {
  Flame,
  Cloud,
  Molecule,
  Magnifier,
  Droplet,
  Sun,
  Flask,
  CircleInfo,
  Bulb,
} from "@gravity-ui/icons";
import axios from "axios";
import { GitHub } from "@/icons/github";
import Link from "next/link";

export default function Home() {
  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setisLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await axios.post("/api/prompt", data);
      setResult(response.data.message);
    } catch (err) {
      console.error("Error making API request", err);
    } finally {
      setisLoading(false);
    }
  };

  const inputFields = [
    [
      {
        label: "PM2.5 (µg/m³)",
        name: "pm25",
        icon: Molecule,
      },
      {
        label: "Temperature (°C)",
        name: "temperature",
        icon: Sun,
      },
    ],
    [
      {
        label: "Humidity (%)",
        name: "humidity",
        icon: Droplet,
      },
      {
        label: "TVOC (µg/m³)",
        name: "tvoc",
        icon: Flask,
      },
    ],
    [
      {
        label: "CO (ppm)",
        name: "co",
        icon: Flame,
      },
      {
        label: "CO2 (ppm)",
        name: "co2",
        icon: Cloud,
      },
    ],
  ];

  return (
    <main className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4 space-x-2">
        <Link href="https://github.com/sshokh/aireval">
          <Button isIconOnly variant="tertiary">
            <GitHub />
          </Button>
        </Link>
        <Modal>
          <Button isIconOnly variant="secondary">
            <CircleInfo />
          </Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-background text-accent">
                    <Bulb className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>What is AirEval?</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    AirEval (Air Quality Evaluator) is a modern web application
                    that evaluates air quality parameters and provides detailed
                    AI-powered recommendations and health impact assessments.
                    Built with Next.js, it features an intuitive interface for
                    monitoring air quality metrics including PM2.5, temperature,
                    humidity, TVOC, CO, and CO2 levels.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    Got it!
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
      <div className="flex flex-row items-center min-h-screen w-full justify-center">
        <div
          className={`h-full w-full flex justify-center items-center flex-col ${result ? "py-16" : ""}`}
        >
          <div className="text-center mb-6 wrap-break-word">
            <h1 className="text-4xl text-lime-800">AI Air Quality Evaluator</h1>
            <h1 className="text-md text-lime-800/50">
              Managed by ASK sophomores
            </h1>
          </div>

          <div className="flex gap-8 md:flex-row justify-center items-center flex-col w-full">
            <Form
              onSubmit={handleSubmit}
              className="space-y-2 w-[80%] md:w-[40%] lg:w-[30%]"
            >
              {inputFields.map((fieldsRow, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  {fieldsRow.map((field) => (
                    <NumberField
                      isRequired
                      key={field.name}
                      name={field.name}
                      defaultValue={0}
                    >
                      <Label className="inline-flex items-center text-lime-800">
                        <field.icon className="mr-1.5" />
                        {field.label}
                      </Label>

                      <NumberField.Group>
                        <NumberField.DecrementButton />
                        <NumberField.Input />
                        <NumberField.IncrementButton />
                      </NumberField.Group>
                      <FieldError />
                    </NumberField>
                  ))}
                </div>
              ))}

              <Button
                type="submit"
                fullWidth
                className="mt-4"
                isPending={isLoading}
                disabled={isLoading}
              >
                <Magnifier />
                {isLoading ? "Checking..." : "Check"}
              </Button>
            </Form>

            {result && (
              <Card className="max-w-lg space-y-4 h-80">
                <Card.Content className="overflow-auto">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </Card.Content>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
