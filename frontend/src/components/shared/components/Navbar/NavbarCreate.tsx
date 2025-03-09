import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateQuizForm } from "./CreateQuizForm";
import { CreateQuizFormValues } from "../../schemas/CreateQuizFormSchema";

const NavbarCreate = () => {
    const { categories } = useCategories();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: CreateQuizFormValues) => {
        try {
            setIsLoading(true);
            console.log(values);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setOpen(false);

            // Redirect to the full quiz creation page with pre-filled values
            navigate("/quizzes/create", { state: { initialValues: values } });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="bg-cyan-500 hover:cursor-pointer hover:bg-cyan-600 transition-colors text-white"
                >
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create new quiz</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to create a new quiz
                    </DialogDescription>
                </DialogHeader>

                <CreateQuizForm
                    categories={categories}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </DialogContent>
        </Dialog>
    );
};

export default NavbarCreate;
