"use client";

import { useEffect, useState } from "react";
import AgentCard from "@/components/AgentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function DashboardPage() {
  interface Agent {
    id: number;
    name: string;
    description: string;
    actionType: string;
  }

  const [agents, setAgents] = useState<Agent[]>([]);
  const [formData, setFormData] = useState<Partial<Agent>>({ name: "", description: "", actionType: "" });

  // Fetch AI agents
  useEffect(() => {
    async function fetchAgents() {
      const res = await fetch("/api/defai-agent");
      const data = await res.json();
      if (data.success) setAgents(data.data);
    }
    fetchAgents();
  }, []);

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSelectChange(value: string) {
    setFormData({ ...formData, actionType: value });
  }

  // Submit new agent
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/defai-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setAgents([...agents, data.data]);
      setFormData({ name: "", description: "", actionType: "" });
    }
  }

  // Delete an agent
  async function handleDelete(id: number) {
    await fetch("/api/defai-agent", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAgents(agents.filter((agent) => agent.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-3xl mx-auto shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">AI Agents Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Agent Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Select onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on-chain">On-Chain</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Add AI Agent
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* AI Agents Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
