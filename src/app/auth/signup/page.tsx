import Signup from "@/components/SignupForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="py-4">
        <CardContent>
          <Signup />
        </CardContent>
      </Card>
    </div>
  );
}
