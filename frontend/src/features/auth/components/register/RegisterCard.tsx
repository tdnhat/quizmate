import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";

import RegisterForm from "./RegisterForm";

interface RegisterCardProps {
    returnUrl?: string | null;
}

const RegisterCard = ({ returnUrl }: RegisterCardProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-cyan-600 font-bold text-center">
                    Create an account
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterForm returnUrl={returnUrl} />
            </CardContent>
        </Card>
    );
};

export default RegisterCard;
