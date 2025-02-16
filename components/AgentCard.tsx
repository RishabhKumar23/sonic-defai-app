import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentProps {
  agent: { id: number; name: string; description: string; actionType: string };
  onDelete: (id: number) => void;
}

const AgentCard: FC<AgentProps> = ({ agent, onDelete }) => {
  return (
    <Card className="shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{agent.description}</p>
        <span className="text-sm mt-2 inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-lg">
          {agent.actionType}
        </span>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" onClick={() => onDelete(agent.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
