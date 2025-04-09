import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import LoginForm from "./LoginForm";

interface LoginCardProps {
    returnUrl?: string | null;
}

const LoginCard = ({ returnUrl }: LoginCardProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-cyan-600 font-bold text-center">
                    Log in
                </CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm returnUrl={returnUrl} />
            </CardContent>
        </Card>
    );
};

export default LoginCard;
