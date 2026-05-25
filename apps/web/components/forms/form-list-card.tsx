import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import Link from "next/link";

export type FormCardObject = {
  form: {
    id: string;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string | null;
  };
};

export function FormListCard({ form }: FormCardObject): React.ReactNode {
  return (
    <Card key={form.id} className="hover:shadow-lg transition-shadow font-display">
      <CardHeader>
        <CardTitle className="line-clamp-2">{form.title}</CardTitle>
        {form.description && (
          <CardDescription className="line-clamp-2">{form.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-500">
          <p>Created: {new Date(form.createdAt).toLocaleDateString()}</p>
          {form.updatedAt && <p>Last updated: {new Date(form.updatedAt).toLocaleDateString()}</p>}
        </div>
        <div className="flex gap-2">
          <Link href={`/creatorDashboard/forms/${form.id}`} className="flex-1">
            <Button variant="default" className="w-full">
              Edit
            </Button>
          </Link>
          <Link href={`/forms/${form.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
