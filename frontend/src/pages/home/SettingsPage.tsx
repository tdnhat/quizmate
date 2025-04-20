import {
    ProfileSection,
    PasswordSection,
    SettingsProvider,
} from "@/features/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SettingsBreadcrumb from "@/features/settings/components/SettingsBreadcrumb";

const SettingsPage = () => {
    return (
        <SettingsProvider>
            <div className="container mx-auto max-w-6xl p-4">
                <SettingsBreadcrumb />
                <div className="flex flex-col mb-6">
                    <h1 className="text-2xl font-bold text-cyan-600">Account Settings</h1>
                    <p className="text-gray-600">
                        Manage your profile information and security settings
                    </p>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-cyan-600">Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProfileSection labelPosition="left" />
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-cyan-600">Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PasswordSection labelPosition="left" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SettingsProvider>
    );
};

export default SettingsPage;
