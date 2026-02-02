"use client";
import { dataTypeDay, DataTypeMonth } from "../page";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import DataGraph from "./DataGraph";

export default function ShowData() {
  const [city, setCity] = useState("copenhagen");

  const { data, refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(`/api?city=${city}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const days: DataTypeMonth = Array.isArray(data) ? data : [];
  console.log(days);
  return (
    <div className="m-10">
      <DataGraph days={days} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <span>Choose country:</span>
        <Input
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="border-black w-48 m-4"
        />
      </form>
    </div>
  );
}
